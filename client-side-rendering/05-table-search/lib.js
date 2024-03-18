import { html, render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';

const root = document.querySelector('tbody');

function renderer(temp) {
    render(temp, root);
}

export { html, renderer, page }