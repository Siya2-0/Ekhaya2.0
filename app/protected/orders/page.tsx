import AuthButton from '@/components/header-auth';
import OrderDashboard from '@/components/orders';
import React from 'react';
import { createClient } from "@/utils/supabase/server";

const fetchData = async (path: string, body = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: 'no-store', // Always fetch fresh data
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to fetch from ${url}:`, await response.text());
      return null;
    }
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
};

const Orders = async () => {
  const [transactionResponse] = await Promise.all([
    fetchData(`/api/transaction/fetch`),
    // fetchData(`/api/item/fetch`),
  ]);

  const transactions = transactionResponse?.Transactions || [];
  console.log(transactions);
  // const items = itemsResponse?.items || [];

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className='className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12'>
      <p className="text-[#303030] font-bold text-[32px] ml-8">Orders Dashboard</p>
      <AuthButton/>
      <OrderDashboard transactions={transactions}/>
    </main>
  );
};

export default Orders;
