import client, { Connection, Channel } from 'amqplib'


export const sendToRabbit = async (body: any) => {
    console.log("send to rabbit")
    const connection: Connection = await client.connect(
        'amqp://guest:guest@my-rabbit:5672'
    )
    // Create a channel
    const channel: Channel = await connection.createChannel()
    // Makes the queue available to the client
    await channel.assertQueue('public-service')
    channel.sendToQueue('public-service', Buffer.from(JSON.stringify(body)))
}