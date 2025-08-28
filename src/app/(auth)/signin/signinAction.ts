"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn } from "@/auth";
import { SigninValidation } from "@/validations/signin";

export async function signinAction(_prevState: any, formData: FormData) {
  try {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries);

    const result = SigninValidation.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        if (issue.path.length > 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          errors[issue.path[0]] = issue.message;
        }
      }

      return { success: false, errors };
    }

    const validatedData = result.data;

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: true,
      redirectTo: "/dashboard",
    });

    return {
      success: true,
      message: "Login efetuado com sucesso",
    };
  } catch (error: any) {
    if (isRedirectError(error)) throw error;

    if (error.type === "CredentialsSignin") {
      return {
        success: false,
        errors: {
          message: "Suas credenciais estão incorretas",
        },
      };
    }

    return {
      success: false,
      errors: {
        message: "Ops, algo deu errado",
      },
    };
  }
}
