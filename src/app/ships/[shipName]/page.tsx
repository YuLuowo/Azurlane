import TitledSection from "@/components/ui/TitleSection";
import QuickNav from "@/components/ui/QuickNav";

interface ShipPageProps {
    params: { shipName: string };
}

const ShipPage = async ({ params }: ShipPageProps) => {
    const param = await params;
    const shipName = await param.shipName;
    const decodedShipName = decodeURIComponent(shipName);

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
                    <span className="text-blue-600"> AzurlaneData API </span>
                    提供相關資料！
                </div>

                <QuickNav/>

                <TitledSection id="intro" title="艦船介紹">
                    123
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

            </div>
        </div>
    );
};

export default ShipPage;
