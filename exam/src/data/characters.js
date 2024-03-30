import { get } from "./api.js";

export async function getCharacters() {
    return get('/data/cyberpunk?sortBy=_createdOn%20desc');
}

