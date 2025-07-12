"use server";

import { prisma } from "@/lib/prisma";

export async function getCampaignDetails(campaignId: string) {
    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: {
            owner: true,
            donations: { orderBy: { createdAt: "desc" } },
        },
    });
    return campaign;
}
export async function donateToCampaign({
    campaignId,
    nickname,
    amount,
}: {
    campaignId: string;
    nickname: string;
    amount: number;
}) {
    // Validation
    if (!nickname.match(/^[a-zA-Z0-9_]+$/)) return { error: "Invalid nickname." };
    if (amount <= 0) return { error: "Amount must be > 0." };

    // Fetch campaign
    const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
    if (!campaign) return { error: "Campaign not found." };
    if (campaign.status !== "ACTIVE") return { error: "Campaign not accepting donations." };

    // Create donation
    const donation = await prisma.donation.create({
        data: {
            campaignId,
            nickname,
            amountUsd: amount,
            state: "VALID",
        }
    });

    // Check goal
    const sum = await prisma.donation.aggregate({
        _sum: { amountUsd: true },
        where: { campaignId, state: "VALID" }
    });
    if (sum._sum.amountUsd && sum._sum.amountUsd >= campaign.goalAmount) {
        await prisma.campaign.update({
            where: { id: campaignId },
            data: { status: "SUCCESSFUL" }
        });
    }

    // Return the created donation (with all fields you need)
    return { success: true, donation };
}

export async function createCampaign(data: {
    name: string;
    description: string;
    goalAmount: number;
    expiresAt: string; // ISO date
    ownerId: number;
}) {
    // Basic server validation
    if (!data.name || !data.description) return { error: "Name and description required." };
    if (isNaN(data.goalAmount) || data.goalAmount <= 0) return { error: "Goal must be positive number." };
    if (!data.expiresAt || isNaN(Date.parse(data.expiresAt))) return { error: "Valid expiry date required." };

    const owner = await prisma.campaignOwner.findUnique({ where: { id: data.ownerId } });
    if (!owner) return { error: "Owner not found." };

    const campaign = await prisma.campaign.create({
        data: {
            name: data.name,
            description: data.description,
            goalAmount: data.goalAmount,
            expiresAt: new Date(data.expiresAt),
            ownerId: data.ownerId,
        }
    });

    return { success: true, campaign };
}