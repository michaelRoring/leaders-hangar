// import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/client";

export async function refreshAccessToken(refreshToken: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }

    return data.session;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
