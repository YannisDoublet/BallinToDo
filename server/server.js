const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const {mongodb_user, mongodb_password} = require('./config/mongodb_info');
const app = express();
const apiRouter = require('./apiRouter').router;

/* MIDDLEWARE */
let urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cors());

/* MONGODB CONNECTION */
const uri = `mongodb+srv://${mongodb_user}:${mongodb_password}@ballintodo-sp8ma.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log('Mongodb Atlas connected !');
});

app.use('/api/', apiRouter);

app.use('/', (req, res) => {
    res.status(200).send('Initialized');
});


const API_PORT = process.env.API_PORT || 8080;
app.listen(API_PORT, console.log(`Listening on port ${API_PORT}`));