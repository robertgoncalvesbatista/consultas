import { auth } from "@/auth";

import { AppSidebar } from "@/components/app-sidebar";
import { Balance } from "@/components/balance";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

async function PagesLayout({ children }: Props) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar user={session?.user} />

      <SidebarInset>
        {/* HEADER */}
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/web/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {/* <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Perfil de Usuário</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Balance valor={100} />
        </header>

        {/* CONTEÚDO */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default PagesLayout;
