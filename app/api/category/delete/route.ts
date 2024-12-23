import { deleteCategory } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  try {
    const response = await deleteCategory(id);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}