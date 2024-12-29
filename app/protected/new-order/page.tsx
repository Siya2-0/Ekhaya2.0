import AuthButton from '@/components/header-auth';
import NewOrderManagement from '@/components/new-order';
import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { fetchItems } from "@/app/rest-api/restapi";
import { fetchCategory } from "@/app/rest-api/restapi";


const NewOrder = async () => {
  const categories = await fetchCategory();
  const items = await fetchItems();
  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <main className="relative flex min-h-screen flex-col bg-[#F2F2F2]">
        <NewOrderManagement categoriesData={categories} itemsData={items} username={user?.email} />
      </main>
    </div>
  );
};

export default NewOrder;
