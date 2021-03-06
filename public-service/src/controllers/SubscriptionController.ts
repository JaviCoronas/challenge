import axios from 'axios';
import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';
import { nextTick } from 'process';
import HttpException from '../exceptions/HttpException';
import SubscriptionNotFoundException from '../exceptions/SubscriptionNotFoundException';
import InternalServerException from '../exceptions/InternalServerException';
import Subscription from '../models/Subscription';
import SubscriptionDetail from '../models/SubscriptionDetail';

export const saveSubscriptionController = async (request: Request, response: Response) => {
    const subscription = request.body as Subscription;

    axios({
        url: process.env.URL_SUBSCRIPTIONS as string,
        method: 'POST',
        data: subscription

    }).then(res => {
        response.status(httpStatus.CREATED).send(res.data as SubscriptionDetail)
    }).catch(error => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(new InternalServerException())
    })
}

export const getSubscriptionsController = async (request: Request, response: Response) => {
    axios({
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
    axios({
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
    axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'PUT',
    }).then(res => {
        response.status(httpStatus.OK).json(res.data as SubscriptionDetail)
    }).catch(error => {
        response.status(httpStatus.NOT_FOUND).json(new SubscriptionNotFoundException(id))
    })
}