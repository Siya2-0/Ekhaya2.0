import React from 'react';
import AuthButton from '@/components/header-auth';
import EmployeeTable from '@/components/table';
import { fetchUsers } from '@/app/rest-api/api-users';

const Staff = async () => {
  try {
    const users: any = await fetchUsers(); // Fetch users on the server
    return (
      <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
          <p className="text-[#303030] font-bold text-[32px] ml-8">Employee Management</p>
          <AuthButton />
          {/* <EmployeeTable /> */}
          <EmployeeTable users={users} /> Pass users to EmployeeTable
        </main>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p>Error loading users: {(error as Error).message}</p>
      </div>
    );
  }
};

export default Staff;
