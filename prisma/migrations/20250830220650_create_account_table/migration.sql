-- CreateEnum
CREATE TYPE "public"."AccountEnum" AS ENUM ('USER', 'SYSTEM', 'EXTERNAL');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "typeAccount" "public"."AccountEnum" NOT NULL DEFAULT 'USER',
    "observation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);
