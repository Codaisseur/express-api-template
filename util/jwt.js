const jwt = require('jsonwebtoken');

const secret =
  process.env.JWT_SECRET || 'verysecret';

const toJWT = (data) => jwt.sign(data, secret, { expiresIn: '2h' });

const toData = (token) => jwt.verify(token, secret);

module.exports = { toJWT, toData };
