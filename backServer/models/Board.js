const mongoose = require('mongoose')

const { Schema } = mongoose
// const { Types : { ObjectId } } = Schema

const boardSchema = new Schema({
    idx : {
        type : Number ,
        default : 0 ,
    } ,
    title : {
        type : String ,
        required : true ,
    } ,
    contents : {
        type : String ,
        required : true ,
    } ,
    createdBy : {
        type : String ,
        required : true ,
    } ,
    createdAt : {
        type : Date ,
        default : Date.now ,
    }
})

const Board = mongoose.model('Board' , boardSchema)

module.exports = Board