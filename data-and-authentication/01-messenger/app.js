// ⦁	Messenger
// Write a JS program that records and displays messages. The user can post a message, supplying a name and content and retrieve all currently recorded messages.
// The url for the requests - http://localhost:3030/jsonstore/messenger
// When [Send] button is clicked you should create a new object and send a post request to the given url. Use the following message structure:
// {
//   author: authorName,
//   content: msgText,
// }
// If you click over [Refresh] button you should get all messages with GET request and display them into the textarea.
// Use the following message format:
// "{author}: {message}"


const textAreaRef = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onLoadMsg);
}

async function onSubmit() {
    const nameRef = document.querySelector("input[name='author']");
    const textRef = document.querySelector("input[name='content']");

    let name = nameRef.value;
    let text = textRef.value;

    if (!name || !text) {
        return;
    }

    await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ author: name, content: text })
    })

    // onLoadMsg();
    nameRef.value = '';
    textRef.value = '';
}

async function onLoadMsg() {

    const res = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await res.json();

    textAreaRef.textContent = '';
    Object.values(data).forEach(el => {
        textAreaRef.textContent += `${el.author}: ${el.content}\n`
    });

    textAreaRef.value = textAreaRef.value.trim();
}

attachEvents();