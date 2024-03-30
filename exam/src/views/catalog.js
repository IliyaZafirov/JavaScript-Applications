import { getCharacters } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const catalogTemp = (data) => html`

                 <!-- Dashboard page -->
        <h3 class="heading">Market</h3>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${data.length ? data.map(el => html`
          <div class="item">
          <img src=".${el.imageUrl}" alt="example3" />
            <h3 class="model">${el.item}</h3>
            <div class="item-info">
              <p class="price">Price: ${el.price}</p>
              <p class="availability">
                ${el.availability}
              </p>
              <p class="type">Type: ${el.type}</p>
            </div>
            <a class="details-btn" href="/details/${el._id}">Uncover More</a>
          </div>
   `)
      : html`  
     <!-- Display an h2 if there are no posts -->
     <h3 class="empty">No Items Yet</h3>`}
     
     </section>
`;

export async function showCatalog() {
  const data = await getCharacters();

  renderer(catalogTemp(data));
  updateNav();
}