import express from 'express'
import { cancelSubscriptionByIdController, getSubscriptionByIdController, getSubscriptionsController, saveSubscriptionController } from '../controllers/SubscriptionController'

const router = express.Router()

router.get('/subscriptions', getSubscriptionsController)
router.post('/subscriptions', saveSubscriptionController)
router.get('/subscriptions/:id', getSubscriptionByIdController)
router.put('/subscriptions/:id', cancelSubscriptionByIdController)

export { router as subscriptionRoutes }