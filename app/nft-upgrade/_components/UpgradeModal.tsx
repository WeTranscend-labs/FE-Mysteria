import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  X,
  Star,
  Clock,
  Tag,
  Trophy,
} from 'lucide-react';
import { NFT } from '@/types/nft';
import { TransformedNFT } from '@/hooks/useGetNFTs';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: 'success' | 'failure' | null;
  nft: TransformedNFT | null;
  targetQuality: string | null;
}

const qualityColors = {
  Common: 'white',
  Rare: 'text-blue-500',
  Epic: 'text-purple-500',
  Legendary: 'text-amber-500',
  Mythic: 'text-red-600',
};

export default function UpgradeModal({
  isOpen,
  onClose,
  result,
  nft,
  targetQuality,
}: UpgradeModalProps) {
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [result, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 isolate z-50">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl relative">
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                {result === null ? (
                  <div className="p-8">
                    <div className="flex gap-8">
                      {/* Source NFT Info */}
                      <div className="w-1/2 border-r border-white/10 pr-8">
                        <h3 className="text-lg font-medium text-white mb-4">
                          Source NFT
                        </h3>
                        {nft && (
                          <div className="space-y-4">
                            <div className="aspect-square rounded-lg overflow-hidden relative">
                              <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white font-medium">
                                  {nft.name}
                                </p>
                                <p
                                  className={
                                    qualityColors[
                                      nft.rarity as keyof typeof qualityColors
                                    ]
                                  }
                                >
                                  {nft.rarity}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-white/60">
                                <Star className="w-4 h-4" />
                                <span>
                                  Level {Math.floor(Math.random() * 10) + 1}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-white/60">
                                <Clock className="w-4 h-4" />
                                <span>Owned: 30d</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/60">
                                <Tag className="w-4 h-4" />
                                <span>
                                  #{Math.floor(Math.random() * 10000)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-white/60">
                                <Trophy className="w-4 h-4" />
                                <span>
                                  Rank {Math.floor(Math.random() * 100) + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Target NFT Info */}
                      <div className="w-1/2">
                        <h3 className="text-lg font-medium text-white mb-4">
                          Target Upgrade
                        </h3>
                        <div className="space-y-4">
                          <div className="aspect-square rounded-lg overflow-hidden relative bg-white/5 border border-white/10 flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-blue-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                              <p className="text-white font-medium">
                                Mystery {targetQuality}
                              </p>
                              <p
                                className={
                                  qualityColors[
                                    targetQuality as keyof typeof qualityColors
                                  ]
                                }
                              >
                                Upgrade in Progress
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-white/60">
                              <span>Success Rate</span>
                              <span className="text-green-500">75%</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                              <span>Failure Risk</span>
                              <span className="text-red-500">25%</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                              <span>Token Boost</span>
                              <span className="text-blue-500">+10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                      <h2 className="text-2xl font-light text-white mb-2">
                        Upgrading NFT
                      </h2>
                      <p className="text-white/60">
                        Please wait while we upgrade your NFT...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8">
                    {result === 'success' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                          <Sparkles className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-500 mb-4">
                          Upgrade Successful!
                        </h2>
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="text-center">
                            <p className="text-sm text-white/60 mb-1">
                              Original
                            </p>
                            <p className="text-white">{nft?.name}</p>
                            <p
                              className={
                                qualityColors[
                                  nft?.rarity as keyof typeof qualityColors
                                ]
                              }
                            >
                              {nft?.rarity}
                            </p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-white/20" />
                          <div className="text-center">
                            <p className="text-sm text-white/60 mb-1">
                              Upgraded
                            </p>
                            <p className="text-white">{nft?.name}</p>
                            <p
                              className={
                                qualityColors[
                                  targetQuality as keyof typeof qualityColors
                                ]
                              }
                            >
                              {targetQuality}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                          <span className="text-2xl text-red-500">×</span>
                        </div>
                        <h2 className="text-2xl font-bold text-red-500 mb-4">
                          Upgrade Failed
                        </h2>
                        <div className="max-w-md mx-auto">
                          <p className="text-white mb-2">
                            {nft?.name} was lost in the upgrade process
                          </p>
                          <p className="text-white/60 text-sm">
                            Upgrading NFTs carries risks. Higher quality
                            upgrades have lower success rates. Consider using
                            more tokens to boost your success rate next time.
                          </p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-white/40 text-center mt-6">
                      This window will close automatically in 5 seconds
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
