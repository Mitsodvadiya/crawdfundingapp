// components/CampaignViewToggle.tsx
"use client";
import { format } from "date-fns";
import { useState } from "react";
import { List, Grid } from "lucide-react"; // Icons for toggle
import { Badge } from "@/global-components/ui/badge";
import { useRouter } from "next/navigation";

interface Campaign {
    id: number;
    title: string;
    description: string;
    image: string;
    raised: string;
    goal: string;
}

interface Props {
    campaigns: any;
    // campaigns: Campaign[];
}

export function CampaignViewToggle({ campaigns }: Props) {
    const router = useRouter();
    const [isGrid, setIsGrid] = useState(true);

    const navigateToDetails = (id: string) => {
        router.push(`/campaigns/${id}`); // Navigate to the first campaign's details
    }
    return (
        <div className="px-4 py-6">
            {/* Toggle Buttons */}
            <div className="flex justify-end mb-4 space-x-2">
                <button
                    className={`p-2 rounded ${isGrid ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                    aria-label="Grid view"
                    onClick={() => setIsGrid(true)}
                >
                    <Grid className="w-5 h-5" />
                </button>
                <button
                    className={`p-2 rounded ${!isGrid ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                    aria-label="List view"
                    onClick={() => setIsGrid(false)}
                >
                    <List className="w-5 h-5" />
                </button>
            </div>

            {/* Render View */}
            {isGrid ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {campaigns?.map((camp: any) => (
                        <div
                            key={camp.id}
                            onClick={() => navigateToDetails(camp?.id)}
                            className="bg-white dark:bg-black border hover:bg-[#1a1919] border-gray-800 rounded-2xl overflow-hidden shadow-neutral-200 cursor-pointer"
                        >
                            <div className="p-4">
                                <h2 className="font-bold text-xl mb-2">{camp.name}</h2>
                                <p className="text-gray-200 mb-2">{camp.description}</p>
                                <p className="text-sm text-gray-200 mb-2 font-medium">
                                    Goal{" "}:{"  "}
                                    <Badge variant="secondary" className="bg-[#90c391] text-black"> ${camp.goalAmount}</Badge>
                                </p>
                                <p className="text-sm text-gray-200 mb-2 font-medium">
                                    Expires{" "}:{" "}
                                    <Badge variant="secondary" className="bg-[#c39f90] text-black">
                                        {format(new Date(camp.expiresAt), "yyyy-MM-dd")}
                                    </Badge>

                                </p>
                                <div className="text-xs text-gray-200">Owner : {camp.owner.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {campaigns?.map((camp: any) => (
                        <div
                            key={camp.id}
                            onClick={() => navigateToDetails(camp?.id)}
                            className="flex flex-col sm:flex-row bg-black border border-gray-800 hover:bg-[#1a1919] rounded-2xl overflow-hidden shadow cursor-pointer"
                        >
                            <div className="p-4 flex-1 flex flex-row justify-between items-center">
                                <div className="flex flex-col   ">
                                    <h2 className="font-bold text-xl mb-2">{camp.name}</h2>
                                    <p className="text-gray-200 mb-2">{camp.description}</p>
                                    <div className="text-xs text-gray-200">Owner : {camp.owner.username}</div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <Badge variant="secondary" className="bg-[#90c391] text-black"> ${camp.goalAmount}</Badge>
                                    <Badge variant="secondary" className="bg-[#c39f90] text-black">
                                        {format(new Date(camp.expiresAt), "yyyy-MM-dd")}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}
