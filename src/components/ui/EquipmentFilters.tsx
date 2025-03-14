import React from "react";
import FilterCategory from "@/components/ui/FilterCategory";

interface EquipmentFiltersProps {
    selectedTypes: string[];
    setSelectedTypes: (types: string[]) => void;
    selectedRarity: string[];
    setSelectedRarity: (rarity: string[]) => void;
    selectedNationality: string[];
    setSelectedNationality: (factions: string[]) => void;
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({ selectedTypes, setSelectedTypes, selectedRarity, setSelectedRarity, selectedNationality, setSelectedNationality }) => {

    return (
        <div className="max-w-7xl p-4 border border-gray-300 rounded-lg mb-4">
            <FilterCategory
                title="類型"
                options={["驅逐炮", "輕巡炮", "重巡炮", "超巡炮", "戰列炮", "速科夫炮", "水面魚雷", "潛艇魚雷", "防空炮", "導彈", "戰鬥機", "轟炸機", "魚雷機", "水上機", "反潛機", "設備", "特殊兵裝"]}
                selectedItems={selectedTypes}
                onChange={setSelectedTypes}
            />
            <FilterCategory
                title="稀有度"
                options={["普通", "稀有", "精銳", "超稀有", "海上傳奇"]}
                selectedItems={selectedRarity}
                onChange={setSelectedRarity}
            />
            <FilterCategory
                title="陣營"
                options={["白鷹", "皇家", "重櫻", "鐵血", "東煌", "薩丁帝國", "北方聯合", "自由鳶尾", "維希教廷", "其它", "颶風", "聯動"]}
                selectedItems={selectedNationality}
                onChange={setSelectedNationality}
            />
        </div>
    );
};

export default EquipmentFilters;
