'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Wand2, Home, ShoppingBag, Box, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const FloatingNavSub = ({
    className,
}: {
    className?: string;
}) => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Shop', href: '/shop', icon: ShoppingBag },
        { name: 'Gacha', href: '/gacha', icon: Box },
        { name: 'Upgrade', href: '/nft-upgrade', icon: Sparkles },
    ];

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -100,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.2,
            }}
            className={cn(
                'flex flex-col fixed top-6 left-6 rounded-2xl bg-black/40 backdrop-blur-xl shadow-2xl z-50 p-4 space-y-4 border border-[#17b6fa]/10',
                className
            )}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-2 pb-4 border-b border-[#17b6fa]/10">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#17b6fa]/20 to-[#17b6fa]/10 p-0.5 border border-[#17b6fa]/20">
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-black/40">
                        <Wand2 className="h-4 w-4 text-[#17b6fa]" />
                    </div>
                </div>
                <Link
                    href="/"
                    className="text-base font-medium bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                    Mysteria
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
                {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={`nav-${idx}`}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 text-sm font-medium transition-all px-4 py-2.5 rounded-xl relative group",
                                isActive
                                    ? "text-[#17b6fa] bg-[#17b6fa]/10 border border-[#17b6fa]/20"
                                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                            )}
                        >
                            <Icon className={cn(
                                "w-4 h-4 transition-colors",
                                isActive ? "text-[#17b6fa]" : "text-white/60 group-hover:text-white/90"
                            )} />
                            <span>{item.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#17b6fa]"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </motion.div>
    );
};