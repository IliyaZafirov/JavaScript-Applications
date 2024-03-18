// ⦁	Table – Search Engine
// Write a function that searches in a table by given input. Create a template for a table row, which can be easily updated with class values when the user performs a search. Load the data from the following URL with a GET request: http://localhost:3030/jsonstore/advanced/table
 
// When the "Search" button is clicked, go through all cells in the table body and check if the given input is included anywhere. The search should be case-insensitive.
// If any of the rows contains the submitted string, add a select class to that row. Note that more than one row may contain the given string. If there is no match nothing should be highlighted.
// Note: After every search, clear the input field and remove all already selected classes (if any) from the previous search, in order for the new search to contain only the new result.
// See the file example.html for an example of how the rendered HTML should look like.

import { html, renderer } from "./lib.js";

const usersTemplate = (data) => html`
    ${data.map(el => html`
    <tr>
    <td>${el.firstName} ${el.lastName}</td>
    <td>${el.email}</td>
    <td>${el.course}</td>
    </tr>
    `)}
`;

const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
const data = await res.json();
const values = Object.values(data);

export function showUsers() {
    renderer(usersTemplate(values));

    document.querySelector('button').addEventListener('click', onSearch);
}

const resultTemplate = (data, result) => html`
    ${data.map(el => {
    if (result.includes(el)) {
        return html`
        <tr class="select">
            <td>${el.firstName} ${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.course}</td>
        </tr>
        `;
    } else {
        return html`
        <tr>
            <td>${el.firstName} ${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.course}</td>
        </tr >`
    }
})}
`;

function onSearch(event) {
    const inputElement = document.getElementById('searchField');
    const searchValue = inputElement.value;
    if (!searchValue) return;
    debugger
    const result = values.filter(el => el.firstName.toLowerCase().includes(searchValue.toLowerCase()) || el.lastName.toLowerCase().includes(searchValue.toLowerCase()) || el.email.toLowerCase().includes(searchValue.toLowerCase()) || el.course.toLowerCase().includes(searchValue.toLowerCase()));
    inputElement.value = '';

    renderer(resultTemplate(values, result))
} 