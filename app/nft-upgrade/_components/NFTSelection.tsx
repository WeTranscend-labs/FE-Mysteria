import { useState } from "react";
import { motion } from "framer-motion";
import type { NFT } from "@/types/nft";
import Image from "next/image";

interface NFTSelectionProps {
  onSelect: (nft: NFT) => void;
}

const mockNFTs: NFT[] = [
  {
    id: 1,
    name: "Dragon Warrior",
    quality: "Rare",
    image:
      "https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/66c47b531d63d77f33c2e0b4_66c47aa8bd050428a7d9d50c_94.png",
  },
  {
    id: 2,
    name: "Mystic Mage",
    quality: "Epic",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b78761b-b731-43f6-be47-63d69cd7d2a9/dh2l3xk-65a5c142-8660-4562-9e05-70779ae12324.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZiNzg3NjFiLWI3MzEtNDNmNi1iZTQ3LTYzZDY5Y2Q3ZDJhOVwvZGgybDN4ay02NWE1YzE0Mi04NjYwLTQ1NjItOWUwNS03MDc3OWFlMTIzMjQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LyZmLVDedBoY_KA3dHNLcKMSRHiLH2mUf2IofcYLfPg",
  },
  {
    id: 3,
    name: "Shadow Assassin",
    quality: "Legendary",
    image:
      "https://wemix-nft-content.wemixplay.com/aHR0cHM6Ly9nY2RuLndlbWFkZS5nYW1lcw/prod/ncgl/official/nft/card/3/NFT_Character_242_0.webp?w=650",
  },
];

export default function NFTSelection({ onSelect }: NFTSelectionProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (nft: NFT) => {
    setSelectedId(nft.id);
    onSelect(nft);
  };

  return (
    <div className="bg-opacity-10 rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">
        Select NFT Card
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockNFTs.map((nft) => (
          <motion.div
            key={nft.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer bg-opacity-20 rounded-lg p-4 ${
              selectedId === nft.id ? "ring-2 ring-yellow-400" : ""
            }`}
            onClick={() => handleSelect(nft)}
          >
            <Image
              src={nft.image || "/placeholder.svg"}
              alt={nft.name}
              width={400}
              height={128}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibol">{nft.name}</h3>
            <p className="text-sm text-gray-300">{nft.quality}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
