const { User } = require('../models');
// Import toData, that decrypts our token and gives the encrypted data
const { toData } = require('../util/jwt');

const authMiddleWare = (req, res, next) => {
  // check if we have a header, split on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // check if we have a header at all, if the first part is "Bearer"
  // and if we have a second part, the token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // Decrypts token to get the encrypted data (should contain userId)
    const data = toData(auth[1]);
    User.findByPk(data.userId)
      .then(user => {
        if (!user) {
          const err = new Error("Not Authorized!");
          err.status = 401;
          throw err;
        }

        // Store the authenticated user on the request so request handlers
        // can use it.
        req.user = user;

        next();
      })
      .catch(next);
  } else {
    const err = new Error("Please supply a valid Authorization header (Bearer <token>)");
    err.status = 401;
    next(err);
  }
}

module.exports = authMiddleWare;
