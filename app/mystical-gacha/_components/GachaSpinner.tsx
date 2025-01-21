"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { NFTRarity } from "@/types/rarities";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface NFTItem {
  id: number;
  description: string;
  rarity: string;
  name: string;
  imageUrl: string;
  icon: React.ReactNode;
}

const ITEM_WIDTH = 200;
const VISIBLE_ITEMS = 50;
const TOTAL_ITEMS = VISIBLE_ITEMS * 3;

const rarityImages = {
  Common:
    "https://www.nftqt.com/content/images/2021/07/Categories-featured-image.jpeg",
  Uncommon: "https://i.ytimg.com/vi/D3YhbB_CPQU/maxresdefault.jpg",
  Rare: "https://thecoinacademy.co/wp-content/uploads/2022/02/Qu_est-ce-qui-rend-un-nft-rare.png-800x500.webp",
  Epic: "https://media.artsper.com/artwork/1098633_1_l.jpg",
  Legendary: "https://i.redd.it/2dt4rnb0q2u71.jpg",
};

interface GachaSpinnerProps {
  onResult: (item: NFTItem) => void;
  isSpinning: boolean;
  rarities: Record<string, NFTRarity>;
}

export default function GachaSpinner({
  onResult,
  isSpinning,
  rarities,
}: GachaSpinnerProps) {
  const [items, setItems] = useState<NFTItem[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const controls = useAnimation();
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const generateItems = useCallback(
    (count: number, offset = 0) => {
      const newItems: NFTItem[] = [];
      const raritiesArray = Object.values(rarities);

      for (let i = 0; i < count; i++) {
        const rand = Math.random() * 100;
        let selectedRarity = raritiesArray[0];
        let cumulative = 0;

        for (const rarity of raritiesArray) {
          cumulative += rarity.chance;
          if (rand <= cumulative) {
            selectedRarity = rarity;
            break;
          }
        }

        newItems.push({
          id: i + offset,
          rarity: selectedRarity.name,
          description: `NFT #${Math.floor(Math.random() * 1000)}`,
          name: `${selectedRarity.name} #${Math.floor(Math.random() * 1000)}`,
          imageUrl:
            rarityImages[selectedRarity.name as keyof typeof rarityImages],
          icon: selectedRarity.icon,
        });
      }
      return newItems;
    },
    [rarities]
  );

  useEffect(() => {
    const initialItems = generateItems(TOTAL_ITEMS);
    setItems(initialItems);
    setCurrentPosition(-(VISIBLE_ITEMS * ITEM_WIDTH));
  }, [rarities, generateItems]);

  const handleScrollReset = useCallback(async () => {
    controls.set({ x: -(VISIBLE_ITEMS * ITEM_WIDTH) });
    setCurrentPosition(-(VISIBLE_ITEMS * ITEM_WIDTH));
  }, [controls]);

  useEffect(() => {
    if (isSpinning) {
      setSelectedIndex(null);
      const spinDuration = 5;
      const minSpins = 2;
      const middleSetStart = VISIBLE_ITEMS;
      const randomIndex =
        middleSetStart + Math.floor(Math.random() * VISIBLE_ITEMS);
      const targetPosition = -(randomIndex * ITEM_WIDTH);

      controls
        .start({
          x: targetPosition,
          transition: {
            duration: spinDuration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        })
        .then(() => {
          setSelectedIndex(randomIndex);
          onResult(items[randomIndex]);
          handleScrollReset();
        });
    }
  }, [isSpinning, items, controls, onResult, handleScrollReset]);

  return (
    <Card className="relative w-full overflow-hidden h-64 gradient-button">
      <CardContent className="p-0">
        {/* <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20">
          <div className="w-1 h-12 bg-blue-500 rounded-b-full relative">
            <ChevronDown className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-500 w-6 h-6 animate-bounce" />
          </div>
        </div> */}

        <div className="absolute left-1/2 right-0 h-full flex items-center">
          <motion.div
            animate={controls}
            initial={{ x: currentPosition }}
            className="flex gap-4 absolute h-full items-center"
            style={{ x: currentPosition }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`flex-shrink-0 w-[200px] h-48 rounded-xl overflow-hidden relative group 
                  ${
                    selectedIndex === index
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className="text-lg font-bold">{item.rarity}</span>
                  </div>
                  <span className="text-sm opacity-90">{item.name}</span>
                </div>

                {selectedIndex === index && (
                  <motion.div
                    className="absolute inset-0 border-4 border-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" /> */}

        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/50 z-10">
          <div className="absolute inset-0 animate-pulse bg-blue-500/30 w-4 -left-2" />
        </div>
      </CardContent>
    </Card>
  );
}
