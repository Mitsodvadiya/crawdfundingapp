import React from 'react'
import AddCampaignForm from './_components/AddCampaignForm'
import { prisma } from '@/lib/prisma';

type Props = {}

const Admin = async (props: Props) => {
    const owners = await prisma.campaignOwner.findMany();

    return (
        <section className='bg-black/[0.50] flex flex-col gap-6 w-screen relative z-1 max-w-[1440px] px-[40px] mx-auto pt-[150px] pb-[100px]'>
            <h2 className='text-4xl font-semibold text-center'>Add New Campaign</h2>
            <div className="flex flex-col gap-4 max-w-[500px] w-full border border-gray-800 rounded-3xl p-6 mx-auto">
                <AddCampaignForm owners={owners} />
            </div>
        </section>
    )
}

export default Admin