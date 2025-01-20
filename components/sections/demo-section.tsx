"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export function DemoSection() {
  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-mysteria bg-clip-text text-transparent">
            Try Your Luck ( Phần này em ny làm xong bỏ vô sau)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the thrill of our NFT gacha system with a free demo pull
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 backdrop-blur-lg bg-card/50 border-mysteria-cyan/20">
              <h3 className="text-2xl font-bold mb-4">Demo Gacha Pull</h3>
              <p className="text-muted-foreground mb-6">
                Try our gacha system with a free pull! Experience the excitement of revealing rare NFTs.
              </p>
              <div className="space-y-4">
                <Button className="w-full gradient-button">
                  <Star className="mr-2 h-5 w-5" /> Single Pull
                </Button>
                <Button className="w-full gradient-button">
                  <Sparkles className="mr-2 h-5 w-5" /> Multi Pull (x10)
                </Button>
              </div>

            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-square relative"
          >
            {/* Rarity Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {[
                { rarity: "Common", color: "gray-400", chance: "45%" },
                { rarity: "Uncommon", color: "green-400", chance: "30%" },
                { rarity: "Rare", color: "blue-400", chance: "15%" },
                { rarity: "Epic", color: "purple-400", chance: "8%" },
                { rarity: "Legendary", color: "yellow-400", chance: "2%" },
              ].map((tier, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between px-6 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/10"
                >
                  <span className={`text-${tier.color} font-semibold`}>{tier.rarity}</span>
                  <span className="text-muted-foreground">{tier.chance}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}