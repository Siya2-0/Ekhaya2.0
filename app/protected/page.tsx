import { signOutAction } from "@/app/actions";
import Sidebar from "@/components/sidebar";
import EmployeeTable from "@/components/table";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/header-auth";
import { addItem } from "../rest-api/restapi";

export default async function ProtectedPage() {
  const temp = await addItem("Heineken lite", "string description", "WINE", 20, 1, 2, new Date("2023-10-05"), "https://firebasestorage.googleapis.com/v0/b/glammedup-boutique.appspot.com/o/liquor%2Fheineken.png?alt=media&token=8e9e171f-da87-4066-971e-46e6d217c3c6");
  console.log(temp);
  return (
    <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
      <p className="text-[#303030] font-bold text-[32px] ml-8">Home Page</p>
        <AuthButton />
    </main>
  );
}