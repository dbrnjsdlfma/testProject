const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()

const Board = require('../models/Board')

router.get('/' , expressAsyncHandler(async(req,res,next) => {
    const boardData = await Board.find().sort({ idx : 1 })
    console.log(boardData)
    if(!boardData) {
        res.status(400).json({ code : 400 , message : "not found board list"})
    } else {
        res.status(200).json({ code : 200 , boardData})
    }
}))

router.get('/:idx', expressAsyncHandler(async(req, res, next) => {
    const board = await Board.findOne({
        idx : req.params.idx ,
    })
    console.log(board)
    if(!board) {
        res.status(400).json({ code : 400 , message : "not found board list"})
    } else {
        res.status(200).json({ code : 200 , board})
    }
}))

module.exports = router