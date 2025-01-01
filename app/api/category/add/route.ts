import { addCategory } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { categoryname, categorydescription } = await req.json();
  try {
    const response = await addCategory(categoryname, categorydescription);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}