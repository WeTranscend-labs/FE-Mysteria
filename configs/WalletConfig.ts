import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { sepolia } from 'viem/chains';
import { http } from 'wagmi';

const { wallets } = getDefaultWallets();

const walletConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || '',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(''),
  },
  ssr: true,
});

export default walletConfig;
export { sepolia as network };
