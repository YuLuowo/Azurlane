import {resolveNameCode} from "@/libs/utils";

export async function fetchShipData() {
    try {
        const groupRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/ship_data_group.json");
        const groupData = await groupRes.json();
        const groupTypes = Object.values(groupData).map((ship: any) => ship.group_type);

        const templateRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/ship_data_template.json");
        const templateData = await templateRes.json();

        const groupToShips: Record<number, number[]> = {};
        Object.values(templateData).forEach((ship: any) => {
            if (!groupToShips[ship.group_type]) {
                groupToShips[ship.group_type] = [];
            }
            groupToShips[ship.group_type].push(ship.id);
        });

        const selectedIds = groupTypes.map(type => {
            const ids = groupToShips[type] || [];
            return ids.length >= 2 ? ids[1] : ids[0];
        }).filter(id => id !== undefined);

        const statisticsRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/ship_data_statistics.json");
        const statisticsData = await statisticsRes.json();

        const shipsWithSkinId = await Promise.all(
            selectedIds.map(async id => {
                const ship = statisticsData[id];

                if (!ship) return null;
                const resolvedName = await resolveNameCode(ship.name);

                return {
                    name: resolvedName,
                    skin_id: ship.skin_id,
                    nationality: ship.nationality,
                    rarity: ship.rarity,
                    type: ship.type,
                    tag_list: ship.tag_list
                };
            })
        );

        const skinRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/ship_skin_template.json");
        const skinData = await skinRes.json();

        const finalShips = shipsWithSkinId
            .filter(ship => ship !== null)
            .map(ship => ({
                name: ship!.name,
                painting: skinData[ship!.skin_id]?.painting || "unknown",
                nationality: ship!.nationality,
                rarity: ship!.rarity,
                type: ship!.type,
                tag_list: ship!.tag_list
            }))
            .sort((a, b) => b.rarity - a.rarity);

        return finalShips;
    } catch (error) {
        console.error("Error fetching ship data:", error);
        return [];
    }
}

export async function fetchEquipmentData() {
    try {
        const templateRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/equip_data_template.json");
        const templateData = await templateRes.json();

        const statisticsRes = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/equip_data_statistics.json");
        const statisticsData = await statisticsRes.json();

        const filteredEquips = Object.values(templateData).filter((equip: any) => equip.group !== undefined);


        const equipsWithDetails = filteredEquips
            .filter(equip => equip !== null)
            .map((equip: any) => {
                const equipStats = statisticsData[equip.id];
                if (!equipStats) return null;

                return {
                    name: equipStats.name,
                    type: equipStats.type,
                    rarity: equipStats.rarity,
                    nationality: equipStats.nationality,
                    icon: equipStats.icon,
                };
            })
            .sort((a, b) => (b?.rarity ?? 0) - (a?.rarity ?? 0));

        return equipsWithDetails;
    } catch (error) {
        console.error("Error fetching equip data:", error);
        return [];
    }
}
