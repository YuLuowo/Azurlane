'use client';

import React, { useEffect, useState } from 'react';

type ItemData = {
    icon: string;
    name: string;
    rarity: number;
};

type ItemProps = {
    itemId: string;
};

export default function Item({ itemId }: ItemProps) {
    const [item, setItem] = useState<ItemData | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/item/${itemId}`);
                if (!res.ok) {
                    throw new Error('Item not found');
                }
                const data = await res.json();
                setItem(data);
            } catch (error) {
                console.error("Error fetching item data:", error);
            }
        };

        fetchItem();
    }, [itemId]);

    if (!item) return null;

    return (
        <div className="relative w-10 h-10 border border-gray-200 dark:border-gray-800 group">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-white dark:text-black bg-black dark:bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                {item.name}
            </div>

            <img
                src={`/images/backgrounds/star_level_bg_${item.rarity + 1}.png`}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <img
                src={`https://cdn.imagineyuluo.com/AzurLane/TW/${item.icon.toLowerCase()}.png`}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain"
            />
        </div>
    );
}