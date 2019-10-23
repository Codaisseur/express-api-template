# Blog API

This is a demo project that can be used as a template to build APIs with Express.

## Getting Started

* Hit the green button that says, Use Template, create your repo, and clone it.
* Run `npm install` to install dependencies.
* Start a Postgres container using Docker: `docker run --rm -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres`.
* Run the migrations `npm run db:migrate` and optionally seed some example data with `npm run db:seed`.
* You can start the app with `npm start`, but in development you probably like to run `npm run dev` better, as it reloads your app on code changes.

## Reporting Issues

Please report issues via this repository. Pull requests that fix issues are welcome too of course!
