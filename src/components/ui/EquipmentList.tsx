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
                <svg className="animate-spin stroke-black dark:stroke-white fill-white dark:fill-black" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                </svg>
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