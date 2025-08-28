"use client";

import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Session } from "next-auth";

import {
  CreditCardIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import { updateUserAction } from "./updateUserAction";
import { userValidation, UserValidator } from "./user.validation";

// Função para formatar CPF
function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, "");
  const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

  if (!match) return value;

  const [, p1, p2, p3, p4] = match;

  if (p4) return `${p1}.${p2}.${p3}-${p4}`;
  if (p3) return `${p1}.${p2}.${p3}`;
  if (p2) return `${p1}.${p2}`;
  if (p1) return p1;

  return "";
}

type Props = {
  session: Session;
};

function ProfileForm({ session }: Props) {
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<UserValidator>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: session?.user?.name || "",
      cpf: "",
      email: session?.user?.email || "",
      password: "",
      "password-confirmation": "",
    },
  });

  const onSubmit = async (data: UserValidator) => {
    startTransition(async () => {
      try {
        await updateUserAction(data, session);
      } catch (error: any) {
        console.log(error.message);
      }
    });
  };

  const handleCPFChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    const formatted = formatCPF(value);
    onChange(formatted);
  };

  if (form.formState.isLoading) {
    return (
      <div className="px-4 py-8">
        <Card className="overflow-hidden max-w-2xl w-full mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Card className="overflow-hidden max-w-2xl w-full mx-auto shadow-lg">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Editar Perfil
              </CardTitle>
              <CardDescription>
                Mantenha suas informações sempre atualizadas
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Nome completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite seu nome completo"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCardIcon className="h-4 w-4" />
                      CPF
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000.000.000-00"
                        disabled={isPending}
                        {...field}
                        onChange={(e) =>
                          handleCPFChange(e.target.value, field.onChange)
                        }
                        maxLength={14}
                      />
                    </FormControl>
                    <FormDescription>
                      O CPF será formatado automaticamente
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MailIcon className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <LockIcon className="h-4 w-4" />
                    Alterar senha
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    disabled={isPending}
                  >
                    {showPasswordFields ? "Cancelar" : "Alterar senha"}
                  </Button>
                </div>

                {showPasswordFields && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova senha</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="new-password"
                              placeholder="••••••••"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password-confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar nova senha</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="new-password"
                              placeholder="••••••••"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                    setShowPasswordFields(false);
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="min-w-[140px]"
                >
                  {isPending ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar alterações"
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

export { ProfileForm };
