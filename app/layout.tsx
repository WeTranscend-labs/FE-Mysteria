import { AOSInit } from '@/components/aos-init';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import WalletProvider from '@/providers/WalletProvider';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import logo from '@/imgs/logo.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mysteria | NFT Gacha Platform',
  description:
    'Transform your digital collection through the power of NFT Gacha and upgrades',
  icons: {
    icon: [
      {
        url: logo.src,
        type: 'image/png',
      },
      {
        url: logo.src,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: logo.src,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: logo.src,
        sizes: '180x180',
      },
    ],
  },
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
          <WalletProvider>
            <AOSInit />

            {children}
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
