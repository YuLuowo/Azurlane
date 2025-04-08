'use client';

import React from "react";

interface QuickNavProps {}

const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

const QuickNav: React.FC<QuickNavProps> = () => {
    return (
        <div className="bg-gray-300 text-black rounded-md p-4">
            <h4 className="text-xl font-bold mb-4">快速瀏覽</h4>
            <ul className="flex flex-col gap-2">
                <li>
                    <a href="#intro" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("intro");
                    }}>
                        <span className="text-blue-600 hover:text-blue-500 text-lg">艦船介紹</span>
                    </a>
                </li>
                <li>
                    <a href="#skill" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("skill");
                    }}>
                        <span className="text-blue-600 hover:text-blue-500 text-lg">艦船技能</span>
                    </a>
                </li>
                { /** TODO: 判斷該船是否有改造 */ }
                <li>
                    <a href="#trans" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("trans");
                    }}>
                        <span className="text-blue-600 hover:text-blue-500 text-lg">艦船改造</span>
                    </a>
                </li>
                <li>
                    <a href="#equip" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("equip");
                    }}>
                        <span className="text-blue-600 hover:text-blue-500 text-lg">艦船裝備</span>
                    </a>
                </li>
                <li>
                    <a href="#compare" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("compare");
                    }}>
                        <span className="text-blue-600 hover:text-blue-500 text-lg">艦船比對</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default QuickNav;
