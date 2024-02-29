// ⦁	Locked Profile
// In this problem, you must create a JS program which shows and hides the additional information about users, which you can find by making a GET request to the server at address:
// http://localhost:3030/jsonstore/advanced/profiles
// The response will be an object with the information for all users. Create a profile card for every user and display it on the web page. Every item should have the following structure:


// When one of the [Show more] buttons is clicked, the hiden information inside the div should be shown, only if the profile is not locked! If the current profile is locked, nothing should happen.

// If the hidden information is displayed and we lock the profile again, the [Hide it] button should not be working! Otherwise, when the profile is unlocked and we click on the [Hide it] button, the new fields must hide again.

function profileTemplate({ username, email, age }, id) {
    const wrapper = document.createElement('div')
    const btn = document.createElement('button')
    btn.textContent = 'Show more';

    wrapper.className = 'profile';
    wrapper.innerHTML = `
<img src="./iconProfile2.png" class="userIcon">
<label>Lock</label>
<input type="radio" name="user${id}Locked" value="lock" checked="">
<label>Unlock</label>
<input type="radio" name="user${id}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${id}Username" value=${username} disabled="" readonly="">
<div id="user${id}HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user${id}Email" value=${email} disabled="" readonly="">
<label>Age:</label>
<input type="email" name="user${id}Age" value=${age} disabled="" readonly="">
</div>`

    btn.addEventListener('click', () => {
        const checked = wrapper.querySelector('input[type=radio]:checked')
        if (checked && checked.value == 'unlock') {
            if (btn.textContent == 'Show more') {
                wrapper.querySelector(`#user${id}HiddenFields`).style.display = 'block';
                btn.textContent = 'Hide it';
            } else {
                wrapper.querySelector(`#user${id}HiddenFields`).style.display = 'none';
                btn.textContent = 'Show more';
            }
        }
    })
    wrapper.appendChild(btn)

    return wrapper
}

async function lockedProfile() {
    const res = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
    const data = await res.json()

    const main = document.querySelector('main')
    main.innerHTML = ''

    Object.values(data).forEach((x, i) => main.appendChild(profileTemplate(x, i + 1)))
}