const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
let database

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:id', async (req, res) => {
    res.send(await database.collection('todos').find({userID: req.params.id}).toArray())
})

app.post('/api/add-todo', async (req, res) => {
    await database.collection('todos').insertOne(req.body)
    res.status(200).send('Added')
})

async function setConnection() {
    const connection = new MongoClient('mongodb+srv://user:user@todo-app.nxl8su2.mongodb.net/')
    await connection.connect()
    database = await connection.db('todo-app')
    app.listen(3000)
}

setConnection()