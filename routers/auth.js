const { Router } = require('express');
const { User } = require('../models');
const bcrypt = require("bcrypt");
const { toJWT, toData } = require('../util/jwt');
const auth = require('../middleware/auth');

const router = new Router();

const isEmpty = (value) => (!value || `${value.length}` === 0);

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    const err = new Error("Please supply a valid email and password");
    err.status = 400;
    return next(err);
  }

  User.findOne({ where: { email }})
    .then(user => {
      if (!user || !bcrypt.compareSync(password, user.encryptedPassword)) {
        const err = new Error('Email or password incorrect, sorry!');
        err.status = 404;
        throw err;
      }

      res.json({
        jwt: toJWT({ userId: user.id })
      })

      next();
    })
    .catch(next);
});

router.get('/secret-endpoint', auth, (req, res, next) => {
  // this should be set by the auth middleware!
  const { user }  = req;

  if (!user) {
    const err = new Error('Not Authorized!');
    err.status = 401;
    return next(err);
  }

  res.send('Shhhh! Welcome to the secret endpoint! :)');

  next();
});

module.exports = router;
