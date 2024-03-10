import { post, get } from "./requester.js";

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout'
}

async function register(data) {
    return await post(endpoints.register, data);
}

async function login(data) {
    return await post(endpoints.login, data);

}

async function logout() {
    return await get(endpoints.logout)
}

export {
    register,
    login,
    logout
}