(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  	return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	const initialIdx = n > array.length ? 0 : array.length - n;
  	return n === undefined ? array[array.length - 1] : array.slice(initialIdx, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    const filteredColl = [];

    _.each(collection, function(item) {  
      if (test(item)) {
        filteredColl.push(item);
      }
    });

    return filteredColl;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    const acc = [];

    _.each(collection, function(item) {
      if (!test(item)) {
        acc.push(item);
      }
    });

    return acc;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    const dupFreeArr = [];
    const iteratedArr = [];
    iterator = iterator || _.identity;
    
    _.each(array, function(item) {
      if (!_.contains(iteratedArr, iterator(item))) {
        iteratedArr.push(iterator(item));
        dupFreeArr.push(item);
      }
    });

    return dupFreeArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    const mappedArr = [];

    _.each(collection, function(item, index) {
      mappedArr.push(iterator(item, index));
    });

    return mappedArr;
  };

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      if (Array.isArray(collection)) {
        accumulator = collection[0];
        collection = collection.slice(1);
      } else {
        let collKeys = Object.keys(collection);
        accumulator = collection[collKeys[0]];
        collKeys = collKeys.slice(1);
        const collWithNoFirstKey = {};
        _.each(collKeys, function(key) {
          collWithNoFirstKey[key] = collection[key];
        });
      }
    }

    if (Array.isArray(collection) || typeof collWithNoFirstKey === 'undefined') {
      _.each(collection, function(item, idxKey) {
        accumulator = iterator(accumulator, item, idxKey);
      });
    } else {
      _.each(collWithNoFirstKey, function(item, key) {
        accumulator = iterator(accumulator, item, key);
      });
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }

    return _.reduce(collection, function(isTrue, item) {
      if (!iterator(item)) {
        isTrue = false;
      }
      return isTrue;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one.
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }

    return !_.every(collection, function(item) {
      let isFalse = true;
      if (iterator(item)) {
        isFalse = false;
      }
      return isFalse;
    });

    // Implementation using _.reduce instead of _.every
    // return _.reduce(collection, function(isTrue, item) {
    //   if (iterator(item)) {
    //     isTrue = true;
    //   }
    //   return isTrue;
    // }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let results = {};

    return function() {
      let args;
      if (Array.isArray(arguments[0])) {
        args = `arr${Array.from(arguments)}`;
      } else {
        args = Array.from(arguments).toString();
      }

      if (!results.hasOwnProperty(args)) {
        results[args] = func.apply(this, arguments);
      }

      return results[args];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    let args = Array.from(arguments);
    args = args.slice(2);
    
    const appliedFunc = function() {
      return func.apply(null, args);
    };

    setTimeout(appliedFunc, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    const copiedArr = array.slice();
    const shuffledArr = [];

    while (shuffledArr.length < array.length) {
      const randomIdx = Math.floor(Math.random() * array.length);
      let itemToAdd = copiedArr[randomIdx];
      if (copiedArr.length === 1) {
        itemToAdd = copiedArr[0];
      }
      if (itemToAdd !== undefined) {
        shuffledArr.push(itemToAdd);
        copiedArr.splice(randomIdx, 1);
      }
    }

    return shuffledArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    args = Array.from(arguments).slice(2);
    collection = collection.concat(args);
    
    return _.map(collection, function(item) {
      if (typeof functionOrKey === 'function') {
        return functionOrKey.apply(item);
      } else {
        return item[functionOrKey].apply(item);
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    const sortedArr = [];
    const collWithCriteria = _.map(collection, function(item) {
      return {
        value: item,
        criteria: (typeof iterator === 'string') ? item[iterator] : iterator(item)
      }
    });
    const loopLength = collWithCriteria.length;

    for (let i = 0; i < loopLength; i++) {
      let currSmallestIdx = 0;
      const currSmallest = _.reduce(collWithCriteria, function(smallest, cv, idx) {
        if (cv.criteria === undefined && smallest.criteria === undefined) {
          return smallest;
        } else if (cv.criteria < smallest.criteria || smallest.criteria === undefined) {
          currSmallestIdx = idx + 1;
          return cv;
        } else {
          return smallest;
        }
      });
      sortedArr.push(currSmallest.value);
      collWithCriteria.splice(currSmallestIdx, 1);
    }

    return sortedArr;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    const firstArr = arguments[0];
    const args = Array.from(arguments);
    const zippedArr = _.map(firstArr, function(item, i) {
      const elem = [item];
      for (let j = 1; j < args.length; j++) {
        elem.push(args[j][i]);
      }
      return elem;
    });
      
    return zippedArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    return _.reduce(nestedArray, function(acc, cv) {
      acc = acc.concat(cv);
      while (Array.isArray(acc[acc.length - 1])) {
        const lastItem = acc.pop();
        acc = acc.concat(lastItem);
      }

      return acc;
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    const universalArr = [];
    const firstArr = arguments[0];
    const args = Array.from(arguments).slice(1);

    _.each(firstArr, function(item) {
      const inAllArrays = _.every(args, function(currArr) {
        return (_.contains(currArr, item));
      });
      if (inAllArrays) {
        universalArr.push(item);
      }
    });
    
    return universalArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    const diffArr = [];
    const args = Array.from(arguments).slice(1);

    for (let i = 0; i < array.length; i++) {
      const inAnotherArr = _.some(args, function(currArr) {
        return (_.contains(currArr, array[i]));
      });
      if (!inAnotherArr) {
        diffArr.push(array[i]);
      }
    }

    return diffArr;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  // My Initial Attempt (seems to work as intended but does not pass all tests)
    // let timeout = null;
    // let startTime = Date.now();
    // let timeElapsed = 0;
    // let remainingTime;
    // let result;
    // let args;

    // const throttled = function() {
    //   args = arguments;
    //   timeElapsed = Date.now() - startTime;
    //   remainingTime = wait - timeElapsed;
      
    //   if (timeElapsed >= wait) {
    //       timeout = null;
    //       timeElapsed = 0;
    //   }

    //   if (!timeout) {
    //     startTime = Date.now();
    //     timeout = true;
    //     result = func.apply(null, args);
    //   } else { 
    //     clearTimeout(timeout);
    //     timeout = setTimeout(execLater, remainingTime);
    //   }

    //   return result;
    // }

    // const execLater = function() {  
    //   startTime = Date.now();
    //   result = func.apply(null, args);
    //   return result;
    // }

    // return throttled;

  // A concise solution with help from HR Staff
    // use a flag variable to check if the function has been called within the wait period
    // flag will initially be set to false
    // return nested function
      // if flag variable is not true (i.e. false)
        // callback function is called, and flag is set to true
        // use setTimeout method to reset flag to false after wait period expires
      // callback function will not be able to be called during wait period
    let flag = false;

    return function() {
      if (!flag) {
        flag = true;
        func.apply(null, arguments);
        
        setTimeout(function() {
          flag = false;
        }, wait);
      }
    };
  };
}());
