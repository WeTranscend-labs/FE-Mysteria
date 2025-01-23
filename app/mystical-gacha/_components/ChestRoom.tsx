'use client';

import { KeyType } from '@/hooks/useBuyKeys';
import { useGetKeys } from '@/hooks/useGetKeys';
import { motion } from 'framer-motion';
import { Key, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { chests } from '../data/chests';
import { ChestType } from '../types/chest';
import type { NFTItem } from '../types/rarities';
import ChestPreviewModal from './ChestPeviewModal';
import GachaSpinner from './GachaSpinner';
import NFTRevealModal from './NFTRevealModal';

export default function ChestRoom() {
  const { address, isConnected } = useAccount();
  const { keys, isLoading: isLoadingKeys } = useGetKeys(address);

  const [selectedChest, setSelectedChest] = useState<ChestType | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [resultNFT, setResultNFT] = useState<NFTItem | null>(null);
  const [showSelectedChest, setShowSelectedChest] = useState(false);
  const [keyBalances, setKeyBalances] = useState<
    Record<ChestType['type'], number>
  >({
    Bronze: 0,
    Silver: 0,
    Gold: 0,
    Legend: 0,
  });

  useEffect(() => {
    if (keys) {
      setKeyBalances({
        Bronze: keys[0],
        Silver: keys[1],
        Gold: keys[2],
        Legend: keys[3],
      });
    }
  }, [keys]);

  useEffect(() => {
    const savedKeyBalances = localStorage.getItem('keyBalances');
    if (savedKeyBalances) {
      setKeyBalances(JSON.parse(savedKeyBalances));
    }
  }, []);

  const handleOpenChest = (chest: ChestType) => {
    if (keyBalances[chest.type] <= 0) return;
    setSelectedChest(chest);
    setShowSelectedChest(true);
    setShowPreview(true);
  };

  const handleConfirmOpen = () => {
    if (!selectedChest) return;

    const newKeyBalances = {
      ...keyBalances,
      [selectedChest.type]: keyBalances[selectedChest.type] - 1,
    };
    setKeyBalances(newKeyBalances);
    localStorage.setItem('keyBalances', JSON.stringify(newKeyBalances));

    setShowPreview(false);
    setShowSpinner(true);
    setIsSpinning(true);
  };

  const handleSpinResult = (nft: NFTItem) => {
    setResultNFT(nft);
    setIsSpinning(false);
    setShowReveal(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setShowSelectedChest(false);
    setSelectedChest(null);
  };

  const handleCloseReveal = () => {
    setShowReveal(false);
    setShowSpinner(false);
    setSelectedChest(null);
    setResultNFT(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold mb-4 text-white tracking-tight">
          Treasure <span className="text-blue-500">Room</span>
        </h1>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
        <p className="text-white/60 max-w-2xl mx-auto">
          Choose a chest to open and discover rare NFTs within. Each chest has
          different drop rates for rare items!
        </p>
      </div>

      {/* Key Balances */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {Object.entries(keyBalances).map(([type, amount]) => {
          const chest = chests.find((c) => c.type === type);
          if (!chest) return null;

          return (
            <div key={type} className="relative group">
              <div
                className="absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: chest.color }}
              />
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4" style={{ color: chest.color }} />
                    <span className="text-white/60">{type}</span>
                  </div>
                  <span className="text-white font-medium">{amount} Keys</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Chest Display */}
      {showSelectedChest && selectedChest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-12"
        >
          <div className="relative max-w-xl mx-auto">
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <img
                src={selectedChest.image}
                alt={selectedChest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${selectedChest.color}, transparent 70%)`,
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 text-6xl"
                  style={{ color: selectedChest.color }}
                >
                  {selectedChest.icon}
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {selectedChest.name}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/60"
                >
                  {selectedChest.description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {chests.map((chest) => (
          <motion.div
            key={chest.id}
            className="relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ backgroundColor: chest.color }}
            />

            <div
              className="relative bg-black/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm"
              style={{
                boxShadow: `0 0 20px ${chest.glowColor}`,
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={chest.image}
                  alt={chest.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${chest.glowColor}, transparent 70%)`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-4xl" style={{ color: chest.color }}>
                      {chest.icon}
                    </div>
                    <h3 className="text-xl font-medium text-white">
                      {chest.name}
                    </h3>
                  </div>

                  <p className="text-white/60 text-sm mb-4">
                    {chest.description}
                  </p>

                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Common:</span>
                      <span className="text-white/60">
                        {chest.dropRates.common}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Rare:</span>
                      <span style={{ color: chest.color }}>
                        {chest.dropRates.rare}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Legendary:</span>
                      <span className="text-purple-400">
                        {chest.dropRates.superRare}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenChest(chest)}
                    disabled={keyBalances[chest.type] <= 0 || isSpinning}
                    className="w-full mt-6 py-3 px-4 flex items-center justify-center gap-2 rounded-lg transition-all disabled:bg-white/5 disabled:text-white/20 disabled:border-white/5"
                    style={{
                      backgroundColor: `${chest.color}10`,
                      color: chest.color,
                      borderColor: `${chest.color}20`,
                      borderWidth: 1,
                    }}
                  >
                    {isSpinning ? (
                      <span>Opening...</span>
                    ) : keyBalances[chest.type] > 0 ? (
                      <>
                        <Key className="w-4 h-4" />
                        <span>Open Chest</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Need Key</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gacha Spinner */}
      {showSpinner && selectedChest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-5xl mx-4">
            <GachaSpinner
              isSpinning={isSpinning}
              onResult={handleSpinResult}
              rarities={{
                Common: {
                  name: 'Common',
                  chance: selectedChest.dropRates.common,
                  color: 'bg-white/20',
                  borderGlow: 'shadow-white/20',
                  icon: selectedChest.icon,
                  bgGradient: 'from-white/10 to-white/20',
                },
                Rare: {
                  name: 'Rare',
                  chance: selectedChest.dropRates.rare,
                  color: 'bg-mysteria-cyan',
                  borderGlow: 'shadow-mysteria-cyan',
                  icon: selectedChest.icon,
                  bgGradient: 'from-mysteria-cyan/80 to-mysteria-cyan',
                },
                Legendary: {
                  name: 'Legendary',
                  chance: selectedChest.dropRates.superRare,
                  color: selectedChest.color,
                  borderGlow: selectedChest.glowColor,
                  icon: selectedChest.icon,
                  bgGradient: `from-[${selectedChest.color}] to-[${selectedChest.glowColor}]`,
                },
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Preview Modal */}
      {selectedChest && (
        <ChestPreviewModal
          isOpen={showPreview}
          onClose={handleClosePreview}
          onConfirm={handleConfirmOpen}
          chest={selectedChest}
        />
      )}

      {/* NFT Reveal Modal */}
      {resultNFT && selectedChest && (
        <NFTRevealModal
          isOpen={showReveal}
          onClose={handleCloseReveal}
          nft={resultNFT}
          rarities={{
            Common: {
              name: 'Common',
              chance: selectedChest.dropRates.common,
              color: 'bg-white/20',
              borderGlow: 'shadow-white/20',
              icon: selectedChest.icon,
              bgGradient: 'from-white/10 to-white/20',
            },
            Rare: {
              name: 'Rare',
              chance: selectedChest.dropRates.rare,
              color: 'bg-mysteria-cyan',
              borderGlow: 'shadow-mysteria-cyan',
              icon: selectedChest.icon,
              bgGradient: 'from-mysteria-cyan/80 to-mysteria-cyan',
            },
            Legendary: {
              name: 'Legendary',
              chance: selectedChest.dropRates.superRare,
              color: selectedChest.color,
              borderGlow: selectedChest.glowColor,
              icon: selectedChest.icon,
              bgGradient: `from-[${selectedChest.color}] to-[${selectedChest.glowColor}]`,
            },
          }}
        />
      )}
    </div>
  );
}
