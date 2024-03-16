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
    debugger
    const formData = new FormData(e.target);
    const data = [...formData.entries()]
    const { title, description, imageURL } = Object.fromEntries(data);
    // console.log(title, description, img);
    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return alert('Something wrong')
    }
    
    const img = imageURL;
    await dataService.createIdea({ title, description, img });
    form.reset();
    context.goTo('/dashboard');
}