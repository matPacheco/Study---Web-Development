const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useUnifiedTopology: true, useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 9,
//     review: "Great fruit"
// });

// pineapple.save();

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// });

// person.save();

var apple = {};

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(fruits[0]);
        Person.updateOne({ name: "John" }, { favouriteFruit: fruits[0] }, function (err) {
            if (err) {
                console.log(err);
            }
            mongoose.connection.close();
        });
    }
})



