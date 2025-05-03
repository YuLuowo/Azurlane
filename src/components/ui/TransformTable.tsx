import React from 'react'
import Item from "@/components/ui/Item";

type Transform = {
    id: number;
    name: string;
    descrip: string;
    max_level: number;
    level_limit: number;
    star_limit: number;
    use_gold: number;
    use_item: number[][][];
    use_ship: number;
};

type ResourceSummary = {
    items: Record<number, number>;
    totalGold: number;
    totalShip: number;
};

interface Props {
    transforms: Transform[];
}

const processDescription = (descrip: string) => {
    return descrip.replace(/<color=#[0-9a-fA-F]+>(.*?)<\/color>/g, (match, p1) => {
        const color = match.match(/#([0-9a-fA-F]+)/)?.[0] || "#000000";
        return `<span style="color:${color}">${p1}</span>`;
    });
};

const renderUseItem = (use_item: number[][][]) => {
    return (
        <div className="flex flex-wrap items-center gap-x-1 gap-y-4 whitespace-nowrap">
            {use_item.map((group, groupIdx) => (
                <div key={groupIdx} className="flex items-center gap-1">
                    {group.map(([id, count], i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Item itemId={String(id)} />
                            <span className="">x {count}</span>
                            {i < group.length - 1 && <span className="">+</span>}
                        </div>
                    ))}
                    {groupIdx < use_item.length - 1 && <span className="mx-1">/</span>}
                </div>
            ))}
        </div>
    );
};

const summarizeResources = (transforms: Transform[]): ResourceSummary => {
    const summary: ResourceSummary = {
        items: {},
        totalGold: 0,
        totalShip: 0,
    };

    transforms.forEach((t) => {
        summary.totalGold += (t.max_level * t.use_gold) || 0;
        summary.totalShip += t.use_ship || 0;

        t.use_item?.forEach((group: number[][]) => {
            group.forEach(([itemId, count]) => {
                if (!summary.items[itemId]) summary.items[itemId] = 0;
                summary.items[itemId] += count;
            });
        });
    });

    return summary;
};



const TransformTable: React.FC<Props> = ({ transforms }) => {
    const summary = summarizeResources(transforms);

    return (
        <div className="overflow-x-auto whitespace-nowrap">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-lg text-left">
                <thead>
                <tr className="text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900">
                    <th className="p-4 font-normal">改造項目</th>
                    {/*<th className="px-4 py-2 font-semibold text-gray-900">加成效果</th>*/}
                    <th className="p-4 font-normal">材料</th>
                    <th className="p-4 font-normal">所需物資</th>
                    <th className="p-4 font-normal">本體或布里</th>
                    <th className="p-4 font-normal">等級限制</th>
                    <th className="p-4 font-normal">星數限制</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {transforms.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-4">{t.name}</td>
                        {/*<td className="px-4 py-2 text-sm text-gray-600 max-w-xs" dangerouslySetInnerHTML={{ __html: processDescription(t.descrip) }} />*/}
                        <td className="p-4">
                            {renderUseItem(t.use_item)}
                        </td>
                        <td className="p-4">{t.max_level * t.use_gold}</td>
                        <td className="p-4">{t.use_ship}</td>
                        <td className="p-4">{t.level_limit}</td>
                        <td className="p-4 text-yellow-300">{'★'.repeat(t.star_limit)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-4">總共材料</h3>
                <div className="flex flex-wrap items-center gap-4 text-lg">
                    {Object.entries(summary.items).map(([id, count]) => (
                        <div key={id} className="flex items-center gap-2">
                            <Item itemId={String(id)} />
                            <span>x {count}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <img
                            src={`https://cdn.imagineyuluo.com/AzurLane/TW/props/gold.png`}
                            className="w-10 h-10"
                            alt={`gold`}
                        />
                        <span>x {summary.totalGold}</span>
                    </div>
                    <div>本體或布里 x {summary.totalShip}</div>
                </div>
            </div>
        </div>
    )
}

export default TransformTable
