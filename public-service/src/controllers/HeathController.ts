import { Request, Response } from 'express';
import httpStatus from 'http-status';

const HeathCheckController = async (request: Request, response: Response) => {
    response.status(httpStatus.OK).send()
}

export default HeathCheckController