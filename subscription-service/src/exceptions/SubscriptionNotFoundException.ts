import httpStatus from "http-status";
import HttpException from "./HttpException";



class SubscriptionNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, {
            code: "ERROR1003", message: `Sub with id: ${id} is not on the system :(`
        });
    }
}

export default SubscriptionNotFoundException;