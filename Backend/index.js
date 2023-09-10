const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
// const port = 5000

const dotenv = require("dotenv")

dotenv.config()

const app = express();

// connect to DB
connectDB();

app.use(bodyParser.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000")
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next();
})

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', require("./Routes/Auth"));
app.use('/api/Subscribe', require("./Routes/SubscribeUs"));

// mongoose
//     .connect(
//         `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpyvqgy.mongodb.net/foodhubdb?retryWrites=true&w=majority`
//     )
//     .then(() => {
//         app.listen(5000);
//     })
//     .catch(err => {
//         console.log(err);
//     });

const port = process.env.PORT || 8000;

// listen
app.listen(port, () => {
    console.log("FoodHub Server is listining on port " + port);
});