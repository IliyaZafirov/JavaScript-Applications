import { getCharacters } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = (data) => html`
  <!-- Home page -->
  <section id="hero">
          <img src="./images/home.png" alt="home" />
          <p>We know who you are, we will contact you</p>
        </section>

       
   

`;

export async function showHome() {
  const data = await getCharacters();

  renderer(homeTemp(data));
  updateNav();
}