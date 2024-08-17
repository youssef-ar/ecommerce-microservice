const app = require('./app');
const mongoose = require('mongoose');
const {mongoURI} = require('./src/config/index');
const messageBroker = require('./MessageBroker');

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

start();