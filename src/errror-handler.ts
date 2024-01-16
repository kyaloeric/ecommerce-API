import { NextFunction, Response, Request } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"

// this avoids the writing of the try, catch over and over again in the controllers, 
//now we will just reuse, the error handler is responsible for calling the original controller 

export const errorHandler = (method: Function) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
           await method( req, res, next)
        }catch(error: any) {
            let exception: HttpException
            if(error instanceof HttpException) {
                exception = error

            }else {
                exception =new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }

    }
}