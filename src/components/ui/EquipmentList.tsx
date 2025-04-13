import React from "react";

interface Equipment {
    name: string;
    icon: string;
    nationality: number;
    rarity: number;
    type: number;
}

interface EquipmentListProps {
    equips: Equipment[];
    loading: boolean;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equips, loading }) => {
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
                    {equips.map((equip, index) => (
                        <div key={index} className="flex flex-col items-center hover:cursor-pointer">
                            <div className="relative w-15 h-15 border-2 border-gray-500 hover:border-blue-500 hover:border-3">
                                <img
                                    src={`/images/backgrounds/star_level_bg_${equip.rarity}.png`}
                                    alt="background"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <img
                                    src={`https://cdn.imagineyuluo.com/AzurLane/TW/equips/${equip.icon}.png`}
                                    alt={equip.name}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-center text-xs w-15 truncate">{equip.name}</span>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};

export default EquipmentList;