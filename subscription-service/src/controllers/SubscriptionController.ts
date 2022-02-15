import { Response, Request } from 'express';
import Subscription from '../models/Subscription';
import SubscriptionDetail from '../models/SubscriptionDetail';
import { sendEmail } from '../utils/sendEmail';

const subService = require('../services/index')

export const saveSubscriptionController = async (request: Request, response: Response) => {
    const subscription = request.body as Subscription;
    const subscriptionRes = await subService.saveSubscription(subscription)

    sendEmail(request)
    response.status(201)
    const subId: SubscriptionDetail = {
        id: subscriptionRes.id
    }

    response.json(subId)
}

export const getSubscriptionController = async (request: Request, response: Response) => {
    const subscriptionRes = await subService.getSubscriptions()
    console.log(subscriptionRes)

    response.json(subscriptionRes)
}

export const getSubscriptionByIdController = async (request: Request, response: Response) => {
    const { id } = request.params
    const subscriptionRes = await subService.getSubscriptionById(id)
    console.log(subscriptionRes)

    response.json(subscriptionRes)
}

export const cancelSubscriptionByIdController = async (request: Request, response: Response) => {
    const { id } = request.params
    const subscriptionRes = await subService.cancelSubscriptionById(id)
    const subId: SubscriptionDetail = {
        id: subscriptionRes.id
    }

    response.json(subId)
}