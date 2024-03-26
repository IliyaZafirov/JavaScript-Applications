import { post } from "../data/api.js";
import { getCharacters } from "../data/characters.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";


const catalogTemplate = (data) => html`
   <!-- Dashboard page -->
   <h2>Available Motorcycles</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${data.length ? data.map(el => html`
          <div class="motorcycle">
            <img src="${el.imageUrl}" alt="example1" />
            <h3 class="model">${el.model}</h3>
            <p class="year">Year: ${el.year}</p>
            <p class="mileage">Mileage: ${el.mileage} km.</p>
            <p class="contact">Contact Number: ${el.contact}</p>
            <a class="details-btn" href="/details/${el._id}">More Info</a>
          </div>`) 
          
          : html`
          </section>
         <!-- Display an h2 if there are no posts -->
         <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
          
          `;

export async function showCatalog() {
    const data = await getCharacters();

    renderer(catalogTemplate(data));

  updateNav();


}