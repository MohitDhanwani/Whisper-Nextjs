-- CreateTable
CREATE TABLE "userDetails" (
    "id" SERIAL NOT NULL,
    "RedirectId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "isReceivingMessages" BOOLEAN NOT NULL,

    CONSTRAINT "userDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageId" TEXT NOT NULL,
    "messageBody" TEXT NOT NULL,
    "messageSentToShow" TEXT NOT NULL,
    "messageSentBy" TEXT NOT NULL,
    "userID" SERIAL NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userDetails_id_key" ON "userDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userDetails_RedirectId_key" ON "userDetails"("RedirectId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_userID_fkey" FOREIGN KEY ("userID") REFERENCES "userDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
