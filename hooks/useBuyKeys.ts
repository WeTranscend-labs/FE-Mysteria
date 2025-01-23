'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI as abi } from '@/lib/contracts/contractABI';
import { parseEther } from 'viem';

// Enum định nghĩa các loại chìa khóa
export enum KeyType {
  Bronze, // 0
  Silver, // 1
  Gold, // 2
  Legendary, // 3
}

export interface BuyKeyArgs {
  keyType: KeyType; // Sử dụng enum thay vì number
}

export function useBuyKeys() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const calculateKeyPrice = (keyType: KeyType): bigint => {
    const basePrice = parseEther('0.2');
    const incrementPrice = parseEther('0.2');
    const price = basePrice + BigInt(keyType) * incrementPrice;
    return price;
  };

  const buyKey = async ({ keyType }: BuyKeyArgs) => {
    try {
      const price = calculateKeyPrice(keyType);

      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'buyKey',
        args: [keyType],
        value: price,
      });
    } catch (err) {
      console.error('Error buying key:', err);
      throw err;
    }
  };

  // Chờ xác nhận transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    buyKey,
    calculateKeyPrice,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
