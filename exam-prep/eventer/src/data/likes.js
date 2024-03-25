import { get, post } from "./api.js";


export async function like(itemId) {
    debugger
    return post('/data/going', {itemId});
}

export async function totalCount(itemId) {
    return await get(`/data/going?where=eventId%3D%22${itemId}%22&distinct=_ownerId&count`);
}

export async function hasLiked(itemId, userId) {
    return await get(`/data/going?where=eventId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}