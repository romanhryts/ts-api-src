import getDataFromStorage from "./getDataFromStorage";
import renderCharacters from "./renderCharacters";
import ICharacter from "./ICharacter";

export default function deleteCharacter(
    btns: NodeListOf<Element>,
    container: HTMLDivElement,
    noCharsText: string
): void {
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id: number = Number(btn.getAttribute('id'));
            const idsFromStorage = getDataFromStorage<number>('ids')!;
            const idx = idsFromStorage.findIndex(el => el === id);
            const updatedIDs = [...idsFromStorage.slice(0, idx), ...idsFromStorage.slice(idx + 1)];
            const charsFromStorage = getDataFromStorage<ICharacter>('characters')!;
            const charIdx = charsFromStorage.findIndex(char => char.id === id);
            const updatedChars = [...charsFromStorage.slice(0, charIdx), ...charsFromStorage.slice(charIdx + 1)];
            if (updatedChars.length <= 5 && document.querySelector('.more')!.classList.contains('active')) {
                document.querySelector('.more')!.classList.remove('active');
            }
            localStorage.setItem('ids', JSON.stringify(updatedIDs));
            localStorage.setItem('characters', JSON.stringify(updatedChars));
            if (updatedChars.length === 0) {
                container.innerHTML = noCharsText;
                return;
            }
            renderCharacters(
                document.querySelector('.characters-container')!,
                getDataFromStorage('characters')!,
                "You don't have any characters"
            );
        }) ;
    });
}