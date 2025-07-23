/*
  Warnings:

  - You are about to drop the `Dia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Horario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dia" DROP CONSTRAINT "Dia_mesId_fkey";

-- DropForeignKey
ALTER TABLE "Horario" DROP CONSTRAINT "Horario_diaId_fkey";

-- DropTable
DROP TABLE "Dia";

-- DropTable
DROP TABLE "Horario";

-- DropTable
DROP TABLE "Mes";
