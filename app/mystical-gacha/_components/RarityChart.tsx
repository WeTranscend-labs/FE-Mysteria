import { motion } from "framer-motion";
import { Crown, Trophy, Sparkles, Star, Diamond } from "lucide-react";
import type { NFTRarity } from "../types/rarities";

interface RarityChartProps {
  rarities: Record<string, NFTRarity>;
}

const iconMap = {
  Common: Diamond,
  Uncommon: Star,
  Rare: Trophy,
  Epic: Sparkles,
  Legendary: Crown,
};

const rarityColors = {
  Common: "text-white/60",
  Uncommon: "text-emerald-400",
  Rare: "text-mysteria-cyan",
  Epic: "text-purple-400",
  Legendary: "text-amber-400",
};

export default function RarityChart({ rarities }: RarityChartProps) {
  const raritiesArray = Object.values(rarities);

  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
      <h2 className="text-lg font-medium text-white/80 mb-4 flex items-center gap-2">
        <span className="text-mysteria-cyan">Drop Rates</span>
      </h2>

      <div className="grid grid-cols-5 gap-3">
        {raritiesArray.map((rarity) => {
          const Icon = iconMap[rarity.name as keyof typeof iconMap];
          const textColor = rarityColors[rarity.name as keyof typeof rarityColors];

          return (
            <motion.div
              key={rarity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-mysteria-cyan/30 transition-colors">
                <div className={`${textColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${textColor}`}>
                    {rarity.name}
                  </div>
                  <div className="text-xs text-white/40">
                    {rarity.chance}%
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}