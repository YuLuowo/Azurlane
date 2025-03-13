'use client'
import React, { useState, useEffect } from "react";
import Filters from "@/components/ui/Filters";
import {fetchShipData} from "@/utils/api";
import ShipList from "@/components/ui/ShipList";


export default function ShipPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedNationality, setSelectedNationality] = useState<string[]>([]);

    const [shipData, setShipData] = useState<{ name: string, painting: string, nationality: string, rarity: number, type: number, tag_list: string[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const ships = await fetchShipData();
            console.log("Fetched Ships:", ships);
            console.log("Selected Types:", selectedTypes);
            console.log("Selected Rarity:", selectedRarity);
            console.log("Selected Nationality:", selectedNationality);
            setShipData(ships);
            setLoading(false);
        }
        loadData();
    }, []);

    const typeMap: { [key: string]: number } = {
        "前排先鋒": -1,
        "後排主力": -1,
        "驅逐": 1,
        "輕巡": 2,
        "重巡": 3,
        "超巡": 18,
        "戰巡": 4,
        "戰列": 5,
        "航戰": 10,
        "航母": 7,
        "輕航": 6,
        "重砲": 13,
        "維修": 12,
        "潛艇": 8,
        "潛母": 17,
        "運輸": 19,
        "風帆": 22
    };

    const selectedTypeNumbers = selectedTypes.map(type => typeMap[type]);

    const filteredShipData = shipData.filter((ship) => {
        const matchesType = selectedTypeNumbers.length === 0 || selectedTypeNumbers.includes(ship.type);
        const matchesRarity = selectedRarity.length === 0 || selectedRarity.includes(String(ship.rarity));
        const matchesFaction = selectedNationality.length === 0 || selectedNationality.includes(ship.nationality);

        return matchesType && matchesRarity && matchesFaction;
    });

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            {/* 篩選條件區塊 */}
            <Filters
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                selectedFaction={selectedNationality}
                setSelectedFaction={setSelectedNationality}
            />

            <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold">當前篩選條件：</h3>
                <p>類型: {selectedTypes.length > 0 ? selectedTypes.join(", ") : "未選擇"}</p>
                <p>稀有度: {selectedRarity.length > 0 ? selectedRarity.join(", ") : "未選擇"}</p>
                <p>陣營: {selectedNationality.length > 0 ? selectedNationality.join(", ") : "未選擇"}</p>
            </div>

            {/* TODO: 中文轉數字 bug */}
            <ShipList ships={filteredShipData} loading={loading} />
        </div>
    );
}
