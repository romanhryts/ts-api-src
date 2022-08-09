export default interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    created: string;
    image: string;
    location: {
        name: string;
    };
}