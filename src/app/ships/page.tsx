'use client'
import React, { useState, useEffect } from "react";
import ShipFilters from "@/components/ui/ShipFilters";
import {fetchShipData} from "@/utils/api";
import ShipList from "@/components/ui/ShipList";


export default function ShipPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedNationality, setSelectedNationality] = useState<string[]>([]);

    const [shipData, setShipData] = useState<{ name: string, painting: string, nationality: number, rarity: number, type: number, tag_list: string[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const ships = await fetchShipData();
            setShipData(ships);
            setLoading(false);
        }
        loadData();
    }, []);

    const typeMap: { [key: string]: number[] } = {
        "前排先鋒": [1, 2, 3, 18, 19],
        "後排主力": [4, 5, 10, 7, 6, 13, 12],
        "驅逐": [1],
        "輕巡": [2],
        "重巡": [3],
        "超巡": [18],
        "戰巡": [4],
        "戰列": [5],
        "航戰": [10],
        "航母": [7],
        "輕航": [6],
        "重砲": [13],
        "維修": [12],
        "潛艇": [8],
        "潛母": [17],
        "運輸": [19],
        "風帆": [22, 23, 24]
    };

    const rarityMap: { [key: string]: (ship: { rarity: number, tag_list: string[] }) => boolean } = {
        "普通": (ship) => ship.rarity === 2,
        "稀有": (ship) => ship.rarity === 3,
        "精銳": (ship) => ship.rarity === 4,
        "超稀有": (ship) => ship.rarity === 5,
        "海上傳奇": (ship) => ship.rarity === 6,
        "最高方案": (ship) => ship.rarity === 5 && ship.tag_list.includes("Plan-Class"),
        "決戰方案": (ship) => ship.rarity === 6 && ship.tag_list.includes("Plan-Class"),
    };

    const nationalityMap: { [key: string]: number[] } = {
        "白鷹": [1],
        "皇家": [2],
        "重櫻": [3],
        "鐵血": [4],
        "東煌": [5],
        "薩丁帝國": [6],
        "北方聯合": [7],
        "自由鳶尾": [8],
        "維希教廷": [9],
        "META": [97],
        "颶風": [96],
        "聯動": [106, 107, 108, 109, 110, 111]
    };

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

            {/* TODO: 中文轉數字 bug */}
            <ShipList ships={filteredShipData} loading={loading} />
        </div>
    );
}
