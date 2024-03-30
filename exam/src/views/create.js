import { post } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const createTemp = (onCreate) => html`

  <!-- BONUS: Notification -->
  <section id="notifications">
      <div id="errorBox" class="notification">
        <span class="msg">MESSAGE</span>
      </div>
    </section>
    
         <!-- Create Page (Only for logged-in users) -->
         <section id="create">
            <div class="form form-item">
              <h2>Share Your item</h2>
              <form @submit=${onCreate} class="create-form">
                <input
                  type="text"
                  name="item"
                  id="item"
                  placeholder="item"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="item-image"
                  placeholder="Your item Image URL"
                />
                <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Add</button>
              </form>
            </div>
          </section>
`;

export function showCreate() {
  updateNav();

  renderer(createTemp(onCreate));
}

async function onCreate(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const item = formData.get('item');
  const imageUrl = formData.get('imageUrl');
  const price = formData.get('price');
  const availability = formData.get('availability');
  const type = formData.get('type');
  const description = formData.get('description');



  if (!item || !imageUrl || !price || !availability || !type || !description) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    return;
  }

  await post('/data/cyberpunk', { item, imageUrl, price, availability, type, description });

  page.redirect('/catalog');
}