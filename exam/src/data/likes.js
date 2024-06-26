import { get, post } from "./api.js";


export async function like(characterId) {
    return post('/data/cyberpunk', {characterId});
}

export async function totalCount(characterId) {
    return await get(`/data/cyberpunk?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);
}

export async function hasLiked(characterId, userId) {
    return await get(`/data/cyberpunk?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}