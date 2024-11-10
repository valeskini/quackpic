const express = require("express");
const routes = require('./routes/img');
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://database:cAlZECit26878CHb@cluster0.kgw7n.mongodb.net/upload?retryWrites=true&w=majority',
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Verbindung -- Status:", mongoose.connection.readyState);
    }
);
const app = express();

app.use(express.json());

app.use('/', routes);
app.use(express.static("imgdocs"));

const listener = app.listen(process.env.PORT || 4040, () => {
    console.log("API2 ist Online auf Port " + listener.address().port)
})