'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { NFT } from '@/types/nft';
import NFTChest from './NFTChest';
import HexagonProgress from './HexagonProgress';
import UpgradeModal from './UpgradeModal';
import { TransformedNFT } from '@/hooks/useGetNFTs';
import { useUpgrade } from '@/hooks/useUpgrade';
import { toast } from '@/hooks/use-toast';

export default function NFTUpgrade() {
  const [selectedNFT, setSelectedNFT] = useState<TransformedNFT | null>(null);
  const [targetQuality, setTargetQuality] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<
    'success' | 'failure' | null
  >(null);
  const [tokensSpent, setTokensSpent] = useState(0);
  const { upgrade } = useUpgrade();

  const handleSelectNFT = (nft: TransformedNFT) => {
    setSelectedNFT(nft);
    const qualities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
    const currentIndex = qualities.indexOf(nft.rarity);
    if (currentIndex < qualities.length - 1) {
      setTargetQuality(qualities[currentIndex + 1]);
    }
  };

  const calculateSuccessRate = () => {
    if (!selectedNFT || !targetQuality) return 0;

    const qualities = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];
    const currentIndex = qualities.indexOf(selectedNFT.rarity);
    const targetIndex = qualities.indexOf(targetQuality);
    const tierDifference = targetIndex - currentIndex;

    const baseRate = Math.max(10, 100 - tierDifference * 30);
    const tokenBonus = Math.min(tokensSpent * 0.1, 100 - baseRate);

    return Math.min(100, baseRate + tokenBonus);
  };

  const handleUpgrade = async () => {
    if (!selectedNFT || !targetQuality) return;

    await upgrade();
    setTimeout(() => {
      toast({
        title: 'Upgrading...',
        description: 'Please wait for the upgrade to complete.',
        duration: 10000,
      });
    }, 5000);
    setIsUpgrading(true);
    setTimeout(() => {
      //   const success = Math.random() * 100 < calculateSuccessRate();
      setUpgradeResult('success');
      setIsUpgrading(false);
    }, 18000);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-4 text-white tracking-tight">
            NFT <span className="text-blue-500">Upgrade</span>
          </h1>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
          <p className="text-white/60 max-w-2xl mx-auto">
            Select an NFT from your chest to upgrade it to a higher rarity.
            Higher rarity upgrades require more tokens and have lower success
            rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Source NFT Selection */}
          <div className="lg:sticky lg:top-8 z-20">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Source NFT
            </h2>
            <NFTChest onSelect={handleSelectNFT} selectedNFT={selectedNFT} />
          </div>

          {/* Upgrade Progress */}
          <div className="flex flex-col items-center justify-center lg:min-h-[600px] z-2">
            {selectedNFT && targetQuality ? (
              <>
                <HexagonProgress
                  percentage={calculateSuccessRate()}
                  sourceQuality={selectedNFT.rarity}
                  targetQuality={targetQuality}
                  isAnimating={isUpgrading}
                />

                <div className="w-full mt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Token Boost</span>
                      <span className="text-white font-medium">
                        +{Math.min(tokensSpent * 0.1, 100).toFixed(1)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={tokensSpent}
                      onChange={(e) => setTokensSpent(Number(e.target.value))}
                      className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">0 Tokens</span>
                      <span className="text-white/40">1000 Tokens</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <button
                      onClick={handleUpgrade}
                      disabled={isUpgrading}
                      className="w-full py-3 px-6 bg-blue-500/20 border border-blue-500/30 text-blue-500 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Upgrade NFT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="flex items-center gap-2 text-sm text-yellow-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span>NFT will be consumed if upgrade fails</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-white/40 text-center">
                Select an NFT from your chest to begin upgrade process
              </div>
            )}
          </div>

          {/* Target Preview */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Target Rarity
            </h2>
            <div className="bg-black/40 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
              {targetQuality ? (
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-xl border border-white/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <div
                        className="text-4xl mb-4"
                        style={{
                          color:
                            targetQuality === 'Rare'
                              ? 'rgb(59, 130, 246)'
                              : targetQuality === 'Epic'
                              ? 'rgb(168, 85, 247)'
                              : targetQuality === 'Legendary'
                              ? 'rgb(245, 158, 11)'
                              : 'white',
                        }}
                      >
                        ?
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">
                        Mystery {targetQuality}
                      </h3>
                      <p className="text-white/60 text-sm">
                        Upgrade your NFT to unlock a random{' '}
                        {targetQuality.toLowerCase()} item
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-2">
                      Rarity Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Base Success Rate</span>
                        <span className="text-white">
                          {Math.max(
                            10,
                            100 -
                              ([
                                'Common',
                                'Rare',
                                'Epic',
                                'Legendary',
                                'Mythic',
                              ].indexOf(targetQuality) -
                                [
                                  'Common',
                                  'Rare',
                                  'Epic',
                                  'Legendary',
                                  'Mythic',
                                ].indexOf(selectedNFT?.rarity || 'Common')) *
                                30
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Token Bonus</span>
                        <span className="text-blue-500">
                          +{Math.min(tokensSpent * 0.1, 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">
                          Final Success Rate
                        </span>
                        <span className="text-green-500">
                          {calculateSuccessRate().toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                  <span className="text-white/30">Select an NFT first</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <UpgradeModal
          isOpen={isUpgrading || !!upgradeResult}
          onClose={() => setUpgradeResult(null)}
          result={upgradeResult}
          nft={selectedNFT}
          targetQuality={targetQuality}
        />
      </div>
    </div>
  );
}
