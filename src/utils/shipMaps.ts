export type Ship = {
    name: string;
    type: number;
    rarity: number;
    tag_list: string[];
    nationality: number;
};

export const typeMap: { [key: string]: number[] } = {
    "前排先鋒": [1, 2, 3, 18, 19],
    "後排主力": [4, 5, 10, 7, 6, 13, 12],
    "驅逐": [1],
    "輕巡": [2],
    "重巡": [3],
    "超巡": [18],
    "戰巡": [4],
    "戰列": [5],
    "航戰": [10],
    "航母": [7],
    "輕航": [6],
    "重砲": [13],
    "維修": [12],
    "潛艇": [8],
    "潛母": [17],
    "運輸": [19],
    "風帆": [22, 23, 24]
};

export const rarityMap: { [key: string]: (ship: { rarity: number, tag_list: string[] }) => boolean } = {
    "普通": (ship) => ship.rarity === 2,
    "稀有": (ship) => ship.rarity === 3,
    "精銳": (ship) => ship.rarity === 4,
    "超稀有": (ship) => ship.rarity === 5,
    "海上傳奇": (ship) => ship.rarity === 6,
    "最高方案": (ship) => ship.rarity === 5 && ship.tag_list.includes("Plan-Class"),
    "決戰方案": (ship) => ship.rarity === 6 && ship.tag_list.includes("Plan-Class"),
};

export const nationalityMap: { [key: string]: number[] } = {
    "白鷹": [1],
    "皇家": [2],
    "重櫻": [3],
    "鐵血": [4],
    "東煌": [5],
    "薩丁帝國": [6],
    "北方聯合": [7],
    "自由鳶尾": [8],
    "維希教廷": [9],
    "META": [97],
    "颶風": [96],
    "聯動": [106, 107, 108, 109, 110, 111]
};

export function getTypeNames(typeId: number): string[] {
    return Object.entries(typeMap)
        .filter(([, ids]) => ids.includes(typeId))
        .map(([name]) => name);
}

export function getNationalityName(nationalityId: number): string {
    const entry = Object.entries(nationalityMap).find(([, ids]) => ids.includes(nationalityId));
    return entry ? entry[0] : "無";
}

export function getRarityLabels(ship: Ship): string[] {
    return Object.entries(rarityMap)
        .filter(([, matcher]) => matcher(ship))
        .map(([label]) => label);
}
