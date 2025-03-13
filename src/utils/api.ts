import {resolveNameCode} from "@/libs/utils";

/**
 * TODO: 篩選
 * rarity 2 = 普通
 * rarity 3 = 稀有
 * rarity 4 = 精銳
 * rarity 5 = 超稀有
 * rarity 6 = 海上傳奇
 *
 * tag_list = "Plan-Class" 並且 rarity 5 = 最高方案
 * tag_list = "Plan-Class" 並且 rarity 6 = 決戰方案
 * "tag_list": [
 *      "Plan-Class"
 * ]
 *
 * nationality 1 = 白鷹
 * nationality 2 = 皇家
 * nationality 3 = 重櫻
 * nationality 4 = 鐵血
 * nationality 5 = 東煌
 * nationality 6 = 薩丁帝國
 * nationality 7 = 北方聯合
 * nationality 8 = 自由鳶尾
 * nationality 9 = 維希教廷
 *
 * type 1 = 驅逐
 * type 2 = 輕巡
 * type 3 = 重巡
 * type 4 = 戰巡
 * type 5 = 戰列
 * type 6 = 輕航
 * type 7 = 航母
 * type 8 = 潛艇
 * type 9 = UNKNOWN
 * type 10 = 航戰
 * type 11 = UNKNOWN
 * type 12 = 維修
 * type 13 = 重砲
 * type 14 = UNKNOWN
 * type 15 = UNKNOWN
 * type 16 = UNKNOWN
 * type 17 = 潛母
 * type 18 = 超巡
 * type 19 = 運輸
 * skip type 20, 21 = 前後導驅
 * type 22, 23, 24 = 風帆
 *
 */

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
                // TODO 查詢
                if (!ship) return null;
                // 使用 resolveNamecode 解析 name
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
            }));

        return finalShips;
    } catch (error) {
        console.error("Error fetching ship data:", error);
        return [];
    }
}
