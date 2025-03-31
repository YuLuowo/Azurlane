'use client'

export default function HomePage() {

    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="flex flex-col w-full max-w-7xl px-4 ">
                <div className="bg-blue-100 p-4 border-2 border-blue-200 rounded-sm text-black">
                    本網站由
                    <span className="text-blue-600 font-bold"> 雨落 YuLuo </span>
                    自行開發，並非官方網站，但我希望能夠打造一個詳盡且易於查閱的遊戲資料庫，讓指揮官們都能更輕鬆的查找資料！
                </div>
            </div>
        </div>
    );
}
