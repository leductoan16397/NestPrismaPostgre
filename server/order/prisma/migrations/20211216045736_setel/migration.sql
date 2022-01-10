-- CreateTable
CREATE TABLE "RefresToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "RefresToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefresToken" ADD CONSTRAINT "RefresToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
