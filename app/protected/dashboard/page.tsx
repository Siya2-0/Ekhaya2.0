import AuthButton from '@/components/header-auth'
import EmployeeTable from '@/components/table'
import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import base64 from '../../assets/base64.jpeg'
import POSDashboard from '@/components/dashboard-management'
const Dashboard = () => {
  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Dashboard</p>
            <AuthButton />
            <POSDashboard/>            
        </main>
    </div>
  )
}

export default Dashboard