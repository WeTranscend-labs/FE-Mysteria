import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { NFT } from "@/types/nft";


interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: "success" | "failure" | null;
    nfts: NFT[];
}

export default function UpgradeModal({
    isOpen,
    onClose,
    result,
    nfts,
}: UpgradeModalProps) {
    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [result, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative max-w-md w-full mx-4 bg-black/40 border border-white/5 rounded-xl p-8 backdrop-blur-sm"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white"
                        >
                            ×
                        </button>

                        {result === null ? (
                            <UpgradeAnimation />
                        ) : (
                            <UpgradeResult result={result} nfts={nfts} />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function UpgradeAnimation() {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
                className="mb-6"
            >
                <Sparkles className="w-12 h-12 text-blue-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Upgrading NFTs</h2>
            <p className="text-white/60">Please wait while we combine your NFTs...</p>
        </div>
    );
}

function UpgradeResult({
    result,
    nfts,
}: {
    result: "success" | "failure";
    nfts: NFT[];
}) {
    const getNewQuality = (nfts: NFT[]) => {
        const qualities = ["Common", "Rare", "Epic", "Legendary"];
        const highestQuality = Math.max(
            ...nfts.map((nft) => qualities.indexOf(nft.quality))
        );
        return qualities[highestQuality + 1] || "Mythic";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
        >
            {result === "success" ? (
                <>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="mb-6 mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                    >
                        <Sparkles className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-green-500 mb-4">
                        Upgrade Successful!
                    </h2>
                    <p className="text-white mb-2">
                        New Quality:{" "}
                        <span className="text-amber-500 font-medium">
                            {getNewQuality(nfts)}
                        </span>
                    </p>
                </>
            ) : (
                <>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="mb-6 mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center"
                    >
                        <span className="text-2xl text-red-500">×</span>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-red-500 mb-4">
                        Upgrade Failed
                    </h2>
                    <p className="text-white/60">Your NFTs were consumed in the process</p>
                </>
            )}
            <p className="mt-6 text-sm text-white/40">
                This window will close automatically in 5 seconds
            </p>
        </motion.div>
    );
}