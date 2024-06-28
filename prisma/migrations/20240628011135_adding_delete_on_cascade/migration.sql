-- DropForeignKey
ALTER TABLE "Cobertura" DROP CONSTRAINT "Cobertura_apoliceId_fkey";

-- AddForeignKey
ALTER TABLE "Cobertura" ADD CONSTRAINT "Cobertura_apoliceId_fkey" FOREIGN KEY ("apoliceId") REFERENCES "Apolice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
