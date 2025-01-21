"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Sparkles, Star, Diamond } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { NFTRarity } from "@/types/rarities";
import { ProgressBar } from "@/components/sections/roadmap-section";

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

export default function RarityChart({ rarities }: RarityChartProps) {
  const raritiesArray = Object.values(rarities);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-mysteria bg-clip-text text-transparent">
          Rarity Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {raritiesArray.map((rarity, index) => {
          const Icon = iconMap[rarity.name as keyof typeof iconMap];
          return (
            <motion.div
              key={rarity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <Card
                className={`bg-gradient-to-br ${rarity.bgGradient} hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="relative text-white"
                  >
                    <Icon className="w-12 h-12" />
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.3 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="font-bold text-lg text-center text-white"
                  >
                    {rarity.name}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-white text-sm font-medium"
                  >
                    {rarity.chance}% Chance
                  </motion.div>
                  <motion.div
                    className="w-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  >
                    <Progress value={rarity.chance} className="h-2" />
                  </motion.div>
                  {/* <ProgressBar
                    progress={rarity.chance}
                    color="from-mysteria-cyan to-mysteria-blue"
                  /> */}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
