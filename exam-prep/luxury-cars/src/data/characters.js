import { get, post } from "./api.js";

export async function getCharacters() {
    return get('/data/cars?sortBy=_createdOn%20desc');
}


// export async function createCharacter(category, imageUrl, description, moreInfo) {
//     return post('/data/motorcycles', {category, imageUrl, description, moreInfo});
// }

