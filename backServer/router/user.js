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

module.exports = router