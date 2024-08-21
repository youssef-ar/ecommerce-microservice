const amqp = require("amqplib");

class MessageBroker {
  constructor() {
    this.channel = null;
    this.connectionPromise = null;
  }

  async connect() {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    console.log("Connecting to RabbitMQ...");
    this.connectionPromise = new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        try {
          const connection = await amqp.connect("amqp://localhost:5672");
          this.channel = await connection.createChannel();
          await this.channel.assertQueue("orders", { durable: true });
          await this.channel.assertQueue("carts", { durable: true });
          console.log("RabbitMQ connected");
          resolve(this.channel);
        } catch (err) {
          console.error("Failed to connect to RabbitMQ:", err.message);
          reject(err);
        }
      }, 20000); // delay 20 seconds to wait for RabbitMQ to start
    });

    return this.connectionPromise;
  }

  async publishMessage(queue, message) {
    await this.connectionPromise;
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      return;
    }
    try {
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (err) {
      console.log(err);
    }
  }

  async consumeMessage(queue, callback) {
    await this.connectionPromise;
    if (!this.channel) {
      console.error("No RabbitMQ channel available.");
      return;
    }
    try {
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);
        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new MessageBroker();