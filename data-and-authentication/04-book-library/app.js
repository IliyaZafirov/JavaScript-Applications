const url = 'http://localhost:3030/jsonstore/collections/books';
const tbodyElement = document.querySelector('tbody');
tbodyElement.innerHTML = '';

let title = document.querySelector('input[name="title"]');
let author = document.querySelector('input[name="author"]');
const h3Element = document.querySelector('form h3');
let currentEditId = null;

document.getElementById('loadBooks').addEventListener('click', onLoad);

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (h3Element.textContent === 'Edit FORM') {
        try {
            await fetch(url + '/' + currentEditId, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ author: author.value, title: title.value })
            })
            onLoad();
            return;
        } catch (error) {
            alert(error);
        }

    }
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ author: author.value, title: title.value })
        })

        title.value = '';
        author.value = '';
        onLoad();
    } catch (error) {
        alert(error);
    }

});

async function onLoad() {

    const response = await fetch(url);
    const data = await response.json();

    tbodyElement.innerHTML = '';
    Object.entries(data).forEach(el => {
        createAndAppend(el);
    })

}

function createAndAppend(data) {
    const trElement = document.createElement('tr');

    const tdTitleElement = document.createElement('td');
    tdTitleElement.textContent = data[1].title;

    const tdAuthorElement = document.createElement('td');
    tdAuthorElement.textContent = data[1].author;

    trElement.appendChild(tdTitleElement);
    trElement.appendChild(tdAuthorElement);

    const tdButtonsElement = document.createElement('td');

    const btnEditElement = document.createElement('button');
    btnEditElement.textContent = 'Edit';
    btnEditElement.dataset.id = data[0];
    btnEditElement.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;

        const req = await fetch(url + '/' + id, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })
        const res = await req.json();

        h3Element.textContent = 'Edit FORM';
        title.value = res.title;
        author.value = res.author;
        currentEditId = id;

    });

    const btnDeleteElement = document.createElement('button');
    btnDeleteElement.textContent = 'Delete';
    btnDeleteElement.dataset.id = data[0];
    btnDeleteElement.addEventListener('click', async (e) => {
        // console.log(e.target);
        const id = e.target.dataset.id;
        await fetch(url + '/' + id, { method: 'DELETE' });
        onLoad();
    });


    tdButtonsElement.appendChild(btnEditElement);
    tdButtonsElement.appendChild(btnDeleteElement);

    trElement.appendChild(tdButtonsElement);
    tbodyElement.appendChild(trElement);
}