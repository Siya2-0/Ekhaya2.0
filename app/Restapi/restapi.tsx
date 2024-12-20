"use server"

import { createClient, SupabaseClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_API_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;


export async function addCategory(categoryname: string, categorydescription: string ) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: Categories, error } = await supabase.from('Categories').insert({category_name:categoryname, category_description:categorydescription})
    if (error) throw error
  
    return new Response(JSON.stringify({ Categories }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  }

  export const editCategory = async () => {
    // const supabase = await createClient();
    // await supabase.auth.signOut();
    return console.log('Edit Category');
  };