"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Rocket, Shield, Globe, Check, Clock } from "lucide-react";
import { SectionHighlight } from "@/components/ui/section-highlight";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROADMAP_PHASES = [
  {
    phase: "Phase 1: Launch",
    icon: <Sparkles className="h-5 w-5" />,
    title: "Foundation & Core Features",
    timeline: "Q2 2024",
    features: [
      "NFT gacha system implementation",
      "Basic rarity tiers and drop rates",
      "Wallet integration",
      "BitsCrunch security integration",
      "Community building",
      "Initial marketing campaign"
    ],
    status: "In Progress",
    progress: 65,
    color: "from-mysteria-cyan to-mysteria-blue"
  },
  {
    phase: "Phase 2: Enhancement",
    icon: <Rocket className="h-5 w-5" />,
    title: "Advanced Features",
    timeline: "Q3 2024",
    features: [
      "NFT fusion system",
      "Advanced rarity mechanics",
      "Marketplace integration",
      "Mobile app beta",
      "Expanded BitsCrunch features",
      "Community rewards program"
    ],
    status: "Upcoming",
    progress: 15,
    color: "from-mysteria-blue to-mysteria-purple"
  },
  {
    phase: "Phase 3: Expansion",
    icon: <Shield className="h-5 w-5" />,
    title: "Ecosystem Growth",
    timeline: "Q4 2024",
    features: [
      "Cross-chain compatibility",
      "Advanced trading features",
      "NFT staking system",
      "Enhanced security measures",
      "Partnership program",
      "Global marketing expansion"
    ],
    status: "Planned",
    progress: 0,
    color: "from-mysteria-purple to-mysteria-cyan"
  },
  {
    phase: "Phase 4: Evolution",
    icon: <Globe className="h-5 w-5" />,
    title: "Platform Maturity",
    timeline: "Q1 2025",
    features: [
      "DAO governance implementation",
      "Advanced NFT mechanics",
      "Mobile app full release",
      "Metaverse integration",
      "Additional chain support",
      "Enterprise partnerships"
    ],
    status: "Planned",
    progress: 0,
    color: "from-mysteria-cyan to-mysteria-blue"
  }
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full bg-gradient-to-r", color)}
      />
    </div>
  );
}

function PhaseCard({ phase, index }: { phase: typeof ROADMAP_PHASES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="p-6 bg-gradient-to-br from-background/50 to-background border-mysteria-cyan/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="space-y-6">
          {/* Phase Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-mysteria-cyan">
                  <div className="p-2 rounded-lg bg-mysteria-cyan/10">
                    {phase.icon}
                  </div>
                  {phase.phase}
                </div>
                <h3 className="text-xl font-bold">{phase.title}</h3>
              </div>
              <div className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full",
                phase.status === "In Progress" 
                  ? "bg-mysteria-cyan/10 text-mysteria-cyan"
                  : phase.status === "Upcoming"
                  ? "bg-mysteria-blue/10 text-mysteria-blue"
                  : "bg-muted text-muted-foreground"
              )}>
                {phase.status === "In Progress" && <Check className="inline-block w-3 h-3 mr-1" />}
                {phase.status === "Upcoming" && <Clock className="inline-block w-3 h-3 mr-1" />}
                {phase.status}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                {phase.timeline}
              </div>
              <div className="flex-1">
                <ProgressBar progress={phase.progress} color={phase.color} />
              </div>
              <div className="text-sm font-medium">
                {phase.progress}%
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {phase.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                className="flex items-start gap-2 p-3 rounded-lg text-sm bg-mysteria-cyan/5"
              >
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-mysteria-cyan" />
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative overflow-hidden">
      <SectionHighlight 
        containerClassName="py-20"
        dotColor="rgb(22, 189, 202)"
        dotOpacity="0.15"
        glowColor="rgba(22, 189, 202, 0.1)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 bg-mysteria-cyan/10 px-4 py-2 rounded-full text-mysteria-cyan text-sm font-medium mb-4">
              <Rocket className="h-4 w-4" />
              Development Roadmap
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-mysteria bg-clip-text text-transparent">
              Our Journey Forward
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Follow our development progress as we build the future of NFT gacha gaming
            </p>
          </div>

          {/* Timeline Connector */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-mysteria-cyan/50 via-mysteria-cyan/20 to-transparent hidden lg:block" />
            
            {/* Roadmap Grid */}
            <div className="grid gap-8 lg:gap-16">
              {ROADMAP_PHASES.map((phase, index) => (
                <div key={index} className={cn(
                  "lg:grid lg:grid-cols-2 lg:gap-8 items-center",
                  index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                )}>
                  {index % 2 === 0 ? (
                    <>
                      <PhaseCard phase={phase} index={index} />
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block" />
                      <PhaseCard phase={phase} index={index} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionHighlight>
    </section>
  );
}