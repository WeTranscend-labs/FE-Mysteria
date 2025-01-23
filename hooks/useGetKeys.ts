'use client';

import { useReadContract } from 'wagmi';
import { contractABI as abi } from '@/lib/contracts/contractABI';
import { KeyType } from './useBuyKeys';

export interface UserKeys {
  [KeyType.Bronze]: number;
  [KeyType.Silver]: number;
  [KeyType.Gold]: number;
  [KeyType.Legendary]: number;
}

export function useGetKeys(userAddress?: string) {
  const { data, error, isLoading, isSuccess } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'getKeys',
    args: [userAddress],
    query: {
      enabled: !!userAddress,
    },
  });

  const formatKeys = (keysData: unknown): UserKeys | undefined => {
    if (!Array.isArray(keysData)) return undefined;

    const keysArray = keysData.map((key) =>
      typeof key === 'bigint' ? key : BigInt(key as string)
    );

    return {
      [KeyType.Bronze]: Number(keysArray[0] || 0),
      [KeyType.Silver]: Number(keysArray[1] || 0),
      [KeyType.Gold]: Number(keysArray[2] || 0),
      [KeyType.Legendary]: Number(keysArray[3] || 0),
    };
  };

  return {
    keys: formatKeys(data),
    isLoading,
    isSuccess,
    error,
  };
}
