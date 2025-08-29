import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Saldo } from "@/components/saldo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { ProfileForm } from "./profile-form";

async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <SidebarInset>
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
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Perfil de Usuário</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Saldo valor={100} />
      </header>

      <ProfileForm session={session} />
    </SidebarInset>
  );
}

export default Page;
