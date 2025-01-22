// src/app/dashboard/page.tsx (Server Component)
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./ClientDashboard";
import { TypographyH1 } from "@/components/TypographyH1";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <TypographyH1>This is grand stand page</TypographyH1>
      <h1>Hello, {data.user?.email}</h1>
      <h1>Hello, {data.user?.user_metadata?.first_name}</h1>

      <LogoutButton />
    </>
  );
}
