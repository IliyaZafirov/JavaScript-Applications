import { getData } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = (data) => html`
        
    
        <!-- Dashboard page -->
        <h2>Current Events</h2>
        <section id="dashboard">

          <!-- Display a div with information about every post (if any)-->
          ${data.length ? data.map(el => html`
          <div class="event">
            <img src="${el.imageUrl}" alt="example1" />
            <p class="title">
              ${el.name}
            </p>
            <p class="date">${el.date}</p>
            <a class="details-btn" href="/details/${el._id}">Details</a>
          </div>
          `) : html`
    
          
          <!-- Display an h4 if there are no posts -->
          <h4>No Events yet.</h4>
          `}
        </section>


`;

export async function showHome() {
  const data = await getData();

  renderer(homeTemp(data));
  updateNav();
}