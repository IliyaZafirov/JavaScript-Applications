import { post } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const createTemp = (onCreate) => html`
         <!-- Create Page (Only for logged-in users) -->
         <section id="create">
            <div class="form">
              <img class="border" src="./images/border.png" alt="">
              <h2>Add Character</h2>
              <form @submit=${onCreate} class="create-form">
                <input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Character Type"
                />
                <input
                  type="text"
                  name="image-url"
                  id="image-url"
                  placeholder="Image URL"
                />
                <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
              ></textarea>
              <textarea
                id="additional-info"
                name="additional-info"
                placeholder="Additional Info"
                rows="2"
                cols="10"
              ></textarea>
                <button type="submit">Add Character</button>
              </form>
              <img class="border" src="./images/border.png" alt="">
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
  const category = formData.get('category');
  const imageUrl = formData.get('image-url');
  const description = formData.get('description');
  const moreInfo = formData.get('additional-info');

  if (!category || !imageUrl || !description || !moreInfo) {
    return;
  }
    console.log(getUser().accessToken);
  await post('/data/characters', { category, imageUrl, description, moreInfo });

  page.redirect('/')
}