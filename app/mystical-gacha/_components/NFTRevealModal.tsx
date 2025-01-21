"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { NFTRarity } from "@/types/rarities";
import Image from "next/image";

interface NFTRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: {
    rarity: string;
    name: string;
    imageUrl: string;
    icon: React.ReactNode;
  } | null;
  rarities: Record<string, NFTRarity>;
}

export default function NFTRevealModal({
  isOpen,
  onClose,
  nft,
  rarities,
}: NFTRevealModalProps) {
  const [showNFT, setShowNFT] = useState(false);
  const isRare =
    nft?.rarity && ["Rare", "Epic", "Legendary"].includes(nft.rarity);

  useEffect(() => {
    if (isOpen) {
      setShowNFT(false);
      const timer = setTimeout(() => setShowNFT(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setShowNFT(false);
        onClose();
      }}
    >
      <DialogContent className="max-w-2xl bg-transparent border-0 shadow-none">
        <div className="relative w-full aspect-square rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!showNFT && isRare && (
              <motion.div
                key="effects"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.5, 2],
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 2,
                    times: [0, 0.5, 1],
                    repeat: 0,
                  }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-40 origin-bottom"
                      style={{
                        backgroundColor:
                          nft?.rarity === "Legendary"
                            ? "#FFD700"
                            : nft?.rarity === "Epic"
                            ? "#9B30FF"
                            : "#4169E1",
                        rotate: `${i * 30}deg`,
                      }}
                    />
                  ))}
                </motion.div>

                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        nft?.rarity === "Legendary"
                          ? "#FFD700"
                          : nft?.rarity === "Epic"
                          ? "#9B30FF"
                          : "#4169E1",
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: Math.random() * 400 - 200,
                      y: Math.random() * 400 - 200,
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      times: [0, 0.5, 1],
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            )}

            {showNFT && nft && (
              <motion.div
                key="nft"
                className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  duration: 0.5,
                }}
              >
                <Image
                  src={nft.imageUrl || "/placeholder.svg"}
                  alt={nft.name}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`px-4 py-2 rounded-full ${
                      rarities[nft.rarity].color
                    } flex items-center gap-2`}
                  >
                    {nft.icon}
                    <span className="text-xl font-bold text-white">
                      {nft.rarity}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-2xl font-bold text-white text-center"
                  >
                    {nft.name}
                  </motion.h2>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
