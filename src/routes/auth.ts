import {Router} from 'express'
import { login, signup } from '../controllers/auth'
import { errorHandler } from '../errror-handler'

const authRoutes = Router()

//pass the  controllers inside the errorHandler
authRoutes.post('/signup', errorHandler(signup)) 
authRoutes.post('/login', errorHandler(login))
export default authRoutes
