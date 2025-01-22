import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Tag, Sparkles as SparklesIcon, Trophy as TrophyIcon, ArrowRight } from "lucide-react";
import type { NFTRarity } from "../types/rarities";

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
  const [currentStep, setCurrentStep] = useState(0);
  const isRare = nft?.rarity && ["Rare", "Legendary"].includes(nft.rarity);

  useEffect(() => {
    if (isOpen) {
      setShowNFT(false);
      setCurrentStep(0);
      const timer = setTimeout(() => {
        setShowNFT(true);
        setCurrentStep(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !nft) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Rare": return "mysteria-cyan";
      case "Legendary": return "amber-400";
      default: return "white/60";
    }
  };

  const getRarityRGB = (rarity: string) => {
    switch (rarity) {
      case "Rare": return "22, 189, 202";
      case "Legendary": return "251, 191, 36";
      default: return "255, 255, 255";
    }
  };

  const getRarityCardStyle = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return {
          background: "linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.2))",
          border: "2px solid rgba(251, 191, 36, 0.3)",
          boxShadow: "0 0 30px rgba(251, 191, 36, 0.2), inset 0 0 20px rgba(251, 191, 36, 0.1)",
          imageOverlay: "linear-gradient(to right, rgba(251, 191, 36, 0.1), rgba(0, 0, 0, 0.8))",
          animation: "legendary",
        };
      case "Rare":
        return {
          background: "linear-gradient(45deg, rgba(22, 189, 202, 0.1), rgba(22, 189, 202, 0.2))",
          border: "2px solid rgba(22, 189, 202, 0.3)",
          boxShadow: "0 0 20px rgba(22, 189, 202, 0.15), inset 0 0 15px rgba(22, 189, 202, 0.1)",
          imageOverlay: "linear-gradient(to right, rgba(22, 189, 202, 0.1), rgba(0, 0, 0, 0.8))",
          animation: "rare",
        };
      default:
        return {
          background: "linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
          imageOverlay: "linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8))",
          animation: "common",
        };
    }
  };

  const rarityColor = getRarityColor(nft.rarity);
  const rarityRGB = getRarityRGB(nft.rarity);
  const cardStyle = getRarityCardStyle(nft.rarity);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      <div className="relative w-full max-w-4xl mx-4 cursor-default">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          className="relative aspect-[16/9] rounded-lg overflow-hidden"
          style={{
            background: cardStyle.background,
            border: cardStyle.border,
            boxShadow: cardStyle.boxShadow,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated border effect for legendary items */}
          {nft.rarity === "Legendary" && (
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent animate-pulse" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          )}

          <div className="relative z-10 flex h-full">
            <div className="w-2/3 relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: cardStyle.imageOverlay }}
                />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            </div>

            <div className="w-1/3 p-8 relative">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 bg-${rarityColor} bg-opacity-10 border border-${rarityColor} border-opacity-20 rounded-lg`}
                  style={{
                    boxShadow: `0 0 20px rgba(${rarityRGB}, 0.2)`,
                  }}
                >
                  {nft.icon}
                  <span className={`text-${rarityColor} font-medium`}>
                    {nft.rarity}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className={`text-2xl font-light tracking-wide ${nft.rarity === "Legendary" ? "text-amber-400" : "text-white"}`}
                >
                  {nft.name}
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className={`flex items-center gap-3 ${nft.rarity === "Legendary" ? "text-amber-400/60" : "text-white/60"}`}>
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Just Minted</span>
                  </div>
                  <div className={`flex items-center gap-3 ${nft.rarity === "Legendary" ? "text-amber-400/60" : "text-white/60"}`}>
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">#{Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className={`flex items-center gap-3 ${nft.rarity === "Legendary" ? "text-amber-400/60" : "text-white/60"}`}>
                    <SparklesIcon className="w-4 h-4" />
                    <span className="text-sm">{rarities[nft.rarity].chance}% Chance</span>
                  </div>
                  <div className={`flex items-center gap-3 ${nft.rarity === "Legendary" ? "text-amber-400/60" : "text-white/60"}`}>
                    <TrophyIcon className="w-4 h-4" />
                    <span className="text-sm">Rank {Math.floor(Math.random() * 100) + 1}</span>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className={`w-full mt-8 bg-${rarityColor}/20 border border-${rarityColor}/30 text-${rarityColor} py-2 flex items-center justify-center gap-2 hover:bg-${rarityColor}/30 transition-colors rounded-lg`}
                  style={{
                    boxShadow: `0 0 20px rgba(${rarityRGB}, 0.1)`,
                  }}
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}