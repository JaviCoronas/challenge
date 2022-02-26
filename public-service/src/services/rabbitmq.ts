import client, { Connection, Channel } from 'amqplib'

export const sendToRabbit = async (body: any) => {
    const connection: Connection = await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:5672`
    )
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('subscription-queue')
    channel.sendToQueue('subscription-queue', Buffer.from(JSON.stringify(body)))
}