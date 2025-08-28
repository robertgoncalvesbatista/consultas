import { auth } from "@/auth";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = Readonly<{ children: React.ReactNode }>;

async function PagesLayout({ children }: Props) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />
      {children}
    </SidebarProvider>
  );
}

export default PagesLayout;
