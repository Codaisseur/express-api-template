const { Router } = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { toJWT } = require('../util/jwt');

const router = new Router();

router.post('/users', (req, res, next) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10) // 10 salt is the salt
  })
    .then(() => {
      res.status(201).json({
        message: 'Thank you for signing up. You may use this token to authenticate.',
        jwt: toJWT({ userId: user.id })
      });

      next();
    })
    // .then(user => res.status(201).json(user)) // NOoooO!!!11!1! Please.
    .catch(next);
});

module.exports = router;
