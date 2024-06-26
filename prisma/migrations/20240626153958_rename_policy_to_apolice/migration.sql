-- CreateTable
CREATE TABLE "Apolice" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "valorPremio" DOUBLE PRECISION NOT NULL,
    "seguradoId" INTEGER NOT NULL,

    CONSTRAINT "Apolice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Segurado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,

    CONSTRAINT "Segurado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cobertura" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "apoliceId" INTEGER NOT NULL,

    CONSTRAINT "Cobertura_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Apolice" ADD CONSTRAINT "Apolice_seguradoId_fkey" FOREIGN KEY ("seguradoId") REFERENCES "Segurado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cobertura" ADD CONSTRAINT "Cobertura_apoliceId_fkey" FOREIGN KEY ("apoliceId") REFERENCES "Apolice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
