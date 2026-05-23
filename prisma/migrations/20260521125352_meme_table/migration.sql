-- CreateTable
CREATE TABLE "Meme" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "topText" TEXT,
    "bottomText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meme_pkey" PRIMARY KEY ("id")
);
