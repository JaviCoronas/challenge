import HandledError from "../models/HandledError"


class HttpException extends Error {
    status: number
    reason: HandledError

    constructor(status: number, reason: HandledError) {
        super()
        this.status = status
        this.reason = reason
    }
}

export default HttpException

