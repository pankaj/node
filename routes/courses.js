const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const { Course, validateCourse } = require('../model/course')


router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send("Not Found")

    try {
        res.send(course)
    }
    catch (err) { console.log(err) };
})

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)


    const course = await Course.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category,
        isActive: req.body.isActive,
        price: req.body.price
    }, { new: true })

    try {
        if (!course) return res.status(404).send("Not Found")
        res.send(course)
    }
    catch (err) { console.log(err) };
})


router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const course = new Course({
        name: req.body.name,
        category: req.body.category,
        isActive: req.body.NumberisActive,
        price: req.body.price
    });

    try {
        res.send(await course.save());
    }
    catch (err) {
        res.status(404).send(err.message)
    }

})

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) return res.status(404).send("The course with give Id Not Found")
    try {
        res.send(course)
    }
    catch (err) {
        res.status(404).send(err.message)
    }

})


module.exports = router;