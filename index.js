const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const myPosts = [
    { id: 1, title: "Post 1", content: "This is my post 1" },
    { id: 2, title: "Post 2", content: "This is my post 2" },
    { id: 3, title: "Post 3", content: "This is my post 3" },
]

app.get('/', (request, response) => {
    response.send('My Blog App')
})

app.get('/posts', (request, response) => {
    response.json(myPosts)
});

app.get('/posts/:id', (request, response) => {
    const id = request.params.id;
    const post = myPosts.find(post => post.id === Number(id))
    if (!post) {
        response.status(404).json({ error: 'post not found' })
    } else {
        response.json(post)
    }
})

app.post('/posts', (request, response) => {
    const newPost = request.body;

    if (newPost.title && newPost.content) {
        myPosts.push(newPost);
        response.status(200).send('Your post was successfully created');
    } else {
        response.status(400).json({ error: "posts must have title and content" })
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`The app is running at ${port}`)
})