"use client";
import { use, useEffect, useState, useTransition } from "react";
import { Badge } from "@/global-components/ui/badge";
import { Progress } from "@/global-components/ui/progress";
import DonateForm from "../_components/DonateForm";
import DonersTable from "../_components/DonersTable";
import { getCampaignDetails } from "@/app/actions/campaign-actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CampaignDetailsClient({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter()
    const [campaign, setCampaign] = useState<any>(null);
    const [pending, startTransition] = useTransition();

    // Fetch campaign details on mount
    useEffect(() => {
        startTransition(async () => {
            const data = await getCampaignDetails(id);
            setCampaign(data);
        });
    }, [id]);

    // For new donation: add to top, recalc funded
    const handleDonationSuccess = (donation: any) => {
        setCampaign((prev: any) => ({
            ...prev,
            donations: [donation, ...prev.donations],
        }));
        if (campaign && campaign.goalAmount) {
            const newTotalFunded = campaign.donations
                .filter((d: any) => d.state === "VALID")
                .reduce((sum: number, d: any) => sum + d.amountUsd, donation.state === "VALID" ? donation.amountUsd : 0);

            if (newTotalFunded >= campaign.goalAmount) {
                router.push("/campaigns")
            }
        }
    };

    if (!campaign) {
        return <div className="container mx-auto py-10 w-screen h-screen flex items-center justify-center">
            <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
        </div>;
    }

    const totalFunded = campaign.donations.filter((d: any) => d.state === "VALID").reduce((sum: number, d: any) => sum + d.amountUsd, 0);
    const isFraud = campaign.status === "FRAUD";
    const isExpired = campaign.status === "EXPIRED";
    const isSuccessful = campaign.status === "SUCCESSFUL";
    const isActive = campaign.status === "ACTIVE";
    const fundedPercent = Math.min(100, Math.max(0, (totalFunded / campaign.goalAmount) * 100));

    return (
        <section className='bg-black/[0.50] flex flex-col gap-6 w-screen relative z-1 max-w-[1440px] px-[40px] mx-auto pt-[150px] pb-[100px]'>
            <div className="flex flex-row gap-3 w-full">
                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Link href="/campaigns" className='text-3xl font-bold text-white'>&larr; {campaign.name}</Link>
                        <p className='text-xs md:text-xl font-normal text-neutral-400'>{campaign.description}</p>
                        <div className="text-xs md:text-xl font-normal text-neutral-400">Owner : {campaign.owner.username}</div>
                    </div>
                    <div className="mb-4">
                        {isFraud && (
                            <Badge className="bg-red-100 text-red-700">
                                FRAUD - This campaign has been marked as fraudulent and is blocked.
                            </Badge>
                        )}
                        {isExpired && (
                            <Badge className="bg-yellow-100 text-yellow-700">
                                EXPIRED - This campaign is expired.
                            </Badge>
                        )}
                        {isSuccessful && (
                            <Badge className="bg-green-100 text-green-700">
                                SUCCESSFUL - Goal reached!
                            </Badge>
                        )}
                        {isActive && (
                            <Badge className="bg-blue-100 text-blue-700">
                                ACTIVE
                            </Badge>
                        )}
                    </div>
                    {(isFraud || isExpired) && (
                        <div className="text-red-600">
                            Donations are blocked for this campaign.
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="bg-[#e5e7eb] text-gray-800 dark:bg-[#23272e] dark:text-white font-medium">
                            Goal: ${campaign.goalAmount}
                        </Badge>
                        <Badge variant="secondary" className="bg-[#d1fae5] text-emerald-900 dark:bg-[#064e3b] dark:text-emerald-200 font-semibold">
                            Funded: <b>${totalFunded.toFixed(2)}</b>
                        </Badge>
                        <Badge variant="default" className="bg-[#fee2e2] text-red-800 dark:bg-[#7f1d1d] dark:text-red-100 font-medium">
                            Remaining: ${Math.max(0, campaign.goalAmount - totalFunded).toFixed(2)}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Progress value={fundedPercent} className="w-full h-3 rounded-lg bg-gray-200 dark:bg-gray-800" />
                        <span className="min-w-[50px] text-sm font-medium text-gray-700 dark:text-gray-200">
                            {fundedPercent.toFixed(1)}%
                        </span>
                    </div>
                </div>
                {
                    (isActive || isSuccessful) && !isFraud && !isExpired && campaign.status === "ACTIVE" && (
                        <div className="flex flex-1 flex-col border border-gray-800 rounded-4xl p-4">
                            <DonateForm campaignId={campaign.id} onSuccess={handleDonationSuccess} />
                        </div>
                    )
                }
            </div>
            <div className="flex w-full h-full border border-gray-800 rounded-4xl overflow-hidden">
                <DonersTable donation={campaign.donations} />
            </div>
        </section>
    )
}
