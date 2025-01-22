'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Wand2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomConnectButton } from './wallet/CustomConnectButton';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', section: 'features' },
    { name: 'Demo', href: '/gacha' },
    { name: 'Stats', section: 'stats' },
    { name: 'Roadmap', section: 'roadmap' },
  ];


  const handleNavigation = (section?: string, href?: string) => {
    if (href) {
      window.location.href = href; // Hoặc sử dụng Router.push nếu đang dùng Next.js Router
    } else if (section) {
      onNavigate(section);
    }
    setIsMenuOpen(false);
  };


  if (!mounted) return null;

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-primary/10 shadow-lg'
          : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-mysteria p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
              <Wand2 className="h-4 w-4 text-mysteria-cyan" />
            </div>
          </div>
          <button
            onClick={() => handleNavigation('home')}
            className="text-lg font-semibold bg-gradient-mysteria bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Mysteria
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => handleNavigation(item.section, item.href)}
              className="text-sm font-medium hover:text-mysteria-cyan transition-colors rounded-full"
            >
              {item.name}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {/* <Button className="gradient-button rounded-full">
            Connect Wallet
          </Button> */}

          <CustomConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full hover:bg-primary/10"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-4 py-3 space-y-2 bg-background/80 backdrop-blur-md border-t border-primary/10">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start text-sm font-medium hover:bg-primary/10 rounded-full"
                  onClick={() => handleNavigation(item.section)}
                >
                  {item.name}
                </Button>
              ))}
              {/* <Button className="w-full gradient-button rounded-full">
                Connect Wallet
              </Button> */}

              <CustomConnectButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
