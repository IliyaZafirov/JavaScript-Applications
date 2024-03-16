import { register } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const registerSection = document.querySelector('div[data-view-name="register"]');
const form = registerSection.querySelector('form')
form.addEventListener('submit', onSubmit);

let context = null;

export function showRegisterView(ctx) {
    context = ctx;
    context.render(registerSection);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, repeatPassword } = Object.fromEntries(formData);
    // console.log(Object.fromEntries(formData));
    if (email.length < 3 || password < 3 || password != repeatPassword) {
        return alert('Something wrong!')
    }
    const userData = await register({ email, password });
    setUser(userData);
    context.updateNav();
    context.goTo('/home');
    form.reset();

}