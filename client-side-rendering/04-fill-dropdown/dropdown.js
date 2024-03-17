// ⦁	Fill Dropdown
// Create functionality that loads list items from a remote service and displays them inside a drop-down menu. The user should also be able to add new items to the service by entering them in the input field on the page and submitting the form. Create a template for the drop-down list and the items inside it that can be easily updated with new entries.
// When the program starts, the data should be automatically retrieved from the server via GET request from URL http://localhost:3030/jsonstore/advanced/dropdown and rendered as <option> items inside the <select> with id "menu". Upon form submission, send a POST request to the same URL and if it is successful, update the list of options with the newly created item.
// Each item has a property text entered by the user and _id, which is generated by the server. When creating the HTML elements, use the _id as option value and text as option textContent.

import { html, render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';

const api = 'http://localhost:3030/jsonstore/advanced/dropdown';

const menu = document.querySelector('#menu');

const res = await fetch(api);
const data = await res.json();

const optionsTemplate = (data) => html`
  ${data.map(el => html`<option value=${el._id}>${el.text}</option>`)}
`;

function showOptions() {
    render(optionsTemplate(Object.values(data)), menu);

    document.querySelector('form').addEventListener('submit', addItem);
}

async function addItem(event) {
    event.preventDefault();
    const inputElement = document.getElementById('itemText');
    const text = inputElement.value;
    await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text})
    })
    window.location.reload(true);
}

page('/', showOptions);
page.start();

