import { signOutAction } from "@/app/actions";
import Sidebar from "@/components/sidebar";
import EmployeeTable from "@/components/table";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/header-auth";

export default function ProtectedPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#F2F2F2] pt-12">
      <p className="text-[#303030] font-bold text-[32px] ml-8">Home Page</p>
        <AuthButton />
    </main>
  );
}