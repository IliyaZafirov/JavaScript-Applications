import { getCharacters } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = (data) => html`
 <!-- Home page -->
        
 <section id="hero">
            <h1>Welcome to Elden Ring Explorer, your gateway
              to the mystical world of Elden Ring! Embark
                on an epic journey through a land shrouded
                in myth and mystery. Whether you're a seasoned
                  adventurer or new to this realm, our app will
                  guide you through the wonders and challenges
                    that await in this extraordinary game world</h1>
                    <img id="hero-img" src="./images/hero.png" alt="hero">
          </section>

          <!-- Dashboard page -->
          <h2>Characters</h2>
          <section id="characters">
            <!-- Display a div with information about every post (if any)-->
            ${data.length ? data.map(el => html`
            <div class="character">
              <img src=".${el.imageUrl}" alt="example3" />
              <div class="hero-info">
                <h3 class="category">${el.category}</h3>
                <p class="description">${el.description}</p>
                <a class="details-btn" href="/details/${el._id}">More Info</a>
              </div>
            
            </div>
            `)
          
          : html`       
          <!-- Display an h2 if there are no posts -->
          <h2>No added Heroes yet.</h2>`}

           
            
          </section>
   

`;

export async function showHome() {
  const data = await getCharacters();

  renderer(homeTemp(data));
  updateNav();
}