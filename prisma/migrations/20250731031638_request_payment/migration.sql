-- CreateEnum
CREATE TYPE "TypePayment" AS ENUM ('PIX', 'CREDIT_CARD');

-- CreateTable
CREATE TABLE "RequestPayment" (
    "id" SERIAL NOT NULL,
    "type" "TypePayment" NOT NULL DEFAULT 'PIX',
    "amount" DECIMAL(10,2) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestPayment" ADD CONSTRAINT "RequestPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
