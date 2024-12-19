import React, { useState } from "react";
import { FiEdit, FiTrash2, FiFilter, FiSearch } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";

const EmployeeTable = () => {
  const initialEmployees = [
    {
      id: 1,
      name: "John",
      surname: "Doe",
      role: "Waiter",
      email: "john.doe@example.com",
      cellphone: "+1-555-0123",
      createdAt: "2023-01-15",
      status: "Active",
      authority: "Senior"
    },
    {
      id: 2,
      name: "Jane",
      surname: "Smith",
      role: "Bartender",
      email: "jane.smith@example.com",
      cellphone: "+1-555-0124",
      createdAt: "2023-02-20",
      status: "Active",
      authority: "Mid"
    },
    {
      id: 3,
      name: "Robert",
      surname: "Johnson",
      role: "Manager",
      email: "robert.j@example.com",
      cellphone: "+1-555-0125",
      createdAt: "2023-03-10",
      status: "Inactive",
      authority: "Lead"
    }
  ];

  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [editEmployee, setEditEmployee] = useState<any>({});
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const handleUpdate = (updatedEmployee: any) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setShowModal(false);
    setEditEmployee(null);
  };

  const filteredEmployees = employees
    .filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((employee) =>
      filterRole ? employee.role === filterRole : true
    )
    .filter((employee) =>
      filterStatus ? employee.status === filterStatus : true
    );

  return (
    <div className="p-6 bg-[F2F2F2] min-h-screen text-[#303030]">
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative bg-[#f2f2f2]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleFilterRole}
            >
              <option value="">Filter by Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent"
              onChange={handleFilterStatus}
            >
              <option value="">Filter by Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
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
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{employee.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.surname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.cellphone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.authority}</td>
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

      {showModal && editEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Employee</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editEmployee);
                }}
              >
                <div className="space-y-4">
                  {Object.keys(editEmployee).map((key) => (
                    key !== "id" && (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={editEmployee[key]}
                          onChange={(e) =>
                            setEditEmployee({
                              ...editEmployee,
                              [key]: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )
                  ))}
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
