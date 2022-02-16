import { Response, Request } from 'express';
import httpStatus from 'http-status';
import HttpException from '../exceptions/HttpException';
import InternalServerException from '../exceptions/InternalServerException';
import SubscriptionNotFoundException from '../exceptions/SubscriptionNotFoundException';
import Subscription from '../models/Subscription';
import SubscriptionDetail from '../models/SubscriptionDetail';
import { sendEmail } from '../utils/sendEmail';

const subService = require('../services/index')

export const saveSubscriptionController = async (request: Request, response: Response) => {
    const subscription = request.body as Subscription;
    try {
        const subscriptionRes = await subService.saveSubscription(subscription)
        const subId: SubscriptionDetail = { id: subscriptionRes.id }

        response.status(httpStatus.CREATED).send(subId)
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(new InternalServerException())
    }
}

export const getSubscriptionController = async (request: Request, response: Response) => {
    try {
        const subscriptionRes = await subService.getSubscriptions() as Subscription[] | null

        response.status(httpStatus.OK).send(subscriptionRes)
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(new InternalServerException())
    }
}

export const getSubscriptionByIdController = async (request: Request, response: Response) => {
    const { id } = request.params
    try {
        const subscriptionRes = await subService.getSubscriptionById(id) as Subscription | null

        (subscriptionRes != null) ? response.json(subscriptionRes) : response.status(httpStatus.NOT_FOUND).send(new SubscriptionNotFoundException(id))
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(new InternalServerException())
    }
}

export const cancelSubscriptionByIdController = async (request: Request, response: Response) => {
    const { id } = request.params
    const subId: SubscriptionDetail = { id: id }
    try {
        const subscriptionRes = await subService.cancelSubscriptionById(id) as Subscription | null

        (subscriptionRes != null) ? response.status(httpStatus.OK).send(subId) : response.status(httpStatus.NOT_FOUND).send(new SubscriptionNotFoundException(id))
    } catch (error) {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).send(new InternalServerException())
    }
}


