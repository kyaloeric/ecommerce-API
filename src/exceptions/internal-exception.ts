import { HttpException } from "./root";


//how to define internal exceptions to  avoid over repeating yourself in the controllers 
export class InternalException extends HttpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode,500, errors )
    }
}