export default function getDataFromStorage <T>(key: string): T[] | null {
    const data: string | null = localStorage.getItem(key);
    if (data) {
        const parsed = JSON.parse(data);
        return parsed as T[];
    }
    return null;
}