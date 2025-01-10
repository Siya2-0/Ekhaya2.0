import { addTransaction } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customer_name,
    employee_username,
    items,
    total_price,
    payment_method,
    status,
    notes } = await req.json();
  try {
    
    const response = await addTransaction(customer_name,
        employee_username,
        items,
        total_price,
        payment_method,
        status,
        notes);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}