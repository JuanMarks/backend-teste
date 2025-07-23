-- CreateTable
CREATE TABLE "Mes" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "Mes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dia" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "mesId" INTEGER NOT NULL,

    CONSTRAINT "Dia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "ordem" INTEGER NOT NULL,
    "horas" TEXT NOT NULL,
    "altura" TEXT NOT NULL,
    "diaId" INTEGER NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dia" ADD CONSTRAINT "Dia_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Mes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_diaId_fkey" FOREIGN KEY ("diaId") REFERENCES "Dia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
