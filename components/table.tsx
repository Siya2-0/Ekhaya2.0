"use client";

import { signUpAction } from "@/app/actions";

import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiFilter, FiSearch, FiPlus, FiX } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteUser } from '@/app/rest-api/api-users';
import { updateMetadata } from "@/app/rest-api/restapi";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    LOA: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    image_url: string;
    last_name: string;
    phone_number: string;
    phone_verified: boolean;
    role: string;
    status: string;
    sub: string;
  };
  identities: null | Record<string, unknown>; // Replace with a more specific type if you know the structure
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

const EmployeeTable = ({ users }: { users: User[] }) => {
  const router = useRouter();

  const [employees, setEmployees] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [editEmployee, setEditEmployee] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [initialEditEmployee, setInitialEditEmployee] = useState<any>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const subscription = supabase
      .channel("realtime:users")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Users",
        },
        (payload: any) => {
          if (payload.eventType === "INSERT") {
            setEmployees((prev) => [...prev, payload.new]);
          }

          if (payload.eventType === "UPDATE") {
            const parsedOrders = (() => {
              let itemsArray = [];
              try {
                const parsedItems = JSON.parse(payload.new.items); // If `items` is JSON
                itemsArray = Array.isArray(parsedItems.orderItems) ? parsedItems.orderItems : [];
              } catch (error) {
                console.warn(`Invalid items format for order ID ${payload.new.id}:`, error);
              }
          
              return {
                ...payload.new,
                items: itemsArray, // Ensure `items` is always an array
              };
            })();
            setEmployees((prev) =>
              prev.map((user) =>
                user.id === payload.new.id ? parsedOrders : user
              )
            );
          }

          if (payload.eventType === "DELETE") {
            setEmployees((prev) =>
              prev.filter((user) => user.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  const handleSort = (key: any) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...employees].sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterRole = (event: any) => {
    setFilterRole(event.target.value);
  };

  const handleFilterStatus = (event: any) => {
    setFilterStatus(event.target.value);
  };

  const handleEdit = (employee: any) => {
    setEditEmployee(employee);
    setInitialEditEmployee(employee);
    setShowModal(true);
  };

  const handleEditEmployee = async (updatedEmployee: any) => {
    try {
      const response = await fetch("/api/user/loaupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        uuid: updatedEmployee.id,
        LOA: updatedEmployee.user_metadata.LOA,
        }),
      });
  
      const data = await response;
      if (response.ok) {
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setShowModal(false);
        setIsUpdating(false);
        setEditEmployee(null);
        return data;
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData}`);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      const response = await deleteUser(id);
      if (response) {
        alert('User deleted successfully.');
        setEmployees((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        const errorData = await response;
        console.error('Error deleting user:', errorData);
        alert(`Failed to delete user: ${errorData}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An unexpected error occurred.');
    }
  };

  const handleUpdate = (updatedEmployee: any) => {
    setIsUpdating(true);
    handleEditEmployee(updatedEmployee);
  };

  const filteredEmployees = employees
    .filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((employee) =>
      filterRole ? employee.user_metadata.role === filterRole : true
    )
    .filter((employee) =>
      filterStatus ? employee.user_metadata.status === filterStatus : true
    );

    interface FormData {
      name: string;
      surname: string;
      phone: string;
      email: string;
      role: string;
      password: string;
      status: string;
      username: string;
      authority: string;
    }

    const [formData, setFormData] = useState<FormData>({
      name: "",
      surname: "",
      phone: "",
      email: "",
      role: "",
      password: "",
      status: "active",
      username: "",
      authority: ""
    });
  
    interface FormErrors {
      name?: string;
      surname?: string;
      phone?: string;
      email?: string;
      role?: string;
      password?: string;
      username?: string;
      authority?: string;
    }
    
    const [errors, setErrors] = useState<FormErrors>({});
    // const [showSuccess, setShowSuccess] = useState(false);
  
    const validateForm = () => {
      const newErrors: FormErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.surname) newErrors.surname = "Surname is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number format";
      if (!formData.email) newErrors.email = "Email is required";
      if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.role) newErrors.role = "Role is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.authority) newErrors.authority = "Level of Authority is required";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [dialogSuccess, setDialogSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await signUpAction(formData);
    if (response.success) {
      setDialogMessage("Registration successful!");
      setDialogSuccess(true);
      setShowForm(false);

      // Refresh the page after closing the dialog
      setShowDialog(true);
    } else {
      setDialogMessage(response.message || "An error occurred.");
      setDialogSuccess(false);
      setShowDialog(true);
    }
  };

    const handleDialogClose = () => {
      setShowDialog(false);

      if (dialogSuccess) {
      // Navigate to the current route to simulate a "refresh"
      router.refresh();
      }
  };

  
  interface EditEmployee {
    user_metadata: {
      [key: string]: string;
    };
  }

  interface HandleChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setEditEmployee((prev: EditEmployee) => ({
      ...prev,
      user_metadata: {
        ...prev.user_metadata,
        [name]: value,
      },
    }));
  };

  const hasChanges = JSON.stringify(editEmployee) !== JSON.stringify(initialEditEmployee);

  return (
    <div className="p-6 bg-[F2F2F2] min-h-screen text-[#303030] pt-12">
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#D62929] text-white px-4 py-4 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <FiPlus /> Add New User
        </button>
          <div className="relative bg-[#f2f2f2]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleFilterRole}
            >
              <option value="">Filter by Role</option>
              <option value="Waitress">Waitress</option>
              <option value="Sound Engineer">Sound Engineer</option>
              <option value="Manager">Manager</option>
              <option value="Security">Security</option>

            </select>
            <select
              className="px-4 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleFilterStatus}
            >
              <option value="">Filter by Status</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow mt-8">
        <table className="w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Surname", "Role", "Email", "Cellphone", "Created At", "Status", "Authority", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => header !== "Actions" && handleSort(header.toLowerCase())}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {header !== "Actions" && <BiSortAlt2 className="text-gray-400" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{index}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.first_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.last_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.phone_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.created_at}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.user_metadata.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.user_metadata.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.user_metadata.LOA}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showModal && editEmployee) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 min-w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Employee</h3>
              <form className="min-w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editEmployee);
                }}
              >
                <div className="space-y-4 min-w-full">
                      {/* <div className="min-w-full">
                      <TextField
                          select
                          variant="outlined"
                          label="Level of Access"
                          name="role"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={editEmployee.user_metadata.role || ""}
                        >
                          <MenuItem value="Waitress">Waitress</MenuItem>
                          <MenuItem value="Manager">Manager</MenuItem>
                          <MenuItem value="Security">Security</MenuItem>
                          <MenuItem value="Sound Engineer">Sound Engineer</MenuItem>
                        </TextField>
                      </div> */}
                      <div className="min-w-full">
                        <TextField
                          select
                          variant="outlined"
                          label="Level of Access"
                          name="LOA"
                          required
                          fullWidth
                          onChange={handleChange}
                          value={editEmployee.user_metadata.LOA || ""}
                        >
                          <MenuItem value="NonManagement">NonManagement</MenuItem>
                          <MenuItem value="Management">Management</MenuItem>
                          <MenuItem value="Admin">Admin</MenuItem>
                        </TextField>
                      </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!hasChanges || isUpdating}
                    className={`px-4 py-2 ${!hasChanges ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}  text-white rounded-md`}
                  >
                    {isUpdating ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Sliding Form */}
      <div className={`fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg transform ${showForm ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Add New User</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col min-w-full max-w-full mx-auto">
            <Typography variant="h4" component="h1" gutterBottom>
              Sign up
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mt={3}>
              <TextField
                variant="outlined"
                label="Email"
                name="email"
                placeholder="you@example.com"
                required
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                placeholder="Your password"
                inputProps={{ minLength: 8, maxLength: 50 }}
                required
              />
              <TextField
                variant="outlined"
                label="First Name"
                name="name"
                placeholder="Enter Name"
                required
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                variant="outlined"
                label="Last Name"
                name="surname"
                placeholder="Last Name"
                required
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                variant="outlined"
                label="Phone Number"
                name="phone_number"
                placeholder=""
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                variant="outlined"
                label="Job Position"
                name="role"
                placeholder="Enter Job Title"
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                select
                variant="outlined"
                label="Level of Access"
                name="loa"
                required
                defaultValue="NonManagement"
              >
                <MenuItem value="NonManagement">NonManagement</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
              <TextField
                select
                variant="outlined"
                label="Status"
                name="status"
                required
                defaultValue="active"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  pt: 2,
                  pb: 2,
                  backgroundColor: "#303030",
                  "&:hover": {
                    backgroundColor: "#505050", // Slightly lighter color for hover effect
                  },
                }}
              >
                Register
              </Button>

            </Box>
          </form>

          {/* Success Snackbar */}
          <Dialog open={showDialog} onClose={handleDialogClose}>
            <DialogTitle>{dialogSuccess ? "Success" : "Error"}</DialogTitle>
            <DialogContent>
              <Typography>{dialogMessage}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary" autoFocus>
                {dialogSuccess ? "OK" : "Close"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;