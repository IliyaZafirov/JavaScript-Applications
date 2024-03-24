import { get, post } from "./api.js";


export async function like(itemId) {
    return post('/data/bought', {itemId});
}

export async function totalCount(itemId) {
    return await get(`/data/bought?where=productId%3D%22${itemId}%22&distinct=_ownerId&count`);
}

export async function hasLiked(itemId, userId) {
    return await get(`/data/bought?where=productId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}