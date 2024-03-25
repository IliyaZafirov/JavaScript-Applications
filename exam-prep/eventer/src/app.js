import { get } from "./data/api.js";
import { page } from "./lib.js";
import { clearUserData, updateNav } from "./util.js";
import { showIndex } from "./views/index.js";
import { showHome } from "./views/home.js";
import { showRegister } from "./views/register.js";
import { showLogin } from "./views/login.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import * as api from './data/likes.js';

window.api = api;

page('/', showIndex);
page('/catalog', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/add', showCreate);
page('/logout', () => { get('/users/logout'); clearUserData(); page.redirect('/'); updateNav(); });
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();
updateNav();


