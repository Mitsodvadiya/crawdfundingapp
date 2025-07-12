"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCampaign } from "@/app/actions/campaign-actions";
import { addCampaignSchema } from "@/lib/validation-schema";
import { Button } from "@/global-components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/global-components/ui/select";

export default function AddCampaignForm({ owners }: { owners: any[] }) {
    const [pending, startTransition] = useTransition();
    const [msg, setMsg] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
        resolver: yupResolver(addCampaignSchema),
    });

    const onSubmit = (data: any) => {
        setMsg(null);
        startTransition(async () => {
            const result = await createCampaign({
                ...data,
                goalAmount: Number(data.goalAmount),
                ownerId: Number(data.ownerId),
            });
            if (result.error) setMsg(result.error);
            else if (result.campaign) {
                reset();
                // Redirect to campaign detail page!
                router.push(`/campaigns/${result.campaign.id}`);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col w-full gap-1">
                <label className="block">Name</label>
                <input {...register("name")} className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl" />
                <div className="text-xs text-red-500">{errors.name?.message}</div>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="block">Description</label>
                <textarea {...register("description")} className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl" />
                <div className="text-xs text-red-500">{errors.description?.message}</div>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="block">Goal Amount (USD)</label>
                <input type="number" {...register("goalAmount")} className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl" />
                <div className="text-xs text-red-500">{errors.goalAmount?.message}</div>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="block">Expiry Date</label>
                <input type="date" {...register("expiresAt")} className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl" />
                <div className="text-xs text-red-500">{errors.expiresAt?.message}</div>
            </div>
            <div className="flex flex-col w-full gap-1">
                <label className="block">Owner</label>
                <Controller
                    control={control}
                    name="ownerId"
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value ? String(field.value) : ""}
                            disabled={pending}
                        >
                            <SelectTrigger className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl">
                                <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                            <SelectContent>
                                {owners.map((o: any) => (
                                    <SelectItem value={String(o.id)} key={o.id}>
                                        {o.username} ({o.wallet})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="text-xs text-red-500">{errors.ownerId?.message}</div>
            </div>
            <Button
                type="submit"
                disabled={pending}
                className="cursor-pointer mt-3"
            >
                Add Campaign
            </Button>
            {msg && <div className={`mt-2 text-sm ${msg.includes('success') ? "text-green-600" : "text-red-600"}`}>{msg}</div>}
        </form>
    );
}
