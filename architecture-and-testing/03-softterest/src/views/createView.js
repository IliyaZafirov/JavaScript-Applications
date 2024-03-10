import { dataService } from "../api/dataService.js";

const view = document.querySelector('div[data-view-name="create"]');
const form = view.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;
export function createView(ctx) {
    context = ctx;
    context.render(view);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
    const { title, description, imageURL } = Object.fromEntries(formData);
    // console.log(title, description, img);

    if (title.length < 6 || description < 10 || imageURL.length < 5) {
        return alert('Something wrong')
    }

    await dataService.createIdea({ title, description, imageURL });
    context.goTo('/dashboard');
    form.reset();
}