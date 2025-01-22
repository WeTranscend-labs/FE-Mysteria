import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import type { NFTItem, NFTRarity } from "../types/rarities";

const ITEM_WIDTH = 200;
const VISIBLE_ITEMS = 5;
const TOTAL_ITEMS = VISIBLE_ITEMS * 3;
const CENTER_POSITION = Math.floor(VISIBLE_ITEMS / 2);

// Updated image collection for each rarity
const rarityImages = {
  Common: [
    "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
    "https://images.unsplash.com/photo-1646967822620-8e859a8b3a9c?w=800&q=80",
    "https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=800&q=80",
  ],
  Rare: [
    "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80",
    "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&q=80",
    "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=800&q=80",
  ],
  Legendary: [
    "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
    "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?w=800&q=80",
    "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80",
  ],
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showSpinEffect, setShowSpinEffect] = useState(false);

  const getRandomImage = (rarity: string) => {
    const images = rarityImages[rarity as keyof typeof rarityImages];
    return images[Math.floor(Math.random() * images.length)];
  };

  const generateItems = useCallback(
    (count: number) => {
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
          id: i,
          rarity: selectedRarity.name,
          description: `NFT #${Math.floor(Math.random() * 1000)}`,
          name: `${selectedRarity.name} #${Math.floor(Math.random() * 1000)}`,
          imageUrl: getRandomImage(selectedRarity.name),
          icon: selectedRarity.icon,
        });
      }
      return newItems;
    },
    [rarities]
  );

  useEffect(() => {
    // Initialize items
    const initialItems = generateItems(TOTAL_ITEMS);
    setItems(initialItems);
    setCurrentPosition(-(VISIBLE_ITEMS * ITEM_WIDTH));
  }, [generateItems]);

  const performSpinAnimation = useCallback(async () => {
    setSelectedIndex(null);
    setShowSpinEffect(true);

    // Generate new items for spinning
    const newItems = generateItems(TOTAL_ITEMS);
    setItems(newItems);

    // The center item will be our result
    const centerItem = newItems[CENTER_POSITION + VISIBLE_ITEMS];

    // Initial spin
    await controls.start({
      x: currentPosition - (ITEM_WIDTH * 8),
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    });

    // Final position calculation to center the result item
    const finalPosition = -(CENTER_POSITION + VISIBLE_ITEMS) * ITEM_WIDTH;

    // Slow down and stop at the result
    await controls.start({
      x: finalPosition,
      transition: {
        duration: 2,
        ease: [0.32, 0.72, 0.35, 1.12],
      },
    });

    setCurrentPosition(finalPosition);
    setSelectedIndex(CENTER_POSITION + VISIBLE_ITEMS);
    setShowSpinEffect(false);
    onResult(centerItem);
  }, [controls, currentPosition, generateItems, onResult]);

  useEffect(() => {
    if (isSpinning) {
      performSpinAnimation();
    }
  }, [isSpinning, performSpinAnimation]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "white/60";
      case "Rare": return "mysteria-cyan";
      case "Legendary": return "amber-400";
      default: return "white/60";
    }
  };

  return (
    <div className="relative w-full overflow-hidden h-64 gradient-button rounded-lg shadow-lg">
      {/* Spin Effects */}
      {showSpinEffect && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_30%,_rgba(22,189,202,0.2)_70%,_transparent_100%)]" />

          {/* Particle effects */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-mysteria-cyan rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="absolute left-1/2 right-0 h-full flex items-center">
        <motion.div
          animate={controls}
          initial={{ x: currentPosition }}
          className="flex gap-4 absolute h-full items-center"
          style={{ x: currentPosition }}
        >
          {items.map((item, index) => {
            const isSelected = selectedIndex === index;
            const rarityColor = getRarityColor(item.rarity);

            return (
              <motion.div
                key={item.id}
                className={`flex-shrink-0 w-[150px] h-48 rounded-xl overflow-hidden relative group 
                  ${isSelected ? `ring-4 ring-${rarityColor} ring-opacity-50` : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={isSelected ? {
                    scale: [1, 1.1, 1],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />

                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white"
                  animate={isSelected ? {
                    y: [20, 0],
                    opacity: [0, 1],
                    transition: { delay: 0.2, duration: 0.3 }
                  } : {}}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <span className={`text-lg font-bold text-${rarityColor}`}>
                      {item.rarity}
                    </span>
                  </div>
                  <span className="text-sm opacity-90">{item.name}</span>
                </motion.div>

                {isSelected && (
                  <>
                    <motion.div
                      className={`absolute inset-0 border-4 border-${rarityColor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Center Line Indicator */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-mysteria-cyan/50 z-10"
        animate={showSpinEffect ? {
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <motion.div
          className="absolute inset-0 w-4 -left-2"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(22,189,202,0.3), transparent)",
          }}
          animate={showSpinEffect ? {
            opacity: [0.3, 1, 0.3],
          } : {}}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </div>
  );
}