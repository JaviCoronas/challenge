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
    return subRepo.getAll().then(res => res.map(item => subscriptionToDTO(item)))
}

export const getSubscriptionById = (subRepo: IRepository<Subscription>) => async (id: string) => {
    console.log("getSubscriptionById. Service")
    return subRepo.findById(id).then(res => subscriptionToDTO(res))
}

export const cancelSubscriptionById = (subRepo: IRepository<Subscription>) => async (id: string) => {
    console.log("cancelSubscriptionById. Service")
    const temp = console.log(subRepo.cancelById(id))
    return subRepo.cancelById(id)
}

// Needed due to mongo models. Converter
function subscriptionToDTO(item: any): Subscription {
    const subRetur: Subscription = {
        id: item._id.toString(),
        firstName: item.firstName,
        gender: item.gender,
        email: item.email,
        dateBith: item.dateBith,
        acceptConsent: item.acceptConsent,
        newsletterId: item.newsletterId,
        active: item.active
    }
    console.log(subRetur)
    return subRetur
}
