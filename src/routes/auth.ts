import {Router} from 'express'
import { login, signup } from '../controllers/auth'
import { errorHandler } from '../errror-handler'
import authMiddleware from '../middlewares/auth'

const authRoutes:Router = Router()

//pass the  controllers inside the errorHandler
authRoutes.post('/signup', errorHandler(signup)) 
authRoutes.post('/login', errorHandler(login))
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes
