-- CreateTable
CREATE TABLE "public"."CadastroPessoaFisicaPlus" (
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
    "obito" BOOLEAN NOT NULL,
    "nomePai" TEXT NOT NULL,
    "codigoCBO" TEXT NOT NULL,
    "cbo" TEXT NOT NULL,
    "classeSocial" TEXT NOT NULL,
    "situacaoCadastral" TEXT NOT NULL,
    "dataSituacaoCadastral" TEXT NOT NULL,
    "parentescos" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CadastroPessoaFisicaPlus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CadastroPessoaFisicaPlus_cpf_key" ON "public"."CadastroPessoaFisicaPlus"("cpf");
