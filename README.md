# mern-stack-example

Mern Stack code for the [Mern Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

[![CI](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml/badge.svg)](https://github.com/mongodb-developer/mern-stack-example/actions/workflows/main.yaml)

## How To Run

Create the file `mern/server/config.env` with your Atlas URI and the server port:

```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
PORT=5050
```

Start server:

```
cd mern/server
npm install
npm start
```

Start Web server

```
cd mern/client
npm install
npm run dev
```

## Disclaimer

Use at your own risk; not a supported MongoDB product

# FullStackWeb7

# Test yaml

name: End-to-end tests

on:
push:
branches: - "dev" - "!main" - "cypress-dev"

jobs:
cypress-run:
runs-on: ubuntu-22.04
steps: - name: Checkout
uses: actions/checkout@v4 - name: Cypress run
uses: cypress-io/github-action@v6
with:
start: npm start
