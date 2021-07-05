const express = require('express');
const _ = require('underscore')
const logger = require('./logger')
const app = express();
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require('config');

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
}


const courses = [{ id: 1, name: "Java" }, { id: 2, name: "Ruby" }, { id: 3, name: "Node" },]

app.get("/", (req, res) => {
    res.send("Wecome to API World..")
});

app.get('/api/courses', (req, res) => {
    if (_.isEmpty(courses)) return res.status(404).send("Not Found")
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    let rec = courses.find(x => x.id === parseInt(req.params.id));
    if (!rec) return res.status(404).send("Not Found")

    res.send(courses.find(x => x.id === parseInt(req.params.id)))
})

app.put('/api/courses/:id', (req, res) => {

    let rec = courses.find(x => x.id === parseInt(req.params.id));
    if (!rec) return res.status(404).send("Not Found")

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    rec.name = req.body.name
    res.send(rec)
})

app.post('/api/courses/', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    courses.push({ id: courses.length + 1, name: req.body.name });
    res.send({ id: courses.length + 1, name: req.body.name })
})


app.delete('/api/courses/:id', (req, res) => {
    let rec = courses.find(x => x.id === parseInt(req.params.id));
    if (!rec) return res.status(404).send("Not Found")


    courses.splice(courses.indexOf(rec), 1)
    res.send(rec)
})

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
//     // res.send(req.query.hello)
// })

// app.get('/api/courses/:month/:year', (req, res) => {
//     res.send([req.params.month, req.params.year])
// })

const validateCourse = (req) => {
    const schema = Joi.object({
        name: Joi.string()
            // .alphanum()
            .min(3)
            .max(30)
            .required()
    });

    return schema.validate(req);
}



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server start on ${port} port`))