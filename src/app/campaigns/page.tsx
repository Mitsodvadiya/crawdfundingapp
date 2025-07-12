import Image from 'next/image'
import React from 'react'
import { CampaignViewToggle } from './_components/CampaignViewToggle'
import { prisma } from '@/lib/prisma'

type Props = {}

const Campaigns = async (props: Props) => {
    const campaigns = await prisma.campaign.findMany({
        where: { status: "ACTIVE" },
        include: { owner: true }
    });
    return (
        <section className='bg-black/[0.50] flex flex-col w-screen relative z-1 max-w-[1440px] px-[40px] mx-auto pt-[150px] pb-[100px]'>
            <div className="flex flex-col gap-3 text-center w-full">
                <h2 className='text-4xl font-bold text-white'>Explore Live Campaigns</h2>
                <p className='text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto'>Discover inspiring ideas and support projects that matter—filter by category, goal, or popularity.</p>
            </div>
            <CampaignViewToggle campaigns={campaigns} />
        </section>
    )
}

export default Campaigns