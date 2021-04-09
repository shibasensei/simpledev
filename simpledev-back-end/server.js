require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 5000;
const usersRouter = require('./routes/users');



app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



app.use('/users', usersRouter);


module.exports = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});