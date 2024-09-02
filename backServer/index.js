const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./config')

const app = express()

const port = 5300

const corsOptions = {
    origin : 'http://127.0.0.1:3000',
    credentials : true ,
}

// 몽고디비 연결
mongoose.connect(config.MONGODB_URL)
.then(() => console.log('mongodb connect...'))
.catch( e => console.log(`faild to connect mongodb ${e}`))

// 미들웨어 설정
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

// 라우터 설정
const loginRouter = require('./router/user')
const boardRouter = require('./router/board')

// 라우터 사용
app.use('/api/user' , loginRouter)
app.use('/api/board' , boardRouter)

// 사용자가 요청한 페이지가 없는 경우 에러 처리
app.use((req, res, next) => { 
    res.status(404).send('Page not Found')
})

app.use((err, req, res, next) => { // 서버내부 오류처리
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})
app.listen(port, () => {
    console.log(`server is runnig on port ${port}...`)
})