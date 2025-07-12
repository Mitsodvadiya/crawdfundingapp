-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'SUCCESSFUL', 'FRAUD');

-- CreateEnum
CREATE TYPE "DonationState" AS ENUM ('VALID', 'INVALID');

-- CreateTable
CREATE TABLE "CampaignOwner" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "isFraud" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CampaignOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goalAmount" DOUBLE PRECISION NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "campaignId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "amountUsd" DOUBLE PRECISION NOT NULL,
    "state" "DonationState" NOT NULL DEFAULT 'VALID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "CampaignOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
