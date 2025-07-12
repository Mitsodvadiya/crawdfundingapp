"use client";
import { GoogleGeminiEffect } from "@/global-components/ui/google-gemini-effect";
import { Spotlight } from "@/global-components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { useScroll, useTransform } from "motion/react";
import React from "react";

type Props = {}

const HeroSection = (props: Props) => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
    return (
        <div
            className="h-[400vh] bg-black/[0.50] antialiase w-full dark:border dark:border-white/[0.1] relative overflow-clip"
            ref={ref}
        >
            <GoogleGeminiEffect
                title="Grow Bold Ideas, Together."
                description="Connect with backers who believe in your vision—powering your journey from concept to reality."
                className="top-40"
                pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                ]}
            />
        </div>
    )
}

export default HeroSection