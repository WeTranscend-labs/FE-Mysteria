'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Box, Home, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Logo from './Logo';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  name: string;
  isActive: boolean;
  index: number;
  activeIndex: number;
}

const NavItem = ({
  href,
  icon: Icon,
  name,
  isActive,
  index,
  activeIndex,
}: NavItemProps) => {
  return (
    <Link href={href} className="relative">
      <div
        className={cn('rounded-lg bg-transparent', {
          'border-b-2 border-b-blue-500': isActive,
        })}
      >
        <div
          className={cn(
            'flex h-10 cursor-pointer items-center gap-2 rounded-lg border-2 px-4 transition-all duration-300',
            {
              'border-blue-500 bg-white/5 text-blue-500': isActive,
              'border-transparent hover:border-white/10 text-white/60 hover:text-white/90':
                !isActive,
              'origin-top-right ease-in': index !== activeIndex,
            }
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm font-medium">{name}</span>
        </div>
      </div>
    </Link>
  );
};

export const FloatingNavSub = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Gacha', href: '/gacha', icon: Box },
    { name: 'Upgrade', href: '/nft-upgrade', icon: Sparkles },
    { name: 'Collection', href: '/collection', icon: Box },
  ];

  const activeIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'mt-6 inline-flex rounded-2xl bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10',
          'transition-all duration-300',
          isHovered && 'border-blue-500/20 shadow-blue-500/10',
          className
        )}
      >
        <div className="flex items-center gap-6 p-4 py-2">
          {/* Logo */}
          {/* <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-0.5 border border-blue-500/20"
          >
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-black/40">
              <Wand2 className="h-4 w-4 text-blue-500" />
            </div>
          </motion.div> */}
          <Logo />

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item, idx) => (
              <NavItem
                key={`nav-${idx}`}
                href={item.href}
                icon={item.icon}
                name={item.name}
                isActive={pathname === item.href}
                index={idx}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        {/* Hover Effects */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? '0 0 30px rgba(59, 130, 246, 0.1)'
              : '0 0 0 rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Active Tab Indicator */}
        {activeIndex !== -1 && (
          <motion.div
            layoutId="active-tab-indicator"
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            style={{
              left: `${activeIndex * 25 + 12.5}%`,
              right: `${(3 - activeIndex) * 25 + 12.5}%`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
