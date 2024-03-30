import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

  <!-- BONUS: Notification -->
  <section id="notifications">
      <div id="errorBox" class="notification">
        <span class="msg">MESSAGE</span>
      </div>
    </section>
          <!-- Edit Page (Only for logged-in users) -->
          <section id="edit">
            <div class="form form-item">
              <h2>Edit Your Item</h2>
              <form @submit=${onEdit} dataset-id="${id}" class="edit-form">
                <input
                type="text"
                name="item"
                id="item"
                placeholder="item"
                .value = ${data.item}
              />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value = ${data.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value = ${data.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value = ${data.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value = ${data.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value = ${data.description}
              ></textarea>
                <button type="submit">Edit</button>
              </form>
            </div>
          </section>
          
`;

export async function showEdit(ctx) {
  updateNav();
  const id = ctx.params.id;
  const data = await get(`/data/cyberpunk/${id}`);
  // console.log(data._id);

  renderer(editTemp(data, id, onEdit));


  async function onEdit(event) {
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

    // console.log(getUser().accessToken);
    await put(`/data/cyberpunk/${id}`, { item, imageUrl, price, availability, type, description });

    page.redirect(`/details/${id}`);
  }
}

