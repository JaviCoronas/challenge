import express from 'express'
import { cancelSubscriptionByIdController, getSubscriptionByIdController, getSubscriptionController } from '../controllers/SubscriptionController'
import { checkJwt } from '../utils/checkJwt'

const router = express.Router()

router.get('/subscriptions', checkJwt, getSubscriptionController)
router.get('/subscriptions/:id', checkJwt, getSubscriptionByIdController)
router.put('/subscriptions/:id', cancelSubscriptionByIdController)

export { router as subscriptionRoutes }