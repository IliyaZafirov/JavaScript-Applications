// ⦁	Blog
// Write a program for reading blog content. It needs to make requests to the server and display all blog posts and their comments.
// Request URL’s:
// Posts - http://localhost:3030/jsonstore/blog/posts
// Comments - http://localhost:3030/jsonstore/blog/comments
// The button with ID "btnLoadPosts" should make a GET request to "/posts". The response from the server will be an Object of objects.

// Each object will be in the following format:
// {
//   body: {postBody},
//   id: {postId},
//   title: {postTitle} 
// }
// Create an <option> for each post using its object key as value and current object title property as text inside the node with ID "posts".


// When the button with ID "btnViewPost" is clicked, a GET request should be made to:
// ⦁	"/comments/:id" to obtain the selected post (from the dropdown menu with ID "posts") - The following request will return a single object as described above.
// ⦁	"/comments - to obtain all comments. The request will return a Object of objects.

// Each object will be in the following format: 
// { 
//   id: {commentId},
//   postId: {postId},
//   text: {commentText}
// }
// You have to find this comments that are for the current post (check the postId property)
// Display the post title inside h1 with ID "post-title" and the post content inside p with ID "post-body". Display each comment as a <li> inside ul with ID "post-comments". Do not forget to clear its content beforehand.



// 50/100 2 tests from 4 passed in this solution, but works perfect in browser;

// function attachEvents() {
//     debugger
//     document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
//     document.getElementById('btnViewPost').addEventListener('click', displayPost);
// }

// attachEvents();

// async function displayPost() {
//     debugger
//     const titleElement = document.getElementById('post-title');
//     const bodyElement = document.getElementById('post-body');
//     const ulElement = document.getElementById('post-comments');
//     const selectedId = document.getElementById('posts').value;
//     titleElement.textContent = '';
//     bodyElement.textContent = '';

//     ulElement.replaceChildren();
//     debugger
//     const [post, comments] = await Promise.all([
//         getPostById(selectedId),
//         getCommentsByPostId(selectedId)
//     ]);

//     titleElement.textContent = post.title;
//     bodyElement.textContent = post.body;

//     ulElement.replaceChildren();

//     comments.forEach(c => {
//         const liElement = document.createElement('li');
//         liElement.textContent = c.text;
//         liElement.setAttribute('id', c.id)
//         ulElement.appendChild(liElement);
//     });
// }

// async function getAllPosts() {
//     debugger

//     const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
//     const data = await res.json();
//     const selectElement = document.getElementById('posts');

//     selectElement.replaceChildren();

//     Object.values(data).forEach(p => {
//         const optionElement = document.createElement('option');
//         optionElement.textContent = p.title;
//         optionElement.value = p.id;
//         selectElement.appendChild(optionElement);
//     });
// }

// async function getPostById(postId) {
//     debugger

//     const res = await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`);
//     const data = res.json();

//     return data;
// }

// async function getCommentsByPostId(postId) {
//     debugger

//     const res = await fetch('http://localhost:3030/jsonstore/blog/comments');
//     const data = await res.json();
//     const comments = Object.values(data).filter(x => x.postId == postId);

//     return comments;
// }

// 75/100 3 tests from 4 passed in this solution, works perfect in browser;

function attachEvents() {

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    const select = document.getElementById('posts');
    const ulComments = document.getElementById('post-comments');
    let postBody = document.getElementById('post-body');

    async function loadPosts() {
        postBody.style.display = 'none';

        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const data = await response.json();

        select.innerHTML = '';
        Object.values(data).map(el => select.innerHTML += `<option>${el.title}</option>`);

        return data;
    }

    document.getElementById('btnViewPost').addEventListener('click', viewPost);

    async function viewPost() {

        const titleValue = select.value;
        const postsData = await loadPosts();
        select.value = titleValue;

        postBody.innerHTML = '';
        const content = Object.values(postsData).find(x => x.title == select.value);
        postBody.innerHTML = content.body;

        const contentData = postBody.innerHTML;

        const post = Object.values(postsData).find(x => x.title == select.value);

        const response = await fetch('http://localhost:3030/jsonstore/blog/comments/');
        const dataComments = await response.json();
        const commentsById = Object.values(dataComments).filter(x => x.postId == post.id);

        document.getElementById('post-title').textContent = titleValue;

        getComments(commentsById);
        postBody.style.display = 'block';

        postBody.innerHTML += contentData;
    }

    async function getComments(commentsById) {
        ulComments.innerHTML = '';
        commentsById.forEach(el => ulComments.appendChild(create('li', el.text, el.id)))
    }

    function create(type, content, id) {
        const element = document.createElement(type);
        element.textContent = content;

        if (id) {
            element.setAttribute('id', id);
        }

        return element;
    }
}

attachEvents();