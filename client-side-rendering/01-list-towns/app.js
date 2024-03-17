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