import { del, get } from "../data/api.js";
import { getUser, hasUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { hasLiked, like, totalCount } from '../data/likes.js';

const detailsTemp = (data, userExist, isOwner, totalLikes, isLiked, onDelete, onLike) => html`

  <!-- Details page -->
  <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>
                  ${data.description}
                </span>
              </div>

            </div>

            <h3>Going: <span id="go">${totalLikes}</span> times.</h3>

            ${userExist ? html` 

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
            ${isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
  : (!isLiked ? html`
              <!--Bonus - Only for logged-in users ( not authors )-->
              <a href="javascript:void(0)" @click=${onLike} id="go-btn">Going</a>` : null)}
            </div>

          </div>` : null}

        </section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const data = await get(`/data/events/${id}`);
  const user = await getUser();
  const userExist = hasUser();

  const isOwner = userExist && data._ownerId == user._id;
  const totalLikes = await totalCount(`${id}`);
  const isLiked = await hasLiked(id, user?._id);

  renderer(detailsTemp(data, userExist, isOwner, totalLikes, isLiked, onDelete, onLike));

  async function onDelete() {

    const choice = confirm('Are you sure?');

    if (choice) {
      await del(`/data/events/${id}`);
      page.redirect('/');
    }
  }

  async function onLike() {
    await like(id);
    page.redirect(`/details/${id}`);
  }
}
