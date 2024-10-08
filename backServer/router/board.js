const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../auth')
const router = express.Router()

const Board = require('../models/Board')

router.get('/' , expressAsyncHandler(async(req,res,next) => {
    const boardData = await Board.find().sort({idx : -1})
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
    if(!board) {
        res.status(400).json({ code : 400 , message : "not found board list"})
    } else {
        res.status(200).json({ code : 200 , board})
    }
}))

router.get('/boardByCheck/:idx' , isAuth, expressAsyncHandler(async(req, res, next) => {
    const idx = req.params.idx
    const name = req.user.name
    const board = await Board.findOne({
        idx : idx ,
    })
    if(board.createdBy === req.user.name) {
        res.status(200).json({code : 200 , message : "성공" , name})
    }
}))

router.post('/', isAuth, expressAsyncHandler(async(req, res, next) => {
    const rastBoard = await Board.find()
    const length = rastBoard.length
    const board = new Board({
        idx : length + 1 ,
        title : req.body.title ,
        contents : req.body.contents ,
        createdBy : req.user.name ,
        createdAt : new Date() ,
    })

    const newBoard = await board.save();
    if(!newBoard){
        res.status(401).json({ code : 401, message : 'Invalid board'});
      }else{
        res.status(200).json({ code : 200, message : 'new board register!'})
      }
}))

router.put('/:idx', isAuth, expressAsyncHandler(async(req, res, next) => {
    const board = await Board.findOne({
        idx : req.params.idx ,
    })
    board.title =  req.body.title || board.title
    board.contents = req.body.contents || board.contents
    const updateBoard = await board.save()
    if(updateBoard) {
        res.status(200).json({ code : 200 , message : '게시글 수정이 완료되었습니다.' , })
    } else {
        res.status(401).json({ code : 401 , message : '수정 실패'})
    }
}))

router.delete('/:idx', expressAsyncHandler(async(req, res, next) => {
    const board = await Board.deleteOne({
        idx : req.params.idx ,
    })
    if(board) {
        res.status(200).json({code : 200 , message :'게시글이 삭제 되었습니다.'})
    }
}))

module.exports = router