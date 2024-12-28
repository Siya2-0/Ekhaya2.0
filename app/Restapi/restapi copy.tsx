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

  const { data, error } = await adminAuthClient.deleteUser(
    uuid
  )
  
 
  if (error){
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })

  }
  
  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
};

export  const fetchUsers = async () => {
  const { data: { users }, error } = await adminAuthClient.listUsers()
  if (error){
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })

  }

  return new Response(JSON.stringify({ users }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })


}

  
  
  // Upload file using standard upload
  // export async function uploadFile(file: any, filePath:string) {
  //   const supabase = await createClient();
  //   const { data, error } = await supabase.storage.from('Ekhaya_Bucket').upload(filePath, file);
  //   if (error) {
  //     console.error('Error uploading file:', error.message);
  //   } else {
  //     console.log('File uploaded successfully:', data);
  //   }
  // }



