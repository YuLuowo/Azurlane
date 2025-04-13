import StatsCard from "@/components/ui/StatsCard";

type StatsOverviewProps = {
    stats: {
        value: number | string;
        icon: string;
        label: string;
    }[];
};

export default function StatsOverview({ stats }: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border border-gray-200 dark:border-gray-800 rounded-lg p-4 mt-4">
            {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    );
}
