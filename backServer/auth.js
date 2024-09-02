const config = require('./config')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    console.log(user)
    return jwt.sign({
        email : user.email ,
        name : user.name ,
    } ,
    config.JWT_KEY ,
    {
        expiresIn : '1d' ,
        issuer : 'jaeduck' ,
    })
}

const isAuth = (req, res, next) => {
    const Token = req.cookies.token;
    if(!Token) {
        res.status(401).json({ code : 401 , message : '토큰이 생성되지 않았습니다'})
    } else {
        const token = Token // jwt 토큰
        jwt.verify(token, config.JWT_KEY, (err, userInfo) => {
            if(err && err.name === 'TokenExpiredError') { // 토큰이 만료된 경우
                res.status(419).json({ code : 419 , message : '토큰이 만료되었습니다!'})
            } else if(err){ // 토큰 복호화 중 에러가 났을 경우
                res.status(401).json({ code : 401 , message : '유효하지 않은 토큰입니다'})
            } else {
                req.user = userInfo // 브라우저에서 전송한 사용한 정보(jwt 토큰을 복호화한 것)
                next()
            }
        })
    
    }
}

module.exports = {
    generateToken ,
    isAuth ,
}