"use server"

//import { createClient } from "@/utils/supabase/server";
import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const service_role_key = process.env.SERVICE_ROLE_KEY  as string;


const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Access auth admin api
const adminAuthClient = supabase.auth.admin



export const deleteUser = async (uuid: string) => {
  const { data, error } = await adminAuthClient.deleteUser(uuid);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

export const fetchUsers = async () => {
  const { data: { users }, error } = await adminAuthClient.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  return users.map((user) => ({
    ...user,
    created_at: new Date(user.created_at).toLocaleString(),
  }));
};

export async function UpdaterUser(LOA:string, uuid:string)
{
  const { data: user, error } = await adminAuthClient.updateUserById(
    uuid,
    { user_metadata: { LOA: LOA } });

    if (error){
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      })
  
    }
    
    return new Response(JSON.stringify({ user }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })


};
