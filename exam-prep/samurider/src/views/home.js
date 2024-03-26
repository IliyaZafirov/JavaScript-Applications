import { getCharacters } from "../data/characters.js";
import { html, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const homeTemp = () => html`
        <!-- Home page -->
        <section id="home">
          <h1>
            Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
          <img
            src="/images/motorcycle.png"
            alt="home"
          />

        </section>

`;

export async function showHome() {
  const data = await getCharacters();

  renderer(homeTemp(data));
  updateNav();
}