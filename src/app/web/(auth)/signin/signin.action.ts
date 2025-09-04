"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn } from "@/auth";

import { SigninValidator } from "./signin.validation";

export async function signinAction(data: SigninValidator) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/web/dashboard",
    });
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error.type === "CredentialsSignin") {
      throw {
        name: "CredentialsError",
        message: "Suas credenciais estão incorretas",
        stack: error,
      };
    }

    throw {
      name: "Error",
      message: "Ops, algo deu errado",
      stack: error,
    };
  }
}
