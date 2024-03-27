import { post } from "../data/api.js";
import { getUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { updateNav } from "../util.js";

const createTemp = (onCreate) => html`
         <!-- Create Page (Only for logged-in users) -->
         <section id="create">
            <div class="form form-auto">
              <h2>Share Your Car</h2>
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
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
              type="text"
              name="price"
              id="price"
              placeholder="Price in Euro"
            />
            <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Weight in Kg"
          />
          <input
            type="text"
            name="speed"
            id="speed"
            placeholder="Top Speed in Kmh"
          />
            <textarea
              id="about"
              name="about"
              placeholder="More About The Car"
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

  //
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
  // console.log(getUser().accessToken);
  await post('/data/cars', { model, imageUrl, price, weight, speed, about });

  page.redirect('/catalog');
}