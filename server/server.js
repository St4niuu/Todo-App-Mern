const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
let database

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index')
})

async function setConnection() {
    const connection = new MongoClient('mongodb+srv://user:user@todo-app.nxl8su2.mongodb.net/test')
    await connection.connect()
    database = await connection.db('todo-app')
    app.listen(3000)
}

setConnection()