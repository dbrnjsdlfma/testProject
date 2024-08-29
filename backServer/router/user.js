const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const router = express.Router()

const User = require('../models/Users')

router.post('/login' , expressAsyncHandler(async(req, res, next) => {
    const loginUser = await User.findOne({
        email : req.body.email ,
        password : req.body.password ,
    })
    if(!loginUser) {
        res.status(401).json({ code : 401, message : '이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다'})
    } else {
        const { name , email } = loginUser
        res.json({
            code : 200 ,
            name , email
        })
    }
}))

router.post('/register' , expressAsyncHandler(async(req, res, next) => {
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.body.name)

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

module.exports = router