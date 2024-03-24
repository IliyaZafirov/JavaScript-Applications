import { html, page, renderer } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";
import { register } from "../data/users.js";

const registerTemplate = (onRegister) => html`
          <!-- Register Page (Only for Guest users) -->
          <section id="register">
            
            <div class="form">
              <img class="border" src="./images/border.png" alt="">
              <h2>Register</h2>
              <form @submit=${onRegister} class="register-form">
                <input
                  type="text"
                  name="email"
                  id="register-email"
                  placeholder="email"
                />
                <input
                  type="password"
                  name="password"
                  id="register-password"
                  placeholder="password"
                />
                <input
                  type="password"
                  name="re-password"
                  id="repeat-password"
                  placeholder="repeat password"
                />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="#">Login</a></p>
              </form>
              <img class="border" src="./images/border.png" alt="">
            </div>
          
          </section>

`;

export function showRegister(ctx) {
  updateNav();

    renderer(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister(data) {

  const [email, password, repeatPassword] = Object.values(data);
    if (!email || !password) {
        return alert('All fields are required!');
    }

    if (password.length < 6) {
        return alert('The password length minimum is 6');
    }

    if (password != repeatPassword) {
        return alert('Password don\'t match!');
    }

    await register(email, password);

    page.redirect('/');
}