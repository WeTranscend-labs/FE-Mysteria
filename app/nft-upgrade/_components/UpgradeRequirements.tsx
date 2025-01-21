import type { NFT } from "@/types/nft";

interface UpgradeRequirementsProps {
  selectedNFT: NFT | null;
}

export default function UpgradeRequirements({
  selectedNFT,
}: UpgradeRequirementsProps) {
  const getRequiredTokens = (quality: string) => {
    switch (quality) {
      case "Rare":
        return 100;
      case "Epic":
        return 250;
      case "Legendary":
        return 500;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-mysteria bg-clip-text text-transparent">
        Upgrade Requirements
      </h2>
      {selectedNFT ? (
        <div>
          <p className="mb-2">
            Thẻ đã chọn:{" "}
            <span className="font-semibold">{selectedNFT.name}</span>
          </p>
          <p className="mb-2">
            Phẩm chất hiện tại:{" "}
            <span className="font-semibold">{selectedNFT.quality}</span>
          </p>
          <p className="">
            Token cần thiết:{" "}
            <span className="font-semibold">
              {getRequiredTokens(selectedNFT.quality)}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-400">
          Please select an NFT card to view upgrade requirements.
        </p>
      )}
    </div>
  );
}
