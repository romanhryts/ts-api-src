import '../scss/main.scss';

import ICharacter from "./ICharacter";
import getDataFromStorage from "./getDataFromStorage";
import renderCharacters from "./renderCharacters";
import fetchCharacter from "./fetchCharacter";
import addDataToStorage from "./addDataToStorage";

const container: HTMLDivElement = document.querySelector('.characters-container')!;
const input: HTMLInputElement = document.querySelector('.input-id')!;
const getCharacterButton: HTMLButtonElement = document.querySelector('.load')!;
const clearStorageButton: HTMLButtonElement = document.querySelector('.clear')!;
const loadMoreCharactersButton: HTMLButtonElement = document.querySelector('.more')!;

const noCharsText: string = `You don't have any characters...`;
let sliceTo: number = 5;


window.addEventListener('load', () => {
    const characters = getDataFromStorage<ICharacter>('characters')!;
    if (characters.length === 0) {
        container.innerHTML = noCharsText;
        return;
    }
    if (characters.length > 5) {
        loadMoreCharactersButton.classList.add('active');
    }
    const showCharacters = characters.slice(0, 5);
    renderCharacters(container, showCharacters, noCharsText);
});

clearStorageButton.addEventListener('click', () => {
    if (loadMoreCharactersButton.classList.contains('active')) {
        loadMoreCharactersButton.classList.remove('active');
    }
    if (getDataFromStorage<ICharacter>('characters')!.length > 0) {
        localStorage.setItem('ids', JSON.stringify([]));
        localStorage.setItem('characters', JSON.stringify([]));
        container.innerHTML = noCharsText;
    } else {
        alert("You don't have any characters");
    }
});

getCharacterButton.addEventListener('click', () => {
    const value: number = parseInt(input.value);
    const id: number = parseInt(value.toFixed(0));
    let ids: number[] | null = getDataFromStorage<number>('ids');
    if (ids && ids.includes(id)) {
        alert(`You already added character with id ${id}`);
        return;
    }
    if (!ids) {
        ids = [];
    }
    // @ts-ignore
    if (id >= 1 && id <= 826 && !ids.includes(id)) {
        fetchCharacter<ICharacter>(id)
            .then(character => {
                addDataToStorage('characters', character);
                addDataToStorage('ids', character.id);
            })
            .then(() => {
                const characters = getDataFromStorage<ICharacter>('characters')!;
                if (characters.length > 5) {
                    const showCharacters = characters.slice(0, 5);
                    renderCharacters(container, showCharacters, noCharsText);
                    loadMoreCharactersButton.classList.add('active');
                } else {
                    renderCharacters(container, characters, noCharsText);
                }
            })
            .catch(error => console.log(error));
    } else {
        alert("Please enter ID from 1 to 826");
    }
});

loadMoreCharactersButton.addEventListener('click', () => {
   const characters = getDataFromStorage<ICharacter>('characters')!;
    characters.length >= sliceTo + 5 ? sliceTo += 5 : sliceTo = characters.length;
    if (characters.length >= 5) {
        renderCharacters(
         container,
         characters.slice(0, sliceTo),
         noCharsText
       );
    }
});