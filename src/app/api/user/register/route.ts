import { NextResponse } from "next/server";
import { UserRegister } from "@/types/userRegister";
import Register from "@/lib/user/register";

export async function POST(request: Request) {
  try {
    const {
      uid,
      email_address,
      first_name,
      last_name,
      company_name,
      industry,
      headcount,
      job_title,
    } = (await request.json()) as UserRegister;

    const { data, error } = await Register({
      uid,
      email_address,
      first_name,
      last_name,
      company_name,
      industry,
      headcount,
      job_title,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "register user success" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
