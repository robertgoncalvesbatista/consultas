"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroPessoaFisicaBasico } from "@prisma/client";

import {
  Calendar,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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

import {
  cadastroPessoaFisicaValidation,
  CadastroPessoaFisicaValidator,
} from "../validation";
import { cadastroPessoaFisicaAction } from "./cadastro-pessoa-fisica-action";

export default function CadastroPessoaFisicaCard() {
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
    <div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="w-full mx-auto space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl mb-2">
                    Consulta de Pessoa Física - Basic
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Consulte os dados de uma pessoa física
                  </CardDescription>
                </div>

                <CardAction>
                  <FormProvider {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      noValidate
                      className="flex gap-3"
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
                                className="min-w-[200px] h-12 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="h-12 px-8 text-base">
                        {!isPending && <Search className="w-5 h-5" />}
                        {!!isPending && <Loading />}
                      </Button>
                    </form>
                  </FormProvider>
                </CardAction>
              </div>
            </CardHeader>
          </Card>

          {cadastroPessoaFisica && (
            <div className="space-y-6">
              {/* Dados principais */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <User className="h-6 w-6 text-neutral-600" />
                    </div>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Nome e CPF em destaque */}
                  <div className="mb-6 p-4 bg-neutral-50 rounded-lg border-l-4 border-l-neutral-400">
                    <h4 className="text-xl font-semibold text-neutral-900 mb-1">
                      {cadastroPessoaFisica.nome || "Nome não informado"}
                    </h4>
                    <p className="text-neutral-600 text-base">
                      CPF: {formatCPF(cadastroPessoaFisica.cpf)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Sexo",
                        value: cadastroPessoaFisica.sexo || "-",
                        icon: User,
                      },
                      {
                        label: "Data de Nascimento",
                        value:
                          cadastroPessoaFisica.dataNascimento.split(" ")[0],
                        icon: Calendar,
                      },
                      {
                        label: "Idade",
                        value: cadastroPessoaFisica.idade || "-",
                        icon: Calendar,
                      },
                      {
                        label: "Signo",
                        value: cadastroPessoaFisica.signo || "-",
                        icon: User,
                      },
                      {
                        label: "Nome da Mãe",
                        value: cadastroPessoaFisica.nomeMae || "-",
                        icon: Users,
                      },
                    ].map(({ label, value, icon: Icon }, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 p-4 bg-white border border-neutral-100 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-neutral-500" />
                          <h4 className="text-sm font-medium text-neutral-600">
                            {label}
                          </h4>
                        </div>
                        <p className="text-base text-neutral-900 font-medium">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informações Profissionais e Status */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-neutral-600" />
                    </div>
                    <CardTitle>Informações Profissionais</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Renda Estimada",
                        value: `R$ ${
                          cadastroPessoaFisica.rendaEstimada || "-"
                        }`,
                      },
                      {
                        label: "Faixa Salarial",
                        value: cadastroPessoaFisica.rendaFaixaSalarial || "-",
                      },
                    ].map(({ label, value }, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 p-4 bg-neutral-50 rounded-lg"
                      >
                        <h4 className="text-sm font-medium text-neutral-600">
                          {label}
                        </h4>
                        <p className="text-lg text-neutral-900 font-semibold">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Telefones, Endereços, Emails */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Telefones */}
                {cadastroPessoaFisica.telefones.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <CardTitle className="text-base">Telefones</CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {cadastroPessoaFisica.telefones.map(
                          (telefone, index) => (
                            <div
                              key={index}
                              className="p-3 bg-green-50 rounded-lg"
                            >
                              <div className="font-medium text-neutral-900 flex items-center gap-2">
                                {telefone.telefoneComDDD}
                                {telefone.whatsApp && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    WhatsApp
                                  </span>
                                )}
                              </div>
                              <div className="text-neutral-600 text-sm mt-1">
                                {telefone.operadora}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Endereços */}
                {cadastroPessoaFisica.enderecos?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle className="text-base">Endereços</CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {cadastroPessoaFisica.enderecos.map(
                          (endereco, index) => (
                            <div
                              key={index}
                              className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-300"
                            >
                              <p className="font-semibold text-neutral-900 mb-2">
                                {endereco.logradouro}, {endereco.numero}
                              </p>
                              {endereco.complemento && (
                                <p className="text-neutral-600 text-sm mb-1">
                                  {endereco.complemento}
                                </p>
                              )}
                              <p className="text-neutral-600 mb-1">
                                {endereco.bairro}, {endereco.cidade} -{" "}
                                {endereco.uf}
                              </p>
                              <p className="text-neutral-500 text-sm">
                                CEP: {endereco.cep}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Emails */}
                {cadastroPessoaFisica.emails?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Mail className="h-5 w-5 text-purple-600" />
                        </div>
                        <CardTitle className="text-base">Emails</CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2">
                        {cadastroPessoaFisica.emails.map((email, index) => (
                          <div
                            key={index}
                            className="p-3 bg-purple-50 rounded-lg"
                          >
                            <p className="text-neutral-900 font-medium break-all">
                              {email.enderecoEmail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
