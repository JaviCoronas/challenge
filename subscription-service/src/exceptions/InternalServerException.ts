import httpStatus from "http-status";
import HttpException from "./HttpException";



class InternalServerException extends HttpException {
    constructor() {
        super(httpStatus.INTERNAL_SERVER_ERROR, { code: "XXXXXXXXXX", message: "This should not happend :_____(" });
    }
}

export default InternalServerException;