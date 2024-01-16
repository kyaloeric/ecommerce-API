import { NextFunction, Request, Response } from "express"
import { prismaClient } from ".."
import {hashSync, compareSync} from 'bcrypt'

import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets"
import { badRequestsException } from "../exceptions/badRequest"
import { ErrorCode } from "../exceptions/root"
import { UnprocessableEntity } from "../exceptions/validation"
import { SignUpSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found"




export const signup =  async (req: Request, res: Response, next:NextFunction) => {
    // try{


        SignUpSchema.parse(req.body)
        const {email, password, name} = req.body

        let user = await prismaClient.user.findFirst({where: {email}})
        if (user) {
            new badRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS)

        }

        user = await prismaClient.user.create({
            data:{
                name,
                email,
                password:hashSync(password, 10)
            }
        })

        res.json(user)


    // } catch(err:any) {
    //     next(new UnprocessableEntity(err?.issues, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY))

    // }




    

}



export const login =  async (req: Request, res: Response) => {
    const {email, password} = req.body

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user) {
        throw new NotFoundException('User not Found.', ErrorCode.USER_NOT_FOUND)

    }

    if(!compareSync(password, user.password)) {
        throw new badRequestsException('Incorrect Password', ErrorCode.INCORRECT_PASSWORD)
    } 
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)

    res.json({user, token})

}

