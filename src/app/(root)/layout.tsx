import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/shadcn/sidebar";
import { AppSidebar } from "@/components/ui/molecules/app-sidebar";
import { AuthProvider } from "@/app/(root)/providers";
import { getUserServer } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = await getUserServer();
  // console.log("initialUser :", initialUser);

  if (!initialUser) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <AuthProvider initialUser={initialUser}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <div className="m-8">{children}</div>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
