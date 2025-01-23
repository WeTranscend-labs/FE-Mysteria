'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI as abi } from '@/lib/contracts/contractABI';
import { KeyType } from './useBuyKeys';

export interface UseKeyArgs {
  keyType: KeyType;
}

export function useKeys() {
  const [transactionStatus, setTransactionStatus] = useState<{
    status: 'idle' | 'pending' | 'signing' | 'confirmed' | 'failed';
    error?: string;
    nftMetadata?: string;
  }>({ status: 'idle' });

  const {
    data: hash,
    error: writeContractError,
    isPending,
    writeContract,
  } = useWriteContract();

  const useKeyWithGasSponsor = async ({ keyType }: UseKeyArgs) => {
    setTransactionStatus({ status: 'signing' });

    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'useKeyWithGasSponsor',
        args: [keyType],
      });
    } catch (err) {
      console.error('Error using key:', err);
      setTransactionStatus({
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
      throw err;
    }
  };

  // Chờ xác nhận transaction
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Theo dõi trạng thái pending
  if (isPending && transactionStatus.status !== 'signing') {
    setTransactionStatus({ status: 'pending' });
  }

  // Theo dõi trạng thái confirmed
  if (isConfirmed) {
    setTransactionStatus({ status: 'confirmed' });
  }

  // Theo dõi trạng thái lỗi
  if (receiptError) {
    setTransactionStatus({
      status: 'failed',
      error: receiptError.message,
    });
  }

  // Xử lý lỗi ghi contract
  if (writeContractError && transactionStatus.status !== 'failed') {
    setTransactionStatus({
      status: 'failed',
      error: writeContractError.message,
    });
  }

  return {
    useKeyWithGasSponsor,
    transactionStatus,
    hash,
    isConfirming,
    isConfirmed,
    error: transactionStatus.error,
  };
}
