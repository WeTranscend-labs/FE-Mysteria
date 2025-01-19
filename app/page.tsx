import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Sparkles, Star, Trophy, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <Flame className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
          Mysteria
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Forge your destiny with NFT Gacha
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="text-lg">
            <Zap className="mr-2 h-5 w-5" /> Start Forging
          </Button>
          <Button size="lg" variant="outline" className="text-lg">
            <Sparkles className="mr-2 h-5 w-5" /> Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 backdrop-blur-lg bg-card/50">
            <Star className="h-12 w-12 mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">NFT Gacha System</h3>
            <p className="text-muted-foreground">
              Pull unique NFTs with varying rarities using our token-based gacha system
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-lg bg-card/50">
            <Trophy className="h-12 w-12 mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">NFT Upgrades</h3>
            <p className="text-muted-foreground">
              Enhance your NFTs through our unique forging system
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-lg bg-card/50">
            <Sparkles className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Rarity Tiers</h3>
            <p className="text-muted-foreground">
              From Common to Legendary, collect NFTs across five rarity tiers
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}