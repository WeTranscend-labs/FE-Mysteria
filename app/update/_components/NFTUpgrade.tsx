'use client';

import { useState } from "react";
import { motion } from "framer-motion";

import { Package, ArrowRight, AlertTriangle } from "lucide-react";
import { NFT } from "@/types/nft";
import Link from "next/link";
import NFTCard from "./NFTCard";
import UpgradeModal from "./UpgradeModal";


const mockNFTs: NFT[] = [
    {
        id: 1,
        name: "Dragon Warrior",
        quality: "Rare",
        image: "https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/66c47b531d63d77f33c2e0b4_66c47aa8bd050428a7d9d50c_94.png",
    },
    {
        id: 2,
        name: "Mystic Mage",
        quality: "Epic",
        image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b78761b-b731-43f6-be47-63d69cd7d2a9/dh2l3xk-65a5c142-8660-4562-9e05-70779ae12324.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZiNzg3NjFiLWI3MzEtNDNmNi1iZTQ3LTYzZDY5Y2Q3ZDJhOVwvZGgybDN4ay02NWE1YzE0Mi04NjYwLTQ1NjItOWUwNS03MDc3OWFlMTIzMjQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LyZmLVDedBoY_KA3dHNLcKMSRHiLH2mUf2IofcYLfPg",
    },
    {
        id: 3,
        name: "Shadow Assassin",
        quality: "Legendary",
        image: "https://wemix-nft-content.wemixplay.com/aHR0cHM6Ly9nY2RuLndlbWFkZS5nYW1lcw/prod/ncgl/official/nft/card/3/NFT_Character_242_0.webp?w=650",
    },
];

export default function NFTUpgrade() {
    const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([]);
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [upgradeResult, setUpgradeResult] = useState<"success" | "failure" | null>(null);
    const [tokensSpent, setTokensSpent] = useState(0);

    const handleSelectNFT = (nft: NFT) => {
        if (selectedNFTs.find(n => n.id === nft.id)) {
            setSelectedNFTs(prev => prev.filter(n => n.id !== nft.id));
        } else if (selectedNFTs.length < 2) {
            setSelectedNFTs(prev => [...prev, nft]);
        }
    };

    const handleUpgrade = () => {
        setIsUpgrading(true);
        setTimeout(() => {
            const successRate = Math.min(100, tokensSpent / 10);
            setUpgradeResult(Math.random() * 100 < successRate ? "success" : "failure");
            setIsUpgrading(false);
        }, 2000);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-7xl font-bold mb-4 text-white tracking-tight">
                    NFT <span className="text-blue-500">Upgrade</span>
                </h1>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
                <p className="text-white/60 max-w-2xl mx-auto">
                    Select two NFTs to combine and upgrade them into a higher rarity.
                    Use tokens to increase your success rate!
                </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-end mb-8">
                <Link
                    href="/gacha"
                    className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-500 rounded-xl flex items-center gap-2 hover:bg-blue-500/30 transition-colors"
                >
                    <Package className="w-5 h-5" />
                    <span>Open Chests</span>
                </Link>
            </div>

            {/* NFT Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-white">Select NFTs to Combine</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {mockNFTs.map((nft) => (
                            <NFTCard
                                key={nft.id}
                                nft={nft}
                                isSelected={selectedNFTs.some(n => n.id === nft.id)}
                                onClick={() => handleSelectNFT(nft)}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-white">Selected NFTs</h2>
                    <div className="bg-black/40 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {selectedNFTs.map((nft) => (
                                <NFTCard
                                    key={nft.id}
                                    nft={nft}
                                    isSelected={true}
                                    onClick={() => handleSelectNFT(nft)}
                                />
                            ))}
                            {Array(2 - selectedNFTs.length).fill(0).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center"
                                >
                                    <span className="text-white/30">Select NFT</span>
                                </div>
                            ))}
                        </div>

                        {selectedNFTs.length === 2 && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/60">Success Rate</span>
                                        <span className="text-white font-medium">{Math.min(100, tokensSpent / 10)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={tokensSpent}
                                        onChange={(e) => setTokensSpent(Number(e.target.value))}
                                        className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/40">0 Tokens</span>
                                        <span className="text-white/40">1000 Tokens</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <button
                                        onClick={handleUpgrade}
                                        disabled={isUpgrading}
                                        className="w-full py-3 px-6 bg-blue-500/20 border border-blue-500/30 text-blue-500 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span>Upgrade NFTs</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <p className="flex items-center gap-2 text-sm text-yellow-500">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span>NFTs will be consumed in the process</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <UpgradeModal
                isOpen={isUpgrading || !!upgradeResult}
                onClose={() => setUpgradeResult(null)}
                result={upgradeResult}
                nfts={selectedNFTs}
            />
        </div>
    );
}