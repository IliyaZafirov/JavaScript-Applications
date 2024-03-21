import { get, post } from "./api.js";

export async function getCharacters() {
    return get('/data/characters?sortBy=_createdOn%20desc');
}


export async function createCharacter(category, imageUrl, description, moreInfo) {
    return post('/data/characters', {category, imageUrl, description, moreInfo});
}

