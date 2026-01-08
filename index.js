import express from 'express'
import loginRoutes from './routes/loginRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 8000
const mongoDB_URL = process.env.MongoDB_URL || 'mongodb://0.0.0.0:27017/userDB'

// middleware
app.use('/', loginRoutes) 


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

mongoose.connect(process.env.mongoDB_URL)

let db = mongoose.connection

db.on('open', () => {
    console.log('Server Connected!');
})

// login and SignUp schema
let userSchema = mongoose.Schema({
    username: String,
    mobileNumber: Number,
    email: String,
    password: String
})


let userLoginModel = mongoose.model('user', userSchema)


let fetchUserLogin = async (username) => {
    let userData = await userLoginModel.find({ 'username': username })
    return userData
}



const createUser = async (username, mobileNumber, email, password) => {
    //userSignUpModel

    const userSignUpModel = mongoose.model('user', userSchema)

    let c1 = userSignUpModel({
        username: username,
        mobileNumber: mobileNumber,
        email: email,
        password: password
    })

    await c1.save()

    let status = 'success'

    return status

}





export {createUser, fetchUserLogin }

