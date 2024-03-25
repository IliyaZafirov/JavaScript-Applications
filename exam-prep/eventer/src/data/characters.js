import { get, post } from "./api.js";

export async function getData() {
    return get('/data/events?sortBy=_createdOn%20desc');
}

//
export async function createCharacter(name, imageUrl, category, description, date) {

    return post('/data/events', { name, imageUrl, category, description, date });
}

