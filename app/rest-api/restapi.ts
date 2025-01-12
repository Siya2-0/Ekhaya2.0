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
  //categoryname = validator.escape(categoryname);
  //categorydescription = validator.escape(categorydescription);

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
   // categoryname = validator.escape(categoryname);
    //categorydescription = validator.escape(categorydescription);

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
   
    return Categories;
  };

  export async function addItem(
    item_name: string,
    description: string,
    category: string,
    price: number,
    stock_quantity: number,
    reorder_level: number,
    last_restock_date: Date,
    Image_url: string,
    barcode: string
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

   // item_name = validator.escape(item_name);
    //description = validator.escape(description);
    //category = validator.escape(category);
  

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
        Image_url,
        barcode
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
    id:number,
    barcode:string,
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
        Image_url,
        barcode
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
  
    return items;
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
      }).select();
  
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
  
    query = query.order('transaction_date_time', { ascending: false });
    const { data: Transactions, error } = await query;
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return Transactions;
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
    const { data: Inventory, error } = await supabase.rpc('fetch_low_stock', { check_zero_stock: checkZeroStock });
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return Inventory;
  };

  export async function fetchTransactionHistory(transactionId?: number) {
    const supabase = await createClient();
    let query = supabase.from('Transaction_history').select('*');
  
    if (transactionId) {
      query = query.eq('transaction_id', transactionId);
    }
    query = query.order('changed_at', { ascending: false });
  
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

  type OrderItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
  };
  
  type Change = {
    id: number;
    quantityChange: number;
  };
  
  type Result = {
    addition: Change[];
    refunds: Change[];
  };

  function compareOrders(order1: OrderItem[], order2: OrderItem[]): Result {
    const addition: Change[] = [];
    const refunds: Change[] = [];
  
    const order1Map = new Map<number, OrderItem>();
    const order2Map = new Map<number, OrderItem>();
  
    // Populate maps for quick lookup
    order1.forEach(item => order1Map.set(item.id, item));
    order2.forEach(item => order2Map.set(item.id, item));
  
    // Check for additions and quantity increases
    order2.forEach(item2 => {
      const item1 = order1Map.get(item2.id);
      if (item1) {
        const quantityChange = item2.quantity - item1.quantity;
        if (quantityChange > 0) {
          addition.push({ id: item2.id, quantityChange });
        } else if (quantityChange < 0) {
          refunds.push({ id: item2.id, quantityChange: -quantityChange });
        }
      } else {
        addition.push({ id: item2.id, quantityChange: item2.quantity });
      }
    });
  
    // Check for refunds (items in order1 but not in order2)
    order1.forEach(item1 => {
      if (!order2Map.has(item1.id)) {
        refunds.push({ id: item1.id, quantityChange: item1.quantity });
      }
    });
  
    return { addition, refunds };
  }
  
  
  export async function UpdateInventory(transaction_id: number) {
    const supabase = await createClient();
    const { data, error, count } = await supabase
    .from("Transaction_history")
    .select("transaction_id, transaction_data, changed_at", { count: "exact" })
    .eq("transaction_id", transaction_id)
    .order("changed_at", { ascending: false }); // Sort by changed_at in descending order

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
    if (count === 1) {
      const transactionData = data[0].transaction_data;
      const parsedData = JSON.parse(transactionData);
      const orderItems = JSON.parse(parsedData.items).orderItems;

      const items = orderItems.map((item: { id: number; quantity: number }) => ({
        id: item.id,
        quantity: item.quantity,
      }));
     
      for (const item of items) {

        const { data, error } = await supabase.rpc('decrement_stock', { item_id:item.id,quantity: item.quantity })
        // const { error: updateError } = await supabase
        //   .from("Inventory")
        //   .update({ stock_quantity: supabase.rpc('decrement_stock', { quantity: item.quantity }) })
        //   .eq("id", item.id);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { "Content-Type": "application/json" }, status: 400 }
          );
        }
      }
    } else if (count !== null && count > 1) {
      const transactionData = data[0].transaction_data;
      const parsedData = JSON.parse(transactionData);
      const orderItems2 = JSON.parse(parsedData.items).orderItems;
      const transactionData2 = data[1].transaction_data;
      const parsedData2 = JSON.parse(transactionData2);
      const orderItems1 = JSON.parse(parsedData2.items).orderItems;

      const result = compareOrders(orderItems1, orderItems2);

      // Update the Inventory table for each item in the result
      for (const item of result.addition) {
        const { data, error } = await supabase.rpc('decrement_stock', { item_id:item.id ,quantity: item.quantityChange })
        // const { error: updateError } = await supabase
        //   .from("Inventory")
        //   .update({ stock_quantity: supabase.rpc('increment_stock', { quantity: item.quantityChange }) })
        //   .eq("id", item.id);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { "Content-Type": "application/json" }, status: 400 }
          );
        }
      }

      for (const item of result.refunds) {
        const { data, error } = await supabase.rpc('increment_stock', { item_id:item.id,quantity: item.quantityChange })
        // const { error: updateError } = await supabase
        //   .from("Inventory")
        //   .update({ stock_quantity: supabase.rpc('decrement_stock', { quantity: item.quantityChange }) })
        //   .eq("id", item.id);

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { "Content-Type": "application/json" }, status: 400 }
          );
        }
      }

      
    } else {
      return new Response(
        JSON.stringify({ error: "Transaction not found or unexpected issue occurred." }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    
    }

    
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  };

  export async function FetchDailyTotals(count: number) {
    const supabase = await createClient();
    const { data: totals, error } = await supabase
      .from('Daily_totals')
      .select()
      .order('date', { ascending: false }) // Sort by date column from recent to oldest
      .limit(count); // Limit the number of rows returned
  
    if (error) {
      return new Response(JSON.stringify({ error }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }
  
    return totals;
  }
  
  
  export async function FetchTotalPaid(date: string)
  {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_paid_transactions_sum', { transaction_date: date })
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
  
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  
  }
  export async function FetchTotalUnPaid(date: string)
  {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('get_unpaid_transactions_sum', { transaction_date: date })
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
  
    return new Response(JSON.stringify({ data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  
  
  }

  export async function count_transactions_by_date(date: string)
{
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('count_transactions_by_date', { transaction_date: date })
  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }

  return data;
}

export async function resendConfirmEmail(email:string)
 {
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: 'http://localhost:3000/welcome'
    }
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  return new Response(JSON.stringify({message:"sent"  }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });


  

 }


 export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut()
  if (error) {
    const { error } = await supabase.auth.signOut()
    return new Response(JSON.stringify({ error }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
}
