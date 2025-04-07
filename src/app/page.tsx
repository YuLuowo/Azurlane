'use client'

import Card from "@/components/ui/Card";
import FeatureCards from "@/components/ui/FeatureCards";

export default function HomePage() {

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="flex flex-col w-full max-w-7xl px-4 ">
                <div className="bg-blue-100 p-4 border-2 border-blue-200 rounded-sm text-black mb-5">
                    本網站由
                    <span className="text-blue-600 font-bold"> 雨落 YuLuo </span>
                    自行開發，並非官方網站，但我希望能夠打造一個詳盡且易於查閱的遊戲資料庫，讓指揮官們都能更輕鬆的查找資料！
                </div>
                <div className="flex flex-col my-5">
                    <h2 className="text-2xl font-bold">常用內容</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 text-black">
                        {/** TODO: 新增 props 圖片 */}
                        <Card variant="quickAccess" size="lg">艦船圖鑑</Card>
                        <Card variant="quickAccess" size="lg">裝備圖鑑</Card>
                        <Card variant="quickAccess" size="lg">活動查詢</Card>
                        <Card variant="quickAccess" size="lg">大型作戰</Card>
                        <Card variant="quickAccess" size="lg">主線地圖</Card>
                        <Card variant="quickAccess" size="lg">艦隊模擬</Card>
                    </div>
                </div>
                <div className="flex flex-col my-5">
                    <h2 className="text-2xl font-bold">近期活動</h2>
                    <span className="text-gray-400 mt-1 text-lg">部分活動為資訊為手動更新，請見諒！</span>
                    <FeatureCards />
                </div>
            </div>
        </div>
    );
}
