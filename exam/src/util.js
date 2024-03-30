import { hasUser } from "./data/user-util.js";

export function saveUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function clearUserData() {
    localStorage.removeItem('user');
}

export function createSubmitHandler(callback) {

    return function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = [...formData.entries()].map(([k, v]) => [k, v.trim()]);

        // return Object.fromEntries(data);
        callback(Object.fromEntries(data)) // instead return
    }
}

export function updateNav() {
    const userExist = hasUser(); // true / false
    const guestA = document.querySelectorAll('div.guest a');
    const userA = document.querySelectorAll('div.user a');

    if (userExist) {
        guestA.forEach(a => a.style.display = 'none');
        userA.forEach(a => a.style.display = 'inline-block');
    } else {
        guestA.forEach(a => a.style.display = 'inline-block');
        userA.forEach(a => a.style.display = 'none');
    }
}
