import { Copy, QrCode } from "lucide-react";

import { Saldo } from "@/components/saldo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function BillingPage() {
  const chavePix = "contato@seudominio.com";

  return (
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

      {/* CONTEÚDO */}
      <div className="flex flex-1 flex-col gap-6 p-6 pt-4 mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Pagamento via Pix
          </h1>
          <p className="text-muted-foreground text-sm">
            Finalize seu pagamento de forma rápida e segura utilizando Pix.
          </p>
        </div>

        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Chave Pix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
              <span className="text-sm font-medium">{chavePix}</span>
              <Button asChild size="sm" variant="ghost" className="ml-2">
                <a href={chavePix}>
                  <Copy className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="rounded-lg border p-4 bg-white">
                {/* Aqui você pode renderizar um QR Code real com alguma lib */}
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>
              <Button className="w-full">Já realizei o pagamento</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
