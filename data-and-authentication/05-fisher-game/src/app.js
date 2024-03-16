document.querySelector('a[id="home"]').classList = 'active';
document.getElementById('logout').addEventListener('click', onLogout);
document.querySelector('.load').addEventListener('click', onLoadCatch);
document.getElementById('addForm').addEventListener('submit', onCreate);

const userNavRef = document.getElementById('user');
const guestNavRef = document.getElementById('guest');
const addBtnRef = document.querySelector('.add');

const catchesWrapperRef = document.getElementById('catches');

const endpoints = {
    logout: 'http://localhost:3030/users/logout',
    catches: 'http://localhost:3030/data/catches'
}

let userData = JSON.parse(sessionStorage.getItem('userData'));

function hasOwner(id) {
    return userData?._id === id;
}

updateNav();
function updateNav() {
    if (userData) {
        document.querySelector('nav p span').textContent = userData.email;
        userNavRef.style.display = 'inline-block';
        guestNavRef.style.display = 'none';
        addBtnRef.disabled = false;
    } else {
        document.querySelector('nav p span').textContent = 'guest';
        userNavRef.style.display = 'none';
        guestNavRef.style.display = 'inline-block';
        addBtnRef.disabled = true;
    }
}

async function onLogout(e) {
    let option = {
        method: 'GET',
        headers: {
            'X-Authorization': userData.accessToken
        }
    }
    await fetch(endpoints.logout, option);
    sessionStorage.clear();
    userData = null;
    await onLoadCatch();
    updateNav();
}

async function onLoadCatch() {

    catchesWrapperRef.innerHTML = '';

    const response = await fetch(endpoints.catches);
    const data = await response.json();
    data.forEach(x => {
        let div = listCatches(x);
        catchesWrapperRef.appendChild(div);
    })

}

function listCatches(data) {
    let isOwner = hasOwner(data._ownerId);
    const div = document.createElement('div');
    div.classList = 'catch';

    // disabled = ${hasOwner(data._ownerId} for inpot type lines
    div.innerHTML += `<label>Angler</label>`
    div.innerHTML += `<input type="text" class="angler" ${isOwner ? '' : 'disabled'} value="${data.angler}">`
    div.innerHTML += `<label>Weight</label>`
    div.innerHTML += `<input type="text" class="weight" ${isOwner ? '' : 'disabled'} value="${data.weight}">`
    div.innerHTML += `<label>Species</label>`
    div.innerHTML += `<input type="text" class="species" ${isOwner ? '' : 'disabled'} value="${data.species}">`
    div.innerHTML += `<label>Location</label>`
    div.innerHTML += `<input type="text" class="location" ${isOwner ? '' : 'disabled'} value="${data.location}">`
    div.innerHTML += `<label>Bait</label>`
    div.innerHTML += `<input type="text" class="bait" ${isOwner ? '' : 'disabled'} value="${data.bait}">`
    div.innerHTML += `<label>Capture Time</label>`
    div.innerHTML += `<input type="number" class="captureTime" ${isOwner ? '' : 'disabled'} value="${data.captureTime}">`


    const updateBtn = document.createElement('button');
    updateBtn.classList = 'update';
    updateBtn.dataset.id = data._id;
    updateBtn.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'delete';
    deleteBtn.dataset.id = data._id;
    deleteBtn.textContent = 'Delete';

    if (!hasOwner(data._ownerId)) {

        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }

    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    updateBtn.addEventListener('click', onUpdate);
    deleteBtn.addEventListener('click', onDelete);
    return div;
}

async function onCreate(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let angler = formData.get('angler');
    let weight = formData.get('weight');
    let species = formData.get('species');
    let location = formData.get('location');
    let bait = formData.get('bait');
    let captureTime = formData.get('captureTime');
    let _ownerId = userData._id;

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return; // TODO error
    }
    let data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId
    }
    const option = createOption('POST', data)
    
    await fetch(endpoints.catches, option)
    e.target.reset();
    onLoadCatch();
}

async function onUpdate(e) {
    e.preventDefault();

    const id = e.target.dataset.id;
    const data = {
        angler: e.target.parentElement.children[1].value,
        weight: e.target.parentElement.children[3].value,
        species: e.target.parentElement.children[5].value,
        location: e.target.parentElement.children[7].value,
        bait: e.target.parentElement.children[9].value,
        captureTime: e.target.parentElement.children[11].value
    }
    console.log(Object.values(data));

    if (!data.angler || !data.weight || !data.species || !data.location || !data.bait || !data.captureTime) {
        return; // TODO error
    }
    
    const option = createOption('PUT', data);
    await fetch(endpoints.catches + '/' + id, option);
    onLoadCatch();
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    const option = {
        method: 'DELETE',
        headers: {
            'X-Authorization': userData.accessToken
        }
    }
    await fetch(endpoints.catches + '/' + id, option);
    onLoadCatch();
}

function createOption(method, data) {
    return {
        method,
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': userData.accessToken
        },
        body: JSON.stringify(data)
    }
}


// <legend>Add Catch</legend>
// <label>Angler</label>
// <input type="text" name="angler" class="angler" />
// <label>Weight</label>
// <input type="number" name="weight" class="weight" />
// <label>Species</label>
// <input type="text" name="species" class="species" />
// <label>Location</label>
// <input type="text" name="location" class="location" />
// <label>Bait</label>
// <input type="text" name="bait" class="bait" />
// <label>Capture Time</label>
// <input type="number" name="captureTime" class="captureTime" />