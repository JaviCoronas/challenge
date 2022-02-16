import Subscription, { genderType } from "../models/Subscription";
import IRepository from "./IRepository";
import * as mongoDB from "mongodb";


class SubscriptionMongoRepository implements IRepository<Subscription> {

    public async cancelById(id: string): Promise<Subscription> {
        const collection = await this.getCollection();
        const sub = (await collection.updateOne({ "_id": new mongoDB.ObjectId(id) }, { $set: { "active": false } }))
        // Needed to create full subscription due to the implement of the interface.
        const test: Subscription = {
            id: id,
            firstName: "",
            email: "",
            gender: genderType.FEMALE,
            dateBith: "",
            acceptConsent: true,
            newsletterId: "",
            active: true

        }
        return test
    }

    public async save(obj: Subscription): Promise<Subscription> {
        const collection = await this.getCollection();
        const sub = await collection.insertOne(obj)
        // Needed to create full subscription due to the implement of the interface.
        const subReturn: Subscription = {
            id: sub.insertedId.toString(),
            firstName: "",
            email: "",
            gender: genderType.FEMALE,
            dateBith: "",
            acceptConsent: true,
            newsletterId: "",
            active: true

        }
        return subReturn
    }

    public async getAll(): Promise<Subscription[]> {
        const collection = await this.getCollection();
        const subs = await collection.find().toArray() as unknown as Subscription[]

        return subs
    }

    public async findById(id: string): Promise<Subscription> {
        const collection = await this.getCollection();
        const sub = (await collection.findOne({ "_id": new mongoDB.ObjectId(id) })) as unknown as Subscription

        return sub;
    }


    private async getCollection() {
        const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
        const client: mongoDB.MongoClient = await new mongoDB.MongoClient(url).connect();
        const db = client.db(process.env.DB_NAME);

        return db.collection(process.env.DB_COLLECTION || "") as mongoDB.Collection;
    }
}

export default SubscriptionMongoRepository
