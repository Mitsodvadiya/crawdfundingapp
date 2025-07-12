"use client";
import { HoveredLink, Menu, MenuItem, ProductItem } from '@/global-components/ui/navbar-menu';
import { cn } from '@/lib/utils';
import React, { useState } from 'react'

type Props = { className?: string }

const Navbar = ({ className }: Props) => {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                <HoveredLink href="/">Home</HoveredLink>
                <HoveredLink href="/aboutus">About Us</HoveredLink>
                <HoveredLink href="/community">Community</HoveredLink>
                <HoveredLink href="/support">Support</HoveredLink>
            </Menu>
        </div>
    )
}

export default Navbar