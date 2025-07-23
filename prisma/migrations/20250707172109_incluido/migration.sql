/*
  Warnings:

  - Changed the type of `type` on the `Place` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('praia', 'pousada', 'hotel', 'casas', 'villas', 'agencia_turismo', 'bar', 'restaurantes', 'pizzaria', 'sanduiches', 'sorveteria', 'acai', 'comercio', 'lojas', 'kitesurf', 'windsurf', 'standup_paddle', 'correspondente_bancario', 'mecanico', 'farmacia', 'igreja', 'escola');

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "type",
ADD COLUMN     "type" "PlaceType" NOT NULL;
