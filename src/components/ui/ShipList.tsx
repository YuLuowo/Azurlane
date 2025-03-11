import { useState } from "react";
import Image from "next/image";
import shipData from "@/data/ship_skin_template.json";

const ShipList: React.FC = () => {
    const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});

    // 使用 Set 避免 painting 重複
    const uniquePaintings = new Set<string>();

    const ships = Object.entries(shipData)
        .filter(([_, value]: [string, any]) => (value.group_index === 0 && value.skin_type === -1))
        .map(([id, value]: [string, any]) => {
            if (!uniquePaintings.has(value.painting)) {
                uniquePaintings.add(value.painting);
                return { id, painting: value.painting };
            }
            return null;
        })
        .filter(Boolean) as { id: string; painting: string }[];

    const handleError = (painting: string) => {
        setMissingImages((prev) => ({ ...prev, [painting]: true }));
    };

    return (
        <div style={styles.container}>
            {ships.map((ship) =>
                !missingImages[ship.painting] ? (
                    <Image
                        key={ship.id}
                        src={`/images/squareicon/${ship.painting}.png`}
                        alt={ship.painting}
                        title={ship.painting}
                        width={60}
                        height={60}
                        onError={() => handleError(ship.painting)}
                        style={styles.image}
                    />
                ) : null
            )}
        </div>
    );
};

// 樣式
const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        maxWidth: "100%",
    },
    image: {
        objectFit: "cover",
        borderRadius: "5px", // 讓圖片更美觀
    },
};

export default ShipList;
