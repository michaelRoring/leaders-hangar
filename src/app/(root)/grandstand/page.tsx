import { getUserServer } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";
import LogoutButton from "./ClientDashboard";
import { TypographyH1 } from "@/components/ui/molecules/TypographyH1";

export default async function Dashboard() {
  const user = await getUserServer();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <TypographyH1>Grand Stand</TypographyH1>
      <h1>Hello, {user?.name}</h1>
      <h1>Hello, {user?.email}</h1>
      <h1>Hello, {user?.avatar}</h1>

      <div className="mt-24">
        <LogoutButton />
      </div>
    </>
  );
}
