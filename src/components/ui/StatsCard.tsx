import Card from "@/components/ui/Card";

type StatsCardProps = {
    value: number | string;
    icon: string;
    label: string;
};

export default function StatsCard({ value, icon, label }: StatsCardProps) {
    return (
        <Card variant="stats">
            <div className="flex flex-row gap-2">
                <img src={icon} alt={label} className="h-6" />
                <span className="text-gray-400">{label}</span>
            </div>
            <h3 className="font-bold text-2xl">{value}</h3>
        </Card>
    );
}
