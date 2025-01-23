'use client';

import { ChestType } from '@/app/mystical-gacha/types/chest';
import { contractABI as abi } from '@/lib/contracts/contractABI';
import { useReadContract } from 'wagmi';

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

  const formatKeys = (keysData: unknown): Record<ChestType['type'], number> => {
    // Nếu không có dữ liệu, trả về object với giá trị 0
    if (!keysData || !Array.isArray(keysData)) {
      return {
        Bronze: 0,
        Silver: 0,
        Gold: 0,
        Legend: 0,
      };
    }

    const keysArray = keysData.map((key) =>
      typeof key === 'bigint' ? key : BigInt(key as string)
    );

    return {
      Bronze: Number(keysArray[0] || 0),
      Silver: Number(keysArray[1] || 0),
      Gold: Number(keysArray[2] || 0),
      Legend: Number(keysArray[3] || 0),
    };
  };

  return {
    keys: formatKeys(data),
    isLoading,
    isSuccess,
    error,
  };
}
