"use server";

import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { SignupValidation } from "@/validations/signup";

export async function signupAction(_prevState: unknown, formData: FormData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
    cpf: string;
    "password-confirmation": string;
  };

  const result = SignupValidation.safeParse(data);

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

  // Se já existe um usuário com este e-mail
  const hasUserWithThisEmail = await db.user.findUnique({
    where: { email: validatedData.email },
  });

  if (hasUserWithThisEmail) {
    return {
      success: false,
      errors: {
        message: "Já existe um usuário com este e-mail",
      },
    };
  }

  // Se já existe um usuário com este cpf
  const hasUserWithThisCPF = await db.user.findUnique({
    where: { cpf: validatedData.cpf },
  });

  if (hasUserWithThisCPF) {
    return {
      success: false,
      errors: {
        message: "Já existe um usuário com este cpf",
      },
    };
  }

  // Se não existir, cria o usuário
  await db.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      cpf: validatedData.cpf,
      password: hashSync(validatedData.password),
    },
  });

  return redirect("/signin");
}
