import SubscriptionMongoRepository from "../repositories/SubscriptionRepository";
import { saveSubscription, getSubscriptions, getSubscriptionById, cancelSubscriptionById } from "./SubscriptionService";

// Add new kind of persistence here.
const subsRepo = new SubscriptionMongoRepository()

module.exports = {
    saveSubscription: saveSubscription(subsRepo),
    getSubscriptions: getSubscriptions(subsRepo),
    getSubscriptionById: getSubscriptionById(subsRepo),
    cancelSubscriptionById: cancelSubscriptionById(subsRepo),
}