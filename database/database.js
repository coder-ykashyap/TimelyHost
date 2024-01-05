const mongoose = require('mongoose');
require("dotenv").config()


async function ConnectToMongo() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/Timely');
  await mongoose.connect('mongodb+srv://TimelyKashyapY:KashyapYT(786)@timely-cluster.upfuiae.mongodb.net/Timely?retryWrites=true&w=majority');
    console.log('Connected to the Database')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = ConnectToMongo;