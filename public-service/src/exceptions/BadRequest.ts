import httpStatus from "http-status";
import HttpException from "./HttpException";



class BadRequestException extends HttpException {
    constructor() {
        super(httpStatus.BAD_REQUEST, { code: "XXXXXXXXXX", message: "Send me something good formed" });
    }
}

export default BadRequestException;