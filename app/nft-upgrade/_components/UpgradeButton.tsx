import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface UpgradeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function UpgradeButton({
  onClick,
  disabled,
}: UpgradeButtonProps) {
  return (
    <div className="text-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="gradient-button font-semibold py-3 px-6 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        Upgrade Card
      </Button>
      <p className="mt-4 text-yellow-300 flex items-center justify-center">
        <AlertTriangle className="mr-2" />
        Warning: The card may downgrade if the upgrade fails!
      </p>
    </div>
  );
}
