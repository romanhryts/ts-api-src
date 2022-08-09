import ICharacter from "./ICharacter";

export default function addDataToStorage(key: string, element: ICharacter | number): void {
    const storage: string | null = localStorage.getItem(key);
    if (storage) {
        const data = JSON.parse(storage);
        const modified = [element, ...data];
        localStorage.setItem(key, JSON.stringify(modified));
    } else {
        localStorage.setItem(key, JSON.stringify([element]));
    }
}