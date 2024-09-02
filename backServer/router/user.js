const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()

const User = require('../models/Users')

const { generateToken , isAuth } = require('../auth')

router.post('/login' , expressAsyncHandler(async(req, res) => {
    const loginUser = await User.findOne({
        email : req.body.email ,
        password : req.body.password ,
    })
    if(!loginUser) {
        res.status(401).json({ code : 401, message : '이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다'})
    } else {
        const { name } = loginUser
        res.json({
            code : 200 ,
            token : generateToken(loginUser) ,
            message : 'success' , name
        })
    }
}))

router.post('/register' , expressAsyncHandler(async(req, res) => {
    const user = new User({
        email : req.body.email ,
        password : req.body.password ,
        name : req.body.name ,
    })
    const saveUser = await user.save()

    if(!saveUser) {
        res.status(401).json({ code : 401 , message : 'Invalid User Data'})
    } else {
        res.status(200).json({ code : 200 , message : '회원 가입 성공!!'})
    }
    
}))

router.post('/searchPW' , expressAsyncHandler(async(req, res, next) => {
    const user = await User.findOne({
        email : req.body.email ,
        name : req.body.name
    })
    console.log(req.body)
    if(!user) {
        res.status(401).json({ code : 401 , message : '찾으시는 정보가 일치하지 않습니다.'})
    } else {
        const { name, password } = user
        console.log(name, password)
        res.status(200).json({ 
            code : 200 , 
            message : `${name}님께서 찾으시는 비밀번호는 ${password} 입니다.`})
    }
}))

module.exports = router