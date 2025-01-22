import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NFT } from "@/types/nft";

interface CombineModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: "success" | "failure" | null;
  nfts: NFT[];
}

export default function CombineModal({
  isOpen,
  onClose,
  result,
  nfts,
}: CombineModalProps) {
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="rounded-lg p-8 max-w-md w-full text-center relative gradient-button"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-white"
            >
              ✕
            </button>
            {result === null ? (
              <CombineAnimation />
            ) : (
              <CombineResult result={result} nfts={nfts} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CombineAnimation() {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-24 h-24 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-400"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-4">Combining...</h2>
      <p className="text-gray-300">Please wait a moment</p>
    </div>
  );
}

function CombineResult({
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
    <div>
      {result === "success" ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Combination Successful!
          </h2>
          <div>
            <p className="text-white mb-2">
              New Quality:{" "}
              <span className="font-semibold text-yellow-400">
                {getNewQuality(nfts)}
              </span>
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            Combination Failed
          </h2>
          <p className="text-white mb-2">
            No changes were made to the selected NFTs.
          </p>
        </motion.div>
      )}
      <p className="text-gray-300">
        This window will close automatically after 5 seconds
      </p>
    </div>
  );
}
