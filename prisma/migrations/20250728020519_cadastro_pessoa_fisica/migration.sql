-- CreateTable
CREATE TABLE "CadastroPessoaFisica" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "signo" TEXT NOT NULL,
    "rendaEstimada" DECIMAL(10,2) NOT NULL,
    "rendaFaixaSalarial" TEXT NOT NULL,
    "telefones" JSONB NOT NULL,
    "enderecos" JSONB NOT NULL,
    "emails" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CadastroPessoaFisica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CadastroPessoaFisica_cpf_key" ON "CadastroPessoaFisica"("cpf");
