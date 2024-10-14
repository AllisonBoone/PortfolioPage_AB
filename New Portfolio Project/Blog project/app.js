'use strict';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  if (post) {
    res.render('edit', { post: post, postId: postId });
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  posts[postId].title = req.body.title;
  posts[postId].content = req.body.content;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
