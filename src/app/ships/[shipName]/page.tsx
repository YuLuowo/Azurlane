'use client'
import TitledSection from "@/components/ui/TitleSection";
import QuickNav from "@/components/ui/QuickNav";
import React, {use, useEffect, useState} from "react";
import {Ship, getNationalityName, getTypeNames, getRarityLabels} from "@/utils/shipMaps";
import StatsOverview from "@/components/ui/StatsOverview";
import Card from "@/components/ui/Card";
import TransformTable from "@/components/ui/TransformTable";

export default function ShipPage({params}: { params: Promise<{ shipName: string }> }) {

    interface ShipData {
        name: string;
        group_type: number;
        trans: boolean;
        painting: string;
        rarity: number;
        type: number;
        nationality: number;
        tag_list: string[];
    }

    interface Skill {
        id: number;
        icon: number;
        name: string;
        desc: string;
    }

    interface Transform {
        id: number;
        name: string;
        descrip: string;
        max_level: number;
        level_limit: number;
        star_limit: number;
        use_gold: number;
        use_item: number[][][];
        use_ship: number;
    }

    const [loading, setLoading] = useState(true);
    const [decodedShipName, setDecodedShipName] = useState<string | null>(null);
    const [shipData, setShipData] = useState<ShipData | null>(null)
    const [skills, setSkills] = useState<Skill[]>([]);
    const [transforms, setTransforms] = useState<Transform[]>([])


    const {shipName} = use(params);

    useEffect(() => {
        const name = decodeURIComponent(shipName);
        setDecodedShipName(name);
    }, [params]);

    useEffect(() => {
        if (!decodedShipName) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [shipRes, skillsRes] = await Promise.all([
                    fetch(`/api/ship/${decodedShipName}`),
                    fetch(`/api/ship/${decodedShipName}/skills`),
                ]);

                if (!shipRes.ok || !skillsRes.ok)
                    throw new Error("Some API failed");

                const [shipData, skillsData] = await Promise.all([
                    shipRes.json(),
                    skillsRes.json(),
                ]);

                setShipData(shipData);

                const finalSkills = shipData.trans ? skillsData.trans_skills : skillsData.skills;
                setSkills(finalSkills);

                if (shipData.trans) {
                    const transRes = await fetch(`/api/ship/${decodedShipName}/trans`);
                    if (!transRes.ok) {
                        throw new Error('Failed to fetch trans data')
                    }

                    const transData = await transRes.json();
                    setTransforms(transData.transforms);
                }

            } catch (error) {
                console.error("Error fetching ship/skills/transforms data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [decodedShipName]);


    const statsData = [
        { value: 0, icon: "/images/stats/hp.webp", label: "耐久" },
        { value: 0, icon: "/images/stats/armor.webp", label: "裝甲類型" },
        { value: 0, icon: "/images/stats/rld.webp", label: "裝填" },
        { value: 0, icon: "/images/stats/fp.webp", label: "炮擊" },
        { value: 0, icon: "/images/stats/trp.webp", label: "雷擊" },
        { value: 0, icon: "/images/stats/eva.webp", label: "機動" },
        { value: 0, icon: "/images/stats/aa.webp", label: "防空" },
        { value: 0, icon: "/images/stats/avi.webp", label: "航空" },
        { value: 0, icon: "/images/stats/hit.webp", label: "命中" },
        { value: 0, icon: "/images/stats/asw.webp", label: "反潛" },
        { value: 0, icon: "/images/stats/spd.webp", label: "航速" },
        { value: 0, icon: "/images/stats/luck.webp", label: "幸運" },
        { value: 0, icon: "/images/stats/cost.webp", label: "消耗" },
    ];


    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-full max-w-7xl px-4 pb-4">
                <div className="border-b-2 border-gray-200 dark:border-gray-600 my-4 py-2">
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
                        <svg className="animate-spin stroke-black dark:stroke-white fill-white dark:fill-black"
                             height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                        </svg>
                    </div>
                ) : (
                    <>
                        <QuickNav imageSrc={`https://cdn.imagineyuluo.com/AzurLane/TW/qicon/${shipData?.painting}.png`}
                                  imageAlt={shipData?.painting} hasTrans={shipData?.trans}/>

                        <TitledSection id="intro" title="艦船介紹">
                            <div
                                className="flex flex-col items-center md:flex-row md:items-start gap-4">
                                { /** shipyardicon 為 192px * 256px */}
                                <div
                                    className="relative w-84 h-112 md:w-48 md:h-64 md:min-w-48 md:min-h-64 border border-gray-200 dark:border-gray-800 rounded-xl">
                                    <img
                                        src={`/images/backgrounds/star_level_bg_${shipData?.rarity}.png`}
                                        alt="background"
                                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    />
                                    <img
                                        src={`https://cdn.imagineyuluo.com/AzurLane/TW/shipyardicon/${shipData?.painting}.png`}
                                        alt={shipData?.painting}
                                        className="absolute inset-0 w-full h-full object-contain rounded-xl"
                                    />
                                </div>

                                <div className="flex flex-col gap-4 w-full max-w-96">
                                    <Card variant="stats" className="rounded-sm">
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-xl font-bold">名稱</h4>
                                            <span className="text-lg text-gray-600 dark:text-gray-300">{shipData?.name}</span>
                                        </div>
                                    </Card>

                                    <Card variant="stats" className="rounded-sm">
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-xl font-bold">種類</h4>
                                            <span className="text-lg text-gray-600 dark:text-gray-300">{shipData && getTypeNames(shipData.type).join(" / ")}</span>
                                        </div>
                                    </Card>

                                    <div className="flex flex-row gap-4 w-full">
                                        <Card variant="stats" className="rounded-sm w-full">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-xl font-bold">稀有度</h4>
                                                <span className="text-lg text-gray-600 dark:text-gray-300">{shipData && getRarityLabels(shipData).join(" / ")}</span>
                                            </div>
                                        </Card>

                                        <Card variant="stats" className="rounded-sm w-full">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="text-xl font-bold">所屬陣營</h4>
                                                <span className="text-lg text-gray-600 dark:text-gray-300">{shipData && getNationalityName(shipData.nationality)}</span>
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-5 w-full">
                                    {shipData && skills.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            <h2 className="text-xl font-bold">
                                                技能列表
                                                {shipData.trans && <span> (改造後)</span>}
                                            </h2>
                                            {skills.map((skill, index) => (
                                                <div key={index} className="flex flex-row items-center gap-3">
                                                    <img
                                                        src={`https://cdn.imagineyuluo.com/AzurLane/TW/skillicon/${skill.icon}.png`}
                                                        alt={skill.name}
                                                        className="max-w-16 max-h-16"
                                                    />
                                                    <div className="break-words">
                                                        <h4 className="font-semibold text-lg">{skill.name}</h4>
                                                        <span className="text text-gray-600 dark:text-gray-300">{skill.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TitledSection>

                        { shipData?.trans && (
                            <TitledSection id="trans" title="艦船改造">
                                <h3 className="text-xl font-semibold mb-2">改造所需材料</h3>
                                <span className="text-gray-600 dark:text-gray-300">如果該改造項目需強化兩次物資已經算好了</span>
                                <div className="mt-4">
                                    { transforms.length > 0 ? (
                                        <TransformTable transforms={transforms} />
                                    ) : (
                                        <span className="text-red-500 text-xl">有 Bug! 無改造資料</span>
                                    )}
                                </div>
                            </TitledSection>
                        )}

                        <TitledSection id="equip" title="艦船裝備">
                            <div className="flex flex-col md:flex-row md:justify-center gap-4 w-full items-center">
                                <div
                                    className="md:w-full md:flex-1 order-2 md:order-none flex flex-col gap-4 md:gap-20 w-full md:min-w-56 md:max-w-56">
                                    <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                        設備
                                    </div>
                                    <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                        設備
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex justify-center order-3 md:order-none mt-4 md:mt-0">
                                    <img
                                        src={`https://cdn.imagineyuluo.com/AzurLane/TW/painting/${shipData?.painting.toLowerCase()}.webp`}
                                        alt="Centered Image"
                                        className="max-h-120"
                                    />
                                </div>

                                <div className="md:w-full md:flex-1 order-1 md:order-none flex flex-col gap-4 md:gap-20 w-full md:min-w-56 md:max-w-56">
                                    <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                        武器
                                    </div>
                                    <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                        武器
                                    </div>
                                    <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                                        武器
                                    </div>
                                </div>
                            </div>

                            <StatsOverview stats={statsData} />

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
