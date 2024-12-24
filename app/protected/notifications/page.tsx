import AuthButton from '@/components/header-auth'
import EmployeeTable from '@/components/table'
import React from 'react'

const Notifications = () => {
  
  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Notifications Page</p>
            <AuthButton />
        </main>
    </div>
  )
}

export default Notifications