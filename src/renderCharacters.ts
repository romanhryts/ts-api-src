import ICharacter from "./ICharacter";
import getDataFromStorage from "./getDataFromStorage";
import addDataToStorage from "./addDataToStorage";
import deleteCharacter from "./deleteCharacter";

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
        const deleteCharacterButtons: NodeListOf<Element> = document.querySelectorAll('.delete')!;
        deleteCharacter(deleteCharacterButtons, container, noCharsText);
    } else {
        container.innerHTML = noCharsText;
    }
}