'use client'
import React, {useState} from "react";
import EquipmentFilters from "@/components/ui/EquipmentFilters";

export default function EquipmentPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedNationality, setSelectedNationality] = useState<string[]>([]);

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            <EquipmentFilters
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                selectedNationality={selectedNationality}
                setSelectedNationality={setSelectedNationality}
            />
        </div>
    )
}