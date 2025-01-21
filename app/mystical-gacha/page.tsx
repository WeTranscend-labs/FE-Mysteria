"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Crown, Star, Trophy, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NFTRarity } from "@/types/rarities";
import { WarpBackground } from "@/components/ui/warp-background";
import TokenSelector from "./_components/TokenSelector";
import GachaSpinner from "./_components/GachaSpinner";
import RarityChart from "./_components/RarityChart";
import NFTRevealModal from "./_components/NFTRevealModal";

const rarities: Record<string, NFTRarity> = {
  Common: {
    name: "Common",
    chance: 50,
    color: "bg-gray-400",
    borderGlow: "shadow-gray-400/50",
    icon: <Medal className="w-6 h-6" />,
    bgGradient: "from-gray-400 to-gray-600",
  },
  Uncommon: {
    name: "Uncommon",
    chance: 30,
    color: "bg-green-500",
    borderGlow: "shadow-green-500/50",
    icon: <Star className="w-6 h-6" />,
    bgGradient: "from-green-400 to-green-600",
  },
  Rare: {
    name: "Rare",
    chance: 15,
    color: "bg-blue-500",
    borderGlow: "shadow-blue-500/50",
    icon: <Trophy className="w-6 h-6" />,
    bgGradient: "from-mysteria-cyan to-mysteria-blue",
  },
  Epic: {
    name: "Epic",
    chance: 4,
    color: "bg-purple-500",
    borderGlow: "shadow-purple-500/50",
    icon: <Sparkles className="w-6 h-6" />,
    bgGradient: "from-purple-400 to-purple-600",
  },
  Legendary: {
    name: "Legendary",
    chance: 1,
    color: "bg-yellow-500",
    borderGlow: "shadow-yellow-500/50",
    icon: <Crown className="w-6 h-6" />,
    bgGradient: "from-yellow-400 to-yellow-600",
  },
};

export default function MysticalGachaPage() {
  const [selectedToken, setSelectedToken] = useState(2);
  const [result, setResult] = useState<NFTItem | null>(null);
  const [balance, setBalance] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const handleGacha = () => {
    if (balance < selectedToken) {
      alert("Insufficient balance!");
      return;
    }

    setIsSpinning(true);
    setResult(null);
    setBalance(balance - selectedToken);
  };

  const handleSpinResult = (item: NFTItem) => {
    setIsSpinning(false);
    setResult(item);
    setShowReveal(true);
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-6xl font-bold text-center mb-12 bg-gradient-mysteria bg-clip-text text-transparent">
          NFT Gacha
        </h1>

        <TokenSelector
          selectedToken={selectedToken}
          onSelect={setSelectedToken}
        />

        <WarpBackground className="mt-12">
          <Card className="bg-opacity-50 backdrop-blur-sm">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GachaSpinner
                    onResult={handleSpinResult}
                    isSpinning={isSpinning}
                    rarities={rarities}
                  />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </WarpBackground>

        {/* Nút quay gacha */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleGacha}
            disabled={isSpinning}
            className="gradient-button p-8 px-12 py-6 text-2xl font-bold rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? "Spinning..." : "Spin Gacha"}
          </Button>
        </div>

        {/* kết qua sau khi quay gacha */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card
              className={`bg-gradient-to-br ${
                rarities[result.rarity].bgGradient
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">
                  You got a {result.rarity} NFT!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-4">
                <div className="text-6xl text-white">
                  {rarities[result.rarity].icon}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <RarityChart rarities={rarities} />
        </motion.div>
      </motion.div>

      <NFTRevealModal
        isOpen={showReveal}
        onClose={() => setShowReveal(false)}
        nft={result}
        rarities={rarities}
      />
    </div>
  );
}
