import AuthButton from '@/components/header-auth'
import OrderDashboard from '@/components/orders'
import React from 'react'

const Orders = () => {
  return (
    <main className='className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12'>
      <p className="text-[#303030] font-bold text-[32px] ml-8">Orders Dashboard</p>
      <AuthButton/>
        <OrderDashboard/>
    </main>
  )
}

export default Orders