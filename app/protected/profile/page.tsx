import EmployeeProfile from '@/components/employee-profile'
import React from 'react'
import { createClient } from "@/utils/supabase/server";

const Profile = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className='w-full h-screen'>
      <EmployeeProfile users={user}/>
    </main>
  )
}

export default Profile