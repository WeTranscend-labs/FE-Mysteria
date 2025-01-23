"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { RarityMorphingText } from "@/components/ui/RarityMorphingText";

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left relative z-10 pl-0 lg:pl-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h2 className="text-2xl md:text-3xl font-light text-mysteria-cyan">
              Discover & Collect
            </h2>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <RarityMorphingText className="!text-left !mx-0 !max-w-none" />
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                NFT Treasures
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mt-8 mb-8 text-muted-foreground max-w-xl"
          >
            Experience the thrill of NFT gacha with Mysteria. Summon rare artifacts, upgrade your collection, and discover legendary treasures in our mystical realm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="text-lg gradient-button rounded-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mysteria-cyan/20 to-purple-500/20 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(22,189,202,0.4),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                <span>Open Mystery Box</span>
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-mysteria-cyan hover:bg-mysteria-cyan/10 rounded-full relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mysteria-cyan/10 via-transparent to-mysteria-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <Star className="mr-2 h-5 w-5" />
                <span>View Collection</span>
              </div>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            {[
              { label: "NFTs Minted", value: "10K+" },
              { label: "Rare Finds", value: "1K+" },
              { label: "Legendary Items", value: "100+" },
            ].map((stat, index) => (
              <div key={index} className="text-left relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-mysteria-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -m-2" />
                <div className="relative">
                  <div className="text-2xl font-bold bg-gradient-mysteria bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - 3D Mystery Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative aspect-square w-full max-w-2xl mx-auto"
        >
          {/* Animated Mystery Box Container */}
          <div className="relative w-full h-full">
            {/* Glowing Background Effect */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-mysteria opacity-20 blur-3xl rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,189,202,0.2),transparent_70%)]" />
            </div>

            {/* Mystery Box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Box Face - Front */}
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-mysteria-cyan/20 to-purple-500/20 rounded-2xl shadow-2xl backdrop-blur-sm border border-mysteria-cyan/30"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(2px)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-20 h-20 text-mysteria-cyan animate-pulse" />
                  </div>
                </motion.div>

                {/* Floating Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "rgb(22, 189, 202)" : "rgb(168, 85, 247)",
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: [
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                      ],
                      y: [
                        Math.random() * 200 - 100,
                        Math.random() * 200 - 100,
                      ],
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,189,202,0.1)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(130,71,229,0.1)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(78,125,239,0.1)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>
    </section>
  );
}