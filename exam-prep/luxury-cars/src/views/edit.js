import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

        <!-- Edit Page (Only for logged-in users) -->
        <section id="edit">
            <div class="form form-auto">
              <h2>Edit Your Car</h2>
              <form @submit=${onEdit} dataset-id="${id}" class="edit-form">
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${data.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="car-image"
                  placeholder="Your Car Image URL"
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
              type="number"
              name="weight"
              id="weight"
              placeholder="Weight in Kg"
              .value = ${data.weight}
            />
            <input
              type="text"
              name="speed"
              id="speed"
              placeholder="Top Speed in Kmh"
              .value = ${data.speed}
            />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
                .value = ${data.about}
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function showEdit(ctx) {
  updateNav();
  const id = ctx.params.id;
  const data = await get(`/data/cars/${id}`);
  // console.log(data._id);

  renderer(editTemp(data, id, onEdit));


  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const price = formData.get('price');
    const weight = formData.get('weight');
    const speed = formData.get('speed');
    const about = formData.get('about');



    if (!model || !imageUrl || !price || !weight || !speed || !about) {
      return;
    }
    console.log(id);
    // console.log(getUser().accessToken);
    await put(`/data/cars/${id}`, { model, imageUrl, price, weight, speed, about });

    page.redirect(`/details/${id}`);
  }
}

