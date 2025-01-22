import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface TokenSelectorProps {
  selectedToken: number;
  onSelect: (token: number) => void;
}

export default function TokenSelector({
  selectedToken,
  onSelect,
}: TokenSelectorProps) {
  const tokens = [2, 5, 10];

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-light text-white/60 uppercase tracking-widest mb-6">Select Amount</h3>
      <div className="flex justify-center gap-4 flex-wrap">
        {tokens.map((token) => (
          <motion.button
            key={token}
            onClick={() => onSelect(token)}
            className={`px-8 py-3 font-light tracking-wide transition-all relative
              ${selectedToken === token
                ? "text-mysteria-cyan bg-white/10 border-mysteria-cyan"
                : "text-white/60 hover:text-white bg-white/5 border-white/10 hover:border-white/30"
              }
              border rounded-lg shadow-md`}
          >
            <div className="flex items-center gap-2">
              <Coins className={`w-4 h-4 ${selectedToken === token ? "text-mysteria-cyan" : ""}`} />
              <span>{token}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}