import { del, get, post } from "../data/api.js";
import { getUser, hasUser } from "../data/user-util.js";
import { html, page, renderer } from "../lib.js";
import { hasLiked, like, totalCount } from '../data/likes.js';

const detailsTemp = (data, userExist, isOwner, totalLikes, isLiked, onDelete, onLike) => html`

 <!-- Details page -->
 <section id="details">
            <div id="details-wrapper">
              <img id="details-img" src="${data.imageUrl}" alt="example1" />
              <div>
              <p id="details-category">${data.category}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                    ${data.description}
                    </p>
                    <p id ="more-info">
                    ${data.moreInfo}
                          </p>
                </div>
              </div>
                <h3>Is This Useful:<span id="likes">${totalLikes}</span></h3>

        ${userExist ? html` 
    
           <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
      : (!isLiked ? html`
      <!--Bonus - Only for logged-in users ( not authors )-->
      <a href="javascript:void(0)" @click=${onLike} id="like-btn">Like</a>` : null)}
              

            </div> ` : null}
     
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const data = await get(`/data/characters/${id}`);
  const user = await getUser();
  const userExist = hasUser();

  const isOwner = userExist && data._ownerId == user._id;
  const totalLikes = await totalCount(`${id}`);
  const isLiked = await hasLiked(id, user?._id);

  renderer(detailsTemp(data, userExist, isOwner, totalLikes, isLiked, onDelete, onLike));

  async function onDelete() {

    const choice = confirm('Are you sure?');

    if (choice) {
      await del(`/data/characters/${id}`);
      page.redirect('/');
    }

  }

  async function onLike() {
    await like(id);
    page.redirect(`/details/${id}`);
  }
}
