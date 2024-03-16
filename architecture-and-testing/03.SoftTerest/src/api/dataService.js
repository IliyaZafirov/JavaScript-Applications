import { get, post, del } from "./requester.js";

const endpoints = {
    getAllIdeas: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    singleIdea: '/data/ideas/',
    createIdea: '/data/ideas'
};

async function getAllIdeas() {
    return await get(endpoints.getAllIdeas);
};

async function getIdea(id) {
    return await get(endpoints.singleIdea + id);
};

async function createIdea(data) {
    return await post(endpoints.createIdea, data);
};

async function removeIdea(id) {
    return await del(endpoints.singleIdea + id);
};

export const dataService = {
    getAllIdeas,
    getIdea,
    createIdea,
    removeIdea
};