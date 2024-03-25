import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

          <!-- Edit Page (Only for logged-in users) -->
          <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onEdit} dataset-id="${id}"  class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value = ${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value = ${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value = ${data.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value = ${data.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value = ${data.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
          
`;

export async function showEdit(ctx) {
  updateNav();
  const id = ctx.params.id;
  const data = await get(`/data/events/${id}`);

  renderer(editTemp(data, id, onEdit));

  async function onEdit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
  
    if (!name ||!category || !imageUrl || !description || !date) {
      return;
    }
    console.log(id);
    // console.log(getUser().accessToken);
    await put(`/data/events/${id}`, { name, category, imageUrl, description, date });
  
    page.redirect(`/details/${id}`);
  }
}