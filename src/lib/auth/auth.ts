import { UserInformation } from "@/types/user"; // Use the correct type
import { createClient as createBrowserClient } from "../supabase/client";

export const getUserClient = async (): Promise<UserInformation | null> => {
  const supabase = await createBrowserClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Client-side error fetching user:", error);
    return null;
  }

  if (!data.user) {
    return null;
  }

  const { data: users, error: errorUsers } = await supabase
    .from("users")
    .select("avatar")
    .eq("uid", data.user.id);

  if (errorUsers) {
    console.error("Client-side error fetching from 'users':", errorUsers);
    return null;
  }

  if (!users || users.length === 0) {
    console.error("User not found in 'users' table client side");
    return null;
  }

  return {
    uid: data.user.id,
    name:
      data.user.user_metadata.first_name +
      " " +
      data.user.user_metadata.last_name,
    email: data.user.email!,
    avatar: users[0].avatar,
    first_name: data.user.user_metadata.first_name,
  };
};
