var _ = require('ramda');



var getChildren = function(x) {
  return x.childNodes;
};

var allTheChildren = _.map(getChildren); //?
allTheChildren([{childNodes:'a'},{childNodes:'b'}]) //?

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = _.split;

words(' ', 'algo otra cosa') //?

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = (s) => _.map(words(s));


sentences(' ')(['a a a a']) //?
// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

var filterQs = _.filter;


filterQs((x) =>_.match(/q/i, x))(['a','b', '1']) //?
// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = _.reduce(function(acc, x) {
    return _keepHighest(acc, x);
  }, -Infinity);

max([1,2,3,4,9,5]) //?




// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = (array)=>
(start)=>
   (end)=> array.slice(start,end);

slice([1,2,3,4])(1)(3) //?

var sliceBefore = (array, start, end)=> array.slice(start,end);

var sliceCurry =  _.curry(sliceBefore);


sliceCurry([1,2,3,4])(1)(3) //?

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = (array) => sliceCurry(array)(0);

take(['a', 'b', 'c'])(2) //?


var snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};


snakeCase("Hola") //?

// -----------------
var head = function(x) {
  return x[0];
};
var reverse = _.reduce(function(acc, x) {
  return [x].concat(acc);
}, []);
var last = _.compose(head, reverse);


var toUpperCase2 = function(x) {
  x = x && "";
  return x.toUpperCase();
};
var exclaim = function(x) {
  return x + '!';
};
var shout = _.compose(exclaim, toUpperCase2);

shout("send in the clowns"); //?

var loudLastUpper = _.compose(exclaim, toUpperCase2, head, reverse);

// or
var last = _.compose(head, reverse);
var loudLastUpper = _.compose(exclaim, toUpperCase2, last);

// or
var last = _.compose(head, reverse);
var angry = _.compose(exclaim, toUpperCase2);
var loudLastUpper = _.compose(angry, last);


//wrong - we end up giving angry an array and we partially applied map with who knows what.
var latin = _.compose(_.map, angry, reverse);

latin(['frog', 'eyes']); 
// error

// right - each function expects 1 argument.
var latin = _.compose(_.map(angry), reverse);

latin(['frog', 'eyes']); //?
// ['EYES!', 'FROG!'])


var trace = _.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

var toLower = x=> x.toLowerCase()
var dasherize = _.compose(_.join('-'), trace('after join'),_.map(toLower), _.split(' '), _.replace(/\s{2,}/ig, ' '));

dasherize('The world is a vampire'); //?

