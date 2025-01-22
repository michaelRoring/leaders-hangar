import { supabase } from "@/lib/supabase/client";
import { AuthResponse, AuthError } from "@supabase/supabase-js";
import { UserRegister } from "@/types/userRegister";

interface SignupResponse {
  data: AuthResponse["data"] | null;
  error: AuthError | null;
}

export default async function Register(
  userData: UserRegister
): Promise<SignupResponse> {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();

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
