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

app.put('/api/modify-todo', async (req, res) => {
    await database.collection('todos').updateOne({id: req.body.id}, { $set: {isDone: req.body.isDone}})
    res.status(200).send('Modified')
})

app.delete('/api/delete-todo', async (req, res) => {
    await database.collection('todos').deleteOne({id: req.headers.id})
    res.status(200).send('Deleted')
})

app.delete('/api/clear-todo', async (req, res) => {
    await database.collection('todos').deleteMany({userID: req.headers.userid, isDone: true})
    res.status(200).send('Cleared')
})

app.post('/api/drag-todo', async (req, res) => {
    await database.collection('todos').deleteMany({userID: req.headers.userid})
    await database.collection('todos').insertMany(req.body)
    res.status(200).send('Updated')
})

async function setConnection() {
    const connection = new MongoClient('mongodb+srv://user:user@todo-app.nxl8su2.mongodb.net/')
    await connection.connect()
    database = await connection.db('todo-app')
    app.listen(3000)
}

setConnection()