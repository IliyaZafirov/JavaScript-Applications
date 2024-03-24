import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

         <!-- Edit Page (Only for logged-in users) -->
         <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${onEdit} dataset-id="${id}" class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value = ${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value = ${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value = ${data.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value = ${data.description}
              ></textarea>

              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value = ${data.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>
          
`;

export async function showEdit(ctx) {
  updateNav();
  const id = ctx.params.id;
  const data = await get(`/data/products/${id}`);
  // console.log(data._id);

  renderer(editTemp(data, id, onEdit));


  async function onEdit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    const category = formData.get('category');
    const description = formData.get('description');
    const price = formData.get('price');
  
    if (!name ||!category || !imageUrl || !description || !price) {
      return;
    }
    console.log(id);
    // console.log(getUser().accessToken);
    await put(`/data/products/${id}`, { name, category, imageUrl, description, price });
  
    page.redirect(`/details/${id}`);
  }
}

