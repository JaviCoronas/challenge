import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import Subscription from '../models/Subscription'
import { sendSubscriptionEmail } from '../utils/emailUtils'

const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
    if (msg) {
        // Acknowledge the message
        const subReceived: Subscription = JSON.parse(msg.content.toString())
        sendSubscriptionEmail(subReceived)
        channel.ack(msg)
    }
}

export const consumeRabbitMQ = async () => {
    const connection: Connection = await startConnection()
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('email-queue')
    await channel.consume('email-queue', consumer(channel))
}

async function startConnection() {
    return await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:5672`
    )
}