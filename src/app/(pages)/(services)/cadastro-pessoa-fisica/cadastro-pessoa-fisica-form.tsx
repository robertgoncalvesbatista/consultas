"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroPessoaFisicaBasico } from "@prisma/client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";

import CadastroPessoaFisicaBasicoDTO from "@/dtos/cadastro-pessoa-fisica-basico";

import { useCPF } from "@/hooks/use-cpf";

import { cadastroPessoaFisicaAction } from "./cadastro-pessoa-fisica.action";
import {
  cadastroPessoaFisicaValidation,
  CadastroPessoaFisicaValidator,
} from "./cadastro-pessoa-fisica.validation";

export default function CadastroPessoaFisicaForm() {
  const [cadastroPessoaFisica, setCadastroPessoaFisica] =
    useState<CadastroPessoaFisicaBasico>();

  const [isPending, startTransition] = useTransition();
  const { onChangeCPF, formatCPF } = useCPF();

  const form = useForm<CadastroPessoaFisicaValidator>({
    resolver: zodResolver(cadastroPessoaFisicaValidation),
  });

  const onSubmit = async (data: CadastroPessoaFisicaValidator) => {
    startTransition(async () => {
      try {
        const response = await cadastroPessoaFisicaAction({
          cpf: data.cpf ?? "",
        });

        if (!response) {
          throw new Error("Nenhum cadastro encontrado");
        }

        const newData = new CadastroPessoaFisicaBasicoDTO(response);
        setCadastroPessoaFisica(newData.toObject());
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="px-4">
      <Card
        className={`w-full shadow-md rounded-2xl border mx-auto${
          !cadastroPessoaFisica && " gap-0"
        }`}
      >
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            <span>Consulta de Pessoa Física</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground sm:flex sm:gap-2 sm:justify-between">
            <span>Consulte os dados de uma pessoa física</span>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="flex gap-2"
              >
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="000.000.000-00"
                          disabled={isPending}
                          {...field}
                          onChange={(e) => {
                            onChangeCPF(e.target.value, field.onChange);
                          }}
                          maxLength={14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {!isPending && <Search />}
                  {!!isPending && <Loading />}
                </Button>
              </form>
            </FormProvider>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {cadastroPessoaFisica && (
            <div className="mt-6 space-y-6">
              {/* Dados principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Nome", value: cadastroPessoaFisica.nome || "-" },
                  { label: "CPF", value: formatCPF(cadastroPessoaFisica.cpf) },
                  { label: "Sexo", value: cadastroPessoaFisica.sexo || "-" },
                  {
                    label: "Data de Nascimento",
                    value: cadastroPessoaFisica.dataNascimento.split(" ")[0],
                  },
                  {
                    label: "Nome da Mãe",
                    value: cadastroPessoaFisica.nomeMae || "-",
                  },
                  { label: "Idade", value: cadastroPessoaFisica.idade || "-" },
                  { label: "Signo", value: cadastroPessoaFisica.signo || "-" },
                  {
                    label: "Renda Estimada",
                    value: `R$ ${cadastroPessoaFisica.rendaEstimada || "-"}`,
                  },
                  {
                    label: "Faixa Salarial",
                    value: cadastroPessoaFisica.rendaFaixaSalarial || "-",
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
                {cadastroPessoaFisica.telefones.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Telefones</h3>
                    <div className="space-y-2 text-sm">
                      {cadastroPessoaFisica.telefones.map((telefone, index) => (
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
                      ))}
                    </div>
                  </div>
                )}

                {/* Endereços */}
                {cadastroPessoaFisica.enderecos?.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Endereço</h3>
                    <div className="space-y-3 text-sm">
                      {cadastroPessoaFisica.enderecos.map((endereco, index) => (
                        <div key={index} className="space-y-1">
                          <p>
                            {endereco.logradouro}, {endereco.numero}
                          </p>
                          <p className="text-muted-foreground">
                            {endereco.complemento}
                          </p>
                          <p className="text-muted-foreground">
                            {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                          </p>
                          <p className="text-muted-foreground">
                            CEP: {endereco.cep}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emails */}
                {cadastroPessoaFisica.emails?.length > 0 && (
                  <div className="bg-muted p-4 rounded-xl shadow-sm">
                    <h3 className="font-semibold mb-2">Emails</h3>
                    <div className="space-y-1 text-sm">
                      {cadastroPessoaFisica.emails.map((email, index) => (
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
