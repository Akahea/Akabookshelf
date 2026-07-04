-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('ROMAN', 'MANGA', 'BD', 'COMIC', 'LIGHT_NOVEL');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('TO_READ', 'READING', 'FINISHED', 'DROPPED', 'LENT');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "type" "BookType" NOT NULL,
    "ownedVolumes" INTEGER NOT NULL DEFAULT 1,
    "status" "BookStatus" NOT NULL DEFAULT 'TO_READ',
    "rating" INTEGER,
    "personalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
