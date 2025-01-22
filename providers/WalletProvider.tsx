'use client';

import walletConfig, { network } from '@/configs/WalletConfig';
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { ReactNode, useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function WalletProvider({ children }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();

  // Custom theme configurations
  const customDarkTheme = darkTheme({
    accentColor: '#17b6fa',
    accentColorForeground: '#000000',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  const customLightTheme = lightTheme({
    accentColor: '#17b6fa',
    accentColorForeground: '#000000',
    borderRadius: 'large',
    fontStack: 'system',
    overlayBlur: 'small',
  });

  const [rainbowKitTheme, setRainbowKitTheme] = useState(customDarkTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setRainbowKitTheme(theme === 'dark' ? customDarkTheme : customLightTheme);
  }, [theme]);

  return (
    <WagmiProvider config={walletConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={rainbowKitTheme}
          modalSize="wide"
          initialChain={network}
          locale="en"
          showRecentTransactions={true}
          appInfo={{
            appName: process.env.NEXT_PUBLIC_APP_NAME,
            learnMoreUrl: '',
          }}
          coolMode
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
