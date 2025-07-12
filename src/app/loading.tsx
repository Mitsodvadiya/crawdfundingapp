'use client'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='relative z-50'>
                <Loader2 className="animate-spin w-12 h-12 text-gray-400" />
            </div>
        </div>
    )
}

export default loading