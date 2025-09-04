"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroPessoaFisicaPlus } from "@prisma/client";

import {
  Briefcase,
  Calendar,
  Heart,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  UserCheck,
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

import CadastroPessoaFisicaPlusDTO from "@/dtos/cadastro-pessoa-fisica-plus";
import { useCPF } from "@/hooks/use-cpf";

import {
  cadastroPessoaFisicaValidation,
  CadastroPessoaFisicaValidator,
} from "../validation";
import { cadastroPessoaFisicaAction } from "./cadastro-pessoa-fisica-action";

export default function CadastroPessoaFisicaCard() {
  const [cadastroPessoaFisica, setCadastroPessoaFisica] =
    useState<CadastroPessoaFisicaPlus>();

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

        const newData = new CadastroPessoaFisicaPlusDTO(response);
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
                    Consulta de Pessoa Física - Plus
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
                      {
                        label: "Nome do Pai",
                        value: cadastroPessoaFisica.nomePai || "-",
                        icon: Users,
                      },
                      {
                        label: "Status",
                        value: cadastroPessoaFisica.obito ? "Óbito" : "Ativo",
                        icon: UserCheck,
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
                        <p
                          className={`text-base font-medium ${
                            label === "Status" && cadastroPessoaFisica.obito
                              ? "text-red-600"
                              : label === "Status"
                              ? "text-green-600"
                              : "text-neutral-900"
                          }`}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informações Profissionais */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-100 rounded-lg">
                      <Briefcase className="h-6 w-6 text-neutral-600" />
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
                      {
                        label: "Classe Social",
                        value: cadastroPessoaFisica.classeSocial || "-",
                      },
                      {
                        label: "Código CBO",
                        value: cadastroPessoaFisica.codigoCBO || "-",
                      },
                      {
                        label: "CBO",
                        value: cadastroPessoaFisica.cbo || "-",
                      },
                      {
                        label: "Situação Cadastral",
                        value: cadastroPessoaFisica.situacaoCadastral || "-",
                      },
                      {
                        label: "Data Situação Cadastral",
                        value:
                          cadastroPessoaFisica.dataSituacaoCadastral?.split(
                            " "
                          )[0] || "-",
                      },
                    ].map(({ label, value }, idx) => (
                      <div
                        key={idx}
                        className="space-y-2 p-4 bg-neutral-50 rounded-lg"
                      >
                        <h4 className="text-sm font-medium text-neutral-600">
                          {label}
                        </h4>
                        <p className="text-base text-neutral-900 font-medium">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Parentescos */}
              {cadastroPessoaFisica.parentescos?.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Heart className="h-6 w-6 text-orange-600" />
                      </div>
                      <CardTitle>Parentescos</CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cadastroPessoaFisica.parentescos.map(
                        (parentesco, index) => (
                          <div
                            key={index}
                            className="bg-orange-50 p-6 rounded-lg border border-orange-200"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-sm font-medium bg-orange-200 text-orange-800 px-3 py-1 rounded-full">
                                {parentesco.grauParentesco}
                              </span>
                              {parentesco.obito && (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                                  Óbito
                                </span>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div className="font-semibold text-lg text-neutral-900">
                                {parentesco.nome}
                              </div>

                              <div className="grid grid-cols-1 gap-2 text-sm">
                                <div className="text-neutral-600">
                                  <span className="font-medium">CPF:</span>{" "}
                                  {formatCPF(parentesco.cpf)}
                                </div>

                                <div className="text-neutral-600">
                                  <span className="font-medium">
                                    Nascimento:
                                  </span>{" "}
                                  {parentesco.dataNascimento?.split(" ")[0] ||
                                    "-"}
                                </div>

                                <div className="text-neutral-600">
                                  <span className="font-medium">Gênero:</span>{" "}
                                  {parentesco.genero || "-"}
                                </div>

                                {parentesco.obito && parentesco.dataObito && (
                                  <div className="text-red-600 border-t border-red-200 pt-3 mt-3">
                                    <span className="font-medium">
                                      Data do Óbito:
                                    </span>{" "}
                                    {parentesco.dataObito.split(" ")[0]}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cards de Contato */}
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
