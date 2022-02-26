

export default interface Subscription {
    id: string,
    firstName: string | null,
    email: string
    gender: genderType | null,
    dateBith: string,
    acceptConsent: boolean,
    newsletterId: string,
    active: boolean
}

export enum genderType {
    'MALE',
    'FEMALE'
}

export function isvalid(sub: Subscription): Boolean {
    if (sub.email == null || sub.dateBith == null || sub.gender == null || sub.newsletterId == null || sub.acceptConsent == null) return false
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    if (!regexp.test(sub.email)) return false
    return true
}