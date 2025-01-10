import AuthButton from '@/components/header-auth';
import InventoryManagement from '@/components/inventory-management';
import React from 'react';
import { fetchItems } from "@/app/rest-api/restapi";
import { fetchCategory } from "@/app/rest-api/restapi";

const InventoryPage = async () => {
  const categories = await fetchCategory();
  const items = await fetchItems();

  return (
    <div>
      <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Inventory Management</p>
        <AuthButton />
        <InventoryManagement categoriesData={categories} itemsData={items} />
      </main>
    </div>
  );
};

export default InventoryPage;
