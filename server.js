const TodoConnection = require('./models/todoModel')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')
const http = require("http")
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const router = express()

//MongoDB database connection URL
const DB_URL = process.env.DB
//Middleware connections
router.use(express.json())
router.use(cors())
const server = http.createServer(router)
//Mongo DB connection function
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async (db, err) => {
    if (err) throw err
    else console.log("connected")
})

const PORT = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : process.env.PORT

router.get("/", async (req, res) => {
    const todoList = await TodoConnection.find({})
    res.send(todoList)
})

router.post('/addTodo', async (req, res) => {
    try {
        await TodoConnection.create(req.body)
    }
    catch (e) {
        console.log(e)
    }
})

router.patch('/updateTodo/:id', async (req, res) => {
    try {
        await TodoConnection.findByIdAndUpdate(req.params.id, req.body)
    }
    catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await TodoConnection.findByIdAndDelete(req.params.id)
    }
    catch (e) {
        console.log(e)
    }
})
//server connectionprocess.env.NODE_ENV 
server.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`)
})
module.exports = router;