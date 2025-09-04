"use server";

import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { SignupValidator } from "./signup.validation";

export async function signupAction(data: SignupValidator) {
  // Se já existe um usuário com este e-mail
  const hasUserWithThisEmail = await db.user.findUnique({
    where: { email: data.email },
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
    where: { cpf: data.cpf },
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
      name: data.name ?? "",
      email: data.email ?? "",
      cpf: data.cpf ?? "",
      password: hashSync(data.password ?? ""),
    },
  });

  return redirect("/signin");
}
