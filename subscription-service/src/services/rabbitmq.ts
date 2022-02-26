import client, { Connection, Channel, ConsumeMessage } from 'amqplib'
import Subscription from '../models/Subscription'

const subService = require('../services/index')

const consumer = (channel: Channel) => async (msg: ConsumeMessage | null): Promise<void> => {
    if (msg) {
        // Display the received message
        console.log(msg.content.toString())
        // Acknowledge the message
        const subReceived: Subscription = JSON.parse(msg.content.toString())
        subService.saveSubscription(subReceived)
        sendToRabbit(subReceived)
        channel.ack(msg)
    }
}

export const consumeRabbitMQ = async () => {
    console.log("something received")
    const connection: Connection = await startConnection()
    // Create a channel
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('public-service')
    await channel.consume('public-service', consumer(channel))
}

export const sendToRabbit = async (body: any) => {
    console.log("send to rabbit")
    const connection: Connection = await startConnection()
    // Create a channel
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('email-queue')
    channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(body)))
}

async function startConnection() {
    return await client.connect(
        'amqp://guest:guest@my-rabbit:5672'
    )
}