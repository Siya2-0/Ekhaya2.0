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
        {/* <EmployeeTable/> */}
    </main>
  );
}


{/* <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
          <div className="flex flex-col gap-2 items-start">
            <h2 className="font-bold text-2xl mb-4">Your user details</h2>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div> */}