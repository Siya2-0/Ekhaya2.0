import AuthButton from '@/components/header-auth';
import InventoryManagement from '@/components/inventory-management';
import React from 'react';

const fetchData = async (url: any, body = {}) => {
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

const InventoryPage = async () => {
  const [categoriesResponse, itemsResponse] = await Promise.all([
    fetchData("http://localhost:3000/api/category/fetch"),
    fetchData("http://localhost:3000/api/item/fetch"),
  ]);

  const categories = categoriesResponse?.Categories || [];
  const items = itemsResponse?.items || [];

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
