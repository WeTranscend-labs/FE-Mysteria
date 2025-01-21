import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="flex justify-center space-x-4">
      {tokens.map((token) => (
        <motion.div
          key={token}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => onSelect(token)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedToken === token
                ? "gradient-button"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {token} Token
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
