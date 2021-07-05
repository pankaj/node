const _ = require("underscore");

const contains = _.contains([1, 2, 3, 4], 3)
console.log(contains);


var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
console.log(_.pluck(stooges, 'age'))


var stooges = [{ name: 'moe', age: 100 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
console.log(_.max(stooges, function (stooge) { return stooge.age; }));


var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
console.log(_.sortBy(stooges, 'name'));


_.each({ one: 1, two: 2, three: 3 }, (key, arg) => {
    if (key === 3) console.log(key)

});

console.log(_.has({ a: 1, b: 2, c: 3 }, "a"));
//=> true