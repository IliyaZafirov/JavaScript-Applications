import { get, post, put } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const editTemp = (data, id, onEdit) => html`

        <!-- Edit Page (Only for logged-in users) -->
        <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
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
                  id="moto-image"
                  placeholder="Moto Image"
                  .value = ${data.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value = ${data.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value = ${data.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value = ${data.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
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
  const data = await get(`/data/motorcycles/${id}`);
  // console.log(data._id);

  renderer(editTemp(data, id, onEdit));


  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const year = formData.get('year');
    const mileage = formData.get('mileage');
    const contact = formData.get('contact');
    const about = formData.get('about');



    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
      return;
    }
    console.log(id);
    // console.log(getUser().accessToken);
    await put(`/data/motorcycles/${id}`, { model, imageUrl, year, mileage, contact, about });

    page.redirect(`/details/${id}`);
  }
}

