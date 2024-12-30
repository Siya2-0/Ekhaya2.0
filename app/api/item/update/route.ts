import { UpdateInventory } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  try {
    const response = await UpdateInventory(id);
    console.log(response);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}