'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Wand2 } from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const FloatingNavSub = ({
    className,
}: {
    className?: string;
}) => {
    const { theme, setTheme } = useTheme();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Gacha', href: '/gacha' },
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
                'flex flex-col fixed top-6 left-6 border border-primary/20 rounded-lg bg-background/80 backdrop-blur-md shadow-lg z-50 p-4 space-y-4',
                className
            )}
        >
            <div className="flex items-center gap-2 pb-4 border-b border-primary/20">
                <div className="h-6 w-6 rounded-full bg-gradient-mysteria p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
                        <Wand2 className="h-3 w-3 text-mysteria-cyan" />
                    </div>
                </div>
                <Link
                    href="/"
                    className="text-sm font-semibold bg-gradient-mysteria bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                    Mysteria
                </Link>
            </div>

            {navItems.map((navItem, idx) => (
                <Link
                    key={`nav-${idx}`}
                    href={navItem.href}
                    className="text-sm font-medium hover:text-mysteria-cyan transition-colors px-4 py-2 rounded-md hover:bg-primary/10"
                >
                    {navItem.name}
                </Link>
            ))}

          
        </motion.div>
    );
};
