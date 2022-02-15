import Subscription from "../models/Subscription";
import IRepository from "../repositories/IRepository";


export const saveSubscription = (
    subRepo: IRepository<Subscription>,
) => async (sub: Subscription) => {
    console.log("save. Service")
    return subRepo.save(sub)
}

export const getSubscriptions = (subRepo: IRepository<Subscription>) => async () => {
    console.log("getSubscriptions. Service")
    return subRepo.getAll()
}

export const getSubscriptionById = (subRepo: IRepository<Subscription>) => async (id: string) => {
    console.log("getSubscriptionById. Service")
    return subRepo.findById(id)
}

export const cancelSubscriptionById = (subRepo: IRepository<Subscription>) => async (id: string) => {
    console.log("cancelSubscriptionById. Service")
    return subRepo.cancelById(id)
}
