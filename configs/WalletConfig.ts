import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { kairos } from 'viem/chains';
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
  chains: [kairos],
  transports: {
    [kairos.id]: http('https://public-en-kairos.node.kaia.io'),
  },
  ssr: true,
});

export default walletConfig;
export { kairos as network };
