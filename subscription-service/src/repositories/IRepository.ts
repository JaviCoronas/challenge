import Subscription from "../models/Subscription";


interface IRepository<T> {
    getAll(): Promise<T[]>
    findById(id: string): Promise<T>
    save(obj: T): Promise<T>
    cancelById(id: string): Promise<T>
}

export default IRepository