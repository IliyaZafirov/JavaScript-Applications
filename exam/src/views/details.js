import { del, get, post } from "../data/api.js";
import { getUser, hasUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import {  like } from '../data/likes.js';

const detailsTemp = (data, isOwner, onDelete) => html`

        <!-- Details page -->
        <section id="details">
          <div id="details-wrapper">
            <div>
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
              <p id="details-title">${data.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: ${data.price}</p>
                <p class="details-availability">
                 ${data.availability}
                </p>
                <p class="type">Type: ${data.type}</p>
                <p id="item-description">
                  ${data.description}
                </p>
              </div>

                            <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
              ${isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
    : null}

              </div>
              </div>
          </div>
        </section>
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const data = await get(`/data/cyberpunk/${id}`);
  const user = await getUser();
  const userExist = hasUser();

  const isOwner = userExist && data._ownerId == user._id;

  renderer(detailsTemp(data, isOwner, onDelete));

  async function onDelete() {

    const choice = confirm('Are you sure?');

    if (choice) {
      await del(`/data/cyberpunk/${id}`);
      page.redirect('/catalog');
    }

  }

}
