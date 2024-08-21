const app = require('./app');
const mongoose = require('mongoose');
const {mongoURI} = require('./src/config/index');
const messageBroker = require('./MessageBroker');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./src/config/index');
const cart =require('./src/models/cart');

const start = async () => {
    try {
      await messageBroker.connect();
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      app.listen(3003, () => console.log(`Server is listening port 3003...`));
    } catch (error) {
      console.log(error);
    }
}

const  setupcartConsumer = async ()=> {

  await messageBroker.connect();

  await messageBroker.consumeMessage("carts", async ({ sessionID, token }) => {
    console.log("Consuming CARTS service");
    const user = jwt.verify(token, jwtSecret);
    const userId = user.userId;
    

    try {
      // update cart with userId
      const cartInstance = await cart.findOne({sessionID});
      cartInstance.userId=userId;
      console.log("cartInstance updated with userId");
    } catch (err) {
      console.error("Failed to process order:", err.message);
    }
  });
    
  }

start();
setupcartConsumer();