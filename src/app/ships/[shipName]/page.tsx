'use client'
import TitledSection from "@/components/ui/TitleSection";
import QuickNav from "@/components/ui/QuickNav";
import React, {use, useEffect, useState} from "react";
import { Ship, getNationalityName, getTypeNames, getRarityLabels } from "@/utils/shipMaps";

export default function ShipPage({ params }: { params: Promise<{ shipName: string }> }) {
    const [shipData, setShipData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [decodedShipName, setDecodedShipName] = useState<string | null>(null);

    const { shipName } = use(params);

    useEffect(() => {
        const name = decodeURIComponent(shipName);
        setDecodedShipName(name);
    }, [params]);

    useEffect(() => {
        if (!decodedShipName) return;

        const fetchShipData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/ship/${decodedShipName}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch ship data");
                }
                const data = await response.json();
                setShipData(data);
            } catch (error) {
                console.error("Error fetching ship data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShipData();
    }, [decodedShipName]);


    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full max-w-7xl px-4 pb-4">
                <div className="border-b-2 border-gray-600 dark:border-gray-100 my-4 py-2">
                    <h2 className="text-2xl">{decodedShipName}</h2>
                </div>
                <div className="bg-blue-100 p-4 border-2 border-blue-200 rounded-sm text-black mb-5">
                    碧藍航線
                    <span className="text-blue-600"> {decodedShipName} </span>
                    艦船圖鑑，數據由
                    <span className="text-blue-600"> AzurlaneData </span>
                    提供相關資料！
                </div>

                {loading ? (
                    <div className="flex justify-center p-5">
                        <svg className="animate-spin stroke-black dark:stroke-white fill-white dark:fill-black" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                        </svg>
                    </div>
                ) : (
                    <>
                        <QuickNav imageSrc={`https://cdn.imagineyuluo.com/AzurLane/TW/qicon/${shipData.painting}.png`} imageAlt={shipData.painting} />
                        <TitledSection id="intro" title="艦船介紹">
                            <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center gap-4">
                                { /** shipyardicon 為 192px * 256px */ }
                                <div className="relative w-48 h-64 md:min-w-48 md:min-h-64 border border-gray-300 rounded-xl">
                                    <img
                                        src={`/images/backgrounds/star_level_bg_${shipData.rarity}.png`}
                                        alt="background"
                                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    />
                                    <img
                                        src={`https://cdn.imagineyuluo.com/AzurLane/TW/shipyardicon/${shipData.painting}.png`}
                                        alt={shipData.painting}
                                        className="absolute inset-0 w-full h-full object-contain rounded-xl"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <span>名稱：{shipData.name}</span>
                                    <span>所屬陣營：{getNationalityName(shipData.nationality)}</span>
                                    <span>種類：{getTypeNames(shipData.type).join(" / ")}</span>
                                    <span>稀有度：{getRarityLabels(shipData).join(" / ")}</span>
                                </div>
                            </div>
                        </TitledSection>

                        <TitledSection id="skill" title="艦船技能">
                            123
                        </TitledSection>

                        { /** TODO: 判斷該船是否有改造 */ }
                        <TitledSection id="trans" title="艦船改造">
                            123
                        </TitledSection>

                        <TitledSection id="equip" title="艦船裝備">
                            123
                        </TitledSection>

                        <TitledSection id="compare" title="艦船比對">
                            123
                        </TitledSection>
                    </>
                )}
            </div>
        </div>
    );
};
