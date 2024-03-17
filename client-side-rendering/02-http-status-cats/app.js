// ⦁	HTTP Status Cats
// We all love cats. They are also a fun way to learn all the HTTP status codes.
// Your task is to create a template to represent an HTTP cat card. After you have created the template, render all the cats into the section with id "allCats". Note that there should be a nested <ul> inside the section.
// An HTTP cat has an id, statusCode, statusMessage and imageLocation. The cats are seeded using the function from the JS file named "catSeeder.js" – import this file as a module.
// Each card block has a button that reveals its status code. You should toggle the button and change its text from "Show status code" to "Hide status code".
// See the file example.html for an example of how the rendered HTML should look like.

import { html, render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { cats } from './catSeeder.js';

function wrapperTemplate(cats) {
    return html`
    <ul>
        ${cats.map(cat => catTemplate(cat))} </ul>
    `;
}

const catTemplate = (cat) => html`
             <li>
                 <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                 <div class="info">
                     <button @click=${toggleCatStatus} class="showBtn">Show status code</button>
                     <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
            `;

function toggleCatStatus(event) {
    const wrapper = event.target.parentElement;
    const currentState = wrapper.querySelector('div');
    const btn = wrapper.querySelector('button');

    if (currentState.style.display == 'none') {
        currentState.style.display = 'block';
        btn.textContent = 'Hide status code';
    } else {
        currentState.style.display = 'none';
        btn.textContent = 'Show status code';
    }

}

const root = document.getElementById('allCats');

function showCats() {
    render(wrapperTemplate(cats), root);
}

page('/', showCats);

page.start();
