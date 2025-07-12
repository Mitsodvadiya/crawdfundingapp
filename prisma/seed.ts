import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
    await prisma.campaignOwner.create({
        data: {
            username: 'owner_one',
            wallet: '0x123abcDEF111',
            isFraud: false,
            campaigns: {
                create: [
                    {
                        name: 'Save the Rainforest',
                        description: 'Help us protect the Amazon rainforest.',
                        goalAmount: 50000,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        status: 'ACTIVE',
                    },
                    {
                        name: 'Clean Ocean Project',
                        description: 'Fund cleanup crews to remove plastic from the ocean.',
                        goalAmount: 75000,
                        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                        status: 'ACTIVE',
                    },
                ],
            },
        },
    });

    await prisma.campaignOwner.create({
        data: {
            username: 'owner_two',
            wallet: '0x456XYZabc222',
            isFraud: false,
            campaigns: {
                create: [
                    {
                        name: 'Support Local Artists',
                        description: 'Backing creative minds in your neighborhood.',
                        goalAmount: 20000,
                        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                        status: 'ACTIVE',
                    },
                ],
            },
        },
    });

    console.log('✅ Seed completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
