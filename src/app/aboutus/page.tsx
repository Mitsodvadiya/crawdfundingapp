import Image from 'next/image'
import React from 'react'

type Props = {}

const AboutUs = (props: Props) => {
    return (
        <section className='bg-black/[0.50] flex flex-row w-screen relative z-1 max-w-[1440px] px-[40px] mx-auto pt-[200px] pb-[100px]'>
            <div className="content flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold text-white">CrowdCatalyst Empowering Dreams, One Pledge at a Time</h1>
                    <p className="text-lg text-gray-300">Born from a desire to bridge creators and supporters, we’re building a platform where every backer’s contribution sparks real-world impact.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className='text-2xl font-bold text-white'>How it works?</h2>
                    <ul className='list-disc pl-5'>
                        <li>Start a Campaign: Tell your story, set your goal, and launch in minutes</li>
                        <li>Share & Connect: Reach out and bring supporters who believe in you</li>
                        <li>Grow with Backers: Collect pledges, post updates, and build trust</li>
                        <li>Celebrate Impact: Deliver your vision and share outcomes with the community</li>
                    </ul>
                </div>
            </div>
            <div className="image flex flex-1">
                <div className="flex flex-1 w-full h-full rounded-3xl shadow overflow-hidden">
                    <Image src={"/images/aboutUs.jpg"} alt='about Us' width={1100} height={1100} className='w-full object-cover' />
                </div>
            </div>
        </section>
    )
}

export default AboutUs