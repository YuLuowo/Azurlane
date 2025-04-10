'use client'
import React, { useState, useEffect } from "react";
import ShipFilters from "@/components/ui/ShipFilters";
import ShipList from "@/components/ui/ShipList";
import {nationalityMap, rarityMap, typeMap} from "@/utils/shipMaps";

export default function ShipPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedNationality, setSelectedNationality] = useState<string[]>([]);

    const [shipData, setShipData] = useState<{ name: string, painting: string, nationality: number, rarity: number, type: number, tag_list: string[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const ships = await fetch(`/api/ship`);
                if (!ships.ok) {
                    throw new Error('Failed to fetch ships data')
                }

                const data = await ships.json();
                setShipData(data);
            } catch (error) {
                console.error('Failed to fetch ships data.', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);


    const selectedTypeNumbers = selectedTypes.flatMap(type => typeMap[type]);
    const selectedRarityNumbers = selectedRarity.map(rarity => rarityMap[rarity]);
    const selectedNationalityNumbers = selectedNationality.flatMap(type => nationalityMap[type]);

    const filteredShipData = shipData.filter((ship) => {
        const matchesType = selectedTypeNumbers.length === 0 || selectedTypeNumbers.includes(ship.type);
        const matchesRarity = selectedRarityNumbers.length === 0 || selectedRarityNumbers.some(filter => filter(ship));
        const matchesNationality = selectedNationalityNumbers.length === 0 || selectedNationalityNumbers.includes(ship.nationality);

        return matchesType && matchesRarity && matchesNationality;
    });

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            <ShipFilters
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                selectedNationality={selectedNationality}
                setSelectedNationality={setSelectedNationality}
            />

            <ShipList ships={filteredShipData} loading={loading} />
        </div>
    );
}
