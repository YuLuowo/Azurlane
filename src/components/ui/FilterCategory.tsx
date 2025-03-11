'use client';
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";

// 定義選單樣式
const listItemVariants = cva(
    "cursor-pointer px-4 py-2 rounded-md transition-colors",
    {
        variants: {
            selected: {
                true: "bg-blue-500 text-white",
                false: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700",
            },
        },
        defaultVariants: {
            selected: false,
        },
    }
);

// 定義 Props 類型
interface FilterCategoryProps {
    title: string; // 分類名稱，例如 "類型"、"稀有度"
    options: string[]; // 可選擇的項目，例如 ["前排先鋒", "後排主力"]
    selectedItems: string[]; // 當前已選中的項目
    onChange: (selected: string[]) => void; // 當選擇變更時的回調函式
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ title, options, selectedItems, onChange }) => {
    // 點擊選項時，更新已選擇的值
    const toggleSelect = (item: string) => {
        const newSelected = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        onChange(newSelected); // 傳遞回父元件
    };

    return (
        <div className="mb-2">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <ul className="flex flex-wrap gap-2.5">
                {options.map((item) => (
                    <li
                        key={item}
                        className={cn(listItemVariants({ selected: selectedItems.includes(item) }))}
                        onClick={() => toggleSelect(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterCategory;
