"use server"

import { createClient } from "@/utils/supabase/server";
import  validator  from 'validator';

import {v4 as uuidv4} from 'uuid';

export async function addCategory(categoryname: string, categorydescription: string ) {

  if (!validator.isLength(categoryname, { min: 1, max: 50 })) {
    return new Response(JSON.stringify({ error: 'Invalid category name ' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (!validator.isLength(categorydescription, { min: 1, max: 255 })) {
    return new Response(JSON.stringify({ error: 'Invalid category description' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
  categoryname = validator.escape(categoryname);
  categorydescription = validator.escape(categorydescription);

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

    if (!validator.isLength(categoryname, { min: 1, max: 50 })) {
      return new Response(JSON.stringify({ error: 'Invalid category name ' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (!validator.isLength(categorydescription, { min: 1, max: 255 })) {
      return new Response(JSON.stringify({ error: 'Invalid category description' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    if (!Number.isInteger(id) || id <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid category ID' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    categoryname = validator.escape(categoryname);
    categorydescription = validator.escape(categorydescription);

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

    if (!Number.isInteger(id) || id <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid category ID' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

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
    last_restock_date: Date,
    Image_url: string
  ) {
    if (!validator.isLength(item_name, { min: 1, max: 255 })) {
      return new Response(JSON.stringify({ error: 'Invalid item name length' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (!validator.isLength(description, { min: 0, max: 500 })) {
      return new Response(JSON.stringify({ error: 'Invalid description length' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (!validator.isLength(category, { min: 1, max: 50 })) {
      return new Response(JSON.stringify({ error: 'Invalid category length' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (price < 0) {
      return new Response(JSON.stringify({ error: 'Invalid price' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (stock_quantity < 0) {
      return new Response(JSON.stringify({ error: 'Invalid stock quantity' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    if (reorder_level < 0) {
      return new Response(JSON.stringify({ error: 'Invalid reorder level' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    item_name = validator.escape(item_name);
    description = validator.escape(description);
    category = validator.escape(category);
  

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
        last_restock_date: last_restock_date.toISOString(), // Convert Date to ISO string
        Image_url
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
    Image_url:string,
    id:number
  ) {

    if (!Number.isInteger(id) || id <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid category ID' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    // Validate and sanitize input
  if (!validator.isLength(item_name, { min: 1, max: 255 })) {
    return new Response(JSON.stringify({ error: 'Invalid item name length' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (!validator.isLength(description, { min: 0, max: 500 })) {
    return new Response(JSON.stringify({ error: 'Invalid description length' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (!validator.isLength(category, { min: 1, max: 50 })) {
    return new Response(JSON.stringify({ error: 'Invalid category length' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (price < 0) {
    return new Response(JSON.stringify({ error: 'Invalid price' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (stock_quantity < 0) {
    return new Response(JSON.stringify({ error: 'Invalid stock quantity' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (reorder_level < 0) {
    return new Response(JSON.stringify({ error: 'Invalid reorder level' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
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
        last_restock_date: last_restock_date.toISOString(), // Convert Date to ISO string
        Image_url
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
  };


  export async function fetchLowStock(checkZeroStock: boolean = false) {
    const supabase = await createClient();
    let query = supabase.from('Inventory').select('*');
  
    if (checkZeroStock) {
      query = query.eq('stock_quantity', 0);
    } else {
      query = query.lte('stock_quantity', 'reorder_level');
    }
  
    const { data: Inventory, error } = await query;
  
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

  // Upload file using standard upload
  export async function uploadFile(file: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from('Ekhaya_Bucket').upload('image/'+uuidv4()+'.jpg', file);
    if (error) {
      console.error('Error uploading file:', error.message);
    } else {
      console.log('File uploaded successfully:', data);
    }
  }