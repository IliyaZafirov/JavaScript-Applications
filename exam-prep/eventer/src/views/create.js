import { post } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const createTemp = (onCreate) => html`

  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

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
  const name = formData.get('name');
  const imageUrl = formData.get('imageUrl');
  const category = formData.get('category');
  const description = formData.get('description');
  const date = formData.get('date');

  if (!name || !category || !imageUrl || !description || !date) {
    return;
  }

  await post('/data/events', { name, category, imageUrl, description, date });
  // page.redirect(`/details/${id}`);
  page.redirect('/catalog');
}