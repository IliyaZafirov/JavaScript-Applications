import { html, renderer } from './lib.js';
import { page } from './lib.js';
import { showUsers } from './users.js';


page('/', showUsers);

page.start();

