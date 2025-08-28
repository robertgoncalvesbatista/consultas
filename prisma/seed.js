import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Robert Gonçalves Batista",
      email: "robert.contapessoal@gmail.com",
      password: "G8RoB66@#r",
      cpf: "11341563758",
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
