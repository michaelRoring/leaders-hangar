// import { NextResponse } from "next/server";
// // import loginUser from "@/lib/auth/login";

// interface UserLogin {
//   email: string;
//   password: string;
// }

// export async function POST(request: Request) {
//   try {
//     const { email, password } = (await request.json()) as UserLogin;
//     const { data, error } = await loginUser(email, password);

//     if (error) {
//       return NextResponse.json({ error: error.message, status: 400 });
//     }

//     const access_token = data?.session?.access_token;
//     const refresh_token = data?.session?.refresh_token;

//     const response = NextResponse.json({
//       message: "Login successful",
//       user: data?.user,
//       status: 200,
//     });

//     response.headers.set(
//       "Set-Cookie",
//       `access_token=${access_token}; HttpOnly; Path=/; Secure; SameSite=Lax`
//     );

//     response.headers.append(
//       "Set-Cookie",
//       `refresh_token=${refresh_token}; HttpOnly; Path=/; Secure; SameSite=Lax`
//     );

//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// }
