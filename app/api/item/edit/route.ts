import { editItem } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { item_name, description, category, price, stock_quantity, reorder_level, last_restock_date, Image_url, id } = await req.json();
  try {
    console.log({ item_name, description, category, price, stock_quantity, reorder_level, last_restock_date, Image_url, id });
    const response = await editItem(item_name, description, category, price, stock_quantity, reorder_level, last_restock_date, Image_url, id);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}