import { redirect } from "next/navigation";

import { auth } from "@/auth";

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
import { Skeleton } from "@/components/ui/skeleton";

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
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Acordo de Leniência</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">
          Consulta de Acordo de Leniência
        </h1>

        {data.length > 0 && (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {data.map((acordo, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">Número do Registro</h3>
                      <p className="text-gray-600">{acordo.numeroRegistro}</p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">
                        Data Início do Acordo
                      </h3>
                      <p className="text-gray-600">
                        {formatDate(acordo.detalhamentoAcordo.dataInicioAcordo)}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">Data Fim do Acordo</h3>
                      <p className="text-gray-600">
                        {formatDate(acordo.detalhamentoAcordo.dataFimAcordo)}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">Órgão Responsável</h3>
                      <p className="text-gray-600">
                        {acordo.detalhamentoAcordo.orgaoResponsavel || "-"}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">Situação do Acordo</h3>
                      <p className="text-gray-600">
                        {acordo.detalhamentoAcordo.situacaoAcordo || "-"}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <h3 className="font-semibold mb-1">
                        Quantidade de Sanções
                      </h3>
                      <p className="text-gray-600">{acordo.quantidade}</p>
                    </div>
                  </div>

                  {acordo.sancoes?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Sanções</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {acordo.sancoes.map((sancao, sancaoIndex) => (
                          <div key={sancaoIndex} className="border rounded p-3">
                            <p className="font-semibold mb-1">
                              CNPJ: {formatCnpj(sancao.cnpj)}
                            </p>
                            <p className="text-sm">
                              Razão Social: {sancao.razaoSocial}
                            </p>
                            <p className="text-sm">
                              Nome Fantasia: {sancao.nomeFantasia}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarInset>
  );
}

export default Page;
