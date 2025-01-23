'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI as abi } from '@/lib/contracts/contractABI';

export interface NFTInfo {
  tokenId: bigint;
  tokenURI: string;
}

export function useUpgrade() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const upgrade = async () => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'upgradeToSilver',
      });
    } catch (err) {
      console.error('Error upgrading to Silver:', err);
      throw err;
    }
  };

  // Chờ xác nhận transaction
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    upgrade,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
