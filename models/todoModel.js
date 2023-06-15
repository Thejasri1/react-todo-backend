const mongoose =require('mongoose')
const Schema = mongoose.Schema

const TodoCollection = new Schema({
    todo:{
        type:String,
        trim: true,
    }
})
const TodoConnection = mongoose.model("todo",TodoCollection)
module.exports = TodoConnection