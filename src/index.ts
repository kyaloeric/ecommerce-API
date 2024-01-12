import express, {Express, Request, Response} from 'express'
import { PORT } from './secrets'
import rootRouter from './routes'

import { PrismaClient } from '@prisma/client'
import { error } from 'console'
import { errorMiddleware } from './middlewares/errors'
import { SignUpSchema } from './schema/users'

const app: Express = express()

// app.get('/', (req: Request, res: Response) => {
//     res.send('Working')

// })

app.use(express.json())

app.use('/api', rootRouter)

app.use(errorMiddleware)


export const prismaClient = new PrismaClient({
    log:['query']

// perform validation and extend the prisma client 
})
app.listen(PORT, () => {console.log('App Working!')})