import axios from 'axios';
import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

import SubscriptionNotFoundException from '../exceptions/SubscriptionNotFoundException';
import InternalServerException from '../exceptions/InternalServerException';
import Subscription, { isvalid } from '../models/Subscription';
import SubscriptionDetail from '../models/SubscriptionDetail';
import { sendToRabbit } from '../services/rabbitmq';
import BadRequestException from '../exceptions/BadRequest';

export const saveSubscriptionController = async (request: Request, response: Response) => {
    const subscription = request.body as Subscription;
    subscription.id = uuidv4()
    if (isvalid(subscription)) {
        sendToRabbit(subscription)
        const subDetail: SubscriptionDetail = { id: subscription.id }
        response.status(httpStatus.CREATED).send(subDetail)
    }
    else {
        response.status(httpStatus.BAD_REQUEST).json(new BadRequestException())
    }
}

export const getSubscriptionsController = async (request: Request, response: Response) => {
    await axios({
        url: process.env.URL_SUBSCRIPTIONS as string,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }
    }).then(res => {
        response.status(httpStatus.OK).send(res.data as Subscription[])
    }).catch(error => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(new InternalServerException())
    })
}

export const getSubscriptionByIdController = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params
    await axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }
    }).then(res => {
        response.status(httpStatus.OK).json(res.data as Subscription)
    }).catch(error => {
        response.status(httpStatus.NOT_FOUND).json(new SubscriptionNotFoundException(id))
    })
}

export const cancelSubscriptionByIdController = async (request: Request, response: Response) => {
    const { id } = request.params
    await axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'PUT',
    }).then(res => {
        response.status(httpStatus.OK).json(res.data as SubscriptionDetail)
    }).catch(error => {
        response.status(httpStatus.NOT_FOUND).json(new SubscriptionNotFoundException(id))
    })
}