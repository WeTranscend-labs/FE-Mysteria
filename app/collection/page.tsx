'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  Search,
  Star,
  Clock,
  Tag,
  Trophy,
  ChevronDown,
  Box,
  Move,
} from 'lucide-react';
import { SectionHighlight } from '@/components/ui/section-highlight';
import { FloatingNavSub } from '@/components/floating-nav-sub';
import { TransformedNFT, useGetNFTs } from '@/hooks/useGetNFTs';
import { useAccount } from 'wagmi';

// Mock NFT data
const mockNFTs: TransformedNFT[] = [
  {
    id: 1,
    name: 'Dragon Warrior',
    rarity: 'Legendary',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737633537/Mysteria/Discover_Powerful_Legendary_Items_fgx6yj.jpg',
    level: 5,
    acquiredDate: '2024-01-15',
    tokenId: '#1234',
    rank: 12,
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: 'Mystic Enchanter',
    rarity: 'Epic',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737633371/Mysteria/upgrade_nft_eewq7o.jpg',
    level: 3,
    acquiredDate: '2024-01-10',
    tokenId: '#2345',
    rank: 45,
    position: { x: 2, y: 0 },
  },
  {
    id: 3,
    name: 'Shadow Assassin',
    rarity: 'Rare',
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1737633257/Mysteria/Summon_Rare_NFTs_from_Mystical_Chests_krtidq.jpg',
    level: 2,
    acquiredDate: '2024-01-05',
    tokenId: '#3456',
    rank: 78,
    position: { x: 4, y: 0 },
  },
];

const rarityColors = {
  Common: 'white',
  Rare: 'rgb(59, 130, 246)',
  Epic: 'rgb(168, 85, 247)',
  Legendary: 'rgb(245, 158, 11)',
};

const GRID_SIZE = 9;
const CELL_SIZE = 80;
const NFT_SIZE = 2;
const GRID_GAP = 1;

