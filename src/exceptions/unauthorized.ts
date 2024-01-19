import { HttpException } from "./root";


//thrown when users try to access some resources and they are unauthorized
export class UnauthorizedException extends HttpException {
    constructor(message:string, errorCode:number, errors? : any,) {
        super(message, errorCode, 401, errors)




    }

}