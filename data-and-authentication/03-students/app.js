// ⦁	Students
// Your task is to implement functionality for creating and listing students from a database. Create a new collection called "students", 
// Each student has:
// ⦁	firstName - string, non-empty
// ⦁	lastName - string, non-empty
// ⦁	facultyNumber - string of numbers, non-empty
// ⦁	grade - number, non-empty
// You need to write functionality for creating students. When creating a new student, make sure you name the properties accordingly.
// You will also need to extract students. You will be given an HTML template with a table in it. Create an AJAX request that extracts all the students.
// URL for this task: http://localhost:3030/jsonstore/collections/students

const tbody = document.querySelector('tbody');

loadAll()
async function loadAll() {

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students');
        const data = await response.json();

        console.log(Object.values(data));
        Object.values(data).forEach(el => {
            createAndAppend(el)
        })

    } catch (error) {
        alert(error)
    }
}

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = {
        firstName: document.querySelector('input[name="firstName"]'),
        lastName: document.querySelector('input[name="lastName"]'),
        facultyNumber: document.querySelector('input[name="facultyNumber"]'),
        grade: document.querySelector('input[name="grade"]'),
    }

    if (!input.firstName.value || !input.lastName.value || !input.facultyNumber.value || !input.grade.value) {
        return;
    }

    await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ firstName: input.firstName.value, lastName: input.lastName.value, facultyNumber: input.facultyNumber.value, grade: input.grade.value })
    })
    console.log(e.target);
    Object.values(input).forEach(el => el.value = '');
    loadAll()
})

function createAndAppend(data) {
    const trElement = document.createElement('tr');

    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = data.firstName;
    const tdLastName = document.createElement('td');
    tdLastName.textContent = data.lastName;
    const tdFacNo = document.createElement('td');
    tdFacNo.textContent = data.facultyNumber;
    const tdGrade = document.createElement('td');
    tdGrade.textContent = data.grade;

    trElement.appendChild(tdFirstName);
    trElement.appendChild(tdLastName);
    trElement.appendChild(tdFacNo);
    trElement.appendChild(tdGrade);

    tbody.appendChild(trElement);
}