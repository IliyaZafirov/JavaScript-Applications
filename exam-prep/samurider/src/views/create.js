import { post } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const createTemp = (onCreate) => html`
         <!-- Create Page (Only for logged-in users) -->
         <section id="create">
            <div class="form">
              <h2>Add Character</h2>
              <form @submit=${onCreate} class="create-form">
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
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

  //
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
  // console.log(getUser().accessToken);
  await post('/data/motorcycles', { model, imageUrl, year, mileage, contact, about });

  page.redirect('/catalog');
}