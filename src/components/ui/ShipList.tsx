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
    const specialShips: { [key: string]: string } = {
        'z1': 'Z1',
        'z18': 'Z18',
        'z19': 'Z19',
        'z20': 'Z20',
        'z21': 'Z21',
        'z23': 'Z23',
        'Z24': 'z24',
        'Z25': 'z25',
        'Z26': 'z26',
        'Z28': 'z28',
        'Z35': 'z35',
        'Z36': 'z36',
        'I19': 'i19',
        'I26': 'i26',
        'I58': 'i58',
        'U37': 'u37',
        'U47': 'u47',
        'U96': 'u96',
        'U410': 'u410',
        'U557': 'u557',
    };

    const getImageUrl = (painting: string) => {
        if (specialShips[painting]) {
            painting = specialShips[painting];
        }
        return painting;
    };

    return (
        <div className="p-6">
            {loading ? (
                <div className="grid grid-cols-5 xl:grid-cols-17 lg:grid-cols-14 md:grid-cols-10 gap-4 mt-4">
                    {Array.from({ length: 102 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-15 h-15 bg-gray-300 animate-pulse rounded border-2 border-gray-500" />
                            <div className="mt-1 w-15 h-3 bg-gray-300 animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-5 xl:grid-cols-17 lg:grid-cols-14 md:grid-cols-10 gap-4 mt-4">
                    {ships.map((ship, index) => (
                        <div key={index} className="flex flex-col items-center hover:cursor-pointer">
                            <Link className="text-center text-xs w-15 truncate" href={`/ships/${encodeURIComponent(ship.name)}`} passHref>
                                <img
                                    src={`https://cdn.imagineyuluo.com/AzurLane/TW/squareicon/${getImageUrl(ship.painting)}.png`}
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