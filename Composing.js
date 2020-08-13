var _ = require('ramda');
var accounting = require('accounting');

// Example Data
var CARS = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true,
}, {
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false,
}, {
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false,
}, {
  name: 'Audi R8',
  horsepower: 525,
  dollar_value: 114200,
  in_stock: false,
}, {
  name: 'Aston Martin One-77',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true,
}, {
  name: 'Pagani Huayra',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: true,
}];

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
var isLastInStock = _.compose(_.prop('in_stock'), _.last) 

isLastInStock(CARS); //?


// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
var nameOfFirstCar = _.compose(_.prop('name'), _.head) ; 
nameOfFirstCar(CARS) //?

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
var _average = (xs)=> _.reduce(_.add, 0, xs) / xs.length;

var averageDollarValue =  _.compose(_average, _.map(c=> c.dollar_value));

averageDollarValue(CARS) //?

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names:
// e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

var _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
const toLowerCase = x => x.toLowerCase();
// var sanitizeNames = _.compose(_.map(x=> x.toLowerCase()), _.map(x=> x.name));
var sanitizeNames = _.map(_.compose(_.join('_'),_.split(' '),_.toLower,x=> x.name));


sanitizeNames(CARS) //?

// Bonus 1:
// ============
// Refactor availablePrices with compose.

var availablePrices2 = (cars) =>{
  var available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x) {
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
}
const mapTo =_.map((x)=> accounting.formatMoney(x.dollar_value));
var availablePrices = _.compose(_.join(', '),mapTo,_.filter(_.prop('in_stock')))

availablePrices2(CARS) //?
availablePrices(CARS) //?


// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

var fastestCar2 = function(cars) {
  var sorted = _.sortBy(function(car) {
    return car.horsepower;
  }, cars);
  var fastest = _.last(sorted);
  return _.prop('name',fastest) + ' is the fastest';
};

var concatLastPart = x => x + ' is the fastest';
var fastestCar = _.compose (concatLastPart,_.prop('name'),_.last,_.sortBy(car => car.horsepower));

fastestCar2(CARS) //?
fastestCar(CARS) //?