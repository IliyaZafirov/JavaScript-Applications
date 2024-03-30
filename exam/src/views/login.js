import { html, page, renderer } from "../lib.js";
import { createSubmitHandler, updateNav } from "../util.js";
import { login } from "../data/users.js";

const loginTemplate = (onLogin) => html`
  <!-- BONUS: Notification -->
  <section id="notifications">
      <div id="errorBox" class="notification">
        <span class="msg">MESSAGE</span>
      </div>
    </section>
    
          <!-- Login Page (Only for Guest users) -->
          <section id="login">
            <div class="form">
              <h2>Login</h2>
              <form @submit=${onLogin} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
                <button type="submit">login</button>
                <p class="message">
                  Not registered? <a href="/register">Create an account</a>
                </p>
              </form>
            </div>
          </section>
`;

export function showLogin(ctx) {
  updateNav();
  renderer(loginTemplate(createSubmitHandler(onLogin)));
}

async function onLogin({ email, password }) {

  if (!email || !password) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    return alert('All fields are required!');
  }

  await login(email, password);
  updateNav();
  page.redirect('/');
}