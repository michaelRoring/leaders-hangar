import { NextResponse } from "next/server";
import Signup from "@/lib/auth/signup";

interface AuthUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export async function POST(request: Request) {
  try {
    const { email, password, first_name, last_name } =
      (await request.json()) as AuthUser;
    const { data, error } = await Signup(
      email,
      password,
      first_name,
      last_name
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      user: { id: data?.user?.id },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
