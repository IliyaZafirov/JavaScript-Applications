import { getCharacters } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = () => html`
     <!-- Home page -->
     <section id="hero">
          <h1>
            Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
          </h1>
        </section>
`;

export async function showHome() {
  const data = await getCharacters();

  renderer(homeTemp(data));
  updateNav();
}