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

    const subscriptionRes = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string,
        method: 'POST',
        data: subscription

    }).then(response => response.data as SubscriptionDetail)

    response.status(httpStatus.CREATED)
    response.json(subscriptionRes)
}

export const getSubscriptionsController = async (request: Request, response: Response) => {
    console.log("getSubscriptionController")
    const subscriptionRes = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }
    }).then(res => {
        res.data as Subscription[]
        response.status(httpStatus.OK).json(subscriptionRes)
    }).catch(error => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json(new InternalServerException())
    })
}

export const getSubscriptionByIdController = async (request: Request, response: Response, next: NextFunction) => {
    console.log("getSubscriptionByIdController")
    const { id } = request.params
    const subscription = await axios({
        url: 'http://localhost:40001/subscriptions/' as string + '/' + id,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }
    }).then(res => {
        res.data as Subscription
        response.status(httpStatus.OK).json(subscription)
    }).catch(error => {
        response.status(httpStatus.NOT_FOUND).json(new SubscriptionNotFoundException(id))
    })
}

export const cancelSubscriptionByIdController = async (request: Request, response: Response) => {
    console.log("getSubscriptionByIdController")
    const { id } = request.params
    const subscriptionRes = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'PUT',
    }).then(res => {
        res.data as Subscription
        response.status(httpStatus.OK).json(subscriptionRes)
    }).catch(error => {
        response.status(httpStatus.NOT_FOUND).json(new SubscriptionNotFoundException(id))
    })
}