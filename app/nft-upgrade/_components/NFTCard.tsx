import { NFT } from '@/types/nft';
import { motion } from 'framer-motion';

interface NFTCardProps {
  nft: NFT;
  isSelected: boolean;
  onClick: () => void;
}

const qualityColors = {
  Common: 'white',
  Rare: 'rgb(59, 130, 246)', // blue-500
  Epic: 'rgb(168, 85, 247)', // purple-500
  Legendary: 'rgb(245, 158, 11)', // amber-500
};

export default function NFTCard({ nft, isSelected, onClick }: NFTCardProps) {
  const color = qualityColors[nft.quality as keyof typeof qualityColors];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative cursor-pointer group ${
        isSelected ? 'ring-2' : 'hover:ring-1'
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      <div className="relative aspect-[3/4] rounded-xl p-4 flex flex-col justify-end bg-black/40 backdrop-blur-sm border border-white/5">
        <div className="space-y-1">
          <h3 className="text-white font-medium truncate">{nft.name}</h3>
          <p className="text-sm" style={{ color }}>
            {nft.quality}
          </p>
        </div>
      </div>

      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          style={{
            border: `2px solid ${color}`,
          }}
        />
      )}
    </motion.div>
  );
}
