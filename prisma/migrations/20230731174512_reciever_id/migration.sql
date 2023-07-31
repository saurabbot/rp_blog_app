-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "receiver_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
