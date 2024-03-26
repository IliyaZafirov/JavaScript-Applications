import { del, get, post } from "../data/api.js";
import { getUser, hasUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { hasLiked, like, totalCount } from '../data/likes.js';

const detailsTemp = (data, userExist, isOwner, onDelete) => html`

        <!-- Details page -->
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${data.year}</p>
                <p class="mileage">Mileage: ${data.mileage} km.</p>
                <p class="contact">Contact Number: ${data.contact}</p>
                   <p id = "motorcycle-description">
                  ${data.about}
                        </p>
              </div>

              ${userExist && isOwner ? html` 
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
          </div>` : null}
            </div>
        </div>
      </section>
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const data = await get(`/data/motorcycles/${id}`);
  const user = await getUser();
  const userExist = hasUser();

  const isOwner = userExist && data._ownerId == user._id;

  renderer(detailsTemp(data, userExist, isOwner, onDelete));

    async function onDelete() {

        const choice = confirm('Are you sure?');

        if (choice) {
          await del(`/data/motorcycles/${id}`);
          page.redirect('/catalog');
        }

      }
}
