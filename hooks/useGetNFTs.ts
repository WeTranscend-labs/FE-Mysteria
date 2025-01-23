'use client';

import { contractABI as abi } from '@/lib/contracts/contractABI';
import { useCallback } from 'react';
import { useReadContract } from 'wagmi';

// Enum định nghĩa các loại NFT (giống như KeyType)
export enum NFTType {
  Bronze, // 0
  Silver, // 1
  Gold, // 2
  Legendary, // 3
}

// Interface cho thông tin NFT
export interface NFTInfo {
  tokenId: bigint;
  tokenURI: string;
}

// Interface cho NFT đã chuyển đổi
export interface TransformedNFT {
  id: number;
  name: string;
  rarity: string;
  image: string;
  level: number;
  acquiredDate: string;
  tokenId: string;
  rank: number;
  position: { x: number; y: number };
}

export function useGetNFTs(userAddress: `0x${string}` | undefined) {
  const { data, error, isLoading, isSuccess } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'getAllUserNFTs',
    args: [userAddress],
    // enabled: !!userAddress,
  });

  const parseNFTMetadata = async (tokenURI: string) => {
    try {
      const response = await fetch(
        tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
      );
      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error('Error parsing NFT metadata:', error);
      return null;
    }
  };

  const getNFTsMetadata = useCallback(async (nfts: NFTInfo[]) => {
    const metadataPromises = nfts.map(async (nft, index) => {
      const metadata = await parseNFTMetadata(nft.tokenURI);
      return {
        id: 10,
        name: metadata?.name || `NFT #${index + 1}`,
        rarity: extractRarityFromName(metadata?.name) || 'Common',
        image:
          metadata?.image?.replace('ipfs://', 'https://ipfs.io/ipfs/') ||
          'https://via.placeholder.com/150',
        level: 1,
        acquiredDate: new Date().toISOString().split('T')[0],
        tokenId: `#${nft.tokenId.toString()}`,
        rank: Math.floor(Math.random() * 100),
        position: { x: 6, y: 0 },
      };
    });

    return Promise.all(metadataPromises);
  }, []);

  const extractRarityFromName = (name?: string): string | undefined => {
    if (!name) return undefined;
    const rarityLevels = ['Legendary', 'Epic', 'Rare', 'Common'];
    return rarityLevels.find((rarity) =>
      name.toLowerCase().includes(rarity.toLowerCase())
    );
  };

  return {
    nfts: data as NFTInfo[] | undefined,
    error,
    isLoading,
    isSuccess,
    getNFTsMetadata,
  };
}
