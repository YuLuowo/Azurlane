'use client';
import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/libs/utils";

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

interface FilterCategoryProps {
    title: string;
    options: string[];
    selectedItems: string[];
    onChange: (selected: string[]) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ title, options, selectedItems, onChange }) => {
    const toggleSelect = (item: string) => {
        const newSelected = selectedItems.includes(item)
            ? selectedItems.filter((i) => i !== item)
            : [...selectedItems, item];

        onChange(newSelected);
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
