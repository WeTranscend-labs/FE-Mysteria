import { FloatingNavSub } from "@/components/floating-nav-sub";
import { SectionHighlight } from "../../components/ui/section-highlight";
import ChestRoom from "../mystical-gacha/_components/ChestRoom";
import KeyShop from "../mystical-gacha/_components/KeyShop";


export default function GachaPage() {
    return (
        <SectionHighlight
            containerClassName="pt-28 pb-8 "
        >
            <FloatingNavSub />
            <KeyShop />
        </SectionHighlight>
    );
}