export default function CollectionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [nfts, setNfts] = useState<TransformedNFT[]>(mockNFTs);
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { address: userAddress } = useAccount();
  const {
    nfts: rawNFTs,
    isLoading,
    error,
    getNFTsMetadata,
  } = useGetNFTs(userAddress);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (rawNFTs && rawNFTs.length > 0) {
        try {
          const transformedNFTs = await getNFTsMetadata(rawNFTs);
          setNfts([...mockNFTs, ...transformedNFTs]);
        } catch (err) {
          console.error('Error fetching NFT metadata:', err);
        }
      }
    };

    fetchNFTs();
  }, [rawNFTs, getNFTsMetadata]);

  const filteredNFTs = Array.isArray(nfts)
    ? nfts.filter(
        (nft) =>
          nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedRarity || nft.rarity === selectedRarity)
      )
    : [];

  // Find NFT at position
  const findNFTAtPosition = (x: number, y: number) => {
    return nfts.find((nft) => {
      const nftX = nft.position.x;
      const nftY = nft.position.y;
      return (
        x >= nftX && x < nftX + NFT_SIZE && y >= nftY && y < nftY + NFT_SIZE
      );
    });
  };

  // Check if position is valid (no overlap and within bounds)
  const isValidPosition = (x: number, y: number, nftId: number) => {
    // Check grid boundaries
    if (
      x < 0 ||
      y < 0 ||
      x + NFT_SIZE > GRID_SIZE ||
      y + NFT_SIZE > GRID_SIZE
    ) {
      return false;
    }

    // Check for overlapping with other NFTs
    return !nfts.some((nft) => {
      if (nft.id === nftId) return false;

      const nftX = nft.position.x;
      const nftY = nft.position.y;

      // Check if rectangles overlap
      return (
        x < nftX + NFT_SIZE &&
        x + NFT_SIZE > nftX &&
        y < nftY + NFT_SIZE &&
        y + NFT_SIZE > nftY
      );
    });
  };

  // Handle grid cell click
  const handleCellClick = (x: number, y: number) => {
    // If no NFT is selected, check if there's an NFT at the clicked position
    if (selectedNFT === null) {
      const nftAtPosition = findNFTAtPosition(x, y);
      if (nftAtPosition) {
        setSelectedNFT(nftAtPosition.id);
        setHoveredCell(null);
      }
      return;
    }

    // If an NFT is selected and the position is valid, move it
    if (isValidPosition(x, y, selectedNFT)) {
      setNfts((prev) =>
        prev.map((nft) =>
          nft.id === selectedNFT ? { ...nft, position: { x, y } } : nft
        )
      );
      setSelectedNFT(null);
      setHoveredCell(null);
    }
  };

  // Get preview style for grid cells
  const getPreviewStyle = (x: number, y: number) => {
    if (!selectedNFT || !hoveredCell) return {};

    const isInPreview =
      x >= hoveredCell.x &&
      x < hoveredCell.x + NFT_SIZE &&
      y >= hoveredCell.y &&
      y < hoveredCell.y + NFT_SIZE;

    if (!isInPreview) return {};

    const isValid = isValidPosition(hoveredCell.x, hoveredCell.y, selectedNFT);
    const color = isValid
      ? 'rgba(59, 130, 246, 0.2)'
      : 'rgba(239, 68, 68, 0.2)';
    const borderColor = isValid
      ? 'rgba(59, 130, 246, 0.5)'
      : 'rgba(239, 68, 68, 0.5)';

    return {
      backgroundColor: color,
      borderColor: borderColor,
    };
  };

  const cellSizeWithGap = CELL_SIZE + GRID_GAP;
  const totalGridSize = GRID_SIZE * cellSizeWithGap - GRID_GAP;

  return (
    <SectionHighlight containerClassName="pt-28 pb-8 ">
      <FloatingNavSub />
      <div className="min-h-screen ">
        <div className="max-w-[1600px] mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold mb-4 text-white tracking-tight">
              NFT <span className="text-blue-500">Collection</span>
            </h1>
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />
            <p className="text-white/60 max-w-2xl mx-auto">
              Arrange your NFTs in the mystical treasure chest. Click an NFT to
              select it, then click an empty space to place it.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - NFT Selection */}
            <div className="lg:w-1/3 space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search NFTs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Filter className="w-5 h-5 text-white/60" />
                  <span className="text-white">Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4">
                        <h3 className="text-white/60 mb-2">Rarity</h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(rarityColors).map(
                            ([rarity, color]) => (
                              <button
                                key={rarity}
                                onClick={() =>
                                  setSelectedRarity(
                                    selectedRarity === rarity ? null : rarity
                                  )
                                }
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                  selectedRarity === rarity
                                    ? `border-[${color}] bg-[${color}]/20 text-[${color}]`
                                    : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                              >
                                {rarity}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NFT List */}
              <div className="space-y-4">
                {selectedNFT && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-500">
                      <Move className="w-5 h-5" />
                      <span>Click on the grid to place the selected NFT</span>
                    </div>
                  </div>
                )}

                {filteredNFTs.map((nft) => (
                  <motion.div
                    key={nft.id}
                    className={`group relative cursor-pointer ${
                      selectedNFT === nft.id
                        ? `ring-2 ring-[${
                            rarityColors[
                              nft.rarity as keyof typeof rarityColors
                            ]
                          }]`
                        : ''
                    }`}
                    onClick={() => setSelectedNFT(nft.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-24 rounded-xl overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                      <div className="absolute inset-0 p-4 flex items-center gap-4">
                        <div
                          className="h-16 w-16 rounded-lg border-2 flex items-center justify-center relative group-hover:scale-110 transition-transform"
                          style={{
                            borderColor:
                              rarityColors[
                                nft.rarity as keyof typeof rarityColors
                              ],
                            backgroundColor: `${
                              rarityColors[
                                nft.rarity as keyof typeof rarityColors
                              ]
                            }20`,
                          }}
                        >
                          <Box
                            className="w-8 h-8"
                            style={{
                              color:
                                rarityColors[
                                  nft.rarity as keyof typeof rarityColors
                                ],
                            }}
                          />

                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                            style={{
                              backgroundColor:
                                rarityColors[
                                  nft.rarity as keyof typeof rarityColors
                                ],
                            }}
                          />
                        </div>

                        <div>
                          <h3 className="text-white font-medium group-hover:text-blue-500 transition-colors">
                            {nft.name}
                          </h3>
                          <p
                            className="text-sm"
                            style={{
                              color:
                                rarityColors[
                                  nft.rarity as keyof typeof rarityColors
                                ],
                            }}
                          >
                            {nft.rarity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Grid Layout */}
            <div className="lg:w-2/3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <div className="relative">
                  {/* Background chest image */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.25, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dlotuochc/image/upload/v1737628546/Mysteria/bronze_chest_bmjoqe.png"
                      alt="Chest Background"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>

                  {/* Grid Container */}
                  <div
                    ref={gridRef}
                    className="relative"
                    style={{
                      width: totalGridSize,
                      height: totalGridSize,
                      margin: 'auto',
                    }}
                  >
                    {/* Grid Cells */}
                    <div
                      className="absolute inset-0 grid gap-[1px]"
                      style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                      }}
                    >
                      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
                        (_, index) => {
                          const x = index % GRID_SIZE;
                          const y = Math.floor(index / GRID_SIZE);

                          return (
                            <motion.div
                              key={index}
                              className="border border-white/10 transition-colors duration-200"
                              style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                ...getPreviewStyle(x, y),
                              }}
                              onClick={() => handleCellClick(x, y)}
                              onMouseEnter={() =>
                                selectedNFT && setHoveredCell({ x, y })
                              }
                              onMouseLeave={() => setHoveredCell(null)}
                            />
                          );
                        }
                      )}
                    </div>

                    {/* NFTs */}
                    {nfts.map((nft) => (
                      <motion.div
                        key={nft.id}
                        className="absolute"
                        style={{
                          width:
                            NFT_SIZE * CELL_SIZE + (NFT_SIZE - 1) * GRID_GAP,
                          height:
                            NFT_SIZE * CELL_SIZE + (NFT_SIZE - 1) * GRID_GAP,
                        }}
                        initial={false}
                        animate={{
                          x: nft.position.x * cellSizeWithGap,
                          y: nft.position.y * cellSizeWithGap,
                          scale: selectedNFT === nft.id ? 1.05 : 1,
                          zIndex: selectedNFT === nft.id ? 10 : 1,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                        onClick={() =>
                          handleCellClick(nft.position.x, nft.position.y)
                        }
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden group">
                          <img
                            src={nft.image}
                            alt={nft.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${
                                rarityColors[
                                  nft.rarity as keyof typeof rarityColors
                                ]
                              }40 0%, transparent 70%)`,
                            }}
                          />

                          {/* NFT Info */}
                          <div className="absolute bottom-2 left-2 right-2">
                            <div
                              className="px-2 py-1 rounded text-xs font-medium text-center backdrop-blur-sm transition-all duration-300 group-hover:py-2"
                              style={{
                                backgroundColor: `${
                                  rarityColors[
                                    nft.rarity as keyof typeof rarityColors
                                  ]
                                }20`,
                                color:
                                  rarityColors[
                                    nft.rarity as keyof typeof rarityColors
                                  ],
                              }}
                            >
                              {nft.name}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Grid Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                        backgroundSize: `${cellSizeWithGap}px ${cellSizeWithGap}px`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionHighlight>
  );
}
