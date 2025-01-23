import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Trophy, Star, Crown } from 'lucide-react';
import { ChestType } from '../types/chest';

interface ChestPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
  chest: ChestType;
}

const rarityImages = {
  Common: [
    'https://ipfs.io/ipfs/QmNqBDFWgak6cmgtzKzxRcva2AP7eZ46DaVmC7hzChzmzu',
    'https://ipfs.io/ipfs/QmcKX7unDHLYrfT8usWrMKzYMD6EzUUwPvcbifKAyjPwoz',
  ],
  Rare: [
    'https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=800&q=80',
    'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&q=80',
  ],
  Legendary: [
    'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80',
    'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
  ],
};

const rarityIcons = {
  Common: Star,
  Rare: Trophy,
  Legendary: Crown,
};

export default function ChestPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  chest,
}: ChestPreviewModalProps) {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 text-center border-b border-white/10">
            <h2 className="text-2xl font-light text-white mb-2">
              Opening {chest.name}
            </h2>
            <p className="text-white/60">
              Preview possible rewards from this chest
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Rarity Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Common', rate: chest.dropRates.common },
                { name: 'Rare', rate: chest.dropRates.rare },
                { name: 'Legendary', rate: chest.dropRates.superRare },
              ].map((rarity) => {
                const Icon =
                  rarityIcons[rarity.name as keyof typeof rarityIcons];
                const images =
                  rarityImages[rarity.name as keyof typeof rarityImages];

                return (
                  <div key={rarity.name} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-mysteria-cyan" />
                        <span className="text-white font-medium">
                          {rarity.name}
                        </span>
                      </div>
                      <span className="text-white/60">{rarity.rate}%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden relative group"
                        >
                          <img
                            src={image}
                            alt={`${rarity.name} NFT Example ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/10">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-mysteria-cyan/20 hover:bg-mysteria-cyan/30 border border-mysteria-cyan/30 rounded-lg text-mysteria-cyan flex items-center justify-center gap-2 transition-colors"
            >
              <span>Start Opening</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
