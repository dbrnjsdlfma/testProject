const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    MONGODB_URL : process.env.MONGODB_URL ,
    JWT_KEY : process.env.JWT_KEY ,
}