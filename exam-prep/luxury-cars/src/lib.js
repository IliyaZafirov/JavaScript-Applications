import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';


const main = document.querySelector('main');

function renderer(temp) {
    render(temp, main);
}

export { html, renderer, page }