'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHighlight } from "../../components/ui/section-highlight";
import ChestRoom from "../mystical-gacha/_components/ChestRoom";
import { FloatingNav } from '@/components/floating-nav';
import { FloatingNavSub } from '@/components/floating-nav-sub';


export default function GachaPage() {
    const handleNavigate = (section: string) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Render FloatingNav */}
            <FloatingNavSub />


            <SectionHighlight
                containerClassName="pt-28 pb-10 "
            >

                <ChestRoom />

            </SectionHighlight>
        </>
    );
}
