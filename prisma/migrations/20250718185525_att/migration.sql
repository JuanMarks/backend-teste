-- CreateTable
CREATE TABLE "Mare" (
    "id" TEXT NOT NULL,
    "mes" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "horarios" JSONB NOT NULL,

    CONSTRAINT "Mare_pkey" PRIMARY KEY ("id")
);
