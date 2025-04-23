-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "words" TEXT[],

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_uuid_key" ON "Word"("uuid");
