-- CreateTable
CREATE TABLE "public"."CadastroPessoaFisicaBasico" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "signo" TEXT NOT NULL,
    "telefones" JSONB[],
    "enderecos" JSONB[],
    "emails" JSONB[],
    "rendaEstimada" TEXT NOT NULL,
    "rendaFaixaSalarial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CadastroPessoaFisicaBasico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CadastroPessoaFisicaBasico_cpf_key" ON "public"."CadastroPessoaFisicaBasico"("cpf");
