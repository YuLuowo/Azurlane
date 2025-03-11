'use client'
import React, { useState } from "react";
import Filters from "@/components/ui/Filters";
import ShipList from "@/components/ui/ShipList";

export default function ShipPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedFaction, setSelectedFaction] = useState<string[]>([]);

    return (
        <div className="flex flex-col justify-center items-center py-8">
            {/* 篩選條件區塊 */}
            <Filters
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                selectedFaction={selectedFaction}
                setSelectedFaction={setSelectedFaction}
            />

            {/* 這裡未來可以加上顯示篩選後艦船列表的內容 */}
            <ShipList />
        </div>
    );
}
