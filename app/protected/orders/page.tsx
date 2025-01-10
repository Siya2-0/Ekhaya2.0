import AuthButton from '@/components/header-auth';
import OrderDashboard from '@/components/orders';
import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { fetchItems } from "@/app/rest-api/restapi";
import { fetchCategory } from "@/app/rest-api/restapi";
import { fetchTransaction } from "@/app/rest-api/restapi";

const Orders = async () => {

  const response = await fetchTransaction();
  let transactions = [];
  if (response instanceof Response) {
    const jsonString = await response.json(); // The JSON string
    transactions = jsonString; // Parse the JSON string into an object
  } else {
    transactions = response; // If it's already an array
  }

  const categories = await fetchCategory();
  const items = await fetchItems();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className='className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12'>
      <p className="text-[#303030] font-bold text-[32px] ml-8">Orders Dashboard</p>
      <AuthButton/>
      <OrderDashboard transactions={transactions} categoriesData={categories} itemsData={items} username={user?.email}/>
    </main>
  );
};

export default Orders;
