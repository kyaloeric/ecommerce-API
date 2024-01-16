// message, status code, error codes , error 


export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    // constructor for initialization
    constructor(message:string, errorCode:ErrorCode, statusCode:any, error: any) {

        // call super method 
       super(message) 

        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error

       

    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_EXCEPTION = 3001,
    UNAUTHORIZED = 4001

}