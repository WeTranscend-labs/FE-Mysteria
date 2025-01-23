import { FloatingNavSub } from "@/components/floating-nav-sub";
import { SectionHighlight } from "../../components/ui/section-highlight";
import NFTUpgrade from "./_components/NFTUpgrade";




export default function UpgradePage() {
    return (

        <>
            {/* Render FloatingNav */}
            <FloatingNavSub />


            <SectionHighlight
                containerClassName="pt-20 pb-10 "
            >


                <NFTUpgrade />
            </SectionHighlight>
        </>

    );
}