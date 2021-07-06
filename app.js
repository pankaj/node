const express = require('express');
const _ = require('underscore')
const logger = require('./logger')
const app = express();

const mongoose = require('mongoose');

const helmet = require("helmet");
const morgan = require("morgan");
const config = require('config');

const coursesRouts = require('./routes/courses')

const debug = require('debug')("app:startup")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(helmet());

app.use(logger);


// Configration

console.log("App Server" + config.get("name"));
console.log("mail-server" + config.get("mail-server"));
console.log("mail-Password : " + config.get("mail.password"));

// console.log(process.env.NODE_ENV)
console.log(app.get('env'))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan Srart....")
    debug("From Debugger Settings...")
}


app.set('view engine', 'pug')
app.set('views', './views')


app.get("/", (req, res) => {
    //res.send("Wecome to API World..")
    res.render('index', { ttitle: "Hello Pug", hhmessage: "Welcome to pug template" })
});

app.use('/api/courses', coursesRouts)


mongoose.connect(config.get("db"), { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => debug("Mongoose Connected..."))
    .catch(err => console.error("Error to connect to MongoDB", err))



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server start on ${port} port`))