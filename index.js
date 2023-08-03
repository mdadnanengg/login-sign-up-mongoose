import express from 'express'
import loginRoutes from './routes/loginRoutes.js'
import mongoose from 'mongoose';


const app = express()
const port = 8000

// middleware
app.use('/', loginRoutes)


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

mongoose.connect('mongodb://0.0.0.0:27017/userDetails')

let db = mongoose.connection

db.on('open', () => {
    console.log('Server Connected!');
})

// login and SignUp schema
let userSchema = mongoose.Schema({
    username: String,
    mobilenumber: Number,
    email: String,
    password: String
})


let userLoginModel = mongoose.model('user', userSchema)


let fetchUserLogin = async (username) => {
    let userData = await userLoginModel.find({ 'username': username })
    return userData
}



const createUser = async (username, mobilenumber, email, password) => {
    //userSignUpModel

    const userSignUpModel = mongoose.model('user', userSchema)

    let c1 = userSignUpModel({
        username: username,
        mobilenumber: mobilenumber,
        email: email,
        password: password
    })

    await c1.save()

    let status = 'success'

    return status

}





export {createUser, fetchUserLogin }

