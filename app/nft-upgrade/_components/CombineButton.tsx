import { Button } from "@/components/ui/button";

interface CombineButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function CombineButton({
  onClick,
  disabled,
}: CombineButtonProps) {
  return (
    <div className="text-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="gradient-button font-semibold py-3 px-6 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        Combine NFTs
      </Button>
    </div>
  );
}
