import { join } from "path"
import { createUser, fetchUserLogin } from '../index.js'

const getHomeData = (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'home.html'))
}

const getRegisterData = (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'register.html'))
}

const postRegisterData = async (req, res) => {
    console.log(req.body)

    let { username, mobileNumber, email, password, confirmPassword } = req.body

    if (!username || !mobileNumber || !email || !password || !confirmPassword) {
        res.send('All fields are required')
        return
    }

    if (password == confirmPassword) {

        let status = await createUser(username, mobileNumber, email, password)

        console.log(status)

        if (status == 'success') {
            res.send('registration successfully')
        } else {
            res.send('registration unsuccessfully')
        }

    } else {
        res.send('Create Password and Confirm Password did not match try again')
    }

}

const getLoginData = (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'login.html'))
}

const postLoginData = async (req, res) => {
    let { username, password } = req.body
    // console.log( username)
    // console.log( password)

    let databaseData = await fetchUserLogin(username)

    if (databaseData.length > 0) {
        if (username == databaseData[0].username && password == databaseData[0].password) {
            res.send('Login Successful')
        } else {
            res.send('Wrong Username or Password')
        }
    } else {
        res.send("User not found")
    }

}

export { getLoginData, postLoginData, getHomeData, getRegisterData, postRegisterData }