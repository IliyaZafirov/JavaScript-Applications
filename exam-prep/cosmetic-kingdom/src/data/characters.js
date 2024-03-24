import { get, post } from "./api.js";

export async function getData() {
    return get('/data/products?sortBy=_createdOn%20desc');
}


export async function createCharacter(name,imageUrl, category, description, price) {
    return post('/data/products', {name,imageUrl, category, description, price});
}

