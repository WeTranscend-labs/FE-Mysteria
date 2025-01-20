import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from "@/components/theme-toggle";
import { AOSInit } from '@/components/aos-init';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mysteria | NFT Gacha Platform',
  description: 'Transform your digital collection through the power of NFT Gacha and upgrades',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AOSInit />

          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}