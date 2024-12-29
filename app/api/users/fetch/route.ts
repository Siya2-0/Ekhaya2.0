import { fetchUsers } from "@/app/rest-api/api-users";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { } = await req.json();
  try {
    const response = await fetchUsers();
    console.log(response);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}