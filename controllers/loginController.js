import { join } from "path"
import { createUser, fetchUserLogin } from '../../index.js'

const getHomeData = (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'home.html'))
}

const getRegisterData = (req, res) => {
    res.sendFile(join(process.cwd(), 'views', 'register.html'))
}

const postRegisterData = async (req, res) => {
    console.log(req.body)

    let { username, mobilenumber, email, password, confirmpassword } = req.body

    if (password == confirmpassword) {

        let status = await createUser(username, mobilenumber, email, password)

        console.log(status)
        
        if (status == 'success') {
            res.send('registration successfully')
        } else {
            res.send('registration un successfully')
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

    // console.log(databaseData);




    if (databaseData.length > 0) {
        if (username == databaseData[0].username && password == databaseData[0].password) {
            res.send('Login Successfull')
        } else {
            res.send('Wrong Username or Password')
        }
    } else {
        res.send("User not found")
    }

}

export { getLoginData, postLoginData, getHomeData, getRegisterData, postRegisterData }