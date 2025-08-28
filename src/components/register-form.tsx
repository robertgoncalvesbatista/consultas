"use client";

import { useActionState } from "react";
import { AlertCircleIcon } from "lucide-react";

import Form from "next/form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

import { signupAction } from "@/app/(auth)/signup/signupAction";

type Props = React.ComponentProps<"div">;

function RegisterForm({ className, ...props }: Props) {
  const [state, formAction, isPending] = useActionState(signupAction, null);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form className="p-6 md:p-8" action={formAction} noValidate>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Criar uma conta</h1>
                <p className="text-muted-foreground text-balance">
                  Criar sua conta
                </p>
              </div>

              {state?.success === false && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Não foi possível cadastrar</AlertTitle>
                  <AlertDescription>
                    <p>Por favor verifique suas informações:</p>
                    <ul className="list-inside list-disc text-sm">
                      {state.errors &&
                        Object.entries(state.errors).map(([key, error]) => {
                          return <li key={key}>{error}</li>;
                        })}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  disabled={isPending}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@contoso.com"
                  disabled={isPending}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  disabled={isPending}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password-confirmation">Confirmar senha</Label>
                <Input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  disabled={isPending}
                />
              </div>

              <Button type="submit" className="w-full">
                {!isPending && "Criar conta"}
                {!!isPending && (
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )}
              </Button>
            </div>

            <div className="text-center text-sm">
              Já tenho uma conta?{" "}
              <a href="/signin" className="underline underline-offset-4">
                Acessar
              </a>
            </div>
          </Form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/img/imagem.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export { RegisterForm };
