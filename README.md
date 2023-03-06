# Todo App created with MERN Stack, Vite.

## The concept's owner is www.frontendmentor.io.

## Setup

Clone git repository into a folder of your desire:

```bash
# git
git clone -b dockerized-app https://github.com/St4niuu/Todo-App-Mern.git
```

Open VSC on the folder you've fetched, then move into the server folder:

```bash
cd server
```

Install all dependencies that the application needs:

```bash
# npm
npm install
```

Since there are two ways of setting up the app - you can choose either interchangeably:

# Locally

```bash
# npm
node server.js
```

# Docker

Install Docker from the official website, then in server folder run:

```bash
# docker
docker build -t todo-app:1.0 .
docker run --name todo-app -p 3000:3000 -d todo-app:1.0
```

These two abovementioned queries will build the docker image of your app and then create a container upon the previously created image.

Go to the browser and type in: http://localhost:3000/
