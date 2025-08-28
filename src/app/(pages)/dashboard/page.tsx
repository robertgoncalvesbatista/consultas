import { redirect } from "next/navigation";

import {
  Building2,
  CreditCard,
  FileText,
  MoreHorizontal,
  ShieldAlert,
  User,
} from "lucide-react";

import { auth } from "@/auth";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Nossos serviços</h1>
          <p className="text-muted-foreground text-sm">
            Consulte informações de forma rápida e segura.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Cadastro Pessoa Física",
              description:
                "Experimente consultar um cadastro de pessoa física.",
              icon: <User className="h-6 w-6 text-primary" />,
            },
            {
              title: "Cadastro Pessoa Jurídica",
              description: "Consulte dados de empresas de forma simplificada.",
              icon: <Building2 className="h-6 w-6 text-primary" />,
            },
            {
              title: "Antecedentes Criminais",
              description: "Verifique histórico de antecedentes em segundos.",
              icon: <ShieldAlert className="h-6 w-6 text-primary" />,
            },
            {
              title: "Acordos de Leniência",
              description: "Pesquise registros relacionados a acordos.",
              icon: <FileText className="h-6 w-6 text-primary" />,
            },
            {
              title: "Contas Bancárias",
              description: "Acesse informações sobre contas vinculadas.",
              icon: <CreditCard className="h-6 w-6 text-primary" />,
            },
            {
              title: "Outros Serviços",
              description: "Explore outros tipos de consultas disponíveis.",
              icon: <MoreHorizontal className="h-6 w-6 text-primary" />,
            },
          ].map((service, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center gap-3">
                {service.icon}
                <CardTitle className="text-base">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarInset>
  );
}

export default Page;
