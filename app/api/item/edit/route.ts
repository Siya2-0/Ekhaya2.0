import { editItem } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, item_name, description, category, price, stock_quantity, reorder_level, last_restock_date: last_restock_date_str,
    Image_url } = await req.json();
  let last_restock_date = last_restock_date_str;
  try {
    if (typeof last_restock_date === 'string') {
      last_restock_date = new Date(last_restock_date);
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }
  try {
    const response = await editItem(item_name, description, category, price, stock_quantity, reorder_level, last_restock_date, Image_url, id);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}