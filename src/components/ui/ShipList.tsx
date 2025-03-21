import React from "react";
import Link from "next/link";

interface Ship {
    name: string;
    painting: string;
    nationality: number;
    rarity: number;
    type: number;
    tag_list: string[];
}

interface ShipListProps {
    ships: Ship[];
    loading: boolean;
}

const ShipList: React.FC<ShipListProps> = ({ ships, loading }) => {
    return (
        <div className="p-6">
            {loading ? (
                <svg className="animate-spin stroke-black dark:stroke-white fill-white dark:fill-black" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                </svg>
            ) : (
                <div className="grid grid-cols-5 xl:grid-cols-17 lg:grid-cols-14 md:grid-cols-10 gap-4 mt-4">
                    {ships.map((ship, index) => (
                        <div key={index} className="flex flex-col items-center hover:cursor-pointer">
                            <Link className="text-center text-xs w-15 truncate" href={`/ships/${encodeURIComponent(ship.name)}`} passHref>
                                <img
                                    src={`/images/squareicon/${ship.painting}.png`}
                                    alt={ship.name}
                                    className="max-w-15 max-h-15 object-cover border-2 border-gray-500 hover:border-blue-500 hover:border-3"
                                />
                                <span>{ship.name}</span>
                            </Link>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShipList;