const app = require('./app');
const mongoose = require('mongoose');
const {mongoURI} = require('./src/config/index');
const amqp = require("amqplib");
const order = require('./src/models/order');
const messageBroker = require('./MessageBroker');

const start = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      app.listen(3001, () => console.log(`Server is listening port 3001...`));
    } catch (error) {
      console.log(error);
    }
}

const  setupOrderConsumer = async ()=> {

  await messageBroker.connect();

  messageBroker.consumeMessage("orders", async ({ userId, items, totalPrice }) => {
    console.log("Consuming ORDER service");

    const newOrder = new order({
      userId,
      items,
      totalPrice,
    });

    try {
      // Save order to DB
      await newOrder.save();
      console.log("Order saved to DB and ACK sent to ORDER queue");

      // Send price to payment queue
      await messageBroker.publishMessage("payments", { userId, totalPrice });
      console.log("Total price sent to PAYMENT queue");
    } catch (err) {
      console.error("Failed to process order:", err.message);
    }
  });
    
  setTimeout(async () => {
    try {
      const amqpServer = "amqp://localhost:5672";
      const connection = await amqp.connect(amqpServer);
      console.log("Connected to RabbitMQ");
      const channel = await connection.createChannel();
      await channel.assertQueue("orders");

      channel.consume("orders", async (data) => {
        // Consume messages from the order queue on checkout
        console.log("Consuming ORDER service");
        const {userId , items, totalPrice} = JSON.parse(data.content.toString());

         const newOrder = new order({
          userId,
          items,
          totalPrice
        });

        // Save order to DB
        await newOrder.save();

        // Send ACK to ORDER service
        channel.ack(data);
        console.log("Order saved to DB and ACK sent to ORDER queue");

        // Send price to payment queue
        await messageBroker.publishMessage("payments", { userId, totalPrice, orderId:newOrder._id });
        console.log("Total price sent to PAYMENT queue");

        
      });
    } catch (err) {
      console.error("Failed to connect to RabbitMQ:", err.message);
    }
  }, 10000); // add a delay to wait for RabbitMQ to start in docker-compose
  }

start();
setupOrderConsumer();