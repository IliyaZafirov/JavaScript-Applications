const button = document.getElementById('submit');
const stopName = document.getElementById('stopName');
const ulist = document.getElementById('buses');

async function getInfo() {

    try {
        const id = document.getElementById('stopId').value;
        const url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

        const response = await fetch(url);
        if (!response.ok) {
            stopName.textContent = 'Error';
        }
        const data = await response.json();
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(el => {

            const item = document.createElement('li');
            item.textContent = `Bus ${el[0]} arrives in ${el[1]} minutes`;

            return ulist.appendChild(item);
        })
    } catch (err) {
        stopName.textContent = 'Error';
    }

}