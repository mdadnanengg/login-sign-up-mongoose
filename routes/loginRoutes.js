import express from 'express'
import { getLoginData, postLoginData, getHomeData, getRegisterData, postRegisterData } from '../login-sign-up-mongoose/controllers/loginController.js'

const loginRoutes = express.Router()

loginRoutes.use(express.urlencoded({ extended: true}))

loginRoutes.get('/', getHomeData)

loginRoutes.get('/register', getRegisterData)

loginRoutes.post('/register', postRegisterData)

loginRoutes.get('/login', getLoginData)

loginRoutes.post('/login', postLoginData)

export default loginRoutes