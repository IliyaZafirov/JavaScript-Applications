// ⦁	Search in List
// An HTML page holds a list of towns, a search box and a [Search] button. Create a template for a list, containing all towns, that can be easily updated when the user performs a search. The list should be rendered inside the <div> element with id "towns". Load the values from the file towns.js, which you can import as a module.
// Implement the search function to apply class "active" to the items from the list which include the text from the search box. Also print the number of items the current search matches in the format "<matches> matches found". The search should be case-sensitive.
// See the file example.html for an example of how the rendered HTML should look like.

import { html, render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { towns } from './towns.js';

const listWrapper = document.querySelector('#towns');

const listTemplate = (data) => html`
      <ul>
      ${data.map(el => html`<li>${el}</li>`)}
      </ul>
`;

function showList() {
   render(listTemplate(towns), listWrapper);
   document.querySelector('button').addEventListener('click', search);
}

const resultWrapper = document.querySelector('#result');

const resultTemplate = (data, result) => html`
     <ul>
      ${data.map(el => {
   if (result.includes(el)) {
      return html`<li class="active">${el}</li>`
   } else {
      return html`<li>${el}</li>`
   }
})}
      </ul>
`;

function search(event) {
   const input = document.getElementById('searchText').value;
   if (!input) return;

   const result = towns.filter(el => el.includes(input));

   render(resultTemplate(towns, result), listWrapper);
   resultWrapper.textContent = `${result.length} matches found`;
}

page('/', showList);
page.start();