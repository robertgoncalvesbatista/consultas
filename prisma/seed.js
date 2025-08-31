import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  // Cria o usuário principal
  await prisma.user.create({
    data: {
      name: "Robert Gonçalves Batista",
      email: "robert.contapessoal@gmail.com",
      password: hashSync("12345678"),
      cpf: "11341563758",
    },
  });

  // Cria a conta principal
  await prisma.account.create({
    data: {
      amount: 0,
      isMain: true,
    },
  });

  console.log({ message: "Seed executed" });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
