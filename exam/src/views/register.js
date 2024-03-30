import { html, page, renderer } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";
import { register } from "../data/users.js";

const registerTemplate = (onRegister) => html`
  <!-- BONUS: Notification -->
  <section id="notifications">
      <div id="errorBox" class="notification">
        <span class="msg">MESSAGE</span>
      </div>
    </section>
          <!-- Register Page (Only for Guest users) -->
          <section id="register">
            
            <div class="form">
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
                <p class="message">Already registered? <a href="/login">Login</a></p>
              </form>
            </div>
          </section>

`;

export function showRegister(ctx) {
  updateNav();

  renderer(registerTemplate(createSubmitHandler(onRegister)));
}

async function onRegister(data) {

  const [email, password, repeatPassword] = Object.values(data);
  if (!email || !password || !repeatPassword) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    return alert('Passwords don\'t match!');
  }

  // if (password.length < 6) {
  //     return alert('The password length minimum is 6');
  // }

  if (password != repeatPassword) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    return alert('Passwords don\'t match!');
  }

  await register(email, password);

  page.redirect('/');
}