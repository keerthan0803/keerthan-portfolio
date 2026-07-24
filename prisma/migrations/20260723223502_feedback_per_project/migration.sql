-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "projectId" TEXT,
ALTER COLUMN "rating" SET DEFAULT 5;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
