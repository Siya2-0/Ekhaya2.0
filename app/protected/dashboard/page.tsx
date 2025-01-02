import AuthButton from '@/components/header-auth'
import React from 'react'
import POSDashboard from '@/components/dashboard-management'
import { FetchDailyTotals } from "@/app/rest-api/restapi";
import { count_transactions_by_date } from "@/app/rest-api/restapi";
import { fetchLowStock } from "@/app/rest-api/restapi";
import InactivityPopupServer from '@/components/inactivity-popup-server';

const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Dashboard = async () => {
  const sales = await FetchDailyTotals(7);
  const totalOrders = await count_transactions_by_date(getCurrentDate());
  const lowStock = await fetchLowStock(false);
  const outOfStock = await fetchLowStock(true);
  console.log("low stock: ", lowStock);
  console.log("out of stock: ", outOfStock);
  return (
    <div>
        <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Dashboard</p>
            <AuthButton />
            <POSDashboard data={sales} totalOrders={totalOrders} lowStock={lowStock.data} outOfStock={outOfStock.data} />   
            <InactivityPopupServer/>          
        </main>
    </div>
  )
}

export default Dashboard