import { logout } from "./src/api/userService.js";
import { hasUser, removeUser } from "./src/utils/userUtils.js";
import { createView } from "./src/views/createView.js";
import { dashboardView } from "./src/views/dashboardView.js";
import { detailsView } from "./src/views/detailsView.js";
import { homeView } from "./src/views/homeView.js";
import { loginView } from "./src/views/loginView.js";
import { showRegisterView } from './src/views/registerView.js';

document.querySelectorAll('div[data-selection="section"]').forEach(div => div.remove());

const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

updateNav();
const routes = {
    '/': homeView,
    '/home': homeView,
    '/dashboard': dashboardView,
    '/create': createView,
    '/login': loginView,
    '/register': showRegisterView,
    '/details': detailsView,
    '/logout': async () => {
        await logout();
        removeUser();
        updateNav();
        goTo('/');
    },
    '*': () => console.log('404 page not found')
};

function updateNav() {
    const isUserExist = hasUser(); // true
    const guestA = document.querySelectorAll('a[data-permission="guest"]');
    const userA = document.querySelectorAll('a[data-permission="user"]');

    if (isUserExist) {
        guestA.forEach(a => a.style.display = 'none');
        userA.forEach(a => a.style.display = 'block');
    } else {
        guestA.forEach(a => a.style.display = 'block');
        userA.forEach(a => a.style.display = 'none');
    }
}

function renderer(view) {
    main.replaceChildren(view);
}

function onNavigate(e) {
    e.preventDefault();
    let element = e.target;
    if (e.target.tagName !== 'A' && e.target.tagName !== 'IMG') {
        return;
    }

    if (e.target.tagName == 'IMG') {
        element = e.target.parentElement;

    }

    const viewName = new URL(element.href).pathname;
    goTo(viewName);
}

let ctx = {
    render: renderer,
    goTo,
    updateNav
}

function goTo(name, ...params) {
    const handler = routes[name];
    if (typeof handler !== 'function') {
        return routes['*']();
    }
    handler(ctx, params);

}

goTo('/');