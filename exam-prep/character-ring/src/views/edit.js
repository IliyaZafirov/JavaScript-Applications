import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

          <!-- Edit Page (Only for logged-in users) -->
          <section id="edit">
            <div class="form">
              <img class="border" src="./images/border.png" alt="">
              <h2>Edit Character</h2>
              <form @submit=${onEdit} dataset-id="${id}" class="edit-form">
                <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type" 
                .value = ${data.category}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value = ${data.imageUrl}
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
              .value = ${data.description}
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
              .value = ${data.moreInfo}
            ></textarea>
                <button type="submit">Edit</button>
              </form>
              <img class="border" src="./images/border.png" alt="">
            </div>
          </section>
          
`;

export async function showEdit(ctx) {
  updateNav();
  const id = ctx.params.id;
  const data = await get(`/data/characters/${id}`);
  // console.log(data._id);

  renderer(editTemp(data, id, onEdit));


  async function onEdit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');
  
    if (!category || !imageUrl || !description || !moreInfo) {
      return;
    }
    console.log(id);
    // console.log(getUser().accessToken);
    await put(`/data/characters/${id}`, { category, imageUrl, description, moreInfo });
  
    page.redirect(`/details/${id}`);
  }
}

