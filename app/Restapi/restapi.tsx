"use server"

import { createClient } from "@/utils/supabase/server";



export async function addCategory(categoryname: string, categorydescription: string ) {
    const supabase = await createClient();
    const { data: Categories, error } = await supabase.from('Categories').insert({category_name:categoryname, category_description:categorydescription})
    if (error){
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      })

    }
  
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