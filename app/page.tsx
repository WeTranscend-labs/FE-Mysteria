import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Star, Trophy, Wand2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/50 to-accent/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <Wand2 className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent-foreground">
          Mysteria
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
          Unleash the Magic of NFT Gacha
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="text-lg">
            <Star className="mr-2 h-5 w-5" /> Start Summoning
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
          <Card className="p-6 backdrop-blur-lg bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
            <Star className="h-12 w-12 mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2">Mystical Gacha</h3>
            <p className="text-muted-foreground">
              Summon unique NFTs with varying rarities using magical tokens
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-lg bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
            <Trophy className="h-12 w-12 mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">Arcane Fusion</h3>
            <p className="text-muted-foreground">
              Combine and enhance your NFTs through mystical fusion rituals
            </p>
          </Card>
          <Card className="p-6 backdrop-blur-lg bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
            <Sparkles className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Rarity Tiers</h3>
            <p className="text-muted-foreground">
              From Common to Legendary, collect mystical artifacts of varying power
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}