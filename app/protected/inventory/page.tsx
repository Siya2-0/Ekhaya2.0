import AuthButton from '@/components/header-auth';
import InventoryManagement from '@/components/inventory-management';
import React from 'react';

const InventoryPage = async () => {
  const response = await fetch("http://localhost:3000/api/category/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: 'no-store', // To avoid caching and always fetch fresh data
  });

  let categories = [];
  if (response.ok) {
    categories = await response.json();
    // console.log(categories.Categories);
  } else {
    console.error("Failed to fetch categories:", await response.text());
  }

  const itemResponse = await fetch("http://localhost:3000/api/item/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: 'no-store', // To avoid caching and always fetch fresh data
  });

  let items = [];
  if (itemResponse.ok) {
    items = await itemResponse.json();
    // console.log(items.items);
  } else {
    console.error("Failed to fetch items:", await itemResponse.text());
  }

  return (
    <div>
      <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
        <p className="text-[#303030] font-bold text-[32px] ml-8">Inventory Management</p>
        <AuthButton />
        <InventoryManagement categoriesData={categories.Categories} itemsData={items.items} />
      </main>
    </div>
  );
};

export default InventoryPage;
