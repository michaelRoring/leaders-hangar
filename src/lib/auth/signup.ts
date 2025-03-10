import { createClient } from "../supabase/server";
import { AuthResponse, AuthError } from "@supabase/supabase-js";

interface SignupResponse {
  data: AuthResponse["data"] | null;
  error: AuthError | null;
}

export default async function Signup(
  email: string,
  password: string,
  first_name: string,
  last_name: string
): Promise<SignupResponse> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error during signup:", error);

    if (error instanceof AuthError) {
      return { data: null, error };
    }

    const authError = new AuthError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );

    return { data: null, error: authError };
  }
}
