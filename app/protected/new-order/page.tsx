import AuthButton from '@/components/header-auth';
import NewOrderManagement from '@/components/new-order';
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

const NewOrder = async () => {
  const [categoriesResponse, itemsResponse] = await Promise.all([
    fetchData(`/api/category/fetch`),
    fetchData(`/api/item/fetch`),
  ]);

  const categories = categoriesResponse?.Categories || [];
  const items = itemsResponse?.items || [];

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
