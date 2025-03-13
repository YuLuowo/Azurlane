export function cn(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(" ");
}

export async function resolveNameCode(name: string): Promise<string> {
    const match = name.match(/^{namecode:(\d+)}$/);
    if (!match) return name;

    const nameCodeId = match[1];

    try {
        const res = await fetch("https://raw.githubusercontent.com/YuLuowo/Azurlane/refs/heads/main/src/data/name_code.json");
        const nameCodeData = await res.json();

        return nameCodeData[nameCodeId]?.name || name;
    } catch (error) {
        console.error("Error fetching name_code.json:", error);
        return name;
    }
}

