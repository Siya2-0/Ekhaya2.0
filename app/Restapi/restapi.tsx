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

  export const editCategory = async (categoryname: string, categorydescription: string, id: number) => {
    const supabase = await createClient();
    const { data: Categories, error } = await supabase.from('Categories').update({category_name:categoryname, category_description:categorydescription})
    .eq('id', id)
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
  };


  export const deleteCategory = async (id: number) => {
    const supabase = await createClient();
    const { data: Categories, error } = await supabase.from('Categories').delete().eq('id', id)
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
  };

  export const fetchCategory = async () => {
    const supabase = await createClient();
    const { data: Categories, error } = await supabase.from('Categories').select();
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
  };

  export async function addItem(
    item_name: string,
    description: string,
    category: string,
    price: number,
    stock_quantity: number,
    reorder_level: number,
    last_restock_date: Date
  ) {
    const supabase = await createClient();
    const { data: Inventory, error } = await supabase
      .from('Inventory')
      .insert({
        item_name,
        description,
        category,
        price,
        stock_quantity,
        reorder_level,
        last_restock_date: last_restock_date.toISOString() // Convert Date to ISO string
      });
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ Inventory }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export async function editItem(
    item_name: string,
    description: string,
    category: string,
    price: number,
    stock_quantity: number,
    reorder_level: number,
    last_restock_date: Date,
    id:number
  ) {
    const supabase = await createClient();
    const { data: Inventory, error } = await supabase
      .from('Inventory')
      .update({
        item_name,
        description,
        category,
        price,
        stock_quantity,
        reorder_level,
        last_restock_date: last_restock_date.toISOString() // Convert Date to ISO string
      }).eq('id', id);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ Inventory }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export async function fetchItems(category?: string) {
    const supabase = await createClient();
    let query = supabase.from('Inventory').select('*');
  
    if (category) {
      query = query.eq('category', category);
    }
  
    const { data: items, error } = await query;
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ items }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export const deleteItems = async (id: number) => {
    const supabase = await createClient();
    const { data: Inventory, error } = await supabase.from('Inventory').delete().eq('id', id)
    if (error){
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      })

    }
   
    return new Response(JSON.stringify({ Inventory }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  };

  export async function addTransaction(
    customer_name: string,
    employee_username: string,
    items: string,
    total_price: number,
    payment_method: string,
    status: string,
    notes: string
  ) {
    const supabase = await createClient();
    const { data: transaction, error } = await supabase
      .from('Transactions')
      .insert({
        customer_name,
        employee_username,
        items,
        total_price,
        payment_method,
        status,
        notes
      });
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ transaction }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export const deleteTransaction = async (id: number) => {
    const supabase = await createClient();
    const { data: Transactions, error } = await supabase
      .from('Transactions')
      .delete()
      .eq('id', id);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ Transactions }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export async function modifyTransaction(
    id: number,
    customer_name: string,
    employee_username: string,
    items: string,
    total_price: number,
    payment_method: string,
    status: string,
    notes: string
  ) {
    const supabase = await createClient();
    const { data: Transactions, error } = await supabase
      .from('Transactions')
      .update({
        customer_name,
        employee_username,
        items,
        total_price,
        payment_method,
        status,
        notes
      })
      .eq('id', id);
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ Transactions }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export const fetchUsersMini = async () => {
    const supabase = await createClient();
    const { data: Users, error } = await supabase.from('Users').select();
    if (error){
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      })

    }
   
    return new Response(JSON.stringify({ Users }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  };

  export async function fetchTransaction(employee_username?: string) {
    const supabase = await createClient();
    let query = supabase.from('Transactions').select('*');
  
    if (employee_username) {
      query = query.eq('employee_username', employee_username);
    }
  
    const { data: Transactions, error } = await query;
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ Transactions }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export async function updateMetadata(first_name:string, last_name:string, phone_number:string,role:string, image_url:string, LOA:string, status:string )
  {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name,
        last_name,
        phone_number,
        role,
        image_url,
        LOA,
        status,
      }
    })
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  };

  export async function fetchUserData() {
    // Determine if the identifier is a UUID or email

    const supabase = await createClient();
 
    const { data: { user }, error } = await supabase.auth.getUser()


    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return new Response(JSON.stringify({ user }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  }



