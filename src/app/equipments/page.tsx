'use client'
import React, {useEffect, useState} from "react";
import EquipmentFilters from "@/components/ui/EquipmentFilters";
import {fetchEquipmentData} from "@/utils/fetch_data";
import EquipmentList from "@/components/ui/EquipmentList";

export default function EquipmentPage() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedRarity, setSelectedRarity] = useState<string[]>([]);
    const [selectedNationality, setSelectedNationality] = useState<string[]>([]);

    const [equipmentData, setEquipmentData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await fetchEquipmentData();
            setEquipmentData(data);
            setLoading(false);
        }
        loadData();
    }, []);

    const typeMap: { [key: string]: number[] } = {
        "驅逐炮": [1],
        "輕巡炮": [2],
        "重巡炮": [3],
        "超巡炮": [11],
        "戰列炮": [4],
        "水面魚雷": [5],
        "潛艇魚雷": [13],
        "防空炮": [6, 21],
        "導彈": [20],
        "戰鬥機": [7],
        "轟炸機": [9],
        "魚雷機": [8],
        "水上機": [12],
        "反潛機": [15],
        "設備": [10, 14, 17, 18]
    };

    const rarityMap: { [key: string]: (ship: { rarity: number, tag_list: string[] }) => boolean } = {
        "普通": (ship) => ship.rarity === 1 || ship.rarity === 2,
        "稀有": (ship) => ship.rarity === 3,
        "精銳": (ship) => ship.rarity === 4,
        "超稀有": (ship) => ship.rarity === 5,
        "海上傳奇": (ship) => ship.rarity === 6,
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
        "維希教廷": [10],
        "其它": [0],
        "颶風": [96],
        "聯動": [106, 107, 108, 109, 110, 111]
    };

    const selectedTypeNumbers = selectedTypes.flatMap(type => typeMap[type]);
    const selectedRarityNumbers = selectedRarity.map(rarity => rarityMap[rarity]);
    const selectedNationalityNumbers = selectedNationality.flatMap(type => nationalityMap[type]);

    const filteredShipData = equipmentData.filter((equip) => {
        const matchesType = selectedTypeNumbers.length === 0 || selectedTypeNumbers.includes(equip.type);
        const matchesRarity = selectedRarityNumbers.length === 0 || selectedRarityNumbers.some(filter => filter(equip));
        const matchesNationality = selectedNationalityNumbers.length === 0 || selectedNationalityNumbers.includes(equip.nationality);

        return matchesType && matchesRarity && matchesNationality;
    });

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

            <EquipmentList equips={filteredShipData} loading={loading} />
        </div>


    )
}