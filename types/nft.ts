interface NFTItem {
  id: number;
  description: string;
  rarity: string;
  name: string;
  imageUrl: string;
  icon: React.ReactNode;
}
export interface NFT {
  id: number;
  name: string;
  quality: string;
  image: string;
}