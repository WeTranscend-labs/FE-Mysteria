import { motion } from "framer-motion";

interface HexagonProgressProps {
    percentage: number;
    sourceQuality: string;
    targetQuality: string;
    isAnimating: boolean;
}

const qualityColors = {
    Common: "white",
    Rare: "rgb(59, 130, 246)", // blue-500
    Epic: "rgb(168, 85, 247)", // purple-500
    Legendary: "rgb(245, 158, 11)", // amber-500
    Mythic: "rgb(220, 38, 38)", // red-600
};

export default function HexagonProgress({
    percentage,
    sourceQuality,
    targetQuality,
    isAnimating,
}: HexagonProgressProps) {
    const sourceColor = qualityColors[sourceQuality as keyof typeof qualityColors];
    const targetColor = qualityColors[targetQuality as keyof typeof qualityColors];

    // SVG path for hexagon
    const size = 200;
    const strokeWidth = 8;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const angle = Math.PI / 3;

    // Calculate points for hexagon
    const points = Array.from({ length: 6 }, (_, i) => ({
        x: center + radius * Math.cos(angle * i - Math.PI / 2),
        y: center + radius * Math.sin(angle * i - Math.PI / 2),
    }));

    const path = `M ${points[0].x},${points[0].y} ${points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ')} Z`;

    // Calculate progress path length
    const pathLength = 6 * radius; // Approximate hexagon perimeter
    const progressLength = (percentage / 100) * pathLength;

    return (
        <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90 z-20">
                {/* Background hexagon */}
                <path
                    d={path}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress hexagon */}
                <motion.path
                    d={path}
                    fill="none"
                    stroke={`url(#gradient-${sourceQuality}-${targetQuality})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: percentage / 100 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient
                        id={`gradient-${sourceQuality}-${targetQuality}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor={sourceColor} />
                        <stop offset="100%" stopColor={targetColor} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Percentage text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    animate={isAnimating ? {
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1],
                    } : {}}
                    transition={{
                        duration: 1,
                        repeat: isAnimating ? Infinity : 0,
                        ease: "easeInOut",
                    }}
                    className="text-4xl font-bold text-white"
                >
                    {percentage.toFixed(1)}%
                </motion.div>
                <div className="text-white/60 text-sm">Success Rate</div>
            </div>

            {/* Source and Target indicators */}
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sourceColor }} />
                <span className="text-white">{sourceQuality}</span>
            </div>
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-white">{targetQuality}</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: targetColor }} />
            </div>
        </div>
    );
}