import React from "react";
import FilterCategory from "@/components/ui/FilterCategory";

interface FiltersProps {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
    selectedRarity: string[];
    setSelectedRarity: (rarity: string[]) => void;
    selectedFaction: string[];
    setSelectedFaction: (factions: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
    selectedTypes,
    setSelectedTypes,
    selectedRarity,
    setSelectedRarity,
    selectedFaction,
    setSelectedFaction,
}) => {
    return (
        <div className="w-full max-w-7xl p-4 border border-gray-500 rounded-lg">
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
                options={["白鷹", "皇家", "重櫻", "鐵血", "東煌", "薩丁帝國", "北方聯合", "自由鳶尾", "維希教廷", "其他", "颶風", "聯動"]}
                selectedItems={selectedFaction}
                onChange={setSelectedFaction}
            />
        </div>
    );
};

export default Filters;
