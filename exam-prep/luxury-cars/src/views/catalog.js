import { post } from "../data/api.js";
import { getCharacters } from "../data/characters.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";


const catalogTemplate = (data) => html`

         <!-- Dashboard page -->
        <h3 class="heading">Our Cars</h3>
        <section id="dashboard">
        ${data.length ? data.map(el => html`
          <!-- Display a div with information about every post (if any)-->
          <div class="car">
            <img src="${el.imageUrl}" alt="example1" />
            <h3 class="model">${el.model}</h3>
            <div class="specs">
              <p class="price">Price: €${el.price}</p>
              <p class="weight">Weight: ${el.weight} kg</p>
              <p class="top-speed">Top Speed: ${el.speed} kph</p>
            </div>
            <a class="details-btn" href="/details/${el._id}">More Info</a>
          </div>`) 

          : html `
                 <!-- Display an h2 if there are no posts -->
        <h3 class="nothing">Nothing to see yet</h3>`}
          
        </section>
 
          `;

export async function showCatalog() {
    const data = await getCharacters();

    renderer(catalogTemplate(data));

  updateNav();


}