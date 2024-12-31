import { updateMetadata } from "@/app/rest-api/restapi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { first_name,
    last_name,
    phone_number,
    role,
    image_url,
    LOA,
    status, } = await req.json();
  try {
    const response = await updateMetadata(
        first_name,
        last_name,
        phone_number,
        role,
        image_url,
        LOA,
        status,);
        console.log(response);
    return NextResponse.json(await response.json(), { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}