import axios from 'axios';
import { Response, Request } from 'express';
import httpStatus from 'http-status';
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
    const urrrr = process.env.URL_SUBSCRIPTIONS as string
    console.log(urrrr)
    const subscriptionRes = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }
    }).then(response => response.data as Subscription[])

    response.status(httpStatus.OK).json(subscriptionRes)
}

export const getSubscriptionByIdController = async (request: Request, response: Response) => {
    console.log("getSubscriptionByIdController")
    const { id } = request.params
    const subscription = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'GET',
        headers: {
            'Authorization': request.headers.authorization || ''
        }

    }).then(response => response.data as Subscription)
        .catch(error => console.log(error))

    response.status(httpStatus.OK).json(subscription)
}

export const cancelSubscriptionByIdController = async (request: Request, response: Response) => {
    console.log("getSubscriptionByIdController")
    const { id } = request.params
    const subscriptionRes = await axios({
        url: process.env.URL_SUBSCRIPTIONS as string + '/' + id,
        method: 'PUT',

    }).then(response => response.data as SubscriptionDetail)
        .catch(error => console.log(error))

    response.status(httpStatus.OK).json(subscriptionRes)
}