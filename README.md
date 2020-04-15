# Backend Node Template  
![GitHub](https://img.shields.io/github/license/vladdekhanov/backend-node-template)
![GitHub package.json version](https://img.shields.io/github/package-json/v/vladdekhanov/backend-node-template)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/vladdekhanov/backend-node-template)
![Build](https://github.com/vladdekhanov/backend-node-template/workflows/Build/badge.svg)
![Tests](https://github.com/vladdekhanov/backend-node-template/workflows/Tests/badge.svg)

This is template repository for backend service based on Node.js.

## Installing

[Click the link](https://github.com/vladdekhanov/backend-node-template/generate) to generate your repository on the Github from this template or simply clone it.

## How to use

After installation first of all go to ``/config/.env.example`` and rename it to ``/config/.env`` file. Here is your configuration of the project. Let me share explain variable:
* **JWT_TOKEN** - this is the key for signing your jwt token, **strongly recommend** to change it to keep your app more secure.
* **JWT_TOKEN_EXPIRES_IN** - duration of validity jwt token signed by application. 1 hour by default. Means that user won't be authorized on any jwt guarded route even with signed token 1 hour later. All supported values you can take at the [ms utility](https://github.com/zeit/ms)
* **MONGO_DB_CONNECTION** - connection to your mongoDB database. For pet projects I recommend to use free [MongoDB Atlas](https://www.mongodb.com/).

## Technical stack

* **Typescript** - extends Javascript by adding types to language. Typescript speeds up your development experience by catching errors and providing fixes before you even run your code.
* **Nest.js** - a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
* **MongoDB** - is a general purpose, document-based, distributed database built for modern application.
* **Jest** - is a delightful Javascript testing framework with a focus on simplicity.
