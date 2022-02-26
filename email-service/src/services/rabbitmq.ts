import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import Subscription from '../models/Subscription'
import { sendSubscriptionEmail } from '../utils/emailUtils'

const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
    if (msg) {
        // Display the received message
        console.log(msg.content.toString())
        // Acknowledge the message
        const subReceived: Subscription = JSON.parse(msg.content.toString())
        sendSubscriptionEmail(subReceived)
        channel.ack(msg)
    }
}

export const consumeRabbitMQ = async () => {
    console.log("something received")
    const connection: Connection = await startConnection()
    // Create a channel
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('email-queue')
    await channel.consume('email-queue', consumer(channel))
}

async function startConnection() {
    return await client.connect(
        'amqp://guest:guest@my-rabbit:5672'
    )
}