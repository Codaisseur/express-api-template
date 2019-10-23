const express = require('express');
const bodyParser = require('body-parser');

const posts = require('./routers/posts');

const app = express()

const port = process.env.PORT || 4000;

app
  // Set the requestTime when the request starts
  .use((req, _res, next) => {
    req.requestTime = Date.now();
    next();
  })
  // Parse request bodies
  .use(bodyParser.json())
  // Mount our Posts router
  .use(posts)
  // A dummy root (/) route, could be used to render some documentation
  // about the API too!
  .get("/", (req, res, next) => {
    res.json({
      hello: "world"
    });

    next();
  })
  // Handle errors
  .use((err, req, res, next) => {
    res
      .status(err.status || 500)
      .send(err.status ? err.message : "Server Error");

    if (!err.status) {
      console.error(err.message);
      console.error(err.stack);
    }

    next();
  })
  // Log info about the request time and the status code
  .use((req, res, next) => {
    const ms = Date.now() - req.requestTime;
    console.log(`Completed ${res.statusCode} in ${ms}ms.`);
    next();
  })
  .listen(port, () => {
    console.log(`Blog API server is listening on port ${port}`);
  });

