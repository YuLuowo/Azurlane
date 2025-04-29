'use client'

import Card from '@/components/ui/Card';

export default function FeatureCards() {
    const cards = [
        {
            title: '匯聚於此岸之塵',
            image: `https://cdn.imagineyuluo.com/AzurLane/TW/activitybanner/temp4.png`,
            description: '活動時間為 2025-04-24 至 2025-05-22',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {cards.map((card, index) => (
                <div key={index} className="flex flex-col overflow-hidden">
                    <Card variant="events">
                        <div className="relative">
                            <div className="absolute inset-0 border-2 border-blue-200 dark:border-blue-100 rounded-t-xl"></div>
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full object-cover rounded-t-2xl"
                            />
                        </div>

                        <div className="p-4 bg-blue-200 dark:bg-blue-100 flex flex-col h-auto rounded-b-2xl">
                            <h3 className="text-xl text-black font-semibold mb-2">{card.title}</h3>
                            <p className="text-gray-600 mb-4">{card.description}</p>
                        </div>
                    </Card>

                </div>
            ))}
        </div>
    );
}
