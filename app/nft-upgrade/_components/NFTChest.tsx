import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash as Treasure, X } from "lucide-react";
import { NFT } from "@/types/nft";


interface NFTChestProps {
    onSelect: (nft: NFT) => void;
    selectedNFT: NFT | null;
}

const mockNFTs: NFT[] = [
    {
        id: 1,
        name: "Dragon Warrior",
        quality: "Common",
        image: "https://cdn.prod.website-files.com/64354b8ce4872a52ac1c7b06/66c47b531d63d77f33c2e0b4_66c47aa8bd050428a7d9d50c_94.png",
    },
    {
        id: 2,
        name: "Mystic Mage",
        quality: "Rare",
        image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6b78761b-b731-43f6-be47-63d69cd7d2a9/dh2l3xk-65a5c142-8660-4562-9e05-70779ae12324.jpg",
    },
    {
        id: 3,
        name: "Shadow Assassin",
        quality: "Epic",
        image: "https://wemix-nft-content.wemixplay.com/aHR0cHM6Ly9nY2RuLndlbWFkZS5nYW1lcw/prod/ncgl/official/nft/card/3/NFT_Character_242_0.webp?w=650",
    },
];

const qualityColors = {
    Common: "text-white",
    Rare: "text-blue-500",
    Epic: "text-purple-500",
    Legendary: "text-amber-500",
    Mythic: "text-red-600",
};

const qualityGlows = {
    Common: "shadow-white/20",
    Rare: "shadow-blue-500/20",
    Epic: "shadow-purple-500/20",
    Legendary: "shadow-amber-500/20",
    Mythic: "shadow-red-600/20",
};

export default function NFTChest({ onSelect, selectedNFT }: NFTChestProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (nft: NFT) => {
        onSelect(nft);
        setIsOpen(false);
    };

    return (
        <>
            {/* Chest Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:border-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Treasure className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-lg font-medium text-white">NFT Chest</h3>
                        <p className="text-sm text-white/60">
                            {selectedNFT ? `Selected: ${selectedNFT.name}` : "Select an NFT to upgrade"}
                        </p>
                    </div>
                </div>
            </motion.button>

            {/* NFT Inventory Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 isolate z-90" >
                        <motion.div

                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <motion.div

                                className="relative w-full max-w-4xl mx-4 bg-black"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Modal Content */}
                                <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                                    <div className="p-6 border-b border-white/10">
                                        <h2 className="text-2xl font-light text-white">NFT Inventory</h2>
                                        <p className="text-white/60 text-sm">Select an NFT to upgrade</p>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {mockNFTs.map((nft) => (
                                                <motion.button
                                                    key={nft.id}
                                                    onClick={() => handleSelect(nft)}
                                                    className={`relative group ${selectedNFT?.id === nft.id ? "ring-2" : ""
                                                        } rounded-lg overflow-hidden`}

                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="aspect-square relative">
                                                        <img
                                                            src={nft.image}
                                                            alt={nft.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                                        <div className="absolute inset-0 flex flex-col justify-end p-3">
                                                            <h4 className="text-white font-medium text-sm mb-1">{nft.name}</h4>
                                                            <p className={`text-xs ${qualityColors[nft.quality as keyof typeof qualityColors]}`}>
                                                                {nft.quality}
                                                            </p>
                                                        </div>

                                                        {/* Selection Indicator */}
                                                        {selectedNFT?.id === nft.id && (
                                                            <motion.div

                                                                style={{
                                                                    borderColor: nft.quality === "Common" ? "rgb(255, 255, 255, 0.2)" :
                                                                        nft.quality === "Rare" ? "rgb(59, 130, 246)" :
                                                                            nft.quality === "Epic" ? "rgb(168, 85, 247)" :
                                                                                nft.quality === "Legendary" ? "rgb(245, 158, 11)" :
                                                                                    "rgb(220, 38, 38)",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}