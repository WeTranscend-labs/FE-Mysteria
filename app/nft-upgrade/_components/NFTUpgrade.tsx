"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { NFT } from "@/types/nft";
import NFTSelection from "./NFTSelection";
import UpgradeRequirements from "./UpgradeRequirements";
import UpgradeModal from "./UpgradeModal";
import UpgradeButton from "./UpgradeButton";

export default function NFTUpgrade() {
  const [selectedLowRarityNFT, setSelectedLowRarityNFT] = useState<NFT | null>(
    null
  );
  const [selectedHighRarityNFT, setSelectedHighRarityNFT] =
    useState<NFT | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<
    "success" | "failure" | null
  >(null);
  const [tokensSpent, setTokensSpent] = useState(0);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      const successRate = Math.min(100, tokensSpent / 10);
      setUpgradeResult(
        Math.random() * 100 < successRate ? "success" : "failure"
      );
      setIsUpgrading(false);
    }, 3000);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokensSpent(Number(event.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-mysteria bg-clip-text text-transparent">
        NFT Card Upgrade
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">
            Select Low Rarity NFT
          </h2>
          <NFTSelection onSelect={setSelectedLowRarityNFT} />
        </div>
        <div className="flex flex-col items-center justify-center">
          {selectedLowRarityNFT && selectedHighRarityNFT && (
            <>
              <UpgradeRequirements selectedNFT={selectedLowRarityNFT} />
              <div className="text-center mb-4">
                <p className="text-xl font-semibold">
                  Success Rate: {Math.min(100, tokensSpent / 10)}%
                </p>
                <input
                  type="number"
                  value={tokensSpent}
                  onChange={handleTokenChange}
                  className="mt-2 p-2 rounded bg-gray-800"
                  placeholder="Enter tokens"
                />
              </div>
              <UpgradeButton
                onClick={handleUpgrade}
                disabled={!selectedLowRarityNFT || !selectedHighRarityNFT}
              />
            </>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">
            Select High Rarity NFT
          </h2>
          <NFTSelection onSelect={setSelectedHighRarityNFT} />
        </div>
      </div>
      <UpgradeModal
        isOpen={isUpgrading || !!upgradeResult}
        onClose={() => setUpgradeResult(null)}
        result={upgradeResult}
        nft={selectedLowRarityNFT}
      />
    </motion.div>
  );
}
