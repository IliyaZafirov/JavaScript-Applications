import { get } from "./data/api.js";
import { page } from "./lib.js";
import { clearUserData, updateNav } from "./util.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import * as api from './data/likes.js';
import { showCatalog } from "./views/catalog.js";

window.api = api;

page('/', showHome);
page('/catalog', showCatalog);
page('/register', showRegister);
page('/login', showLogin);
page('/add', showCreate);
page('/logout', () => { get('/users/logout'); clearUserData(); page.redirect('/'); updateNav();});
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();
updateNav();


