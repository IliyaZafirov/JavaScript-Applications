// ⦁	List Towns
// You are given an input field with a button. In the input field you should enter elements separated by comma and whitespace (", "). Your task is to create a simple template that defines a list of towns. Each town comes from the input field. The list should be rendered inside the element with Id "root".

import { html, render } from './node_modules/lit-html/lit-html.js';

document.querySelector('form').addEventListener('submit', onSubmit);
const root = document.getElementById('root');

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const townsList = formData.get('towns').split(', ');
    renderer(listTemplate(townsList))
}

const listTemplate = (data) => html`
    <ul>
    ${data.map(el => html`<li>${el}</li>`)}
    </ul>
    `;

function renderer(temp) {
    render(temp, root);
}