const app = require('./app');
const mongoose = require('mongoose');
const {mongoURI} = require('./src/config/index');

const start = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      app.listen(3002, () => console.log(`Server is listening port 3002...`));
    } catch (error) {
      console.log(error);
    }
}

start();