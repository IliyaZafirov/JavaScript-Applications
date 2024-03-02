function articleTemplate({ _id, title }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'accordion';
    const headElement = document.createElement('div');
    headElement.className = 'head';

    const spanElement = document.createElement('span');
    spanElement.textContent = title;
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.setAttribute('id', _id);
    btn.textContent = 'More';

    headElement.appendChild(spanElement);
    headElement.appendChild(btn);

    const extraElement = document.createElement('div');
    extraElement.className = 'extra';
    // const paragraphElement = document.createElement('p');
    // paragraphElement.textContent = '';
    // paragraphElement.style.display = 'none';

    wrapper.appendChild(headElement);
    wrapper.appendChild(extraElement)
    // extraElement.appendChild(paragraphElement);

    return wrapper;
}

async function solution() {

    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const data = await res.json();

    const main = document.getElementById('main');

    data.forEach(x => main.appendChild(articleTemplate(x)));

    const buttons = document.querySelectorAll('button');


    buttons.forEach(btn => {
        btn.addEventListener('click', async (event) => {

            const res = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${event.target.id}`)
            const data = await res.json();

            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = data.content;
            event.target.parentElement.parentElement.children[1].appendChild(paragraphElement);

            console.log(event.target.parentElement.parentElement.children[1], 'div extra');
            console.log(event.target.parentElement.parentElement.children[1].parentElement, 'wrapper');

            btn.textContent = btn.textContent == 'More' ? 'Less' : 'More';
        })
    });
}

solution()