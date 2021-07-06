const mongoose = require('mongoose');
const Joi = require('joi');

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        //match:/patern/
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['java', 'node', 'ruby']
    },
    isActive: { type: Boolean, default: false },
    price: {
        type: Number,
        min: 100,
        max: 1000,
        required: function () { return this.is_active; },
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    date: {
        type: Date,
        default: Date.now
    }
}))

const validateCourse = (req) => {
    const schema = Joi.object({
        name: Joi.string()
            // .alphanum()
            .min(3)
            .max(30)
            .required(),
        category: Joi.string()
            .valid('java', 'node', 'ruby')
            .required(),
        price: Joi.number()
            .integer()
            .min(100)
            .max(1000)
    });

    return schema.validate(req);
}


exports.Course = Course
exports.validateCourse = validateCourse