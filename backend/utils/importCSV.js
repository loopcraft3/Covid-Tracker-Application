const mongoose = require('mongoose');
const csv = require('csvtojson');
const CovidData = require('../models/CovidData');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

csv()
  .fromFile('path_to_your_csv_file.csv')
  .then(async (data) => {
    await CovidData.deleteMany(); // Clear old data
    await CovidData.insertMany(data);
    console.log("Data Imported Successfully");
    mongoose.connection.close();
  });
