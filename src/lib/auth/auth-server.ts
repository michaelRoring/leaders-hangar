import { UserInformation } from "@/types/user";
import { createClient as createServerClient } from "../supabase/server";

export const getUserServer = async (): Promise<UserInformation | null> => {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: users, error: errorUsers } = await supabase
    .from("users")
    .select("avatar")
    .eq("uid", user.id);

  if (errorUsers) {
    console.error("Error fetching user data from 'users' table:", errorUsers);
    return null;
  }

  if (!users || users.length === 0) {
    console.error("User not found in 'users' table");
    return null;
  }

  return {
    uid: user.id,
    name: user.user_metadata.first_name + " " + user.user_metadata.last_name,
    email: user.email!,
    avatar: users[0].avatar,
  };
};
