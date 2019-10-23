const { Router } = require('express');
const { Post } = require('../models/index');
const auth = require('../middleware/auth.js');

const router = new Router()
  .get("/posts", (_req, res, next) => {
    Post.findAll()
      .then(posts => {
        res.json(posts);
        next();
      })
      .catch(next);
  })
  .post("/posts", auth, (req, res, next) => {
    const { user, body } = req;

    Post.create({
      ...body,
      userId: user.id
    })
      .then(post => {
        res.status(201).json(post);
        next();
      })
      .catch(next);
  })
  .get("/posts/:id", (req, res, next) => {
    Post.findByPk(req.params.id)
      .then(post => {
        if (!post) {
          err = new Error("Not Found!");
          err.status = 404;
        }
        res.json(post);
        next();
      })
      .catch(next);
  })
  .put("/posts/:id", auth, async (req, res, next) => {
    Post.findByPk(req.params.id)
      .then(post => {
        if (!post) {
          err = new Error("Not Found!");
          err.status = 404;
          throw err;
        }

        if (post.userId !== user.id) {
          err = new Error("Not Authorized!");
          err.status = 401;
          throw err;
        }

        const { body, user } = req;
        return post.update({
          ...body,
          userId: user.id
        });
      })
      .then(post => {
        res.json(post)
        next();
      })
      .catch(next);
  });

module.exports = router;
