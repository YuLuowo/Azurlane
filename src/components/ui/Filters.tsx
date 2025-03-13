import React from "react";
import FilterCategory from "@/components/ui/FilterCategory";

interface FiltersProps {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
    selectedRarity: string[];
    setSelectedRarity: (rarity: string[]) => void;
    selectedNationality: string[];
    setSelectedNationality: (factions: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ selectedTypes, setSelectedTypes, selectedRarity, setSelectedRarity, selectedNationality, setSelectedNationality }) => {

    return (
        <div className="max-w-7xl p-4 border border-gray-300 rounded-lg mb-4">
            <FilterCategory
                title="類型"
                options={["前排先鋒", "後排主力", "驅逐", "輕巡", "重巡", "超巡", "戰巡", "戰列", "航戰", "航母", "輕航", "重砲", "維修", "潛艇", "潛母", "運輸", "風帆"]}
                selectedItems={selectedTypes}
                onChange={setSelectedTypes}
            />
            <FilterCategory
                title="稀有度"
                options={["普通", "稀有", "精銳", "超稀有", "海上傳奇", "最高方案", "決戰方案"]}
                selectedItems={selectedRarity}
                onChange={setSelectedRarity}
            />
            <FilterCategory
                title="陣營"
                options={["白鷹", "皇家", "重櫻", "鐵血", "東煌", "薩丁帝國", "北方聯合", "自由鳶尾", "維希教廷", "META", "颶風", "聯動"]}
                selectedItems={selectedNationality}
                onChange={setSelectedNationality}
            />
        </div>
    );
};

export default Filters;
