import { ReactNode } from "react";

export interface NFTRarity {
  name: string;
  chance: number;
  color: string;
  borderGlow: string;
  icon: ReactNode;
  bgGradient: string;
}

export interface NFTItem {
  id: number;
  description: string;
  rarity: string;
  name: string;
  imageUrl: string;
  icon: ReactNode;
}
