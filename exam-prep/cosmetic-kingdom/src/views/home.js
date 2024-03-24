import { getData } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = (data) => html`
        
        <!-- Dashboard page -->
        <h2>Products</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->

          ${data.length ? data.map(el => html`
          <div class="product">
            <img src="${el.imageUrl}" alt="example1" />
            <p class="title">${el.name}</p>
            <p><strong>Price:</strong><span class="price">${el.price}</span>$</p>
            <a class="details-btn" href="/details/${el._id}">Details</a>
          </div>
          `) : html`
              <!-- Display an h2 if there are no posts -->
        <h2>No products yet.</h2>
          `}

        </section>
    


`;

export async function showHome() {
  const data = await getData();
  console.log(data);
  renderer(homeTemp(data));
  updateNav();
}