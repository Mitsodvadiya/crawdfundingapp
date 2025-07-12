"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useTransition } from "react";
import { addFundSchema } from "@/lib/validation-schema";
import { Button } from "@/global-components/ui/button";
import { toast } from "sonner";
import { donateToCampaign } from "@/app/actions/campaign-actions";

export default function DonateForm({ campaignId, onSuccess }: { campaignId: string; onSuccess?: (donation: any) => void }) {
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(addFundSchema),
    });

    const onSubmit = (data: any) => {
        startTransition(async () => {
            const result = await donateToCampaign({
                campaignId,
                nickname: data.nickname,
                amount: Number(data.amount),
            });
            if (result.error) {
                toast.error(result.error); // < show error toast
            }
            else {
                reset();
                toast.success("Thank you for your donation!"); // < show success toast
                if (onSuccess && result.donation) onSuccess(result.donation);
            }
        });
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <h3 className="text-2xl text-center font-semibold text-white mb-2">Donate to this Campaign</h3>
            <div className="flex flex-col gap-4 mb-2">
                <div className="w-full">
                    <input
                        {...register("nickname")}
                        placeholder="Your nickname"
                        className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl"
                        disabled={pending}
                    />
                    <div className="text-xs text-red-500 pl-2 pt-1">{errors.nickname?.message as string}</div>
                </div>
                <div className="w-full">
                    <input
                        {...register("amount")}
                        type="number"
                        placeholder="Amount (USD)"
                        className="border border-gray-800 outline-none focus:ring-2 focus:ring-[#191919] py-2 px-3 w-full transition-all duration-200 rounded-xl"
                        min={1}
                        step={0.01}
                        disabled={pending}
                    />
                    <div className="text-xs text-red-500 pl-2 pt-1">{errors.amount?.message as string}</div>
                </div>
                <Button
                    type="submit"
                    disabled={pending}
                    className="cursor-pointer"
                >
                    Donate
                </Button>
            </div>
            {error && <div className="text-xs text-red-600">{error}</div>}
        </form>
    );
}
