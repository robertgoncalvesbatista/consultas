"use client";

import { format } from "date-fns";
import { Session } from "next-auth";
import { useActionState, useState } from "react";

import PaymentWall from "@/components/payment-wall";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cadastroPessoaFisicaAction } from "./(actions)/cadastroPessoaFisicaAction";

export default function CadastroPessoaFisica({
  session,
}: {
  session: Session;
}) {
  const [search, setSearch] = useState("");

  const [state, formAction, isPending] = useActionState(
    cadastroPessoaFisicaAction,
    null
  );

  return (
    <div className="px-4">
      <Card className="w-full shadow-md rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Consulta de Pessoa Física
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Consulte os dados de uma pessoa física
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  className="max-w-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <PaymentWall session={session} />
            </div>
          </div>

          {state && (
            <div className="mt-6 space-y-6">
              {/* Dados principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Nome", value: state.nome || "-" },
                  { label: "CPF", value: state.cpf },
                  { label: "Sexo", value: state.sexo || "-" },
                  {
                    label: "Data de Nascimento",
                    value: format(state.dataNascimento, "dd/MM/yyyy"),
                  },
                  { label: "Nome da Mãe", value: state.nomeMae || "-" },
                  { label: "Idade", value: state.idade || "-" },
                  { label: "Signo", value: state.signo || "-" },
                  {
                    label: "Renda Estimada",
                    value: `R$ ${
                      (state.rendaEstimada as unknown as number) || "-"
                    }`,
                  },
                  {
                    label: "Faixa Salarial",
                    value: state.rendaFaixaSalarial || "-",
                  },
                ].map(({ label, value }, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      {label}
                    </h4>
                    <p className="text-base text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              {/* Telefones, Endereços, Emails */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Telefones */}
                {(state.telefones as Array<any>)?.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Telefones</h3>
                    <div className="space-y-2 text-sm">
                      {(state.telefones as Array<any>).map(
                        (telefone, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            <span>{telefone.telefoneComDDD}</span>
                            <span className="text-muted-foreground">
                              ({telefone.operadora})
                            </span>
                            {telefone.whatsApp && (
                              <span className="text-green-600 font-medium ml-auto">
                                WhatsApp
                              </span>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Endereços */}
                {(state.enderecos as Array<any>)?.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Endereço</h3>
                    <div className="space-y-3 text-sm">
                      {(state.enderecos as Array<any>).map(
                        (endereco, index) => (
                          <div key={index} className="space-y-1">
                            <p>
                              {endereco.logradouro}, {endereco.numero}
                            </p>
                            <p className="text-muted-foreground">
                              {endereco.complemento}
                            </p>
                            <p className="text-muted-foreground">
                              {endereco.bairro}, {endereco.cidade} -{" "}
                              {endereco.uf}
                            </p>
                            <p className="text-muted-foreground">
                              CEP: {endereco.cep}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Emails */}
                {(state.emails as Array<any>)?.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Emails</h3>
                    <div className="space-y-1 text-sm">
                      {(state.emails as Array<any>).map((email, index) => (
                        <p key={index} className="text-foreground">
                          {email.enderecoEmail}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
