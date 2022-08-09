import ICharacter from "./ICharacter";
import getDataFromStorage from "./getDataFromStorage";
import addDataToStorage from "./addDataToStorage";

export default function renderCharacters(container: HTMLDivElement, characters: ICharacter[], noCharsText: string): void {
    container.innerHTML = '';
    if (container && characters) {
        characters.forEach(character => {
            const {id, name, status, image, species, gender, location, created} = character;
            const createdData = new Date(created).toLocaleDateString();
            container.innerHTML += `
                <div class="character" id="${id}">
                    <div class="img-container">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="character__description">
                        <h4>${name}</h4>
                        <p class="status"><span class="info">Status:</span> ${status}</p>
                        <p class="species"><span class="info">Species:</span> ${species}</p>
                        <p class="gender"><span class="info">Gender:</span> ${gender}</p>
                        <p class="location"><span class="info">Location:</span> ${location.name}</p>
                        <p class="created"><span class="info">Created:</span> ${createdData}</p>
                    </div>
                    <button type="button" class="delete" id="${id}">Delete</button>
                </div>
           `
        });
        const deleteCharacterButtons = document.querySelectorAll('.delete');
        deleteCharacterButtons.forEach(btn => {
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
    } else {
        container.innerHTML = noCharsText;
    }
}