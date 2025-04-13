'use client';

import React from "react";

interface QuickNavProps {
    imageSrc?: string;
    imageAlt?: string;
}

const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

const QuickNav: React.FC<QuickNavProps> = ({ imageSrc, imageAlt = "裝飾圖片" }) => {
    return (
        <div className="bg-gray-200 dark:bg-gray-600 rounded-md p-4 relative">
            <h4 className="text-2xl font-bold mb-4">快速瀏覽</h4>
            <ul className="flex flex-col gap-2">
                {[
                    { id: "intro", label: "艦船介紹" },
                    { id: "trans", label: "艦船改造" },
                    { id: "equip", label: "艦船裝備" },
                    { id: "compare", label: "艦船比對" },
                ].map((item) => (
                    <li key={item.id}>
                        <a href={`#${item.id}`} onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                        }}>
                            <span className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-xl">
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="absolute bottom-4 right-4 w-28 h-28 object-contain"
                />
            )}
        </div>
    );
};

export default QuickNav;
