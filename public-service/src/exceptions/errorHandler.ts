import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import HttpException from './HttpException';

export const errorHandler = (handler: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = 500;
    const handled = ""
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Woops! This shouldn not happen!" })
}