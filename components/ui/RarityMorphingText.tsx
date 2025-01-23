import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

const rarityColors = {
    Common: "text-white/90",
    Uncommon: "text-emerald-400",
    Rare: "text-blue-500",
    Epic: "text-purple-500",
    Legendary: "text-amber-400"
};

const rarityTexts = ["Uncommon", "Common", "Rare", "Epic", "Legendary"];

const useMorphingText = (texts: string[]) => {
    const textIndexRef = useRef(0);
    const morphRef = useRef(0);
    const cooldownRef = useRef(0);
    const timeRef = useRef(new Date());

    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);

    const setStyles = useCallback(
        (fraction: number) => {
            const [current1, current2] = [text1Ref.current, text2Ref.current];
            if (!current1 || !current2) return;

            current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            const invertedFraction = 1 - fraction;
            current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
            current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

            const currentText = texts[textIndexRef.current % texts.length];
            const nextText = texts[(textIndexRef.current + 1) % texts.length];

            current1.textContent = currentText;
            current2.textContent = nextText;

            // Update colors based on rarity
            current1.className = `absolute inset-x-0 top-0 m-auto inline-block w-full ${rarityColors[currentText as keyof typeof rarityColors]}`;
            current2.className = `absolute inset-x-0 top-0 m-auto inline-block w-full ${rarityColors[nextText as keyof typeof rarityColors]}`;
        },
        [texts],
    );

    const doMorph = useCallback(() => {
        morphRef.current -= cooldownRef.current;
        cooldownRef.current = 0;

        let fraction = morphRef.current / morphTime;

        if (fraction > 1) {
            cooldownRef.current = cooldownTime;
            fraction = 1;
        }

        setStyles(fraction);

        if (fraction === 1) {
            textIndexRef.current++;
        }
    }, [setStyles]);

    const doCooldown = useCallback(() => {
        morphRef.current = 0;
        const [current1, current2] = [text1Ref.current, text2Ref.current];
        if (current1 && current2) {
            current2.style.filter = "none";
            current2.style.opacity = "100%";
            current1.style.filter = "none";
            current1.style.opacity = "0%";
        }
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const newTime = new Date();
            const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
            timeRef.current = newTime;

            cooldownRef.current -= dt;

            if (cooldownRef.current <= 0) doMorph();
            else doCooldown();
        };

        animate();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [doMorph, doCooldown]);

    return { text1Ref, text2Ref };
};

const Texts: React.FC = () => {
    const { text1Ref, text2Ref } = useMorphingText(rarityTexts);
    return (
        <>
            <span
                className="absolute inset-x-0 top-0 m-auto inline-block w-full"
                ref={text1Ref}
            />
            <span
                className="absolute inset-x-0 top-0 m-auto inline-block w-full"
                ref={text2Ref}
            />
        </>
    );
};

const SvgFilters: React.FC = () => (
    <svg id="filters" className="hidden" preserveAspectRatio="xMidYMid slice">
        <defs>
            <filter id="threshold">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
                />
            </filter>
        </defs>
    </svg>
);

interface RarityMorphingTextProps {
    className?: string;
}

export const RarityMorphingText: React.FC<RarityMorphingTextProps> = ({ className }) => (
    <div
        className={cn(
            "relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none [filter:url(#threshold)_blur(0.6px)] md:h-24 lg:text-[6rem]",
            className,
        )}
    >
        <Texts />
        <SvgFilters />
    </div>
);