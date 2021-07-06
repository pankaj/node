
const mongoose = require('mongoose');


const uri = "mongodb+srv://psaini:9818040515@ind.52wsx.mongodb.net/nodemon?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.error("Mongoose Connected..."))
    .catch(err => console.error("Error to connect to MongoDB", err))


userSchema = new mongoose.Schema({
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
        enum: ['web', 'mobo', 'network']
    },
    email: String,
    password: String,
    age: Number,
    isAdmin: Boolean,
    is_active: Boolean,
    date: {
        type: Date,
        default: Date.now
    },
    subscriptionPrice: {
        type: Number,
        min: 10,
        max: 1000,
        required: function () { return this.is_active; },
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    // tags: {
    //     type: Array,
    //     validate: {
    //         validator: function (v) {
    //             return v && v.length > 0
    //         },
    //         message: 'A User has at least one tag'
    //     }

    // }
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 5000)
            },
            message: 'A User has at least one tag'
        }

    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
})

const User = mongoose.model('User', userSchema)

async function createUser() {

    const user = new User({
        name: 'Khana2',
        email: 'kana2@gmail.com',
        age: 35,
        password: '123456',
        isAdmin: false,
        is_active: true,
        category: 'web3',
        subscriptionPrice: 200,
        tags: [],
        phone: 123456987
    });

    try {
        const userRec = await user.save();
        console.log(userRec);
    }
    catch (err) {
        for (field in err.errors)
            console.log("Error", err.errors[field].message)
    }

}

createUser();

async function getUserData() {

    // COMPARISION OPERATORS
    //eq - equal
    // ne - not equal
    //gt - greater then
    //gte - grater then and equal to
    //lt = less then
    //lte - less then and equal to
    // in
    //nin - not in 


    const user = await User
        //.find({ is_active: true })
        //.find({ age: { $gte: 5, $lte: 40 } })
        .find({ age: { $in: [9, 40, 43] } })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1 });
    console.log(user);
}

//getUserData(); 


async function getUserLogical() {

    //LOGICAL OPERATOR
    // or
    // and


    const user = await User
        //.find({ is_active: true })
        //.find({ age: { $gte: 5, $lte: 40 } })
        .find()
        .or([{ name: 'Pankaj Saini' }, { age: { $lt: 10 } }])
        .and([{ is_active: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1 });
    console.log(user);
}

//getUserLogical();


async function getUserRegular() {
    const user = await User

        // start with Anita
        //.find({ name: /^Anita/ })

        // end with San
        //.find({ name: /san$/i })

        // Contails Mash
        .find({ name: /.*Saini.*/i })
        .limit(10)
        .sort({ name: 1 })
        // .select({ name: 1, age: 1 });
        .count() // for count records
    console.log(user);
}

//getUserRegular();


// Pagination

async function getUserPagination() {

    const pageNumber = 5;
    const pageSize = 1

    const user = await User
        .find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, age: 1 });

    console.log(user);
}

//getUserPagination();

