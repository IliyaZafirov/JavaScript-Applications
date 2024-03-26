import { get } from "../data/api.js";
import { html, renderer } from "../lib.js"

const searchTemplate = (result) => html`

       <!-- Search page -->
     <section id="search">

        <div class="form">
          <h4>Search</h4>
            <form @submit=${onSearch} class="search-form">
                <input
                type="text"
                name="search"
                id="search-input"
                />
                <button class="button-list">Search</button>
            </form>
         </div>

         <h4 id="result-heading">Results:</h4>

 
           ${result.length ? showResultTemp(result) : html`<h2 class="no-avaliable">No result.</h2>`}

        
          </div>
      </section>
`;

const showResultTemp = (result) => html`
  <div class="search-result">
        ${result.length ? result.map(el => html`
        <div class="motorcycle">
          <img src="${el.imageUrl}" alt="example1" />
          <h3 class="model">${el.model}</h3>
            <a class="details-btn" href="/details/${el._id}">More Info</a>
        </div>`) : html ` 
        <h2 class="no-avaliable">No result.</h2>
        `}
        </div> 
`;

export function showSearch(result) {

    renderer(searchTemplate(result));

}

async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const inputValue = formData.get('search');

    if (!inputValue) return alert('No input for search');

    const data = await get(`/data/motorcycles?where=model%20LIKE%20%22${inputValue}%22`);
        console.log(data);

   renderer(searchTemplate(data));

}