
"use client";

import { Sparkles, Star, Trophy, Wand2, Gem, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      icon: Star,
      title: "Mystical Gacha",
      description: "Summon unique NFTs with varying rarities using magical tokens",
      color: "mysteria-cyan",
    },
    {
      icon: ArrowUpCircle,
      title: "NFT Fusion",
      description: "Combine lower-tier NFTs to create more powerful ones",
      color: "mysteria-blue",
    },
    {
      icon: Gem,
      title: "Rarity System",
      description: "Five tiers of rarity from Common to Legendary",
      color: "mysteria-purple",
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-mysteria bg-clip-text text-transparent">
            Magical Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the enchanting features that make Mysteria unique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-card rounded-xl p-8">
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-6 text-${feature.color}`}>
                    <feature.icon className="feature-icon w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
