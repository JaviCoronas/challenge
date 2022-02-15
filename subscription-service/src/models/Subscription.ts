

export default interface Subscription {
    id: string
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