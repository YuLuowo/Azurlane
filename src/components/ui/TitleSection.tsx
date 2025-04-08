import React from "react";

interface TitledSectionProps {
    title: string;
    id: string;
    children: React.ReactNode;
}

const TitledSection: React.FC<TitledSectionProps> = ({ title, id, children }) => {
    return (
        <div id={id} className="my-4 scroll-mt-20">
            <div className="border-b-2 border-gray-600 dark:border-gray-100 my-4 py-2">
                <h2 className="text-2xl">{title}</h2>
            </div>
            <div className="border border-gray-300 rounded-md p-4">
                {children}
            </div>
        </div>
    );
};

export default TitledSection;
