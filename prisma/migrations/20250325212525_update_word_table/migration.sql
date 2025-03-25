/*
  Warnings:

  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "word" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "words" TEXT[],

    CONSTRAINT "word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "word_uuid_key" ON "word"("uuid");
