const button = document.getElementById('submit');
const stopName = document.getElementById('stopName');
const ulist = document.getElementById('buses');

function getInfo() {

    const id = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw 'Error';
            }

            return response.json();
        })
        .then(data => {
            stopName.textContent = data.name;

            Object.entries(data.buses).forEach(el => {

                const item = document.createElement('li');
                item.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;

                return ulist.appendChild(item);
            })
        })
        .catch(err => stopName.textContent = 'Error');
}