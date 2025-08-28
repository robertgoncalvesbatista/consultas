"use server";

import { hashSync } from "bcrypt-ts";

import db from "@/lib/db";

import { UserValidator } from "./user.validation";

export async function updateUserAction(data: UserValidator, session: any) {
  const user = await db.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  if (!user) throw new Error("Usuário não encontrado");

  // Verifica email duplicado
  const hasUserWithThisEmail = await db.user.findFirst({
    where: {
      email: data.email,
      NOT: { id: user.id },
    },
  });

  if (hasUserWithThisEmail) {
    throw new Error("Já existe um usuário com este e-mail");
  }

  // Verifica CPF duplicado
  const hasUserWithThisCPF = await db.user.findFirst({
    where: {
      cpf: data.cpf,
      NOT: { id: user.id },
    },
  });

  if (hasUserWithThisCPF) {
    throw new Error("Já existe um usuário com este CPF");
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      ...(data.password && { password: hashSync(data.password) }),
    },
  });
}
