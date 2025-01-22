"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { NFT } from "@/types/nft";
import NFTSelection from "./NFTSelection";
import CombineButton from "./CombineButton";
import CombineModal from "./CombineModal";

export default function NFTCombine() {
  const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
  const [isCombining, setIsCombining] = useState(false);
  const [combineResult, setCombineResult] = useState<
    "success" | "failure" | null
  >(null);

  const handleCombine = () => {
    setIsCombining(true);
    setTimeout(() => {
      const successRate = selectedNFTs.length * 20; // Example success rate calculation
      setCombineResult(
        Math.random() * 100 < successRate ? "success" : "failure"
      );
      setIsCombining(false);
    }, 3000);
  };

  const handleSelect = (nft: NFT) => {
    setSelectedNFTs((prev) => [...prev, nft]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-mysteria bg-clip-text text-transparent">
        Combine NFTs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">
            Select NFTs to Combine
          </h2>
          <NFTSelection onSelect={handleSelect} />
        </div>
        <div className="flex flex-col items-center justify-center">
          {selectedNFTs.length > 0 && (
            <>
              <div className="text-center mb-4">
                <p className="text-xl font-semibold">
                  Success Rate: {selectedNFTs.length * 20}%
                </p>
              </div>
              <CombineButton
                onClick={handleCombine}
                disabled={selectedNFTs.length < 2}
              />
            </>
          )}
        </div>
      </div>
      <CombineModal
        isOpen={isCombining || !!combineResult}
        onClose={() => setCombineResult(null)}
        result={combineResult}
        nfts={selectedNFTs}
      />
    </motion.div>
  );
}
