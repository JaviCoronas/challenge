import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import Subscription from '../models/Subscription'

const subService = require('../services/index')

const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
    if (msg) {
        const subReceived: Subscription = JSON.parse(msg.content.toString())
        subService.saveSubscription(subReceived)
        sendToRabbit(subReceived)
        channel.ack(msg)
    }
}

export const consumeRabbitMQ = async () => {
    const connection: Connection = await startConnection()
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('subscription-queue')
    await channel.consume('subscription-queue', consumer(channel))
}

export const sendToRabbit = async (body: any) => {
    const connection: Connection = await startConnection()
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue('email-queue')
    channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(body)))
}

async function startConnection() {
    return await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:5672`
    )
}