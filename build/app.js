/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 159);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(26)
  , hide      = __webpack_require__(14)
  , redefine  = __webpack_require__(15)
  , ctx       = __webpack_require__(27)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(64)('wks')
  , uid        = __webpack_require__(41)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(114)
  , toPrimitive    = __webpack_require__(25)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = window.React;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(14)
  , has       = __webpack_require__(12)
  , SRC       = __webpack_require__(41)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(26).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(21)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52)
  , defined = __webpack_require__(21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(53)
  , createDesc     = __webpack_require__(31)
  , toIObject      = __webpack_require__(17)
  , toPrimitive    = __webpack_require__(25)
  , has            = __webpack_require__(12)
  , IE8_DOM_DEFINE = __webpack_require__(114)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(12)
  , toObject    = __webpack_require__(10)
  , IE_PROTO    = __webpack_require__(83)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(27)
  , IObject  = __webpack_require__(52)
  , toObject = __webpack_require__(10)
  , toLength = __webpack_require__(9)
  , asc      = __webpack_require__(180);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(26)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(130)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(64)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(133)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(6)){
  var LIBRARY             = __webpack_require__(34)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(65)
    , $buffer             = __webpack_require__(90)
    , ctx                 = __webpack_require__(27)
    , anInstance          = __webpack_require__(33)
    , propertyDesc        = __webpack_require__(31)
    , hide                = __webpack_require__(14)
    , redefineAll         = __webpack_require__(38)
    , toInteger           = __webpack_require__(32)
    , toLength            = __webpack_require__(9)
    , toIndex             = __webpack_require__(40)
    , toPrimitive         = __webpack_require__(25)
    , has                 = __webpack_require__(12)
    , same                = __webpack_require__(127)
    , classof             = __webpack_require__(51)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(10)
    , isArrayIter         = __webpack_require__(75)
    , create              = __webpack_require__(35)
    , getPrototypeOf      = __webpack_require__(19)
    , gOPN                = __webpack_require__(36).f
    , getIterFn           = __webpack_require__(92)
    , uid                 = __webpack_require__(41)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(23)
    , createArrayIncludes = __webpack_require__(55)
    , speciesConstructor  = __webpack_require__(84)
    , ArrayIterators      = __webpack_require__(93)
    , Iterators           = __webpack_require__(46)
    , $iterDetect         = __webpack_require__(61)
    , setSpecies          = __webpack_require__(39)
    , arrayFill           = __webpack_require__(68)
    , arrayCopyWithin     = __webpack_require__(107)
    , $DP                 = __webpack_require__(7)
    , $GOPD               = __webpack_require__(18)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(41)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(12)
  , setDesc  = __webpack_require__(7).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(120)
  , enumBugKeys = __webpack_require__(71)
  , IE_PROTO    = __webpack_require__(83)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(70)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(122)
  , hiddenKeys = __webpack_require__(71).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(122)
  , enumBugKeys = __webpack_require__(71);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(15);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(7)
  , DESCRIPTORS = __webpack_require__(6)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(14)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(27)
  , call        = __webpack_require__(116)
  , isArrayIter = __webpack_require__(75)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(9)
  , getIterFn   = __webpack_require__(92)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(12)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(21)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(88)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getArrayByLength = getArrayByLength;
exports.shallowEqual = shallowEqual;
exports.getElementOffsetY = getElementOffsetY;
exports.inheritProps = inheritProps;
function getArrayByLength(length) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret[i] = null;
    }
    return ret;
}

function is(x, y) {
    var ret = void 0;
    if (x === y) {
        ret = x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // return x !== x && y !== y;
        ret = isNaN(x) && isNaN(y);
    }

    return ret;
}

function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

function getElementOffsetY(ele, parent) {
    var y = 0;
    while (ele !== parent && ele !== null) {
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return y;
}

var DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT = exports.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT = 250;

function inheritProps(props, attrs) {
    return attrs.reduce(function (ret, attr) {
        ret[attr] = props[attr];
        return ret;
    }, {});
}

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "util.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = window.ReactDOM;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17)
  , toLength  = __webpack_require__(9)
  , toIndex   = __webpack_require__(40);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(15)
  , redefineAll       = __webpack_require__(38)
  , meta              = __webpack_require__(30)
  , forOf             = __webpack_require__(45)
  , anInstance        = __webpack_require__(33)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(61)
  , setToStringTag    = __webpack_require__(47)
  , inheritIfRequired = __webpack_require__(74);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(14)
  , redefine = __webpack_require__(15)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(21)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(20)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(34)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(14)
  , uid    = __webpack_require__(41)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(95);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(50);

var ReactErrorUtils = __webpack_require__(99);

var invariant = __webpack_require__(42);
var warning = __webpack_require__(66);

/**
 * Injected dependencies:
 */

/**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */
var ComponentTree;
var TreeTraversal;
var injection = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
    }
  },
  injectTreeTraversal: function (Injected) {
    TreeTraversal = Injected;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.isAncestor && Injected.getLowestCommonAncestor, 'EventPluginUtils.injection.injectTreeTraversal(...): Injected ' + 'module is missing isAncestor or getLowestCommonAncestor.') : void 0;
    }
  }
};

function isEndish(topLevelType) {
  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
}

function isMoveish(topLevelType) {
  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
}
function isStartish(topLevelType) {
  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
}

var validateEventDispatches;
if (process.env.NODE_ENV !== 'production') {
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    process.env.NODE_ENV !== 'production' ? warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : void 0;
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event);
  }
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : _prodInvariant('103') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },
  isAncestor: function (a, b) {
    return TreeTraversal.isAncestor(a, b);
  },
  getLowestCommonAncestor: function (a, b) {
    return TreeTraversal.getLowestCommonAncestor(a, b);
  },
  getParentInstance: function (inst) {
    return TreeTraversal.getParentInstance(inst);
  },
  traverseTwoPhase: function (target, fn, arg) {
    return TreeTraversal.traverseTwoPhase(target, fn, arg);
  },
  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
  },

  injection: injection
};

module.exports = EventPluginUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(10)
  , toIndex  = __webpack_require__(40)
  , toLength = __webpack_require__(9);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(31);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(82).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(46)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(35)
  , descriptor     = __webpack_require__(31)
  , setToStringTag = __webpack_require__(47)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(34)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(15)
  , hide           = __webpack_require__(14)
  , has            = __webpack_require__(12)
  , Iterators      = __webpack_require__(46)
  , $iterCreate    = __webpack_require__(77)
  , setToStringTag = __webpack_require__(47)
  , getPrototypeOf = __webpack_require__(19)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(89).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(20)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(27)(Function.call, __webpack_require__(18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(64)('keys')
  , uid    = __webpack_require__(41);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(13)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(60)
  , defined  = __webpack_require__(21);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(32)
  , defined   = __webpack_require__(21);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(27)
  , invoke             = __webpack_require__(59)
  , html               = __webpack_require__(73)
  , cel                = __webpack_require__(70)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(20)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(6)
  , LIBRARY        = __webpack_require__(34)
  , $typed         = __webpack_require__(65)
  , hide           = __webpack_require__(14)
  , redefineAll    = __webpack_require__(38)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(33)
  , toInteger      = __webpack_require__(32)
  , toLength       = __webpack_require__(9)
  , gOPN           = __webpack_require__(36).f
  , dP             = __webpack_require__(7).f
  , arrayFill      = __webpack_require__(68)
  , setToStringTag = __webpack_require__(47)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(26)
  , LIBRARY        = __webpack_require__(34)
  , wksExt         = __webpack_require__(129)
  , defineProperty = __webpack_require__(7).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(51)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(46);
module.exports = __webpack_require__(26).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(44)
  , step             = __webpack_require__(117)
  , Iterators        = __webpack_require__(46)
  , toIObject        = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(78)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = window.ReactRouter;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _fastclick = __webpack_require__(148);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _reactTapEventPlugin = __webpack_require__(174);

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/7/8.
 */
if (!window.___yoTapEventInjected) {
    // 不要觉得这里没用
    // 因为yo-router也用了tap-event-plugin，如果不加try catch会报引用两次tap-event-plugin的警告
    try {
        (0, _reactTapEventPlugin2.default)();
    } catch (e) {}

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        _fastclick2.default.attach(document.body);
    }

    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    });
    document.body.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
    });
    window.___yoTapEventInjected = true;
}

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "tapEventPluginInit.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(49);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component LazyImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 懒加载图片组件，只能在 `Scroller` 和 `List` 中使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用这个组件代替img标签后，会延迟加载这个图片，直到List组件的滚动使得该图片位于可视区域之内。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./lazyimage.md}{instruUrl: scroller/lazyimage.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version  3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TO_BE_LOADED = 0;
var LOADING = 1;
var LOADED = 2;

var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
        _classCallCheck(this, _class);

        // 0->等待load,1->loading,2->loaded
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.loading = TO_BE_LOADED;
        _this.state = {
            src: _this.props.defaultImage
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refresh(this.context);
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.push(this);
            }
        }

        // 父组件render时,需要重置这个组件的loaded状态和context

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            this.refresh(nextContext);

            if (this.state.src !== nextProps.src) {
                this.loading = TO_BE_LOADED;
                this.setState({ src: this.props.defaultImage });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.splice(scroller.childLazyImages.indexOf(this), 1);
            }
            this.canLoadImage = false;
        }
    }, {
        key: 'refresh',
        value: function refresh(context) {
            this.canLoadImage = true;
            this.offsetY = context.offsetY;
            this.itemRef = context.itemRef;
            this.infinite = context.infinite;
            // 如果不是infinite的列表，那么应该获取offsetTop(这个开销还挺大的，不过没得优化了)，反之，则使用translateY
            if (!this.infinite) {
                this.offsetTop = (0, _util.getElementOffsetY)(this.img);
                this.height = this.img.offsetHeight;
            }
        }
    }, {
        key: 'load',
        value: function load(callback) {
            var _this2 = this;

            if (this.loading === TO_BE_LOADED) {
                var src = this.props.src,
                    tmpImg = new Image();

                this.loading = LOADING;
                tmpImg.onload = function () {
                    // 在lazyimage正在加载时组件unmount(主要是在SPA模式下有可能发生关闭view的情况)会报错
                    // 因此这里需要简单判断一下组件的实例是否还存在
                    if (_this2 && _this2.canLoadImage) {
                        _this2.loading = LOADED;
                        _this2.setState({ src: src, loaded: true });
                        if (callback) {
                            callback();
                        }
                    }
                };
                tmpImg.src = src;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                height = _props.height,
                style = _props.style,
                customAttr = _props.customAttr;
            // 解决和touchable组件结合使用的问题，必须能够接收这四个属性

            if (this.context.list) {
                if (height == null && style.height == null) {
                    throw Error('yo-lazyimage: 在List组件中使用LazyImage必须指定图片的高度。');
                }
            }

            return _react2.default.createElement('img', _extends({}, (0, _util.inheritProps)(this.props, ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'width', 'height', 'className', 'title', 'style']), {
                alt: this.props.alt,
                ref: function ref(img) {
                    if (img) _this3.img = img;
                },
                src: this.state.src
            }, customAttr));
        }
    }]);

    return _class;
}(_react.Component);

_class.contextTypes = {
    // 从父组件context接收的属性
    // list/scroller组件实例的引用
    list: _react.PropTypes.object,
    scroller: _react.PropTypes.object,
    // listitem的offsetY(infinite模式下)
    offsetY: _react.PropTypes.number,
    // listitem实例的引用
    itemRef: _react.PropTypes.object,
    // 是否是Scroller下面的Lazyload,而不是List下面的
    isScroller: _react.PropTypes.bool,
    // 是否是infinite列表
    infinite: _react.PropTypes.bool
};
_class.propTypes = {
    /**
     * @property defaultImage
     * @type String
     * @default null
     * @description 默认图片，在原图片还没有完成加载时展示。
     */
    defaultImage: _react.PropTypes.string,
    /**
     * @property src
     * @type String
     * @default null
     * @description 图片src，必需。
     */
    src: _react.PropTypes.string.isRequired,
    /**
     * @property className
     * @type String
     * @default null
     * @description 给img标签加的类名。
     */
    className: _react.PropTypes.string,
    /**
     * @property width
     * @type Number
     * @default null
     * @description 图片宽度。
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @type Number
     * @default null
     * @description 图片高度。
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property customAttr
     * @type Object
     * @default null
     * @description 附加给img dom节点的自定义属性，属性名需要以data-开头。
     */
    customAttr: _react.PropTypes.object,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 附加给img dom节点的style。
     */
    style: _react.PropTypes.object,
    /**
     * @property alt
     * @type String
     * @default null
     * @description 和img标签的alt属性相同。
     */
    alt: _react.PropTypes.string,
    /**
     * @property title
     * @type String
     * @default null
     * @description 和img标签的title属性相同。
     */
    title: _react.PropTypes.string,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
};
_class.defaultProps = {
    defaultImage: null,
    src: null,
    className: null,
    width: null,
    height: null,
    customAttr: {},
    style: null
};
exports.default = _class;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(50);

var EventPluginRegistry = __webpack_require__(163);
var EventPluginUtils = __webpack_require__(67);
var ReactErrorUtils = __webpack_require__(99);

var accumulateInto = __webpack_require__(100);
var forEachAccumulated = __webpack_require__(101);
var invariant = __webpack_require__(42);

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

var getDictionaryKey = function (inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function (inst, registrationName, listener) {
    !(typeof listener === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : _prodInvariant('94', registrationName, typeof listener) : void 0;

    var key = getDictionaryKey(inst);
    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function (inst, registrationName) {
    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
    // live here; needs to be moved to a better place soon
    var bankForRegistrationName = listenerBank[registrationName];
    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
      return null;
    }
    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function (inst, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(inst, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      var key = getDictionaryKey(inst);
      delete bankForRegistrationName[key];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {object} inst The instance, which is the source of events.
   */
  deleteAllListeners: function (inst) {
    var key = getDictionaryKey(inst);
    for (var registrationName in listenerBank) {
      if (!listenerBank.hasOwnProperty(registrationName)) {
        continue;
      }

      if (!listenerBank[registrationName][key]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(inst, registrationName);
      }

      delete listenerBank[registrationName][key];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function (events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function (simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : _prodInvariant('95') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function () {
    listenerBank = {};
  },

  __getListenerBank: function () {
    return listenerBank;
  }

};

module.exports = EventPluginHub;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a) {
  try {
    func(a);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
      var boundFunc = func.bind(null, a);
      var evtType = 'react-' + name;
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      // $FlowFixMe https://github.com/facebook/flow/issues/2336
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
    };
  }
}

module.exports = ReactErrorUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(50);

var invariant = __webpack_require__(42);

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : _prodInvariant('30') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

module.exports = accumulateInto;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */

function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

module.exports = forEachAccumulated;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var shallowEqual = __webpack_require__(142);

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(10)
  , toIndex  = __webpack_require__(40)
  , toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(45);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(10)
  , IObject   = __webpack_require__(52)
  , toLength  = __webpack_require__(9);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(13)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(59)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(7).f
  , create      = __webpack_require__(35)
  , redefineAll = __webpack_require__(38)
  , ctx         = __webpack_require__(27)
  , anInstance  = __webpack_require__(33)
  , defined     = __webpack_require__(21)
  , forOf       = __webpack_require__(45)
  , $iterDefine = __webpack_require__(78)
  , step        = __webpack_require__(117)
  , setSpecies  = __webpack_require__(39)
  , DESCRIPTORS = __webpack_require__(6)
  , fastKey     = __webpack_require__(30).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(51)
  , from    = __webpack_require__(108);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(38)
  , getWeak           = __webpack_require__(30).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(33)
  , forOf             = __webpack_require__(45)
  , createArrayMethod = __webpack_require__(23)
  , $has              = __webpack_require__(12)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(70)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 118 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(37)
  , gOPS     = __webpack_require__(63)
  , pIE      = __webpack_require__(53)
  , toObject = __webpack_require__(10)
  , IObject  = __webpack_require__(52)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(37);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17)
  , gOPN      = __webpack_require__(36).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(12)
  , toIObject    = __webpack_require__(17)
  , arrayIndexOf = __webpack_require__(55)(false)
  , IE_PROTO     = __webpack_require__(83)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(37)
  , toIObject = __webpack_require__(17)
  , isEnum    = __webpack_require__(53).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(36)
  , gOPS     = __webpack_require__(63)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(48).trim;

module.exports = 1 / $parseFloat(__webpack_require__(88) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(48).trim
  , ws        = __webpack_require__(88)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9)
  , repeat   = __webpack_require__(87)
  , defined  = __webpack_require__(21);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(111);

// 23.1 Map Objects
module.exports = __webpack_require__(56)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(58)
});

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(111);

// 23.2 Set Objects
module.exports = __webpack_require__(56)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(23)(0)
  , redefine     = __webpack_require__(15)
  , meta         = __webpack_require__(30)
  , assign       = __webpack_require__(119)
  , weak         = __webpack_require__(113)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(56)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(145);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = {
      swiperList: [_react2.default.createElement('div', null)]
    };
    return _this;
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'm-board' },
        _react2.default.createElement(
          'div',
          { className: 'swiper' },
          _react2.default.createElement(
            _src2.default,
            null,
            _react2.default.createElement(
              'li',
              { className: 'item' },
              _react2.default.createElement('img', { className: 'img', src: '//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg' })
            ),
            _react2.default.createElement(
              'li',
              { className: 'item' },
              _react2.default.createElement('img', { className: 'img', src: '//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg' })
            ),
            _react2.default.createElement(
              'li',
              { className: 'item' },
              _react2.default.createElement('img', { className: 'img', src: '//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg' })
            )
          )
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('b', null),
              _react2.default.createElement('i', null)
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('i', null),
                _react2.default.createElement('b', null)
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('i', null),
                _react2.default.createElement('b', null)
              )
            )
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // let url = '/api/v2/movie/in_theaters?count=3'
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (res) {
        var Lis = res.subjects.map(function (val) {
          return _react2.default.createElement(
            'li',
            { className: 'item' },
            _react2.default.createElement('img', { className: 'img', src: val.images.large })
          );
        });
        _this2.setState({
          swiperList: Lis
        });
      });
    }
  }]);

  return Board;
}(_react2.default.Component);

exports.default = Board;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "board.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cart = function (_React$Component) {
  _inherits(Cart, _React$Component);

  function Cart() {
    _classCallCheck(this, Cart);

    return _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).apply(this, arguments));
  }

  _createClass(Cart, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "m-cart" },
        "cart..."
      );
    }
  }]);

  return Cart;
}(_react2.default.Component);

exports.default = Cart;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "cart.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index(props) {
    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.state = {
      title: '首页'
    };
    return _this;
  }

  _createClass(Index, [{
    key: 'clickHandler',
    value: function clickHandler(type) {
      this.setState({
        title: type
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'm-index' },
        _react2.default.createElement(
          'header',
          null,
          _react2.default.createElement(
            'div',
            { className: 'yo-header yo-header-a' },
            _react2.default.createElement(
              'h2',
              { className: 'title' },
              this.state.title
            ),
            _react2.default.createElement(
              'span',
              { className: 'regret yo-ico' },
              '\uE61F'
            )
          )
        ),
        _react2.default.createElement(
          'section',
          null,
          this.props.children
        ),
        _react2.default.createElement(
          'footer',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { className: 'active' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/board', onClick: this.clickHandler.bind(this, '首页'), activeClassName: 'active' },
                _react2.default.createElement(
                  'i',
                  { className: 'yo-ico' },
                  '\uE612'
                ),
                _react2.default.createElement(
                  'b',
                  null,
                  '\u9996\u9875'
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/search', onClick: this.clickHandler.bind(this, '分类'), activeClassName: 'active' },
                _react2.default.createElement(
                  'i',
                  { className: 'yo-ico' },
                  '\uE626'
                ),
                _react2.default.createElement(
                  'b',
                  null,
                  '\u5206\u7C7B'
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/cart', onClick: this.clickHandler.bind(this, '购物车'), activeClassName: 'active' },
                _react2.default.createElement(
                  'i',
                  { className: 'yo-ico' },
                  '\uE61B'
                ),
                _react2.default.createElement(
                  'b',
                  null,
                  '\u8D2D\u7269\u8F66'
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/my', onClick: this.clickHandler.bind(this, '我的'), activeClassName: 'active' },
                _react2.default.createElement(
                  'i',
                  { className: 'yo-ico' },
                  '\uE615'
                ),
                _react2.default.createElement(
                  'b',
                  null,
                  '\u6211\u7684'
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log(this.refs.board.props.title);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var title = this.props.routes[1].title;
      this.props.onChange({
        type: 'SETTITLE',
        title: title
      });
    }
  }]);

  return Index;
}(_react2.default.Component);

exports.default = Index;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var My = function (_React$Component) {
  _inherits(My, _React$Component);

  function My() {
    _classCallCheck(this, My);

    return _possibleConstructorReturn(this, (My.__proto__ || Object.getPrototypeOf(My)).apply(this, arguments));
  }

  _createClass(My, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "m-my" },
        "my..."
      );
    }
  }]);

  return My;
}(_react2.default.Component);

exports.default = My;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "my.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(360);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(152);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));
  }

  _createClass(Search, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'm-search' },
        _react2.default.createElement(
          'div',
          { className: 'tu' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\u8BE6\u60C5'
              ),
              _react2.default.createElement('img', { src: './build/images/xianga3.JPG' }),
              _react2.default.createElement(
                'p',
                null,
                '\u5546\u54C1\u8BE6\u7EC6\u60C5\u51B5\uFF0C\u5B9D\u5B9D\u4E50\u5976\u7C89'
              ),
              _react2.default.createElement(
                'b',
                null,
                '\uFFE5456'
              ),
              _react2.default.createElement(
                'i',
                null,
                '\uFFE5478'
              )
            ),
            _react2.default.createElement('li', null)
          )
        )
      );
    }
  }]);

  return Search;
}(_react2.default.Component);

exports.default = Search;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "search.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105), __webpack_require__(11)))

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function () {
    var ALLOWANCEAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.57;
    var ALLOWANCEDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    return {
        handleData: function handleData(_ref, children) {
            var loop = _ref.loop,
                pageNow = _ref.pageNow;

            var newChildren = _react2.default.Children.toArray(children);
            if (loop) {
                var len = children.length;
                var lastfakeDomStyle = {
                    key: 0
                };
                var firstFakeDomStyle = {
                    key: -1
                };
                if (children[0].type === 'li') {
                    lastfakeDomStyle.className = children[len - 1].props.className ? children[len - 1].props.className + ' extra-item' : 'extra-item';
                } else {
                    lastfakeDomStyle.index = len;
                    lastfakeDomStyle.extraClass = children[len - 1].props.extraClass ? children[len - 1].props.extraClass + ' extra-item' : 'extra-item';
                    firstFakeDomStyle.index = 1;
                }
                var header = _react2.default.cloneElement(children[len - 1], lastfakeDomStyle);
                var footer = _react2.default.cloneElement(children[0], firstFakeDomStyle);
                newChildren.unshift(header);
                newChildren.push(footer);
            }
            return newChildren;
        },
        touchstart: function touchstart() {},
        touchmove: function touchmove(_ref2) {
            var touchstartLocation = _ref2.touchstartLocation,
                touchmoveLocation = _ref2.touchmoveLocation,
                pageNow = _ref2.pageNow,
                containerDOM = _ref2.containerDOM,
                width = _ref2.width;

            var translateX = (pageNow - 1) * width + touchstartLocation[0] - touchmoveLocation[0];
            this._addCss({
                dom: containerDOM,
                speed: 0,
                translateX: -translateX,
                reset: true,
                width: width
            });
        },
        touchend: function touchend(aniObj) {
            var touchstartLocation = aniObj.touchstartLocation,
                touchendLocation = aniObj.touchendLocation,
                pageNow = aniObj.pageNow;

            var distanceX = touchendLocation[0] - touchstartLocation[0];
            var distanceY = touchendLocation[1] - touchstartLocation[1];
            var tan = Math.abs(distanceX) / Math.abs(distanceY);
            var newpageNow = pageNow;
            if (Math.abs(distanceX) > ALLOWANCEDistance && tan > ALLOWANCEAngle) {
                newpageNow = distanceX > 0 ? pageNow - 1 : pageNow + 1;
            } else {
                newpageNow = pageNow;
            }
            return this.checkAni(aniObj, newpageNow);
        },
        checkAni: function checkAni(aniObj, pageNow) {
            var _this = this;

            var pagesNum = aniObj.pagesNum,
                speed = aniObj.speed,
                containerDOM = aniObj.containerDOM,
                loop = aniObj.loop,
                aniSpeed = aniObj.aniSpeed,
                width = aniObj.width;

            if (this.moving) window.clearInterval(this.moving);
            var translateX = width * (1 - pageNow);
            var newpageNow = pageNow;
            if (pageNow < 1 || pageNow > pagesNum) {
                if (loop) {
                    // console.log(`checkAni 延迟处理${pageNow}`);
                    this.moving = window.setTimeout(function () {
                        var translate = 0;
                        if (pageNow === 0) {
                            translate = width * (1 - pagesNum);
                        }
                        _this._addCss({
                            dom: containerDOM,
                            reset: true,
                            translateX: translate,
                            width: width
                        });
                        _this.moving = null;
                    }, (speed + aniSpeed) * 1000);
                    newpageNow = pageNow === 0 ? pagesNum : 1;
                } else {
                    newpageNow = pageNow < 1 ? 1 : pagesNum;
                    translateX = width * (1 - newpageNow);
                }
            }
            this._addCss({
                dom: containerDOM,
                reset: false,
                speed: speed,
                translateX: translateX,
                width: width
            });
            return newpageNow;
        },
        next: function next(aniObj) {
            var pageNow = aniObj.pageNow;

            var pageNext = pageNow + 1;
            return this.checkAni(aniObj, pageNext);
        },
        prev: function prev(aniObj) {
            var pageNow = aniObj.pageNow,
                containerDOM = aniObj.containerDOM,
                speed = aniObj.speed,
                width = aniObj.width;

            var pageNext = pageNow - 1;
            var translateX = width * (1 - pageNext);
            this._addCss({
                dom: containerDOM,
                speed: speed,
                translateX: translateX
            });
            return this.checkAni(aniObj, pageNext);
        },
        arrive: function arrive(aniObj, num, isAni) {
            if (num >= 1 && num <= aniObj.pagesNum) {
                var translateX = (1 - num) * aniObj.width;
                this._addCss({
                    dom: aniObj.containerDOM,
                    speed: 0.1,
                    translateX: translateX,
                    reset: !isAni,
                    width: aniObj.width
                });
            } else {
                console.log('\u4F20\u5165carousel\u7EC4\u5EFA\u7684arrive\u65B9\u6CD5\u7684\u9875\u9762\u4E3A' + num + ',\u8BE5\u503C\u4E0D\u5408\u6CD5');
            }
            return num;
        },
        _addCss: function _addCss(_ref3) {
            var dom = _ref3.dom,
                _ref3$translateX = _ref3.translateX,
                translateX = _ref3$translateX === undefined ? 0 : _ref3$translateX,
                reset = _ref3.reset,
                ani = _objectWithoutProperties(_ref3, ['dom', 'translateX', 'reset']);

            // 此处为Dom操作
            if (reset) {
                dom.style.webkitTransition = 'none';
                dom.style.transition = 'none';
            } else {
                dom.style.webkitTransition = '';
                dom.style.transition = '';
            }
            dom.style.webkitTransform = 'translate(' + translateX + 'px, 0) translateZ(0)';
            dom.style.transform = 'translate(' + translateX + 'px, 0) translateZ(0)';
        }
    };
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "aniScrollx.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(103);

__webpack_require__(96);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = __webpack_require__(161);

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Carousel.CarouselItem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Carousel组件内部的Item组件，和普通的dom节点相比增加了懒加载图片功能。也可以使用`onTap`给Item绑定tap事件回调。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 你可以通过Carousel.CarouselItem来使用这个组件，或者引用`yo3/component/carousel/src/carouselItem`的js模块来使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ** 注意：`CarouselItem`不能和`Touchable`一起使用，请使用它的`onTap`属性来绑定事件回调。 **
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ALLOWANCE = 1;
var LOADED = 1;
var UNLOAD = 0;
var FAIL = 2;

var CarouselItem = function (_Component) {
    _inherits(CarouselItem, _Component);

    function CarouselItem(props) {
        _classCallCheck(this, CarouselItem);

        var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

        if (props.img) {
            _this.state = {
                img: 0
            };
        }
        _this.handleTap = _this.handleTap.bind(_this);
        _this.hasUnmount = false;
        return _this;
    }

    _createClass(CarouselItem, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.lazyload(this.props);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            var propsChange = (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
            var contextChange = this.context.currentPage !== nextContext.currentPage || this.context.pagesNum !== nextContext.pagesNum;
            return propsChange || contextChange;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            this.lazyload(nextContext.currentPage);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.hasUnmount = true;
        }
    }, {
        key: 'handleTap',
        value: function handleTap(e) {
            this.props.onTap(e);
        }
    }, {
        key: 'loadImg',
        value: function loadImg() {
            var _this2 = this;

            if (!this.props.img) {
                return;
            }
            this.imgNode = new Image();
            this.imgNode.onload = function () {
                var imgState = void 0;
                imgState = 1;
                if (_this2.props.checkImgFun && !_this2.props.checkImgFun(_this2.imgNode)) {
                    imgState = 2;
                }
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: imgState
                    });
                }
            };
            this.imgNode.onerror = function () {
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: 2
                    });
                }
            };
            this.imgNode.src = this.props.img;
        }
    }, {
        key: 'lazyload',
        value: function lazyload(currentPage) {
            if (this.state.img) {
                return;
            }
            if (!this.props.lazyload) {
                this.loadImg();
            } else {
                if (Math.abs(currentPage - this.props.index) <= ALLOWANCE || this.props.index === 1 || this.props.index === this.context.pagesNum) {
                    this.loadImg();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var img = null;
            var classList = void 0;
            var activeClass = {};
            if (this.props.img) {
                switch (this.state.img) {
                    case LOADED:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.img, className: 'img', draggable: 'false' });
                        break;
                    case FAIL:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.errorImg, className: 'img', draggable: 'false' });
                        break;
                    case UNLOAD:
                    default:
                        img = this.props.loadingEle;
                        break;
                }
            }
            activeClass[this.props.activeClass] = this.context.currentPage === this.props.index;
            if (this.props.extraClass) {
                activeClass[this.props.extraClass] = true;
            }
            classList = (0, _classnames2.default)('item', activeClass);
            return _react2.default.createElement(
                'li',
                { className: classList, style: this.props.style, onTouchTap: this.handleTap },
                img
            );
        }
    }]);

    return CarouselItem;
}(_react.Component);

CarouselItem.propTypes = {
    /**
     * @type String
     * @property img
     * @description 图片地址。
     */
    img: _react.PropTypes.string,
    /**
     * @type String
     * @property errorImg
     * @description 图片加载失败时的替换图片。
     */
    errorImg: _react.PropTypes.string,
    /**
     * @type Function
     * @property checkImgFun
     * @description 目标图片onload时触发进行判断的函数。
     * @param 图片实例
     */
    checkImgFun: _react.PropTypes.func,
    /**
     * @type Function
     * @property onTap
     * @param {e} 事件对象，传入组件数据
     * @description item点击事件处理函数。
     */
    onTap: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @type Element
     * @property loadingEle
     * @description 图片加载时的loading Element。
     */
    loadingEle: _react.PropTypes.element,
    /**
     * @type Bool
     * @property lazyload
     * @description 是否需要图片懒加载。默认值为true,当前图片的前后两个节点图片被加载。
     */
    lazyload: _react.PropTypes.bool,
    /**
     * item是当前展示item的样式名
     * @type String
     * @property activeClass
     * @description item是当前展示item的样式名，默认值为'on'。
     */
    activeClass: _react.PropTypes.string,
    index: _react.PropTypes.number,
    style: _react.PropTypes.object
};
CarouselItem.defaultProps = {
    errorImg: '//s.qunarzz.com/mobile_search_touch/intention-search-h5/loading.gif',
    loadingEle: null,
    lazyload: true,
    activeClass: 'on',
    onTap: function onTap() {}
};
CarouselItem.contextTypes = {
    currentPage: _react2.default.PropTypes.number.isRequired,
    pagesNum: _react2.default.PropTypes.number.isRequired
};
exports.default = CarouselItem;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "carouselItem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(103);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _aniScrollx = __webpack_require__(143);

var _aniScrollx2 = _interopRequireDefault(_aniScrollx);

var _reactAddonsPureRenderMixin = __webpack_require__(160);

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _carouselItem = __webpack_require__(144);

var _carouselItem2 = _interopRequireDefault(_carouselItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 走马灯组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持用户自定义动画对象，支持用户自定义css动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持用户自定义子节点
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 默认动画：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 横向滚动动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 为当前页加上on的类名，因此可以附加css动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 默认走马灯子节点：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 支持图片懒加载
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 图片加载失败的替换图模板
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 查看Demo获得实例：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用自定义动画实现图片查看器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 内置动画配合css动画效果
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用注意：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - `Carousel`组件的父节点需要有宽度，`Carousel`组件默认宽度为‘100%’，如果父节点没有宽度会导致默认滚动动画失效。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - `Carousel`组件不能直接嵌套在`Touchable`组件中，请使用`CarouselItem`的`onTap`来给它的Item绑定tap事件回调，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 或者用`Touchable`组件包裹Item。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author eva.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./carousel.md}{instruUrl: carousel/index.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Dots = function Dots(props) {
    var liNodes = [];
    for (var i = 0; i < props.num; i++) {
        liNodes.push(_react2.default.createElement('li', { key: i, className: props.page === i + 1 ? 'on' : '' }));
    }
    return _react2.default.createElement(
        'ul',
        { className: 'index' },
        liNodes
    );
};
Dots.propTypes = {
    num: _react.PropTypes.number,
    page: _react.PropTypes.number
};

var DEFAULTANI = (0, _aniScrollx2.default)();

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.state = {
            page: 1
        };
        _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
        _this.dragDom = null;
        _this.dragEvt = null;
        return _this;
    }

    _createClass(Carousel, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                currentPage: this.state.page,
                pagesNum: this.props.children.length
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.ani = Object.assign({}, this.props.aniObj || DEFAULTANI);
            this.aniObj = {
                delay: this.props.delay,
                speed: this.props.speed,
                pageNow: 1,
                pagesNum: this.props.children.length,
                aniSpeed: this.props.aniSpeed,
                loop: this.props.loop,
                operationTimer: 0,
                touchstartLocation: {},
                touchendLocation: {}
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.aniObj.stageDOM = this.widgetDOM.parentNode;
            this.aniObj.width = this.widgetDOM.clientWidth;
            this.aniObj.containerDOM = this.widgetDOM.querySelector('.cont');
            this.arrive(this.props.defaultPage, false);
            this.launchAuto();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.aniObj.delay = props.delay;
            this.aniObj.speed = props.speed;
            this.aniObj.pagesNum = props.children.length;
            this.aniObj.aniSpeed = props.aniSpeed;
            this.aniObj.loop = props.loop;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState.page !== this.state.page) {
                this.props.beforeChange(nextState.page);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // this.aniObj.stageWidth = this.widgetDOM.clientWidth;
            if (prevState.page !== this.state.page) {
                this.props.afterChange(this.state.page);
            }
            if (prevProps.autoplay !== this.props.autoplay || prevProps.loop !== this.props.loop) {
                this.pause();
                this.play();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.pause();
        }

        /**
         * @description 到达方法
         * @method arrive
         * @param  {number} num 到达的页数
         * @param {isAni} boolean 是否需要动画
         */

    }, {
        key: 'arrive',
        value: function arrive(num) {
            var isAni = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.aniObj.operationTimer = num - 1;
            this.pause();
            if (num > 0 && num <= _react2.default.Children.count(this.props.children)) {
                var page = this.ani.arrive(this.aniObj, num, isAni);
                this.setState({
                    page: page
                });
                this.aniObj.pageNow = page;
            }
            this.play();
        }
    }, {
        key: 'launchAuto',
        value: function launchAuto() {
            var _this2 = this;

            if (this.autoplay) {
                window.clearInterval(this.autoplay);
            }
            if (this.props.autoplay && (this.props.loop || this.aniObj.pageNow < this.aniObj.pagesNum)) {
                this.autoplay = window.setInterval(function () {
                    _this2.next();
                }, this.props.delay * 1000);
            }
        }
    }, {
        key: 'format',
        value: function format(children) {
            var childrenList = _react2.default.Children.map(children, function (childElement, index) {
                return _react2.default.cloneElement(childElement, {
                    index: index + 1
                });
            });
            return this.ani.handleData(this.aniObj, childrenList);
        }

        // getEndX(distanceX) {
        //     let pageNow = this.aniObj.pageNow;
        //     if (Math.abs(distanceX) < 40) {
        //         return -(pageNow - 1);
        //     }
        //     if (distanceX > 0) {
        //         pageNow = pageNow - 2;
        //         this.aniObj.operationTimer --;
        //     } else {
        //         this.aniObj.operationTimer ++;
        //     }
        //     return -pageNow;
        // }
        /**
         * @method play
         * @description 播放动画
         */

    }, {
        key: 'play',
        value: function play() {
            this.launchAuto();
        }

        /**
         * @method pause
         * @description 暂停动画
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (this.autoplay) {
                window.clearInterval(this.autoplay);
            }
        }

        /**
         * @method prev
         * @description 播放上一页
         */

    }, {
        key: 'prev',
        value: function prev() {
            this.aniObj.operationTimer--;
            var page = this.ani.prev(this.aniObj);
            this.setState({ page: page });
            this.aniObj.pageNow = page;
        }

        /**
         * @method next
         * @description 播放下一页
         */

    }, {
        key: 'next',
        value: function next() {
            this.aniObj.operationTimer++;
            var page = this.ani.next(this.aniObj);
            this.setState({ page: page });
            this.aniObj.pageNow = page;
            if (page >= this.aniObj.pagesNum && !this.props.loop) {
                this.pause();
            }
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.pause();
            this.aniObj.touchstartList = e.touches[0];
            this.aniObj.touchstartLocation = [e.touches[0].clientX, e.touches[0].clientY];
            this.ani.touchstart(this.aniObj);
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.aniObj.touchmoveList = e.touches[0];
            this.aniObj.touchmoveLocation = [e.touches[0].clientX, e.touches[0].clientY];

            this.ani.touchmove(this.aniObj);
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.aniObj.touchendList = e.touches.length > 0 ? e.touches[0] : this.aniObj.touchmoveList;
            if (!this.aniObj.touchendList) {
                return;
            }
            this.aniObj.touchendLocation = [this.aniObj.touchendList.clientX, this.aniObj.touchendList.clientY];
            this.aniObj.pageNow = this.ani.touchend(this.aniObj);
            this.setState({
                page: this.aniObj.pageNow
            });
            this.play();
            this.clearTouchList();
        }
    }, {
        key: 'handleTouchCancle',
        value: function handleTouchCancle(e) {
            e.preventDefault();
            // e.stopPropagation();
            if (this.ani.touchcancel) {
                this.ani.touchcancel(this.aniObj);
                return;
            }
            this.aniObj.touchendList = this.aniObj.touchmoveList;
            this.aniObj.touchendLocation = [this.aniObj.touchendList.clientX, this.aniObj.touchendList.clientY];
            this.aniObj.pageNow = this.ani.touchend(this.aniObj);
            this.setState({
                page: this.aniObj.pageNow
            });
            this.clearTouchList();
        }
    }, {
        key: 'clearTouchList',
        value: function clearTouchList() {
            Object.assign(this.aniObj, {
                touchstartList: [],
                touchmoveList: [],
                touchstartLocation: [],
                touchmoveLocation: [],
                touchendLocation: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var classList = ['yo-carousel'];
            if (this.props.extraClass != null) {
                classList.push(this.props.extraClass);
            }
            var children = this.format(this.props.children);
            return _react2.default.createElement(
                'div',
                {
                    className: classList.join(' '),
                    ref: function ref(node) {
                        if (node) {
                            _this3.widgetDOM = node;
                        }
                    },
                    onTouchStart: function onTouchStart(evt) {
                        _this3.handleTouchStart(evt);
                    },
                    onTouchMove: function onTouchMove(evt) {
                        _this3.handleTouchMove(evt);
                    },
                    onTouchEnd: function onTouchEnd(evt) {
                        _this3.handleTouchEnd(evt);
                    },
                    onTouchCancel: function onTouchCancel(evt) {
                        // this.dragEvt.dragCancel(evt)
                        _this3.handleTouchCancle(evt);
                    }
                },
                _react2.default.createElement(
                    'ul',
                    { className: 'cont' },
                    children
                ),
                this.props.dots ? _react2.default.createElement(Dots, { num: this.aniObj.pagesNum, page: this.state.page }) : ''
            );
        }
    }]);

    return Carousel;
}(_react.Component);

Carousel.propTypes = {
    /**
     * @property dots
     * @type Bool
     * @default true
     * @description 是否使用默认坐标展示，详细可以查看demo基础用法展示。
     */
    dots: _react.PropTypes.bool,
    /**
     * @property autoplay
     * @type Bool
     * @default true
     * @description 是否自动换页。
     */
    autoplay: _react.PropTypes.bool,
    /**
     * @property loop
     * @type Bool
     * @default true
     * @description 是否循环 循环防范受动画影响，因此循环的具体方案由动画对象提供。
     */
    loop: _react.PropTypes.bool,
    /**
     * @property beforeChange
     * @type Function
     * @param {num} 变化后页面索引
     * @description 页面切换前提供的回调函数，索引值在carousel.children中设置从1开始。
     */
    beforeChange: _react.PropTypes.func,
    /**
     * @property afterChange
     * @type Function
     * @param {num} 变化后页面索引
     * @description 页面切换后提供的回调函数，索引值在carousel.children中设置从1开始。
     */
    afterChange: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property delay
     * @type Number
     * @description 自动播放时动画间隔，单位为s，因动画的实现方式而不同。
     */
    delay: _react.PropTypes.number,
    /**
     * @property speed
     * @type Number
     * @description 动画播放速度，单位为s,因动画的实现方式而不同。
     */
    speed: _react.PropTypes.number,
    /**
     * @property defaultPage
     * @type Number
     * @description 组件渲染时起始页面。
     */
    defaultPage: _react.PropTypes.number,
    /**
     * @property aniSpeed
     * @type Number
     * @description 如果使用css动画，该值为动画播放时间，用于在滚动循环时计算动画时机。
     */
    aniSpeed: _react.PropTypes.number,
    /**
     * @property aniObj
     * @type Object
     * @description 自定义动画对象，自定义动画需要提供以下方法。
     *
     * - handleData（aniObj, children）用于组件渲染前对于子节点的处理；
     * - touchstart(aniObj) 动画处理的touchstart事件；
     * - touchmove(aniObj) 动画处理的touchmove事件；
     * - touchend(aniObj) 动画处理的touchend事件；
     * - touchcancel(aniObj)动画处理的touchcancel事件；
     * - next(aniObj) 下一帧 需返回动画结束后的当前索引；
     * - arrive（aniObj,num) 跳转；
     * - prev(aniObj) 上一帧 动画结束后的当前索引；
     *
     * carousel组件提供了两种自定义动画，使用者可以按需引用：
     * + aniCss动画使用改变Index层级的方式来展示当前页面。
     * + aniInfinate动画用有限的节点数（3个）渲染无限数量节点，其实现类似于list组件infinte模式，相较于默认动画实现减少了dom节点的数量，增加了dom操作的次数，适用于实现图片查看器等dom节点多的场景。
     *
     * **aniObj格式**
     *
     * ```
     * {
     *    aniSpeed:0,
     *    containerDOM: ul.cont, //节点
     *    delay: 1,
     *    loop: true,
     *    operationTimer: 5, //操作数动画运动的绝对值，交由动画控制
     *    pageNow: 5,
     *    speed: .5,
     *    stageDOM: div,
     *    width: 375 //这里需注意宽度在组件mount后才有
     *    touchstartLocation:e
     *    touchendLocation:e
     *    touchmoveLocation:e
     * }
     * ```
     */
    aniObj: _react.PropTypes.object,
    /**
     * @property children
     * @type Element
     * @description carousel的展示内容。
     */
    children: _react.PropTypes.array.isRequired
};
Carousel.defaultProps = {
    dots: true,
    autoplay: true,
    loop: true,
    effect: 'scrollX',
    delay: 1.5,
    speed: 0.5,
    defaultPage: 1,
    aniSpeed: 0,
    beforeChange: function beforeChange() {},
    afterChange: function afterChange() {}
};
Carousel.childContextTypes = {
    /**
     * @property currentPage
     * @type PropTypes.number
     * @description 子组件通过context获取到currentPage，currentPage表示当前展示的page索引。
     */
    currentPage: _react.PropTypes.number,
    /**
     * @property pagesNum
     * @type PropTypes.number
     * @description 子组件通过context获取到pagesNum，pagesNum表示carousel组件children的数量。
     */
    pagesNum: _react.PropTypes.number
};

Carousel.CarouselItem = _carouselItem2.default;
Carousel.Item = _carouselItem2.default;

exports.default = Carousel;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(147);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 大型组件使用的抽象Model类，用于集中管理组件内部的逻辑和状态。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ComponentCore = function (_EventEmitter) {
    _inherits(ComponentCore, _EventEmitter);

    function ComponentCore(namespace) {
        _classCallCheck(this, ComponentCore);

        var _this = _possibleConstructorReturn(this, (ComponentCore.__proto__ || Object.getPrototypeOf(ComponentCore)).call(this));

        _this.instanceId = ++ComponentCore.instanceId;
        _this.namespace = namespace;
        return _this;
    }

    _createClass(ComponentCore, [{
        key: '_getEventName',
        value: function _getEventName(eventName) {
            return 'yo/component/' + this.namespace + '/' + eventName + '/' + this.instanceId;
        }
    }, {
        key: 'emitEvent',
        value: function emitEvent(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this.emit.apply(this, [this._getEventName(eventName)].concat(args));
            return this;
        }
    }, {
        key: 'registerEventHandler',
        value: function registerEventHandler(eventName, handler) {
            this.on(this._getEventName(eventName), handler.bind(this));
            return this;
        }
    }, {
        key: 'getAttr',
        value: function getAttr(item, attrKey) {
            return typeof item.get === 'function' ? item.get(attrKey) : item[attrKey];
        }
    }, {
        key: 'setAttr',
        value: function setAttr(item, attrKey, value) {
            var ret = null;
            if (typeof item.set === 'function') {
                ret = item.set(attrKey, value);
            } else {
                ret = Object.assign({}, item, _defineProperty({}, attrKey, value));
            }
            return ret;
        }
    }]);

    return ComponentCore;
}(_EventEmitter3.default);

ComponentCore.instanceId = -1;
exports.default = ComponentCore;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ComponentCore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Apply = Function.prototype.apply;
var privateMap = new WeakMap();

// For making private properties.
function internal(obj) {
  if (!privateMap.has(obj)) {
    privateMap.set(obj, {});
  }

  return privateMap.get(obj);
}

/** Class EventEmitter for event-driven architecture. */

var EventEmitter = function () {
  /**
   * Constructor.
   *
   * @constructor
   * @param {number|null} maxListeners.
   * @param {object} localConsole.
   *
   * Set private initial parameters:
   *   _events, _callbacks, _maxListeners, _console.
   *
   * @return {this}
   */
  function EventEmitter() {
    var maxListeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var localConsole = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console;

    _classCallCheck(this, EventEmitter);

    var self = internal(this);

    self._events = new Set();
    self._callbacks = {};
    self._console = localConsole;
    self._maxListeners = maxListeners === null ? null : parseInt(maxListeners, 10);

    return this;
  }

  /**
   * Add callback to the event.
   *
   * @param {string} eventName.
   * @param {function} callback
   * @param {object|null} context - In than context will be called callback.
   * @param {number} weight - Using for sorting callbacks calls.
   *
   * @return {this}
   */


  _createClass(EventEmitter, [{
    key: '_addCallback',
    value: function _addCallback(eventName, callback, context, weight) {
      this._getCallbacks(eventName).push({
        callback: callback,
        context: context,
        weight: weight
      });

      // Sort the array of callbacks in
      // the order of their call by "weight".
      this._getCallbacks(eventName).sort(function (a, b) {
        return a.weight > b.weight;
      });

      return this;
    }

    /**
     * Get all callback for the event.
     *
     * @param {string} eventName
     *
     * @return {object|undefined}
     */

  }, {
    key: '_getCallbacks',
    value: function _getCallbacks(eventName) {
      return internal(this)._callbacks[eventName];
    }

    /**
     * Get callback's index for the event.
     *
     * @param {string} eventName
     * @param {callback} callback
     *
     * @return {number|null}
     */

  }, {
    key: '_getCallbackIndex',
    value: function _getCallbackIndex(eventName, callback) {
      return this._has(eventName) ? this._getCallbacks(eventName).findIndex(function (element) {
        return element.callback === callback;
      }) : null;
    }

    /**
     * Check if we achive maximum of listeners for the event.
     *
     * @param {string} eventName
     *
     * @return {bool}
     */

  }, {
    key: '_achieveMaxListener',
    value: function _achieveMaxListener(eventName) {
      return internal(this)._maxListeners !== null && internal(this)._maxListeners <= this.listenersNumber(eventName);
    }

    /**
     * Check if callback is already exists for the event.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     *
     * @return {bool}
     */

  }, {
    key: '_callbackIsExists',
    value: function _callbackIsExists(eventName, callback, context) {
      var callbackInd = this._getCallbackIndex(eventName, callback);
      var activeCallback = callbackInd !== -1 ? this._getCallbacks(eventName)[callbackInd] : void 0;

      return callbackInd !== -1 && activeCallback && activeCallback.context === context;
    }

    /**
     * Check is the event was already added.
     *
     * @param {string} eventName
     *
     * @return {bool}
     */

  }, {
    key: '_has',
    value: function _has(eventName) {
      return internal(this)._events.has(eventName);
    }

    /**
     * Add the listener.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     * @param {number} weight - Using for sorting callbacks calls.
     *
     * @return {this}
     */

  }, {
    key: 'on',
    value: function on(eventName, callback) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      /* eslint no-unused-vars: 0 */
      var self = internal(this);

      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // If event wasn't added before - just add it
      // and define callbacks as an empty object.
      if (!this._has(eventName)) {
        self._events.add(eventName);
        self._callbacks[eventName] = [];
      } else {
        // Check if we reached maximum number of listeners.
        if (this._achieveMaxListener(eventName)) {
          self._console.warn('Max listeners (' + self._maxListeners + ')' + (' for event "' + eventName + '" is reached!'));
        }

        // Check if the same callback has already added.
        if (this._callbackIsExists.apply(this, arguments)) {
          self._console.warn('Event "' + eventName + '"' + (' already has the callback ' + callback + '.'));
        }
      }

      this._addCallback.apply(this, arguments);

      return this;
    }

    /**
     * Add the listener which will be executed only once.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     * @param {number} weight - Using for sorting callbacks calls.
     *
     * @return {this}
     */

  }, {
    key: 'once',
    value: function once(eventName, callback) {
      var _this = this;

      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var onceCallback = function onceCallback() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.off(eventName, onceCallback);
        return Apply.call(callback, context, args);
      };

      return this.on(eventName, onceCallback, context, weight);
    }

    /**
     * Remove an event at all or just remove selected callback from the event.
     *
     * @param {string} eventName
     * @param {function} callback
     *
     * @return {this}
     */

  }, {
    key: 'off',
    value: function off(eventName) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var self = internal(this);
      var callbackInd = void 0;

      if (this._has(eventName)) {
        if (callback === null) {
          // Remove the event.
          self._events.delete(eventName);
          // Remove all listeners.
          self._callbacks[eventName] = null;
        } else {
          callbackInd = this._getCallbackIndex(eventName, callback);

          if (callbackInd !== -1) {
            self._callbacks[eventName].splice(callbackInd, 1);
            // Remove all equal callbacks.
            this.off.apply(this, arguments);
          }
        }
      }

      return this;
    }

    /**
     * Trigger the event.
     *
     * @param {string} eventName
     * @param {...args} args - All arguments which should be passed into callbacks.
     *
     * @return {this}
     */

  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this._has(eventName)) {
        // All callbacks will be triggered sorter by "weight" parameter.
        this._getCallbacks(eventName).forEach(function (element) {
          return Apply.call(element.callback, element.context, args);
        });
      }

      return this;
    }

    /**
     * Clear all events and callback links.
     *
     * @return {this}
     */

  }, {
    key: 'clear',
    value: function clear() {
      var self = internal(this);

      self._events.clear();
      self._callbacks = {};

      return this;
    }

    /**
     * Returns number of listeners for the event.
     *
     * @param {string} eventName
     *
     * @return {number|null} - Number of listeners for event
     *                         or null if event isn't exists.
     */

  }, {
    key: 'listenersNumber',
    value: function listenersNumber(eventName) {
      return this._has(eventName) ? this._getCallbacks(eventName).length : null;
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "EventEmitter.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/

    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */

    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;

        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;

        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;

        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;

        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;

        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;

        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;

        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }

        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                        if (!event.propagationStopped) {
                            callback(event);
                        }
                    }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if (deviceIsIOS && target.type === 'file' || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/.test(target.className)
        );
    };

    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/.test(target.className)
                );
        }
    };

    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };

    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };

    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };

    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };

    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };

    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0],
            boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };

    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };

    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };

    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement,
            trackingClickStart,
            targetTagName,
            scrollParent,
            touch,
            targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if (this.lastClickTime) {
            if (event.timeStamp - this.lastClickTime < this.tapDelay) {
                this.cancelNextClick = true;
                return true;
            }
        }

        if (this.trackingClickStart) {
            if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
                return true;
            }
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            //if (!deviceIsIOS || targetTagName !== 'select') {
            //    this.targetElement = null;
            //    event.preventDefault();
            //}

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };

    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };

    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };

    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };

    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };

    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        //HACK by zongze.li add 757--759: hack for chrome version 30、37 in vivo x5 pro and HuaWei mate7, which still has 300ms delay with user-scalable=no
                        if (chromeVersion <= 38) {
                            return false;
                        }

                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick

                    //HACK by zongze.li change 31 into 38: hack for chrome version 30、37 in vivo x5 pro and HuaWei mate7, which still has 300ms delay with width=device-width

                    //origin: if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {

                    if (chromeVersion > 38 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };

    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };

    if ("function" === 'function' && _typeof(__webpack_require__(104)) === 'object' && __webpack_require__(104)) {

        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return FastClick;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
})();

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "fastclick.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = __webpack_require__(146);

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * List核心逻辑,负责管理List组件的内部状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ListCore = function (_ComponentCore) {
    _inherits(ListCore, _ComponentCore);

    /**
     * @param dataSource 数据源
     * @param offsetY 列表的初始Y偏移
     * @param infinite 是否是无穷列表
     * @param itemHeight 列表项高度
     * @param visibleSize 保留在列表容器中列表项的数组
     * @description 构造函数,会通过调用refresh方法进行初始化
     */
    function ListCore(_ref) {
        var dataSource = _ref.dataSource,
            _ref$offsetY = _ref.offsetY,
            offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
            _ref$infinite = _ref.infinite,
            infinite = _ref$infinite === undefined ? true : _ref$infinite,
            itemHeight = _ref.itemHeight,
            _ref$infiniteSize = _ref.infiniteSize,
            infiniteSize = _ref$infiniteSize === undefined ? 12 : _ref$infiniteSize,
            _ref$staticSectionHei = _ref.staticSectionHeight,
            staticSectionHeight = _ref$staticSectionHei === undefined ? 0 : _ref$staticSectionHei;

        _classCallCheck(this, ListCore);

        // 静态属性
        // 这些属性不会随着父组件render改变
        var _this = _possibleConstructorReturn(this, (ListCore.__proto__ || Object.getPrototypeOf(ListCore)).call(this, 'list'));

        _this.itemHeight = itemHeight;
        // 保存列表项定位信息的表,List组件不定高模式的核心数据结构
        _this.positionMap = {};
        // 在refresh中设置的属性可以通过父组件的render改变
        _this.refresh({
            dataSource: dataSource,
            refreshAll: false,
            infiniteSize: infiniteSize,
            staticSectionHeight: staticSectionHeight,
            offsetY: offsetY,
            infinite: infinite
        });
        return _this;
    }

    /**
     * @param ds
     * @param refreshAll
     * @param visibleSize
     * @param offsetY
     * @param infinite
     * @param startIndex
     * @returns {ListCore}
     * @description 设置实例属性, 在构造函数中被调用,也会在组件的componentWillReceiveProps回调中调用
     * 可以根据props初始化/重置组件的状态
     */


    _createClass(ListCore, [{
        key: 'refresh',
        value: function refresh(_ref2) {
            var _ref2$dataSource = _ref2.dataSource,
                dataSource = _ref2$dataSource === undefined ? this.dataSource : _ref2$dataSource,
                _ref2$refreshAll = _ref2.refreshAll,
                refreshAll = _ref2$refreshAll === undefined ? false : _ref2$refreshAll,
                _ref2$infiniteSize = _ref2.infiniteSize,
                infiniteSize = _ref2$infiniteSize === undefined ? this.visibleSize : _ref2$infiniteSize,
                _ref2$staticSectionHe = _ref2.staticSectionHeight,
                staticSectionHeight = _ref2$staticSectionHe === undefined ? this.staticSectionHeight : _ref2$staticSectionHe,
                _ref2$offsetY = _ref2.offsetY,
                offsetY = _ref2$offsetY === undefined ? this.offsetY : _ref2$offsetY,
                _ref2$infinite = _ref2.infinite,
                infinite = _ref2$infinite === undefined ? this.infinite : _ref2$infinite;

            if (!Array.isArray(dataSource)) {
                if (typeof dataSource.toArray === 'function') {
                    dataSource = dataSource.toArray();
                } else {
                    throw new Error('yo-list: dataSource必须为数组或者Immutable List!');
                }
            }

            if (!dataSource.length) {
                throw new Error('yo-list: dataSource不能为空数组!');
            }

            this.WINDOW_HEIGHT = window.screen.height;
            this.infinite = infinite;
            this.VISIBLE_SIZE = infiniteSize;
            this.dataSource = this.renderDataSource(dataSource, refreshAll);
            this.isHeightFixed = this.ifHeightFixed();
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            this.startIndex = this.refreshStartIndexByOffsetY(offsetY);
            this.visibleList = this.getVisibleList(offsetY);
            this.staticSectionHeight = staticSectionHeight;
            this.totalHeight = this.getTotalHeight();

            this.emitChange();

            return this;
        }

        /**
         * @param dataSource
         * @returns {boolean}
         * 判断数据源中的元素是否都被计算出(设置了)高度
         */

    }, {
        key: 'ifHeightFixed',
        value: function ifHeightFixed() {
            var _this2 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.every(function (item) {
                return !!_this2.getAttr(item.srcData, 'height');
            }) || !!this.itemHeight || !this.infinite;
        }

        /**
         * @returns {number}
         * 返回一个guid
         */

    }, {
        key: 'getGuid',
        value: function getGuid() {
            return ++ListCore.guid;
        }

        /**
         * @param offsetY
         * @returns {string}
         * 根据传入的offsetY计算出组件滚动的方向
         */

    }, {
        key: 'getDirection',
        value: function getDirection(offsetY) {
            return offsetY - this.offsetY >= 0 ? 'down' : 'up';
        }

        /**
         * @param offsetY
         * @returns {number}
         * 根据传入的offsetY计算startIndex,startIndex被用来计算visibleList(无穷模式中保留在容器中的列表项的数组)
         */

    }, {
        key: 'refreshStartIndexByOffsetY',
        value: function refreshStartIndexByOffsetY(y) {
            var offsetY = y - window.screen.height / 5;

            if (this.infinite && this.isHeightFixed) {
                for (var i = 0; i < this.dataSource.length; i++) {
                    var item = this.dataSource[i];
                    var itemPosData = this.getItemPositionData(item);
                    if (i === 0 && itemPosData.height > offsetY) {
                        return i;
                    } else if (i > 0) {
                        var prev = this.dataSource[i - 1];
                        var prevPosData = this.getItemPositionData(prev);
                        if (prevPosData._translateY < offsetY && prevPosData._translateY >= offsetY) {
                            return i;
                        }
                    }
                }
            } else if (this.infinite) {
                return this.startIndex ? this.startIndex : 0;
            }

            return 0;
        }

        /**
         * @param offsetY
         * @returns {ListCore}
         * 在列表滚动时,根据offsetY更新visibleList
         */

    }, {
        key: 'onScrollTo',
        value: function onScrollTo(offsetY, manually) {
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            if (manually) {
                this.startIndex = 0;
            }
            var cachedIndex = this.startIndex;
            if (this.infinite) {
                this.visibleList = this.getVisibleList(offsetY);
                // 只有当visibleList里面的内容真正发生变化的时候才触发onchange
                // 这样可以确保setState调用次数最少
                if (this.startIndex !== cachedIndex || this.startIndex === 0 && this.offsetY === 0 || manually) {
                    this.emitChange();
                }
            }

            return this;
        }
    }, {
        key: 'getItemPositionData',
        value: function getItemPositionData(item) {
            var key = this.getAttr(item, 'key');
            return item._type === 'groupTitle' ? item : this.positionMap[key];
        }
    }, {
        key: 'setItemPositionData',
        value: function setItemPositionData(item, attr) {
            // grouptitle做特殊处理,因为grouptitle是grouplist组件内部的数据对象,所以不会修改到源数据
            // 与此同时，grouplist需要获取到_translateY这些信息，因此也只能在原来的数据对象上修改
            if (item._type === 'groupTitle') {
                Object.assign(item, attr);
            } else if (this.positionMap[item.key]) {
                Object.assign(this.positionMap[item.key], attr);
            }
        }

        /**
         * @param ds
         * @param refreshAll
         * @returns {Array}
         * 处理数据源
         * 为每个元素的在pos表中的项添加_order(无穷模式下该列表项对应的槽的index),_resolved(是否已经计算出位置),_index(在数据源中的位置)
         * _translateY(无穷列表中元素的translateY)和_bottom(列表项的bottom)
         */

    }, {
        key: 'renderDataSource',
        value: function renderDataSource(ds) {
            var _this3 = this;

            var refreshAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return ds.map(function (ditem, i) {
                var key = _this3.getAttr(ditem, 'key');
                var renderedItem = {};

                if (key == null) {
                    if (_this3.infinite) {
                        throw new Error('infinite模式的列表数据源的每一项必须有key属性。');
                    } else {
                        key = _this3.getGuid();
                        if (process.env.NODE_ENV === 'dev') {
                            console.warn('Yo-List:列表项没有key属性,将自动添加自增的key。这会使得列表在更新时出现大量的不必要的dom操作，请为每一个列表项指定一个唯一的key。');
                        }
                    }
                }

                // 区分groupTitle和item，因为groupTitle是组件添加的，不会影响到源数据，所以可以直接在上面增加属性
                renderedItem = ditem._type !== 'groupTitle' ? {
                    // srcData指向源数据
                    srcData: ditem,
                    key: key,
                    _index: i,
                    _type: 'item'
                } : Object.assign(ditem, { srcData: ditem, _index: i }); // 这里给title增加了一个指向自己的指针srcData，这是为了兼容其他普通item的数据格式，而不是在使用它的地方做各种判断

                if (refreshAll) {
                    _this3.setItemPositionData(renderedItem, { _bottom: null, _translateY: null, _order: null });
                }

                var itemPosData = _this3.getItemPositionData(renderedItem);
                if (!itemPosData) {
                    itemPosData = _this3.positionMap[renderedItem.key] = {};
                }

                var itemHeight = _this3.getAttr(ditem, 'height');
                var noHeightIdentified = _this3.itemHeight == null && itemHeight == null && itemPosData.height == null;
                if (_this3.infinite) {
                    // 设置height,_order,_resolved和_index
                    // 如果这个item具有高度,则直接设为resolved
                    _this3.setItemPositionData(renderedItem, {
                        height: itemHeight || itemPosData.height || _this3.itemHeight,
                        _order: i % _this3.VISIBLE_SIZE,
                        _resolved: _this3.infinite && !noHeightIdentified,
                        _index: i
                    });
                    // 即使这个元素高度确定,之前一个高度为null,也无法算出translateY和bottom
                    // 此处再次验证之前一个元素是否为resolve
                    if (i > 0) {
                        var prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                        if (!prevItemPosData._resolved) {
                            _this3.setItemPositionData(renderedItem, { _resolved: false });
                        }
                    }
                    // 第一个item,直接设置_translateY为0
                    if (i === 0) {
                        _this3.setItemPositionData(renderedItem, { _translateY: 0 });
                    }
                    // 之后的所有item,如果有height,设置它们的_translateY为前一个元素的bottom
                    // 设置它们的bottom为_translateY+height
                    if (itemPosData._resolved && !itemPosData._bottom) {
                        var _translateY = i === 0 ? 0 : _this3.getItemPositionData(ds[i - 1])._bottom;
                        var _bottom = _translateY + itemPosData.height;
                        _this3.setItemPositionData(renderedItem, {
                            _translateY: _translateY,
                            _bottom: _bottom
                        });
                    } else if (!itemPosData._resolved) {
                        // 不定高的情况
                        if (i > 0) {
                            var _prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                            if (_prevItemPosData._bottom) {
                                _this3.setItemPositionData(renderedItem, { _translateY: _prevItemPosData._bottom });
                            }
                        }
                    }
                }

                return renderedItem;
            });
        }

        /**
         * @param i
         * @param borderY
         * @param dataSource
         * @returns {boolean}
         * 根据offsetY计算出刚好跨过offsetY的元素(top在y之上,bottom在y之下),或者是一个没有完成定位的元素
         */

    }, {
        key: 'isBorderItem',
        value: function isBorderItem(i, borderY) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var itemPosData = this.getItemPositionData(dataSource[i]);
            return itemPosData._resolved && itemPosData._bottom >= borderY && itemPosData._translateY <= borderY || !itemPosData._resolved;
        }

        /**
         * @param startY
         * @param startIndex
         * @param direction
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据当前滚动的方向和y计算出startIndex
         * 缓存了当前的startIndex,这样可以将查找的开销从O(n)降低到O(1),在处理大列表的时候可以提升性能
         */

    }, {
        key: 'getStartItemIndex',
        value: function getStartItemIndex(startY) {
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.startIndex;
            var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.direction;
            var dataSource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.VISIBLE_SIZE;

            var len = dataSource.length;
            var startIndex = sIndex;
            // 从保存的startIndex开始循环,根据当前滚动的方向的不同,i相应增加/减少
            // 这样可以将查找的时间复杂度从线性降低到常量
            if (direction === 'down' || startIndex === 0) {
                for (var i = startIndex; i < len; i++) {
                    if (this.isBorderItem(i, startY)) {
                        startIndex = i;
                        break;
                    }
                }
            } else {
                for (var _i = startIndex; _i >= 0; _i--) {
                    if (this.isBorderItem(_i, startY)) {
                        startIndex = _i;
                        break;
                    }
                }
            }

            if (startIndex > dataSource.length - VISIBLE_SIZE) {
                startIndex = dataSource.length - VISIBLE_SIZE > 0 ? dataSource.length - VISIBLE_SIZE : 0;
            }

            return startIndex;
        }

        /**
         * @param startIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据startIndex算出endIndex
         */

    }, {
        key: 'getEndItemIndex',
        value: function getEndItemIndex(startIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.VISIBLE_SIZE;

            return startIndex + VISIBLE_SIZE > dataSource.length ? dataSource.length : startIndex + VISIBLE_SIZE;
        }

        /**
         * @param offsetY
         * @param sIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Array}
         * 根据offsetY算出visibleList
         */

    }, {
        key: 'getVisibleList',
        value: function getVisibleList() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.offsetY;
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            offsetY = offsetY - this.staticSectionHeight;
            var ret = null;

            if (this.infinite) {
                var startY = offsetY - this.WINDOW_HEIGHT / 5;
                startY = startY > 0 ? startY : 0;
                var startIndex = sIndex === null ? this.getStartItemIndex(startY) : sIndex,
                    endIndex = this.getEndItemIndex(startIndex);

                ret = [];
                for (var i = startIndex; i < endIndex; i++) {
                    var item = this.dataSource[i];
                    ret.push(_extends({}, item, this.getItemPositionData(item)));
                }
                this.startIndex = startIndex;
            } else {
                ret = dataSource.slice();
            }

            return ret;
        }

        /**
         * @param dataSource
         * @returns {Object}
         * 获取数据源中第一个还没有resolve的元素
         */

    }, {
        key: 'getFirstNotResolvedItemIndex',
        value: function getFirstNotResolvedItemIndex() {
            var _this4 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.findIndex(function (ditem, i) {
                if (i > 0) {
                    var itemPosData = _this4.getItemPositionData(ditem);
                    var prevItemPosData = _this4.getItemPositionData(dataSource[i - 1]);
                    return !itemPosData._resolved && prevItemPosData._resolved;
                }
                return false;
            });
        }

        /**
         * @param key
         * @param dataSource
         * @returns {Number}
         * 根据key返回一个数据源中的元素
         */

    }, {
        key: 'getItemIndexByKey',
        value: function getItemIndexByKey(key) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            return dataSource.findIndex(function (item) {
                return item.key === key;
            });
        }

        /**
         * @param notResolvedItemIndex
         * @param dataSource
         * 更新一个未定位元素的_translateY,它是前一个元素的_bottom
         */

    }, {
        key: 'updateTranslateY',
        value: function updateTranslateY(notResolvedItemIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            var notResolvedItem = dataSource[notResolvedItemIndex];

            if (notResolvedItem) {
                var prevItemIndex = notResolvedItemIndex - 1;
                var prevItem = dataSource[prevItemIndex];
                var prevItemPosData = this.getItemPositionData(prevItem);

                if (prevItemPosData && prevItemPosData._resolved) {
                    this.setItemPositionData(notResolvedItem, { _translateY: prevItemPosData._bottom });
                    // 同时也需要更新visibleList里面对应item的定位信息
                    var visibleListItemToBeUpdated = this.visibleList.find(function (item) {
                        return item.key === notResolvedItem.key;
                    });
                    if (visibleListItemToBeUpdated) {
                        Object.assign(visibleListItemToBeUpdated, this.getItemPositionData(notResolvedItem));
                    }
                }
            }
        }

        /**
         * @param key
         * @param height
         * @param dataSource
         * @returns {ListCore}
         * 不定高模式的核心逻辑,定位一个尚未定位的列表项
         * 在列表项的componentDidUpdate和Mount中被调用,传入已经渲染好的列表项的dom高度,然后更新数据源中对应元素的高度并计算它的定位
         * 在该元素完成定位后,渲染下一个未被定位的列表项,并重复以上逻辑,直到visibleList中所有的项都完成定位
         */

    }, {
        key: 'resolveItem',
        value: function resolveItem(key, height) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var targetIndex = this.getItemIndexByKey(key);
            var targetItem = this.dataSource[targetIndex];
            var _translateY = void 0;

            if (targetIndex > 0) {
                var prevItemPosData = this.getItemPositionData(dataSource[targetIndex - 1]);
                _translateY = prevItemPosData._bottom;
            } else {
                _translateY = 0;
            }

            if (_translateY != null) {
                var _bottom = _translateY + height;
                var _resolved = true;
                this.setItemPositionData(targetItem, { _translateY: _translateY, _bottom: _bottom, _resolved: _resolved, height: height });
                this.visibleList = this.getVisibleList();
                this.totalHeight += height;
                this.updateTranslateY(this.getFirstNotResolvedItemIndex());
                this.emitChange();
            }

            return this;
        }

        /**
         * @param dataSource
         * @returns {Array}
         * 计算列表中所有项的高度,用来refresh Scroller
         */

    }, {
        key: 'getTotalHeight',
        value: function getTotalHeight() {
            var _this5 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.reduce(function (acc, item) {
                var ret = acc;
                var itemPosData = _this5.getItemPositionData(item);
                ret += itemPosData._resolved ? itemPosData.height : 0;
                return ret;
            }, 0) + this.staticSectionHeight;
        }

        /**
         * @returns {ListCore}
         * 触发组件change事件,组件收到change事件后会执行setState
         */

    }, {
        key: 'emitChange',
        value: function emitChange() {
            this.emitEvent('change', this.visibleList, this.totalHeight);
            return this;
        }
    }]);

    return ListCore;
}(_ComponentCore3.default);

ListCore.guid = -1;
exports.default = ListCore;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ListCore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(49);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

var _src = __webpack_require__(158);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 列表项组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var _class = function (_Component) {
    _inherits(_class, _Component);

    /**
     * key和translateY在shouldComponentUpdate中会被使用
     * 将会根据nextProps.item中对应的值,来决定是否render
     * @param props
     */
    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.key = props.item.key;
        _this.translateY = props.item._translateY;
        return _this;
    }

    _createClass(_class, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { offsetY: this.props.item._translateY, itemRef: this };
        }

        /**
         * 不定高的核心逻辑,在dom rendered以后更新对应列表项的定位信息,并渲染出下一个未经定位的列表项,直到填满visibleList的size
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var isHeightFixed = this.props.listModel.isHeightFixed;
            // 不定高无穷列表的容器是flex-box的话, 浏览器会先渲染dom然后调整高度, 这时候取到的高度不准
            // setTimeout是无奈之举，确实没有想到更好的办法，因为这个调整高度的时机用js根本无法准确获取

            if (isHeightFixed) {
                this.updateItemHeightWhenDomRendered();
            } else {
                this.domNode.style.visibility = 'hidden';
                setTimeout(function () {
                    _this2.updateItemHeightWhenDomRendered();
                    _this2.domNode.style.visibility = 'visible';
                }, _util.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
            }
        }

        /**
         * 根据之前的key和_translateY和接收到的props.item中的对应值,决定是否render
         * 使用者定义的shouldItemUpdate可以接收到shouldComponentUpdate的结果,并返回一个新的结果
         * @param nextProps
         * @returns {Bool}
         */

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var listModel = nextProps.listModel,
                shouldItemUpdate = nextProps.shouldItemUpdate;

            var ret = true;
            // 当容器内部item的key和translateY发生变化时重新render
            if (listModel.infinite && this.key === nextProps.item.key && this.translateY === nextProps.item._translateY) {
                ret = false;
            }

            this.key = nextProps.item.key;
            this.translateY = nextProps.item._translateY;

            if (shouldItemUpdate && !ret) {
                return shouldItemUpdate(nextProps.item.srcData, this.props.item.srcData);
            }
            return ret;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateItemHeightWhenDomRendered();
        }

        /**
         * 不定高模式的无穷列表需要在列表项渲染后更新它的位置信息
         */

    }, {
        key: 'updateItemHeightWhenDomRendered',
        value: function updateItemHeightWhenDomRendered() {
            var _props = this.props,
                item = _props.item,
                listModel = _props.listModel,
                onListItemUpdate = _props.onListItemUpdate;


            if (!item._resolved && item._translateY !== undefined && listModel.infinite && !listModel.isHeightFixed) {
                listModel.resolveItem(item.key, this.domNode.offsetHeight);
            }

            onListItemUpdate(item.srcData, this.domNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                renderItem = _props2.renderItem,
                item = _props2.item,
                onItemTap = _props2.onItemTap,
                listModel = _props2.listModel,
                itemTouchClass = _props2.itemTouchClass,
                itemExtraClass = _props2.itemExtraClass,
                onItemTouchStart = _props2.onItemTouchStart;

            var transform = 'translate(0,' + item._translateY + 'px) translateZ(0px)';
            var infiniteStyle = {
                WebkitTransform: transform,
                transform: transform,
                height: item.height,
                position: 'absolute',
                top: 0
            };
            var basicProps = {
                ref: function ref(dom) {
                    _this3.domNode = dom;
                },
                style: listModel.infinite ? infiniteStyle : null
            };
            var additionalProps = {
                className: (0, _classnames2.default)(itemExtraClass(item.srcData, item._index), item._type !== 'groupTitle' ? 'item' : 'group-title label')
            };

            return _react2.default.createElement(
                _src2.default,
                {
                    internalUse: true,
                    onTap: onItemTap,
                    touchClass: itemTouchClass(item.srcData, item._index),
                    onTouchStart: function onTouchStart(evt) {
                        onItemTouchStart(item.srcData, item._index, evt);
                    }
                },
                _react2.default.createElement(
                    'li',
                    Object.assign({}, basicProps, additionalProps),
                    renderItem(item.srcData, item._index)
                )
            );
        }
    }]);

    return _class;
}(_react.Component);

_class.propTypes = {
    item: _react.PropTypes.object,
    listModel: _react.PropTypes.object,
    itemTouchClass: _react.PropTypes.func,
    itemExtraClass: _react.PropTypes.func,
    scroller: _react.PropTypes.object,
    onItemTouchStart: _react.PropTypes.func,
    renderItem: _react.PropTypes.func,
    onItemTap: _react.PropTypes.func,
    onListItemUpdate: _react.PropTypes.func
};
_class.childContextTypes = {
    offsetY: _react.PropTypes.number,
    itemRef: _react.PropTypes.object
};
_class.defaultProps = {
    onListItemUpdate: function onListItemUpdate() {}
};
exports.default = _class;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ListItem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListCore = __webpack_require__(149);

var _ListCore2 = _interopRequireDefault(_ListCore);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(154);

var _src2 = _interopRequireDefault(_src);

var _ListItem = __webpack_require__(150);

var _ListItem2 = _interopRequireDefault(_ListItem);

var _lazyimage = __webpack_require__(97);

var _lazyimage2 = _interopRequireDefault(_lazyimage);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(49);

__webpack_require__(96);

__webpack_require__(175);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component List
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 列表组件，继承了Scroller的特性，有下拉刷新和加载更多功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 除此之外，List优化了长列表的性能，在数据源较大时能够提升滚动的性能并避免内存溢出。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用列表组件实现的组件：GroupList、Calendar、SwipeMenuList。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 特别感谢大明哥(leeds.li)和她的不定高无穷列表的实现思路。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/list.md}{instruUrl: list/infinite_mode_with_height.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/example.md}{instruUrl: list/base.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/modify_height.md}{instruUrl: list/modify_height.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/static_section.md}{instruUrl: list/static_section.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    infinite: false,
    offsetY: 0,
    infiniteSize: 12,
    itemTouchClass: 'item-touch',
    onScroll: function onScroll() {},
    onInfiniteAppend: function onInfiniteAppend() {},
    renderItem: function renderItem(item) {
        return typeof item.get === 'function' ? item.get('text') : item.text;
    },

    extraClass: '',
    containerExtraClass: '',
    groupTitleExtraClass: '',
    usePullRefresh: false,
    onRefresh: function onRefresh() {},

    useLoadMore: false,
    onLoad: function onLoad() {},
    onItemTap: function onItemTap() {},

    shouldItemUpdate: null,
    itemExtraClass: function itemExtraClass() {
        return '';
    },
    onItemTouchStart: function onItemTouchStart() {},

    disabled: false,
    directionLockThreshold: 50,
    style: null,
    scrollWithoutTouchStart: true,
    staticSection: null,
    staticSectionHeight: null,
    deceleration: 0.0015,
    stickyOffset: 0
};

var propTypes = {
    /**
     * @property dataSource
     * @type Array/Immutable List
     * @default none
     * @description 组件的数据源，数组或者Immutable List类型，内部元素必须是对象或者Immutable Map。
     * 如果需要给无穷列表的项定高度，可以给元素添加height属性(数字类型)，
     * 也可以通过itemHeight属性统一设置列表项的高度(见itemHeight属性的描述)，
     * 如果列表元素有text属性且没有传入renderItem，会直接以text的值作为listitem的内容渲染。
     */
    dataSource: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape({
        height: _react.PropTypes.number,
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        key: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    })), _react.PropTypes.object]).isRequired,
    /**
     * @property renderItem
     * @type Function
     * @default (item)=>item.text
     * @description 定制如何根据列表项数据对象渲染列表项的函数，接收参数item(数据对象)和index(在数据源中的index)，返回一个JSX。
     * 如果传入字符串，则会应用于所有列表项。
     *
     * 例子:`` renderItem={(item)=><p>{item.someAttr}</p>} ``
     */
    renderItem: _react.PropTypes.func,
    /**
     * @property onItemTap
     * @type Function
     * @default null
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * @param {DOMElement} target 当前tap事件的target
     * @description 点击列表项时的事件回调，接收三个参数item(列表项对应的数据对象)，index(列表项在数据源中的index)以及target(当前事件的event.target)，
     *
     * List实现了独特的手势系统以达到iOS列表的手势效果，任何情况下都应该使用这个属性为ListItem绑定事件，而不是给ListItem中的节点绑定onTouchTap事件。
     */
    onItemTap: _react.PropTypes.func,
    /**
     * @property infinite
     * @type Bool
     * @default false
     * @description 是否使用无穷列表模式。
     *
     * 开启无穷列表模式后，列表中只会保留infiniteSize个节点，并随着滚动复用这些节点，以此来优化大列表的性能，但是滚动过程中会有性能损耗。
     * 如果你的列表项数量不大(比如只有几十个)，请不要开启无穷模式。
     */
    infinite: _react.PropTypes.bool,
    /**
     * @property infiniteSize
     * @type Number
     * @default 12
     * @description 无穷列表模式下，保留在列表容器中列表项的个数(参见无穷列表模式的说明).
     *
     * 注意:这个值应该随着列表容器的高度和列表项高度选取一个合适的值，否则可能出现列表容器底部出现空白的情况。
     * 如果这个值设置的过大，会降低列表的滚动性能，因此请根据实际情况(List容器的高度和列表项的高度)灵活配置。
     */
    infiniteSize: _react.PropTypes.number,
    /**
     * @property itemHeight
     * @type Number
     * @default null
     * @description 无穷列表中列表项的高度。
     *
     * 如果数据源中的对象没有height属性，也没有设置itemHeight，则会使用不定高的无穷列表模式。
     * 在不定高模式下，每个项的高度会在渲染进容器以后确定，因此比定高模式多一次offsetHeight的查询，性能会差一些。
     */
    itemHeight: _react.PropTypes.number,
    /**
     * @property offsetY
     * @type Number
     * @default 0
     * @description 组件的初始位置的Y坐标。
     */
    offsetY: _react.PropTypes.number,
    /**
     * @property itemExtraClass
     * @type String/Function
     * @default "item item-wrap"
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * 可以接受字符串形式。例如"custom-list-item"（会自动应用在所有列表项容器上）
     * 或者一个函数，这个函数接受参数item（列表项对应的dataSource中的数据对象），index（数据源index）
     *
     * 例:(item)=>{return item.customClassName}/'custom-item-classname'。
     * @description 给列表项容器元素添加的class
     */
    itemExtraClass: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    /**
     * @skip
     * 给grouptitle定制的属性,不会向外暴露。
     */
    groupTitleExtraClass: _react.PropTypes.string,
    /**
     * @property itemTouchClass
     * @type String/Function
     * @default item-touch
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * @description 列表项被点击时的className，可以接收字符串或者函数，使用方式与itemExtraClass一致。
     */
    itemTouchClass: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    /**
     * @property onScroll
     * @type Function
     * @default null
     * @param {Number} y 当前列表的y轴偏移
     * @param {Enum {'up','down'}} direction 列表滚动的方向,向上('up')或者向下('down')
     * @description 绑定给list内部scroller的onScroll回调,在列表滚动时触发。
     */
    onScroll: _react.PropTypes.func,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 给List容器节点绑定的额外样式。
     * @version 3.0.2
     */
    style: _react.PropTypes.object,
    /**
     * @property onInfiniteAppend
     * @type Function
     * @default null
     * @param {Array} visibleList 当前渲染在列表容器中的数据项数组
     * @description 无穷列表中列表项update时触发的事件回调，接收参数visibleList(数组)，为目前渲染在列表容器中的数据项。
     */
    onInfiniteAppend: _react.PropTypes.func,
    /**
     * @property staticSection
     * @type Element
     * @default null
     * @version 3.0.3
     * @description 在所有列表项之上渲染的一块静态区域，在开启Infinite模式时，这块区域不会参与列表项的回收复用。
     */
    staticSection: _react.PropTypes.element,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 组件容器元素的额外className。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property containerExtraClass
     * @type String
     * @default null
     * @description 列表容器元素额外的className(对应ul.yo-list节点)。
     */
    containerExtraClass: _react.PropTypes.string,
    /**
     * @property usePullRefresh
     * @type Bool
     * @default false
     * @description 是否使用下拉刷新，见Scroller同名属性。
     */
    usePullRefresh: _react.PropTypes.bool,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type Number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）。
     * @default 40
     */
    pullRefreshHeight: _react.PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type Function
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数。
     */
    renderPullRefresh: _react.PropTypes.func,
    /**
     * @property onRefresh
     * @type Function
     * @param {Array} dataSource 当前的数据源
     * @default null
     * @description 下拉刷新触发的事件回调。
     */
    onRefresh: _react.PropTypes.func,
    /**
     * @property useLoadMore
     * @type Bool
     * @default false
     * @description 是否开启加载更多，见Scroller同名属性。
     */
    useLoadMore: _react.PropTypes.bool,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type Number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）。
     * @default 40
     */
    loadMoreHeight: _react.PropTypes.number,
    /**
     * 加载更多渲染函数
     *
     * @property renderLoadMore
     * @type Function
     * @returns {JSX} 用来渲染 loadMore 的 JSX
     * @description () => JSX
     *
     * 自定义的加载更多渲染函数。
     */
    renderLoadMore: _react.PropTypes.func,
    /**
     * @property onLoad
     * @type Function
     * @param {Array} dataSource 当前数据源
     * @default null
     * @description 加载更多时触发的事件回调。
     */
    onLoad: _react.PropTypes.func,
    /**
     * @property shouldItemUpdate
     * @type Function
     * @default null
     * @param {Object} next 即将传给列表项组件的item对象
     * @param {Object} now 当前列表项组件对应的item对象
     * @description 绑定给列表项组件的shouldComponentUpdate，可以避免额外的render，用于提升列表的滚动性能。
     *
     * 实验表明，组件的render开销对于某些老式手机(例如三星Note2)是不能忽视的，因此list默认为所有的列表项组件配置了shouldComponentUpdate，会根据
     * item的_guid属性(List组件自己做的，不需要使用者传入)做比较决定是否需要render，这样可以最小化render的次数。有些情况下，这种比较方式会阻止使用者期待触发的render，导致组件更新行为违反了使用者的意愿，这时候需要通过设置shouldItemUpdate属性改变默认的shouldComponentUpdate的返回值
     *
     * shouldItemUpdate能够接受两个参数，next(ListItem组件的下一个props中的item属性)，
     * now(ListItem当前的props的item属性)。它必须返回一个布尔值，false则会跳过render，true会继续执行render(与shouldComponentUpdate返回值的含义相同)。
     */
    shouldItemUpdate: _react.PropTypes.func,
    /**
     * @property disabled
     * @type Bool
     * @default false
     * @description 是否禁止滚动，参见Scroller的同名属性。
     */
    disabled: _react.PropTypes.bool,
    /**
     * @property stickyOffset
     * @type Number
     * @default 0
     * @description 给staticSection内部吸顶容器设置的y轴偏移。
     * @version 3.0.6
     */
    stickyOffset: _react.PropTypes.number,
    /**
     * @skip
     * @property onItemTouchStart
     * 专门给SwipeMenuList使用的属性，不向外暴露
     */
    onItemTouchStart: _react.PropTypes.func,
    onListItemUpdate: _react.PropTypes.func,
    /**
     * 方向锁定阈值
     *
     * @property directionLockThreshold
     * @type Number
     * @description 只允许单向滚动的时候，会根据这个阈值来判定响应哪个方向上的位移：某一方向位移减去另一个方向位移超过阈值，就会判定为这个方向的滚动。
     * @default 5
     * @version 3.0.2
     */
    directionLockThreshold: _react.PropTypes.number,
    /**
     * @property deceleration
     * @type Number
     * @description 滚动视图开始惯性滚动时减速的加速度，默认为0.001。
     * @version 3.0.6
     */
    deceleration: _react.PropTypes.number,
    /**
     * @property scrollWithoutTouchStart
     * @type Bool
     * @default false
     * @description ** 实验中的属性 **
     * 在默认情况下一次用户触发（非调用scrollTo方法）scroller的滚动需要由touchstart事件来启动，在某些情况下，例如scroller从disable状态切换到enable状态时，
     * 可能不能接收到这一瞬间的touchstart事件，这可能导致用户期待的滚动过程没有发生。
     * 开启这个属性为true以后将允许scroller用touchmove启动滚动过程，这可以解决上述场景的问题。
     * @version 3.0.2
     */
    scrollWithoutTouchStart: _react.PropTypes.bool
};

var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        var dataSource = props.dataSource,
            offsetY = props.offsetY,
            itemHeight = props.itemHeight,
            infinite = props.infinite,
            infiniteSize = props.infiniteSize;


        _this.childLazyImages = [];
        _this.staticSectionContaienr = null;
        _this.listModel = new _ListCore2.default({
            dataSource: dataSource,
            offsetY: offsetY,
            infinite: infinite,
            itemHeight: itemHeight,
            infiniteSize: infiniteSize
        });
        _this.state = {
            visibleList: _this.listModel.visibleList,
            totalHeight: _this.listModel.totalHeight
        };
        return _this;
    }

    _createClass(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { list: this, infinite: this.listModel.infinite };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.listModel.registerEventHandler('change', function (visibleList, totalHeight) {
                _this2.setState({ visibleList: visibleList, totalHeight: totalHeight });
                _this2.props.onInfiniteAppend(visibleList, totalHeight);
            }).registerEventHandler('scrollTo', function (offsetY, time, easing) {
                if (_this2.scroller) {
                    _this2.scroller.scrollTo(0, offsetY, time, easing);
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            // 在不定高模式下,需要等待所有列表项完成定位才能刷新scroller, didmount的时候虽然dom已经渲染完成
            // 但是所有列表项做定位尚未完成
            setTimeout(function () {
                // 一定要优先刷新staticSectionHeight，否则下面的一系列操作都可能出现不准确的情况
                _this3.refreshStaticSectionHeight();
                if (_this3.scroller) {
                    // 用来标记列表是否在滚动,和手势有关,在gesture.js中可以查到这个属性是如何被使用的
                    _this3.scroller.isScrolling = false;
                }
                // 刷新scroller,因为infinite不定高模式的totalHeight要等到item渲染完毕才能计算出来
                if (_this3.listModel.infinite && _this3.scroller) {
                    _this3.scroller.refresh({ scrollerHeight: _this3.listModel.totalHeight }, true);
                }
                // 如果设置了offsetY,滚动到offsetY
                var offsetY = _this3.props.offsetY;

                if (offsetY !== 0) {
                    _this3.scrollTo(offsetY, 0);
                }
                // 刷新lazyload图片,不然头几个item的懒加载图片都不会加载
                // 加setTimeout是为了处理不定高的场景,因为不定高的列表会先把列表项渲染进容器然后再去做定位
                // 所以didmount时间触发的时候,列表项还没有完成定位
                _this3.tryLoadLazyImages(offsetY);
            }, this.listModel.isHeightFixed ? 0 : _util.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
        }

        /**
         * @param nextProps
         * dataSource,infiniteSize是根据初始值计算出来的状态,在这里需要进行reset
         * 其他属性不需要reset
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this4 = this;

            var dataSource = nextProps.dataSource,
                infiniteSize = nextProps.infiniteSize,
                offsetY = nextProps.offsetY;

            this.listModel.refresh({
                dataSource: dataSource,
                refreshAll: true,
                infiniteSize: infiniteSize
            });

            // 等待dom更新结束后再做以下操作
            setTimeout(function () {
                if (_this4.props.offsetY !== offsetY) {
                    _this4.scrollTo(offsetY, 0);
                }
                _this4.refreshStaticSectionHeight();
                _this4.tryLoadLazyImages(_this4.listModel.offsetY);
                // 当offsetY位于可滚动范围之外时自动调整
                if (_this4.scroller && -_this4.scroller.maxScrollY < _this4.listModel.offsetY) {
                    _this4.scrollTo(_this4.scroller.maxScrollY, 300);
                }
            }, 0);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // infinite模式的lazyload不需要再didupdate时刷新
            // 因为infinite的节点是复用的,而随着滚动会不定的render,因此会触发大量的didupdate,浪费性能
            // 所以可以在receiveprops时做刷新,因为节点复用的缘故,不需要等待dom render
            if (!this.listModel.infinite) {
                this.tryLoadLazyImages(this.listModel.offsetY);
            }
            // infinite模式下，刷新列表的总高度
            if (this.scroller && this.listModel.infinite) {
                this.scroller.refresh({ scrollerHeight: this.state.totalHeight }, true);
            }
        }

        /**
         * 绑定给Scoller的ScrollEnd事件回调
         */

    }, {
        key: 'onScrollEnd',
        value: function onScrollEnd() {
            // 滚动停止后重置isScrolling标志
            this.scroller.isScrolling = false;
        }

        /**
         * @param offsetY
         * @param manually
         * 随着Scroller的滚动更新visibleList
         */

    }, {
        key: 'onScroll',
        value: function onScroll(offsetY, manually) {
            if (this.scroller && offsetY !== this.listModel.offsetY) {
                if (!manually) {
                    this.scroller.isScrolling = true;
                }
                this.listModel.onScrollTo(offsetY, manually);
                this.props.onScroll(-offsetY, this.listModel.direction);
                this.tryLoadLazyImages(offsetY);
            }
        }

        /**
         * @skip
         * @method refreshStaticSectionHeight
         * @description 获取staticSectionHeight，然后更新列表的总高度
         */

    }, {
        key: 'refreshStaticSectionHeight',
        value: function refreshStaticSectionHeight() {
            if (this.staticSectionContaienr != null) {
                this.listModel.staticSectionHeight = this.staticSectionContaienr.offsetHeight;
                this.listModel.totalHeight = this.listModel.getTotalHeight();
                // 获取到最新的totalHeight之后需要刷新一下
                if (this.scroller && this.listModel.infinite) {
                    this.scroller.refresh({ scrollerHeight: this.listModel.totalHeight }, true);
                }
            }
        }

        /**
         * @method refresh
         * @description 刷新列表,应该在列表容器高度发生改变时调用
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            this.scroller.refresh({ scrollerHeight: this.state.totalHeight });
        }

        /**
         * @method stopRefreshing
         * @param {Bool} [successed]  下拉刷新是否成功,默认为false
         * @description 中止下拉刷新过程。在列表发生下拉刷新之后你应该调用这个方法去中止它(比如服务器响应已经返回的时候),否则刷新不会自动终止。
         */

    }, {
        key: 'stopRefreshing',
        value: function stopRefreshing(successed) {
            if (this.scroller) {
                this.scroller.stopRefreshing(successed);
            }
        }

        /**
         * @method stopLoading
         * @param {Bool} [successed]  加载更多是否成功,默认为false
         * @description 中止加载更多过程,使用方式和场景与stopRefreshing一致。
         */

    }, {
        key: 'stopLoading',
        value: function stopLoading(successed) {
            if (this.scroller) {
                this.scroller.stopLoading(successed);
            }
        }

        /**
         * @method startRefreshing
         * @description 模拟下拉刷新,调用这个方法后,会立刻停止当前的滚动并回到列表顶部,然后开始下拉刷新过程。
         *
         * 注意:你仍然需要手动调用stopRefreshing方法
         */

    }, {
        key: 'startRefreshing',
        value: function startRefreshing() {
            if (this.scroller.isScrolling) {
                this.scroller.stopAnimate();
                this.scroller.isScrolling = false;
            }

            if (this.listModel.infinite) {
                this.scroller.startRefreshing(0);
                this.onScroll(0, true);
            } else {
                this.scroller.startRefreshing();
            }
        }

        /**
         * 尝试加载处于可视区域内的lazyimage
         * @param y
         */

    }, {
        key: 'tryLoadLazyImages',
        value: function tryLoadLazyImages(y) {
            var _this5 = this;

            y = y - this.listModel.staticSectionHeight;
            if (this.childLazyImages.length && this.scroller) {
                this.childLazyImages.forEach(function (child) {
                    var containerBottomY = y + _this5.scroller.wrapperHeight;
                    if (_this5.listModel.infinite) {
                        if (containerBottomY > child.itemRef.translateY) {
                            child.load();
                        }
                    } else if (child.loading !== 2) {
                        var listItemDom = child.itemRef.domNode;
                        var offsetTop = listItemDom.offsetTop;
                        if (listItemDom && containerBottomY > offsetTop) {
                            child.load();
                        }
                    }
                });
            }
        }

        /**
         * @method scrollTo
         * @param {Number} y 要滚动到的目标y坐标
         * @param {Number} [time] 动画时间,默认为0。
         * (在开启了无穷模式的情况下,为了提高滚动的性能,不管time传入什么值都会被重设为0.因为快速滚过很长的距离在无穷模式下会带来巨大的性能损耗)
         * @description 让List滚动到某个位置
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.scroller) {
                // 考虑到infinite的渲染机制,滚动一个过长的距离会触发大量的dom更新,性能会很差
                // 因此当当前offetY大于一定数值时就将time设为0,2000是个magic number,凭感觉设的
                var aniDuration = this.listModel.infinite ? 0 : time;
                this.scroller.scrollTo(0, offsetY, aniDuration);
                this.onScroll(-offsetY, true);
            }
        }

        /**
         * @method stopAnimate
         * @description 立刻停止滚动。
         */

    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            if (this.scroller) {
                this.scroller.stopAnimate();
            }
        }

        /**
         * @param item
         * @param i
         * @returns {JSX}
         * 渲染列表项容器
         */

    }, {
        key: 'renderItemWrap',
        value: function renderItemWrap(item, i) {
            var _props = this.props,
                _onItemTap = _props.onItemTap,
                renderItem = _props.renderItem,
                onListItemUpdate = _props.onListItemUpdate,
                groupTitleExtraClass = _props.groupTitleExtraClass,
                shouldItemUpdate = _props.shouldItemUpdate,
                onItemTouchStart = _props.onItemTouchStart;
            var _props2 = this.props,
                itemTouchClass = _props2.itemTouchClass,
                itemExtraClass = _props2.itemExtraClass;

            var realActiveClass = itemTouchClass,
                realExtraClass = itemExtraClass;
            // 由于itemExtraClass可以传入string或者函数,这里统一为函数
            // 做法是将string转换成一个返回该string的id函数
            if (typeof itemExtraClass === 'string' || itemExtraClass === null) {
                realExtraClass = function realExtraClass() {
                    return itemExtraClass;
                };
            }
            // the same
            if (typeof itemTouchClass === 'string' || itemTouchClass === null) {
                realActiveClass = function realActiveClass() {
                    return itemTouchClass;
                };
            }

            return _react2.default.createElement(_ListItem2.default, {
                parent: this,
                itemTouchClass: realActiveClass,
                key: this.listModel.infinite ? i : item.key,
                renderItem: renderItem,
                onItemTap: function onItemTap(target) {
                    _onItemTap(item.srcData, item._index, target);
                },
                shouldItemUpdate: shouldItemUpdate,
                onItemTouchStart: onItemTouchStart,
                item: item,
                itemExtraClass: realExtraClass,
                groupTitleExtraClass: groupTitleExtraClass,
                listModel: this.listModel,
                onListItemUpdate: onListItemUpdate
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _props3 = this.props,
                containerExtraClass = _props3.containerExtraClass,
                infiniteSize = _props3.infiniteSize,
                _onRefresh = _props3.onRefresh,
                _onLoad = _props3.onLoad;
            var infinite = this.listModel.infinite;

            var containerClass = (0, _classnames2.default)('yo-list', containerExtraClass, infinite ? 'yo-list-infinite' : '');
            var visibleList = this.state.visibleList;


            return _react2.default.createElement(
                _src2.default,
                _extends({}, (0, _util.inheritProps)(this.props, ['scrollWithoutTouchStart', 'style', 'directionLockThreshold', 'disabled', 'extraClass', 'pullRefreshHeight', 'renderPullRefresh', 'loadMoreHeight', 'renderLoadMore', 'useLoadMore', 'usePullRefresh', 'deceleration', 'stickyOffset']), {
                    tap: true,
                    autoRefresh: !infinite,
                    ref: function ref(scroller) {
                        if (scroller) {
                            _this6.scroller = scroller;
                        }
                    },
                    onScroll: function onScroll(evt) {
                        return _this6.onScroll(-evt.contentOffset.y);
                    },
                    onScrollEnd: function onScrollEnd() {
                        return _this6.onScrollEnd();
                    },
                    onRefresh: function onRefresh() {
                        _onRefresh(_this6.listModel.dataSource);
                    },
                    onLoad: function onLoad() {
                        _onLoad(_this6.listModel.dataSource);
                    },
                    enableLazyLoad: false
                }),
                this.props.staticSection != null ? _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(dom) {
                            if (dom) {
                                _this6.staticSectionContaienr = dom;
                            }
                        },
                        className: 'yo-list-static-section'
                    },
                    this.props.staticSection
                ) : null,
                _react2.default.createElement(
                    'ul',
                    {
                        className: containerClass,
                        ref: function ref(dom) {
                            _this6.listContainer = dom;
                        }
                    },
                    infinite ?
                    // 无穷列表模式,在列表容器内设置固定数目的槽,随着滚动不停更新这些槽内部的内容和translateY
                    (0, _util.getArrayByLength)(infiniteSize).fill(1).map(function (__, i) {
                        var item = visibleList.find(function (it) {
                            return it._order === i;
                        });
                        return item ? _this6.renderItemWrap(item, i) : null;
                    }) :
                    // 静态列表,渲染出所有的item
                    visibleList.map(function (item, i) {
                        return _this6.renderItemWrap(item, i);
                    })
                )
            );
        }
    }]);

    return List;
}(_react.Component);

List.INFINITE_SCROLLTO_WITH_ANIMATION_DISTANCE = 2000;
List.childContextTypes = {
    list: _react.PropTypes.object,
    infinite: _react.PropTypes.bool
};
exports.default = List;


List.defaultProps = defaultProps;
List.propTypes = propTypes;
List.LazyImage = _lazyimage2.default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(176);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

var _src = __webpack_require__(151);

var _src2 = _interopRequireDefault(_src);

var _multilistitem = __webpack_require__(153);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component MultiList
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.4
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 多级选择列表组件，该组件基于list组件封装，支持列表展示，支持自定义模板展示，内容异步加载等功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/product.md}{instruUrl: multilist/transport.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/async.md}{instruUrl: multilist/async.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./multilist/personal.md}{instruUrl: multilist/product.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MultiList = function (_Component) {
    _inherits(MultiList, _Component);

    function MultiList(props) {
        _classCallCheck(this, MultiList);

        var _this = _possibleConstructorReturn(this, (MultiList.__proto__ || Object.getPrototypeOf(MultiList)).call(this, props));

        _this.state = {
            route: [],
            dataSource: _this._handleDataSource(Object.assign({}, _this.props.dataSource), []),
            valueItems: ''
        };
        _this.path = [];
        _this.newItems = [];
        return _this;
    }

    _createClass(MultiList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.calcPath();
            this.newItems = this._getItemsByValue(this.props.value);
            var lastItem = this._getItemsByRoute(this.pathIndex).pop();
            if (lastItem.subList === 'ASYNC') this.props.onUpdateData(lastItem);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.dataSource !== this.props.dataSource) {
                this.setState({
                    dataSource: this._handleDataSource(Object.assign({}, nextProps.dataSource), [])
                });
            }
            this.calcPath();
            this.newItems = this._getItemsByValue(nextProps.value);
            // 调用方保证 指定value时的 路径不存在 async
        }
        // shouldComponentUpdate(nextProps, nextState) {
        //     const shouldItemUpdate = nextProps.dataSource !== this.props.dataSource
        //     || this.state.route.join('-') !== nextState.route.join('-')
        //     || this.props.value !== nextProps.value;
        //     return shouldItemUpdate;
        // }

    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.prevValue = this.props.value.slice(0);
        }
    }, {
        key: 'calcPath',
        value: function calcPath() {
            this.path = [];
            this.pathIndex = [];
            this._recursionDataSourceForPath(this.props.dataSource, 0);
        }
    }, {
        key: '_handleDataSource',
        value: function _handleDataSource(dataSource, prev) {
            var _this2 = this;

            if (Array.isArray(dataSource.subList)) {
                dataSource.subList.forEach(function (item) {
                    var key = prev.concat(item.value);
                    if (!item.key) {
                        item.key = key.join('-');
                    }
                    if (item.subList) {
                        _this2._handleDataSource(item, key);
                    }
                });
            }
            return dataSource;
        }
    }, {
        key: '_recursionDataSourceForPath',
        value: function _recursionDataSourceForPath(data, level) {
            var _this3 = this;

            if (!Array.isArray(data.subList) || data.subList.length === 0) {
                return;
            }
            var len = this.props.value.length;
            var effectValue = void 0;
            if (new RegExp('^' + this.state.route.slice(0, len - 1).join('_')).test(this.props.value.slice(0, len - 1).join('_'))) {
                effectValue = this.props.value.slice(0)[level];
                effectValue = Array.isArray(effectValue) ? effectValue[0] : effectValue;
            }
            var value = this.state.route[level] || effectValue || data.defaultValue || data.subList[0].value;
            data.subList.some(function (item, index) {
                if (item.value === value) {
                    _this3.pathIndex[level] = index;
                    _this3.path[level] = value;
                    if (item.subList) {
                        _this3._recursionDataSourceForPath(item, level + 1);
                    }
                    return true;
                }
                return false;
            });
        }
    }, {
        key: '_handleItemChecked',
        value: function _handleItemChecked(_ref) {
            var item = _ref.item,
                level = _ref.level,
                data = _ref.data;

            if (this.path.slice(0, level).join('-') !== this.props.value.slice(0, level).join('-')) {
                if (!item.subList && item.value === data.defaultValue) {
                    return true;
                }
                return false;
            }
            if (Array.isArray(this.props.value[level])) {
                return !!~this.props.value[level].indexOf(item.value);
            }
            if (item.value === this.props.value[level]) return true;
            if (this.props.value[level] == null && !item.subList && item.value === data.defaultValue) {
                return true;
            }
            return false;
        }
    }, {
        key: '_handleItemRender',
        value: function _handleItemRender(data, level, item, i) {
            var isChecked = this._handleItemChecked({ item: item, level: level, data: data, index: i });
            var type = item.itemType || data.subItemType;
            var itemState = {
                level: level,
                index: this.path.slice(0, level).concat(item.value).join('-'),
                route: this.pathIndex.slice(0, level).concat(i).join('>'),
                isLeaf: !item.subList,
                isSpread: item.value === this.path[level] && !!item.subList,
                isChecked: isChecked,
                data: item
            };
            switch (type) {
                case 'MENU':
                    return _react2.default.createElement(_multilistitem.MenuItem, itemState);
                case 'RADIO':
                    return _react2.default.createElement(_multilistitem.RadioItem, itemState);
                case 'CHECKBOX':
                    return _react2.default.createElement(_multilistitem.CheckboxItem, itemState);
                default:
                    return this.props.renderItem(_extends({ itemType: type }, itemState));
            }
        }
    }, {
        key: '_handleShouldItemUpdate',
        value: function _handleShouldItemUpdate(level, isLastLevel, ret, nextItem, nowItem) {
            var isUpdate = false;
            if (isLastLevel) {
                return true;
            }
            if (nextItem.value !== nowItem.value) {
                isUpdate = true;
            }
            if (!isUpdate && this.prevValue[level] !== this.props.value[level] && (nowItem.value === this.prevValue[level] || nowItem.value === this.props.value[level])) {
                isUpdate = true;
            }
            // 路径的更改
            if (!isUpdate && this.prevPath[level] !== this.path[level]) {
                isUpdate = nowItem.value === this.prevPath[level] || nowItem.value === this.path[level];
            }
            return isUpdate;
        }
    }, {
        key: '_handleItemExtraClass',
        value: function _handleItemExtraClass(data, level, item) {
            return item.value === this.path[level] && item.subList ? 'spread' : '';
        }
    }, {
        key: '_handleItemTap',
        value: function _handleItemTap(data, level, item, index, target) {
            var type = item.itemType || data.subItemType;
            var upLevel = level;
            var newItems = this.newItems;
            var newValue = void 0;
            this.calcPath();
            this.setState({
                route: item.subList ? this.path.slice(0, level).concat(item.value) : this.path.slice(0, level)
            });
            switch (type) {
                case 'MENU':
                    {
                        var constDataSource = this.props.dataSource.subList;
                        var syncItem = this.pathIndex.some(function (i) {
                            if (constDataSource[i].subList === 'ASYNC') {
                                constDataSource = constDataSource[i];
                                return true;
                            }
                            constDataSource = constDataSource[i].subList;
                            return false;
                        });
                        if (syncItem) {
                            this.props.onUpdateData(constDataSource);
                        }
                        return;
                    }
                case 'RADIO':
                    newValue = this.path.slice(0, upLevel).concat(item.value);
                    newItems = this._getItemsByRoute(this.pathIndex.slice(0, upLevel)).concat(item);
                    break;
                case 'CHECKBOX':
                    if (this.path.slice(0, upLevel).join('-') === this.props.value.slice(0, upLevel).join('-')) {
                        newValue = this.props.value.slice(0);
                        var tmpValue = newValue[level];
                        if (Array.isArray(tmpValue) && tmpValue.length > 0) {
                            var valueIndex = tmpValue.indexOf(item.value);
                            if (valueIndex !== -1) {
                                tmpValue.splice(valueIndex, 1);
                                newItems[level].splice(valueIndex, 1);
                            } else {
                                tmpValue.push(item.value);
                                newItems[level].push(item);
                            }
                        } else {
                            tmpValue = [item.value];
                            newItems[level] = [item];
                        }
                        // handle final value
                        if (tmpValue.length > 0) {
                            newValue[level] = tmpValue;
                        } else {
                            newValue = [];
                            newItems = [];
                        }
                    } else {
                        newValue = this.path.slice(0, upLevel);
                        newValue.push([item.value]);
                        newItems = this._getItemsByRoute(this.pathIndex.slice(0, upLevel));
                        newItems.push([item]);
                    }
                    break;
                default:
                    newValue = this.props.onItemTap({ data: data, level: level, item: item, index: index, target: target });
            }
            // if (newValue[newValue.length - 1] == null) {
            // newValue = [];
            // }
            this.newItems = newItems;
            this.props.onChange({ newValue: newValue, oldValue: this.props.value, level: level, newItems: newItems });
        }
    }, {
        key: '_getItemsByRoute',
        value: function _getItemsByRoute(route, dataSource) {
            var _this4 = this;

            var constDataSource = dataSource || this.props.dataSource;
            return route.map(function (item) {
                if (Array.isArray(item)) {
                    return _this4._getItemsByRoute(item, constDataSource);
                } else {
                    constDataSource = constDataSource.subList[item];
                    return constDataSource;
                }
            });
        }
    }, {
        key: '_getItemsByValue',
        value: function _getItemsByValue(value) {
            var constDataSource = this.props.dataSource;
            return value.map(function (item) {
                var valueR = void 0;
                if (Array.isArray(item)) {
                    return constDataSource.subList.filter(function (i) {
                        return ~item.indexOf(i.value);
                    });
                }
                constDataSource.subList.some(function (i) {
                    if (item === i.value) {
                        valueR = i;
                        constDataSource = i;
                        return true;
                    }
                    return false;
                });
                return valueR;
            });
        }
    }, {
        key: '_recursionRender',
        value: function _recursionRender(data, level) {
            if (!data.subList) {
                return;
            }
            if (Array.isArray(data.subList) && data.subList.length > 0) {
                this.children.push(_react2.default.createElement(
                    'div',
                    { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                    _react2.default.createElement(_src2.default, {
                        dataSource: data.subList,
                        infinite: false,
                        extraClass: (0, _classnames2.default)(['yo-scroller-fullscreen', 'item', 'item-' + level]),
                        onItemTap: this._handleItemTap.bind(this, data, level),
                        renderItem: this._handleItemRender.bind(this, data, level),
                        itemExtraClass: this._handleItemExtraClass.bind(this, data, level),
                        shouldItemUpdate: this._handleShouldItemUpdate.bind(this, level, !data.subList[this.pathIndex[level]].subList)
                    })
                ));
                this._recursionRender(data.subList[this.pathIndex[level]], level + 1);
                return;
            }
            switch (data.subList) {
                case 'EMPTY':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.EmptyList, null)
                    ));
                    break;
                case 'FAULT':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.FaultList, null)
                    ));
                    break;
                case 'ASYNC':
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        _react2.default.createElement(_multilistitem.LoadingList, null)
                    ));
                    break;
                default:
                    this.children.push(_react2.default.createElement(
                        'div',
                        { className: (0, _classnames2.default)('item', 'item-' + level), key: this.path.slice(0, level).join('_') },
                        this.props.renderContent({ type: data.subList, data: data, level: level })
                    ));
            }
        }
        /**
         * @skip
         * @description 渲染多级列表的调用函数
         * @return {Array} 列表的虚拟dom树
         */

    }, {
        key: 'renderList',
        value: function renderList() {
            this.children = [];
            this.prevPath = this.path.slice(0);
            this.calcPath();
            this._recursionRender(this.state.dataSource, 0);
            return this.children;
        }
    }, {
        key: 'render',
        value: function render() {
            var extraClass = this.props.extraClass;

            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)(['yo-multilist'], extraClass) },
                this.renderList()
            );
        }
    }]);

    return MultiList;
}(_react.Component);

MultiList.propTypes = {
    /**
     * 原始数据用于生成列表
     * @property dataSource
     * @type Array
     * @description
     * dataSource 是一个树形的结构，每一个层级会有defaultValue，表示默认展开该哪个item或者默认选中项（非必填），subList为下级层级的内容，subList的每个字项设置内容如下。
     *
     * - name 为文字描述
     * - value 该项value
     * - subItemType 用于设置下一层级的list item使用的组件，内置 `MENU`,`RADIO`,`CHECKBOX`。如果传入的字符不在默认序列中会触发组件的renderItem方法，由用户自行渲染。
     * - itemType 用于定义当前item 使用的组件，优先级高于父层级的 `subItemType`。
     * - subList支持数组和String类型，当传入array类型渲染为列表，
     * 内置String为`FAULT`，`ASYNC`，`EMPTY`对应内置模板分别用于展示加载错误，加载中，加载内容为空三种情况，
     * 其中加载`ASYNC`会触发onUpdateData事件，通知用户更新数据。用户可以通过自定义字符串，触发renderContent方法，
     * 返回ReactElement作为内容并进行其他操作。
     * - defaultValue 表示该层级的默认值，若下一级为最后一层级表示，默认值[注意：默认值不会作为value]。
     *
     * @example
     * const dataSource = {
     *   defaultValue: 1,
     *   subItemType: 'MENU',
     *   subList: [{
     *       name: '同步',
     *      value: 1,
     *      defaultValue: '1-1',
     *      subItemType: 'RADIO',
     *      subList: [{
     *          name: '1-1  默认选项',
     *          value: '1-1'
     *      }, {
     *          name: '1-2',
     *          value: '1-2'
     *      }, {
     *          name: '1-3',
     *          value: '1-3'
     *      }, {
     *          name: '1-4',
     *          value: '1-4'
     *      }]
     *  }, {
     *      name: '异步',
     *      value: 2,
     *      subItemType: 'RADIO',
     *      defaultValue: '2-2',
     *      subList: 'ASYNC',
     *      asyncType: '2-2'
     *   }]
     *  };
     */
    dataSource: _react2.default.PropTypes.shape({
        subItemType: _react2.default.PropTypes.string.isRequired,
        onItemTapType: _react2.default.PropTypes.string,
        subList: _react2.default.PropTypes.array.isRequired,
        defaultValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.string, _react2.default.PropTypes.number])
    }).isRequired,
    /**
     * @property value
     * @type  Array
     * @description mutliList的值，该值为点选的value
     */
    value: _react2.default.PropTypes.array,
    /**
     * @property onChange
     * @type Function
     * @description
     * 用于更新结果的回调函数
     * @example
     *  function({level, listValue, newValue, newItems}){
     *  	level 表示当前菜单层级
     *  	oldValue 表示当前multiList的value
     *  	newValue 表示更新后的multiList的value
     *      newItems 表示更新后的value对应的item
     * 	}
     */
    onChange: _react.PropTypes.func.isRequired,
    /**
     * @property extraClass
     * @type String
     * @description 给组件根节点附加的额外样式类
     * @default null
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property onItemTap
     * @type Function
     * @description 当Item的类型不是'MENU'、'CHECKBOX'、'RADIO'，该事件将会被触发。事件处理函数需要有返回值，该值将会作为`newValue`触发组件的`onChange`事件。
     * @param {data, level, item, index, target} 父层数据，层级，改节点数据，该节点索引，
     */
    onItemTap: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.String]),
    /**
     * @property renderItem
     * @type Function
     * @description 当Item的类型不是'MENU'、'CHECKBOX'、'RADIO'，该事件将会被触发。事件处理函数需要有返回值，返回值是`PropsTypes.element`类型作为`List`的 `item`。
     * @param {itemType, data, level, item, index, target}  父层数据，节点所在层级，节点数据，该节点在父节点`subList`中的索引，
     * @example
     * renderItem={(item)=>{
     *      const {itemType, data, isSpread, index} = item;
     *      JSON.stringify(item);
     *      // {  "itemType":"ProductMenu", 节点的Type类型（此时的`itemType`是组件根据父节点`subItemType`和该节点`itemType`按照优先级处理过的值。）
     *      //    "level":0, item所在层级
     *      //    "index":"2", item所在父节点subList
     *      //    "route": "1>2>1", item在dataSource中的索引值
     *      //    "isLeaf":false, 该节点是否为叶子节点
     *      //    "isSpread":false, 如果该节点为父节点时该值表示该节点是否是展开的
     *      //    "isChecked":false, 该节点是否是有效值
     *      //    "data":{"name":"产品2","value":2,"subList":"product2","key":1,"_index":1} 原数据内容`key`值为组建计算由于优化List性能，如原数据中有设置则使用原数据，单请调用者保证key值在该层级中的唯一性。
     *      // }
     *      switch (itemType){
     *          case 'ProductMenu':
     *              return <ProductMenu data={data} isSpread={isSpread} index={index}/>
     *      }
     * }}
     */
    renderItem: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.String]),
    /**
     * @property renderContent
     * @type Function
     * @description 当subList的类型不是array，该事件将会被触发，事件处理函数需要有返回值，返回值是`PropsTypes.element`类型作为`List`的 `item`。
     * @param {itemType, data, level} 节点的Type类型， 父层数据，层级，改节点数据，该节点索引，
     * @example
     * renderContent={(item) => {
     *      const {type} = item;
     *      console.log(JSON.stringify(item));
     *      // {"type":"product1","data":{"name":"产品1","value":1,"subList":"product1","key":"1"},"level":1}
     *      switch (type){
     *          case 'product1':
     *              return <Product tit="product1" />;
     *          case 'product2':
     *              return <Product tit="product2" />;
     *      }
     *  }}
     */
    renderContent: _react.PropTypes.func,
    /**
     * @property onUpdateData
     * @type Function
     * @description 当加载的层级为`ASYNC`时触发，用于用户更新dataSource，用户通过获取数据中的内容判断如何更新dataSource。
     * @param data 父节点的数据
     */
    onUpdateData: _react.PropTypes.func
};
MultiList.defaultProps = {
    extraClass: '',
    value: []
};
exports.default = MultiList;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingList = exports.FaultList = exports.EmptyList = exports.MenuItem = exports.RadioItem = exports.CheckboxItem = undefined;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ITEMPROPSCONFIG = {
    data: _react.PropTypes.object,
    level: _react.PropTypes.number,
    isChecked: _react.PropTypes.bool,
    isSpread: _react.PropTypes.bool,
    isLeaf: _react.PropTypes.bool,
    index: _react.PropTypes.string,
    route: _react.PropTypes.string
};

var CheckboxItem = exports.CheckboxItem = function CheckboxItem(props) {
    return _react2.default.createElement(
        'div',
        { className: 'select-checkbox', 'data-type': 'CHECKBOX', 'data-index': props.index || null, 'data-route': props.route || null },
        _react2.default.createElement(
            'div',
            { className: 'yo-checked yo-checked-checkbox' },
            _react2.default.createElement('input', { type: 'radio', checked: props.isChecked, readOnly: 'readOnly' }),
            _react2.default.createElement('span', { className: 'type' })
        ),
        _react2.default.createElement(
            'p',
            { className: 'content' },
            props.data.name
        )
    );
};
CheckboxItem.propTypes = ITEMPROPSCONFIG;

var RadioItem = exports.RadioItem = function RadioItem(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('select-checkbox', { checked: props.isChecked }), 'data-type': 'RADIO', 'data-index': props.index || null, 'data-route': props.route || null },
        _react2.default.createElement(
            'div',
            { className: 'yo-checked yo-checked-radio' },
            _react2.default.createElement('input', { type: 'radio', checked: props.isChecked, readOnly: 'readOnly' }),
            _react2.default.createElement('span', { className: 'type' })
        ),
        _react2.default.createElement(
            'span',
            { className: 'content' },
            props.data.name
        )
    );
};
RadioItem.propTypes = ITEMPROPSCONFIG;

var MenuItem = exports.MenuItem = function MenuItem(props) {
    return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('select-checkbox', 'multi-list-content', { spread: props.isSpread, effect: props.isChecked }), 'data-type': 'MENU', 'data-index': props.index || null, 'data-route': props.route || null },
        _react2.default.createElement(
            'div',
            { className: 'yo-checked yo-checked-dot' },
            _react2.default.createElement('input', { type: 'radio', checked: props.isChecked, readOnly: 'readOnly' }),
            _react2.default.createElement('span', { className: 'type' })
        ),
        _react2.default.createElement(
            'span',
            { className: 'content' },
            props.data.name
        )
    );
};
MenuItem.propTypes = ITEMPROPSCONFIG;

var EmptyList = exports.EmptyList = function EmptyList() {
    return _react2.default.createElement(
        'p',
        { className: 'multiList-container-tip' },
        '\u6570\u636E\u4E3A\u7A7A'
    );
};
var FaultList = exports.FaultList = function FaultList() {
    return _react2.default.createElement(
        'p',
        { className: 'multiList-container-tip' },
        '\u6570\u636E\u52A0\u8F7D\u5931\u8D25'
    );
};
var LoadingList = exports.LoadingList = function LoadingList() {
    return _react2.default.createElement(
        'p',
        { className: 'multiList-container-tip' },
        '\u6570\u636E\u52A0\u8F7D\u4E2D......'
    );
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "multilistitem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(54);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = __webpack_require__(155);

var _utils2 = _interopRequireDefault(_utils);

var _util = __webpack_require__(49);

var _classnames = __webpack_require__(43);

var _classnames2 = _interopRequireDefault(_classnames);

var _lazyimage = __webpack_require__(97);

var _lazyimage2 = _interopRequireDefault(_lazyimage);

var _sticky = __webpack_require__(156);

var _sticky2 = _interopRequireDefault(_sticky);

__webpack_require__(177);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 滚动组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Scroller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 滚动组件,用来提供滚动容器。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了横向滚动和纵向滚动。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了『下拉刷新』和『加载更多』功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了 `transition` 和 `requestAnimationFrame` 两种实现滚动的方式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了 `transform` 和 `position:absolute` 两种实现位移的方式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 确定高度：Scroller 必须有一个确定的高度才能正常工作，因为它实际上就是将一系列不确定高度的子组件装进一个确定高度的容器。实现确定高度的方式有很多种：flex、指定高度、position: absolute等等。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 内容容器：作为一个滚动组件，Scroller 会创建一个 div 作为滚动容器。如果 Scroller 的子元素只有一个，则会把这个子元素当做内容容器；否则，会创建一个 div 作为内容容器。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/basic.md}{instruUrl: scroller/base.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/refresh.md}{instruUrl: scroller/refresh.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/scrollevent.md}{instruUrl: scroller/scroll.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// TODO: 干掉各种 magic number！！！


var REFRESHSTATUS = {
    PULL: 'pullrefresh_pull',
    RELEASE: 'pullrefresh_release',
    LOAD: 'pullrefresh_load',
    SUCCESS: 'pullrefresh_success',
    FAIL: 'pullrefresh_fail'
};
var LOADSTATUS = {
    PULL: 'loadmore_pull',
    RELEASE: 'loadmore_release',
    LOAD: 'loadmore_load',
    NOMORE: 'loadmore_nomore'
};

var _utils$getRAF = _utils2.default.getRAF(),
    rAF = _utils$getRAF.rAF,
    cancelrAF = _utils$getRAF.cancelrAF;

var defaultProps = {
    extraClass: '',
    containerExtraClass: '',
    containerExtraStyle: {},
    contentOffset: {
        x: 0,
        y: 0
    },
    disabled: false,
    scrollX: false,
    scrollY: true,
    freeScroll: false,
    directionLockThreshold: 5, // 锁定某一滚动方向的阀值
    momentum: true, // 惯性滚动
    bounce: true, // 弹性滚动
    bounceTime: 600, // 弹性滚动时间
    bounceEasing: _utils2.default.ease.circular, // 弹性滚动easing函数
    preventDefault: true, // 阻止默认事件
    preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, // 阻止默认事件的例外
    stopPropagation: false, // 阻止冒泡
    HWCompositing: true, // 是否开启硬件加速
    useTransition: true,
    useTransform: true,
    onScroll: null, // 滚动事件的回调
    usePullRefresh: false,
    pullRefreshHeight: 40,
    renderPullRefresh: null,
    onRefresh: null,
    useLoadMore: false,
    loadMoreHeight: 40,
    renderLoadMore: null,
    onLoad: null,
    autoRefresh: true,
    wrapper: null,
    enableLazyLoad: true,
    scrollWithouTouchStart: false,
    stickyOffset: 0
};

var propTypes = {
    /**
     * 组件额外class
     *
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     * @default ''
     */
    extraClass: _react.PropTypes.string,
    /**
     * 内容容器额外class
     *
     * @property containerExtraClass
     * @type String
     * @description 为组件中的内容容器提供额外的class。
     * @default ''
     */
    containerExtraClass: _react.PropTypes.string,
    /**
     * 内容容器额外style
     *
     * @property containerExtraStyle
     * @type String
     * @description 为组件中的内容容器提供额外的style，主要用于横向滚动时，动态设置容器的宽度。
     * @default {}
     * @version 3.0.6
     */
    containerExtraStyle: _react.PropTypes.object,
    /**
     * 内容位移
     *
     * @property contentOffset
     * @type {x: Number, y: Mumber}
     * @description 组件中内容的初始位移，这个属性变化时，会重置内容的位移。
     * @default {x: 0, y: 0}
     */
    contentOffset: _react.PropTypes.shape({
        x: _react.PropTypes.number,
        y: _react.PropTypes.number
    }),
    /**
     * @property stickyOffset
     * @type Number
     * @description 吸顶容器偏移，如果你希望吸顶容器不位于top:0的位置，可以修改这个属性。
     * @default 0
     * @version 3.0.6
     */
    stickyOffset: _react.PropTypes.number,
    /**
     * 是否禁止滚动
     *
     * @property disabled
     * @type Bool
     * @description 是否禁止滚动，默认允许滚动。
     * @default false
     */
    disabled: _react.PropTypes.bool,
    /**
     * 横向滚动
     *
     * @property scrollX
     * @type Bool
     * @description 是否开启横向滚动，默认关闭。
     * @default false
     */
    scrollX: _react.PropTypes.bool,
    /**
     * 纵向滚动
     *
     * @property scrollY
     * @type Bool
     * @description 是否开启纵向滚动,默认开启。
     * @default true
     */
    scrollY: _react.PropTypes.bool,
    /**
     * 自由滚动
     *
     * @property freeScroll
     * @type Bool
     * @description 是否开启自由滚动。当设置为 `false` 时，只能响应某一个方向的滚动；当设置为 `true` 时，可以同时响应横向和纵向滚动（`scrollX` 和 `scrollY` 必须同时为 `true`）。
     * @default false
     * @skip
     */
    freeScroll: _react.PropTypes.bool,
    /**
     * 方向锁定阈值
     *
     * @property directionLockThreshold
     * @type Number
     * @description 只允许单向滚动的时候，会根据这个阀值来判定响应哪个方向上的位移：某一方向位移减去另一个方向位移超过阀值，就会判定为这个方向的滚动。
     * @default 5
     */
    directionLockThreshold: _react.PropTypes.number,
    /**
     * 惯性滚动
     *
     * @property momentum
     * @type Bool
     * @description 是否允许惯性滚动。当设置为 `true`，手指离开时，如果还有速度会继续滚动一段距离；当设置为 `false` ，手指离开时会立即停止滚动。
     * @default true
     */
    momentum: _react.PropTypes.bool,
    /**
     * 弹性滚动
     *
     * @property bounce
     * @type Bool
     * @description 当滚动超出内容范围时，是否可以继续滚动一截。
     * @default true
     */
    bounce: _react.PropTypes.bool,
    /**
     * 弹性滚动回弹时间
     *
     * @property bounceTime
     * @type Number
     * @description 当弹性滚动一截之后，回到滚动范围内位置的时间，单位为毫秒（ms）。
     * @default 600
     */
    bounceTime: _react.PropTypes.number,
    /**
     * 弹性滚动回弹动画
     *
     * @property bounceEasing
     * @type Object
     * @description 弹性回滚动画。
     *
     * Scroller 提供了五种默认的动画函数：`quadratic`, `circular`, `back`, `bounce`, `elastic`，可以通过 `Scroller.ease.xxx` 来使用。
     *
     * 用户也可以自定义动画对象，比如：
     *
     * ``
     * {
     *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
     *     fn: function (k) {
     *         return k * ( 2 - k );
     *     }
     * }
     * ``
     * @default Scroller.ease.circular
     */
    bounceEasing: _react.PropTypes.object,
    /**
     * transition开关
     *
     * @property useTransition
     * @type Bool
     * @description 如果设置为true,会使用transition来实现滚动效果;如果设置为false,会使用requestAnimationFrame来实现。
     * @default true
     */
    useTransition: _react.PropTypes.bool,
    /**
     * transform开关
     *
     * @property useTransform
     * @type Bool
     * @description 如果设置为true,会使用transform来实现位移;如果设置为false,会使用left和top来实现位移（position: absolute）。
     * @default true
     */
    useTransform: _react.PropTypes.bool,
    /**
     * 滚动事件回调
     *
     * @property onScroll
     * @type Function
     * @param {e} event 滚动事件的回调，结构为: {contentOffset: {x: x, y: y}}
     * @description (event) => void
     *
     * 滚动事件的回调。一旦设置了这个回调，为了能够监听滚动事件，会将useTransition属性强制设置为false，会由此带来一定的性能牺牲。
     */
    onScroll: _react.PropTypes.func,
    /**
     * 自动刷新高度
     *
     * @property autoRefresh
     * @type Bool
     * @description 默认为true,在componentDidUpdate的时候会自动刷新高度;如果设置为false,则在内容发生变化时，需要用户主动调用refresh方法来刷新高度。
     * @default true
     * @skip
     */
    autoRefresh: _react.PropTypes.bool,
    /**
     * 硬件加速
     *
     * @property HWCompositing
     * @type Bool
     * @description 是否开启硬件加速
     * @default true
     */
    HWCompositing: _react.PropTypes.bool,
    eventPassthrough: _react.PropTypes.bool,
    preventDefault: _react.PropTypes.bool,
    preventDefaultException: _react.PropTypes.object,
    stopPropagation: _react.PropTypes.bool,
    /**
     * 下拉刷新
     *
     * @property usePullRefresh
     * @type Bool
     * @description 是否开启下拉刷新功能
     * @default false
     * hasPullRefresh
     */
    usePullRefresh: _react.PropTypes.bool,
    /**
     * 下拉刷新事件回调
     *
     * @property onRefresh
     * @type Function
     * @param {e} event 结构为: ({contentOffset: {x: x, y: y}})
     * @description (event) => void
     *
     * 下拉刷新时开始刷新的回调。
     */
    onRefresh: _react.PropTypes.func,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type Number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）
     * @default 40
     * 可以考虑不要
     */
    pullRefreshHeight: _react.PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type Function
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数
     */
    renderPullRefresh: _react.PropTypes.func,
    /**
     * 加载更多
     *
     * @property useLoadMore
     * @type Bool
     * @description 是否开启加载更多功能.『加载更多』与『下拉刷新』略有不同，加载更多的提示区域是追加在内容区域的最后
     * @default false
     * hasLoadMore
     */
    useLoadMore: _react.PropTypes.bool,
    /**
     * 加载更多事件回调
     *
     * @property onLoad
     * @type Function
     * @param {e} event 结构为: ({contentOffset: {x: x, y: y}})
     * @description (event) => void
     *
     * 加载更多时开始加载的回调。
     */
    onLoad: _react.PropTypes.func,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type Number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）
     * @default 40
     */
    loadMoreHeight: _react.PropTypes.number,
    /**
     * 加载更多渲染函数
     *
     * @property renderLoadMore
     * @type Function
     * @returns {JSX} 用来渲染 loadMore 的 JSX
     * @description () => JSX
     *
     * 自定义的加载更多渲染函数
     */
    renderLoadMore: _react.PropTypes.func,
    deceleration: _react.PropTypes.number,
    wrapper: _react.PropTypes.object,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
    style: _react.PropTypes.object,
    /**
     * @skip
     * @property enableLazyLoad
     * @type Bool
     * @description 是否开启图片lazyload,默认为true
     */
    enableLazyLoad: _react.PropTypes.bool,
    /**
     * @property scrollWithoutTouchStart
     * @type Bool
     * @default false
     * @description ** 实验中的属性 **
     * 在默认情况下一次用户触发（非调用scrollTo方法）scroller的滚动需要由touchstart事件来启动，在某些情况下，例如scroller从disable状态切换到enable状态时，
     * 可能不能接收到这一瞬间的touchstart事件，这可能导致用户期待的滚动过程没有发生。
     * 开启这个属性为true以后将允许scroller用touchmove启动滚动过程，这可以解决上述场景的问题。
     * @version 3.0.2
     */
    scrollWithoutTouchStart: _react.PropTypes.bool
};

var Scroller = function (_Component) {
    _inherits(Scroller, _Component);

    function Scroller(props) {
        _classCallCheck(this, Scroller);

        var _this = _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, props));

        _this.x = 0;
        _this.y = 0;
        _this.directionX = 0;
        _this.directionY = 0;
        _this._scrollerStyle = {};

        _this._resetProps(props, true);

        _this.childLazyImages = [];
        _this.stickyHeaders = [];
        _this.stickyIndex = null;
        _this.stickyOffset = null;
        _this.wrapperOffsetTop = null;
        return _this;
    }

    _createClass(Scroller, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { scroller: this, isScroller: this.props.enableLazyLoad };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.wrapper = this.noWrapper ? this.wrapper : this.refs.wrapper;
            this.scroller = this.refs.scroller;

            // 重置 position 属性
            if (!this.useTransform) {
                if (!/relative|absolute/i.test(this._scrollerStyle)) {
                    this._scrollerStyle.position = 'relative';
                }
            }

            this.refresh();

            this._setRefreshStatus(REFRESHSTATUS.PULL);
            this._setLoadStatus(LOADSTATUS.PULL);
            this._refreshLoadMore();

            this._resetPosition();
            this.scrollTo(this.props.contentOffset.x, this.props.contentOffset.y);

            this._resize = function () {
                _this2.forceUpdate();
            };

            window.addEventListener('orientationchange', this._resize, false);
            window.addEventListener('resize', this._resize, false);

            this._tryLoadLazyImages();
            this._refreshSticky(true);

            if (this.stickyHeaders.length) {
                this.useTransition = false;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._resetProps(nextProps);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // 重置 contentOffset
            if (prevProps.contentOffset.x !== this.props.contentOffset.x || prevProps.contentOffset.y !== this.props.contentOffset.y) {
                this.scrollTo(this.props.contentOffset.x, this.props.contentOffset.y);
            }

            // 重置 position 属性
            if (!this.useTransform) {
                if (!/relative|absolute/i.test(this._scrollerStyle)) {
                    this._scrollerStyle.position = 'relative';
                    this._setStyle(this.scroller, this._scrollerStyle);
                }
            }

            // 重新获取容器和内容尺寸
            if (this.props.autoRefresh) {
                this.refresh();
            }

            // 重置 pullRefresh 和 loadMore
            if (prevState.usePullRefresh !== this.state.usePullRefresh) {
                this._setRefreshStatus(REFRESHSTATUS.PULL);
            }
            if (prevState.useLoadMore !== this.state.useLoadMore) {
                this._setLoadStatus(LOADSTATUS.PULL);
                this._refreshLoadMore();
            }

            if (this.stickyHeaders.length) {
                this.useTransition = false;
            }

            this._tryLoadLazyImages();
            this._refreshSticky(true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('orientationchange', this._resize, false);
            window.removeEventListener('resize', this._resize, false);
        }
    }, {
        key: '_resetProps',
        value: function _resetProps(props, init) {
            this.state = this.state || {};

            // 重置 useTransition 和 useTransform
            this.translateZ = props.HWCompositing && _utils2.default.hasPerspective ? ' translateZ(0)' : '';
            this.useTransition = _utils2.default.hasTransition && props.useTransition;
            this.useTransform = _utils2.default.hasTransform && props.useTransform;

            if (props.onScroll) {
                this.useTransition = false;
            }

            // 重置 scrollX 和 scrollY
            this.eventPassthrough = props.eventPassthrough === true ? 'vertical' : props.eventPassthrough;
            this.preventDefault = !this.eventPassthrough && props.preventDefault;
            this.scrollY = this.eventPassthrough === 'vertical' ? false : props.scrollY;
            this.scrollX = this.eventPassthrough === 'horizontal' ? false : props.scrollX;
            this.verticalBounce = this.scrollY ? props.bounce : false;
            this.horizontalBounce = this.scrollX ? props.bounce : false;

            // 重置 下拉刷新 和 加载更多
            if (init) {
                this.state.usePullRefresh = this.scrollY && !this.scrollX && props.usePullRefresh;
                this.state.useLoadMore = this.scrollY && !this.scrollX && props.useLoadMore;
            } else {
                this.setState({
                    usePullRefresh: this.scrollY && !this.scrollX && props.usePullRefresh,
                    useLoadMore: this.scrollY && !this.scrollX && props.useLoadMore
                });
            }

            // 重置 wrapper（内容容器）
            this.noWrapper = !!props.wrapper && props.children && !props.children.length && !this.state.usePullRefresh && !this.state.useLoadMore;
            if (this.noWrapper) {
                this.wrapper = props.wrapper;
            }

            // 如果disable状态发生了变化，需要重置initiated
            if (this.disabled !== props.disabled) {
                this.initiated = 0;
            }
            // 重置 disabled
            this.disabled = props.disabled;
            this.freeScroll = props.freeScroll && !this.eventPassthrough;
            this.directionLockThreshold = this.eventPassthrough ? 0 : props.directionLockThreshold;
        }
    }, {
        key: '_handleTouchStart',
        value: function _handleTouchStart(e) {
            if (this.disabled || this.initiated && _utils2.default.eventType[e.type] !== this.initiated) {
                return;
            }

            if (this.preventDefault && !_utils2.default.isBadAndroid && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var point = e.touches ? e.touches[0] : e;

            this.initiated = _utils2.default.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;

            this.startTime = _utils2.default.getTime();

            this.stopAnimate();

            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            // this._execEvent('beforeScrollStart');
        }
    }, {
        key: '_handleTouchMove',
        value: function _handleTouchMove(e) {
            if (this.disabled) {
                return;
            }

            if (_utils2.default.eventType[e.type] !== this.initiated) {
                if (this.props.scrollWithoutTouchStart) {
                    this._handleTouchStart(e);
                } else {
                    return;
                }
            }

            if (this.preventDefault) {
                // increases performance on Android? TODO: check!
                e.preventDefault();
            }

            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var point = e.touches ? e.touches[0] : e;
            var timestamp = _utils2.default.getTime();
            var deltaX = point.pageX - this.pointX;
            var deltaY = point.pageY - this.pointY;
            var newX = void 0;
            var newY = void 0;

            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.distX += deltaX;
            this.distY += deltaY;

            var absDistX = Math.abs(this.distX);
            var absDistY = Math.abs(this.distY);

            // We need to move at least 10 pixels for the scrolling to initiate
            if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
                return;
            }

            // If you are scrolling in one direction lock the other
            if (!this.directionLocked && !this.freeScroll) {
                if (absDistX > absDistY + this.directionLockThreshold) {
                    this.directionLocked = 'h'; // lock horizontally
                } else if (absDistY >= absDistX + this.directionLockThreshold) {
                    this.directionLocked = 'v'; // lock vertically
                } else {
                    this.directionLocked = 'n'; // no lock
                }
            }

            if (this.directionLocked === 'h') {
                if (this.eventPassthrough === 'vertical') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'horizontal') {
                    this.initiated = false;
                    return;
                }

                deltaY = 0;
            } else if (this.directionLocked === 'v') {
                if (this.eventPassthrough === 'horizontal') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'vertical') {
                    this.initiated = false;
                    return;
                }

                deltaX = 0;
            }

            newX = this.x + deltaX;
            newY = this.y + deltaY;

            // Slow down if outside of the boundaries
            if (newX > 0) {
                newX = this.horizontalBounce ? this.x + deltaX / 3 : 0;
            } else if (newX < this.maxScrollX) {
                newX = this.horizontalBounce ? this.x + deltaX / 3 : this.maxScrollX;
            }

            if (newY > 0) {
                newY = this.verticalBounce ? this.y + deltaY / 3 : 0;
            } else if (newY < this.maxScrollY) {
                newY = this.verticalBounce ? this.y + deltaY / 3 : this.maxScrollY;
            }

            if (deltaX > 0) {
                this.directionX = -1;
            } else if (deltaX < 0) {
                this.directionX = 1;
            } else {
                this.directionX = 0;
            }

            if (deltaY > 0) {
                this.directionY = -1;
            } else if (deltaY < 0) {
                this.directionY = 1;
            } else {
                this.directionY = 0;
            }

            if (!this.moved) {
                this._execEvent('onScrollStart');
            }

            this.moved = true;

            this._translate(newX, newY);

            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;
            }

            this._execEvent('onScroll');
        }
    }, {
        key: '_handleTouchEnd',
        value: function _handleTouchEnd(e) {
            if (this.disabled || _utils2.default.eventType[e.type] !== this.initiated) {
                return;
            }

            if (this.preventDefault && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }

            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var momentumX = void 0;
            var momentumY = void 0;
            var duration = _utils2.default.getTime() - this.startTime;
            var newX = Math.round(this.x);
            var newY = Math.round(this.y);
            var time = 0;

            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = _utils2.default.getTime();

            if (!this.moved) {
                this._execEvent('onScrollCancel');
                return;
            }

            // set pullrefresh
            if (this.state.usePullRefresh && this.y >= this.props.pullRefreshHeight) {
                if (this.refreshState === REFRESHSTATUS.LOAD) {
                    this.scrollTo(this.x, this.props.pullRefreshHeight, 200);
                } else {
                    this._setRefreshStatus(REFRESHSTATUS.LOAD);
                    this.scrollTo(this.x, this.props.pullRefreshHeight, 300);
                    this._execEvent('onRefresh');
                }
                return;
            }

            // set loadmore
            // jiao.shen:此处将y<=max改成了y<max
            // 因为如果scroller正好滚到下边缘停住的时候,这时候如果scroller render,就会立刻触发loadmore,和使用习惯不符
            if (this.state.useLoadMore && this.y < this.maxScrollY) {
                if (this.loadState !== LOADSTATUS.NOMORE && this.loadState !== LOADSTATUS.LOAD) {
                    this._setLoadStatus(LOADSTATUS.LOAD);
                    this._execEvent('onLoad');
                }
            }

            // reset if we are outside of the boundaries
            if (this._resetPosition(this.props.bounceTime)) {
                return;
            }

            this.scrollTo(newX, newY); // ensures that the last position is rounded

            // start momentum animation if needed
            if (this.props.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? _utils2.default.momentum(this.x, this.startX, duration, this.maxScrollX, this.horizontalBounce ? this.wrapperWidth : 0, this.props.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = this.hasVerticalScroll ? _utils2.default.momentum(this.y, this.startY, duration, this.maxScrollY, this.verticalBounce ? this.wrapperHeight : 0, this.props.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }

            if (newX !== this.x || newY !== this.y) {
                var easing = void 0;

                // change easing function when scroller goes out of the boundaries
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = _utils2.default.ease.quadratic;
                }

                this.scrollTo(newX, newY, time, easing);
                this._execEvent('onMomentumScrollBegin', {
                    targetX: newX,
                    targetY: newY
                });
                return;
            }

            this._execEvent('onScrollEnd');
        }
    }, {
        key: '_handleTransitionEnd',
        value: function _handleTransitionEnd(e) {
            if (e.target !== this.scroller || !this.isInTransition) {
                return;
            }

            this._transitionTime();
            if (!this._resetPosition(this.props.bounceTime)) {
                this.isInTransition = false;
                this._execEvent('onScrollEnd');
            }
        }

        /**
         * 尝试加载处于可视区域内的lazyimage
         * @param y
         */

    }, {
        key: '_tryLoadLazyImages',
        value: function _tryLoadLazyImages() {
            var _this3 = this;

            if (this.childLazyImages.length) {
                var self = this;
                this.childLazyImages.forEach(function (child) {
                    var _top = child.offsetTop - _this3.wrapperOffsetTop + _this3.y;

                    // if (_top >= -child.img.height && _top < self.wrapperHeight) {  // 只有出现在当前可视区域才加载
                    if (_top < self.wrapperHeight) {
                        // 出现在当前可视区域和可视区域上方都加载
                        child.load(function () {
                            var _height = child.props.style && child.props.style.height ? child.props.style.height : child.props.height;
                            if (!_height) {
                                // 如果设置了高度，就不再重新刷新
                                self.refresh();
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: '_getCurrentSticky',
        value: function _getCurrentSticky() {
            var stickyOffset = this.props.stickyOffset;

            var ret = null;
            if (this.y < 0) {
                var absY = Math.abs(this.y - stickyOffset);
                var wrapperTop = this.wrapperOffsetTop;
                var upperHeaders = this.stickyHeaders.filter(function (header) {
                    return header.offsetTop - wrapperTop <= absY;
                });

                if (upperHeaders.length) {
                    var currentHeader = upperHeaders[upperHeaders.length - 1];
                    var nextHeader = this.stickyHeaders[upperHeaders.length];
                    var index = upperHeaders.length - 1;
                    if (nextHeader) {
                        var distToNext = nextHeader.offsetTop - wrapperTop - absY;
                        var adjustOffset = distToNext > currentHeader.height ? 0 : -(currentHeader.height - distToNext);
                        ret = { currentHeader: currentHeader, adjustOffset: adjustOffset, index: index };
                    } else {
                        ret = { currentHeader: currentHeader, adjustOffset: 0, index: index };
                    }
                } else {
                    ret = null;
                }
            } else {
                ret = null;
            }
            return ret;
        }
    }, {
        key: '_refreshSticky',
        value: function _refreshSticky(forceRefresh) {
            if (this.stickyHeaders.length) {
                var currentSticky = this._getCurrentSticky();
                var stickyNode = this.refs.stickyNode;

                if (currentSticky) {
                    var currentHeader = currentSticky.currentHeader,
                        adjustOffset = currentSticky.adjustOffset;


                    if (currentSticky.index !== this.stickyIndex || currentSticky.adjustOffset !== this.stickyOffset || forceRefresh) {
                        var transform = 'translate(0px,' + adjustOffset + 'px) translateZ(0px)';
                        stickyNode.style.transform = transform;
                        stickyNode.style.webkitTransform = transform;
                        stickyNode.style.display = 'block';
                        stickyNode.className = currentHeader.stickyExtraClass;
                        _reactDom2.default.render(_react2.default.cloneElement(currentHeader.onlyChild), stickyNode);

                        this.stickyIndex = currentSticky.index;
                        this.stickyOffset = currentSticky.adjustOffset;
                    }
                } else {
                    this.stickyIndex = null;
                    this.stickyOffset = null;
                    stickyNode.style.display = 'none';
                }
            }
        }

        /**
         * @method stopAnimate
         * @description 停止当前的滚动动画，包括：惯性滚动、回弹、ScrollTo等。
         */

    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            if (this.useTransition && this.isInTransition) {
                this._transitionTime();
                this.isInTransition = false;

                var pos = this._getComputedPosition();

                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._execEvent('onScrollEnd');
            } else if (!this.useTransition && this.isAnimating) {
                this._execEvent('onScrollEnd');
                cancelrAF(this.rAF);

                this.isAnimating = false;
            }
        }

        /**
         * @method _getComputedPosition
         * @returns {Object} 当前内容区域位移，{x: x, y: y}
         * @description 获取当前内容区域的位移
         * @skip
         */

    }, {
        key: '_getComputedPosition',
        value: function _getComputedPosition() {
            var matrix = window.getComputedStyle(this.scroller, null);
            var x = void 0;
            var y = void 0;

            if (this.useTransform) {
                matrix = matrix[_utils2.default.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        }

        /**
         * @method _execEvent
         * @param {string} eventType 事件类型
         * @param {Object} param 参数
         * @description 触发事件回调
         * @skip
         */

    }, {
        key: '_execEvent',
        value: function _execEvent(eventType, param) {
            // console.log(eventType)
            if (eventType === 'onScroll' || eventType === 'onScrollEnd') {
                this._tryLoadLazyImages();
                this._refreshSticky();
            }
            if (eventType === 'onScrollStart') {
                this.isScrolling = true;
            }
            if (eventType === 'onScrollEnd') {
                this.isScrolling = false;
            }
            if (this.props[eventType]) {
                this.props[eventType].apply(this, [{
                    contentOffset: {
                        x: this.x,
                        y: this.y
                    },
                    param: param
                }]);
            }
        }

        /**
         * @method refresh
         * @param {Object} [refreshOption] 刷新参数，{wrapperWidth, wrapperHeight, scrollerWidth, scrollerHeight}
         * @description 刷新 Scroller，一般场景**不推荐使用**，因为当内容改变的时候，Scroller 会自动 render。
         *
         * 使用场景1：需要强制设置 Scroller 本身的宽高和内容容器的宽高时，可以通过refreshOption来传入宽高代替dom的宽高。
         *
         * 使用场景2：在某些不是通过 setState 或 Redux 等方式来改变内容导致 Scroller 不会 render 时，可以强制重新获取Scroller宽高和内容容器宽高。
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            var refreshOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callFromList = arguments[1];

            if (!callFromList) {
                this.wrapperWidth = typeof refreshOption.wrapperWidth !== 'undefined' ? refreshOption.wrapperWidth : this.wrapper.clientWidth;
                this.wrapperHeight = typeof refreshOption.wrapperHeight !== 'undefined' ? refreshOption.wrapperHeight : this.wrapper.clientHeight;
                this.scrollerWidth = typeof refreshOption.scrollerWidth !== 'undefined' ? refreshOption.scrollerWidth : this.scroller.offsetWidth;

                if (this.refs.wrapper) {
                    this.wrapperOffsetTop = (0, _util.getElementOffsetY)(this.refs.wrapper, null);
                }
            }

            this.scrollerHeight = typeof refreshOption.scrollerHeight !== 'undefined' ? refreshOption.scrollerHeight : this.scroller.offsetHeight;

            // 如果有下拉刷新，设置下拉刷新的位置，重置scrollerHeight
            if (this.state.useLoadMore && this.refs.LoadMore) {
                this.refs.LoadMore.style.visibility = this.scrollerHeight > 0 ? 'visible' : 'hidden';
                this.refs.LoadMore.style.top = this.scrollerHeight + 'px';
                this.scrollerHeight += this.props.loadMoreHeight;
            }

            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

            this.hasHorizontalScroll = this.props.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.props.scrollY && this.maxScrollY < 0;

            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }

            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }

            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
        }

        /**
         * @method _resetPosition
         * @param {Number} [time] 滚动到临界点的时间
         * @description 校正当前内容的位置，如果超出了可滚动的范围，则滚动到临界点。主要用于回弹。
         * @skip
         */

    }, {
        key: '_resetPosition',
        value: function _resetPosition(time) {
            var x = this.x;
            var y = this.y;
            var animateTime = time || 0;

            if (this.refreshState === REFRESHSTATUS.LOAD && this.y === this.props.pullRefreshHeight) {
                return false;
            }

            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0;
            } else if (this.x < this.maxScrollX) {
                x = this.maxScrollX;
            }

            if (!this.hasVerticalScroll || this.y > 0) {
                y = 0;
            } else if (this.y < this.maxScrollY) {
                y = this.maxScrollY;
            }

            if (x === this.x && y === this.y) {
                return false;
            }

            this.scrollTo(x, y, animateTime, this.props.bounceEasing);

            return true;
        }

        /**
         * @method scrollTo
         * @param {Number} x 水平位移，默认值为当前水平位移
         * @param {Number} y 垂直位移，默认值为当前垂直位移
         * @param {Number} time 滚动时间，默认值为0
         * @param {Object} [easing] 滚动动画对象。参照 `bounceEasing` 参数。
         *
         * @description 滚动到某个位置。
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.x;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.y;
            var time = arguments[2];
            var easing = arguments[3];
            // TODO: 给scrollTo加上回调，由于transitionend事件并不能针对某一次的transition，所以暂时不好处理
            var _easing = easing || _utils2.default.ease.circular;
            var transitionType = this.useTransition && _easing.style;

            this.isInTransition = this.useTransition && time > 0;

            if (!time || transitionType) {
                if (transitionType) {
                    this._transitionTimingFunction(_easing.style);
                    this._transitionTime(time);
                }
                this._translate(x, y);
            } else {
                this._animate(x, y, time, _easing.fn);
            }
        }
    }, {
        key: '_transitionTimingFunction',
        value: function _transitionTimingFunction(easing) {
            this._scrollerStyle[_utils2.default.style.transitionTimingFunction] = easing;
        }
    }, {
        key: '_transitionTime',
        value: function _transitionTime(time) {
            var _this4 = this;

            var _time = time || 0;
            var durationProp = _utils2.default.style.transitionDuration;
            if (!this.useTransition) {
                return;
            }

            if (!durationProp) {
                return;
            }
            this._scrollerStyle[durationProp] = _time + 'ms';

            if (!_time && _utils2.default.isBadAndroid) {
                this._scrollerStyle[durationProp] = '0.0001ms';

                // remove 0.0001ms
                rAF(function () {
                    if (_this4._scrollerStyle[durationProp] === '0.0001ms') {
                        _this4._scrollerStyle[durationProp] = '0s';
                    }
                });
            }

            this._setStyle(this.scroller, this._scrollerStyle);
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(dom, style) {
            var _style = Object.assign({}, style);
            var _dom = dom;

            Object.keys(_style).forEach(function (key) {
                _dom.style[key] = _style[key];
            });
        }
    }, {
        key: '_translate',
        value: function _translate(x, y) {
            if (this.useTransform) {
                this._scrollerStyle[_utils2.default.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

                this.x = x;
                this.y = y;

                this._setStyle(this.scroller, this._scrollerStyle);
            } else {
                var _x = Math.round(x);
                var _y = Math.round(y);

                this._scrollerStyle.left = _x + 'px';
                this._scrollerStyle.top = _y + 'px';

                this.x = _x;
                this.y = _y;

                this._setStyle(this.scroller, this._scrollerStyle);
            }

            if (this.state.usePullRefresh) {
                if (y >= this.props.pullRefreshHeight && this.refreshState === REFRESHSTATUS.PULL) {
                    this._setRefreshStatus(REFRESHSTATUS.RELEASE);
                } else if (y < this.props.pullRefreshHeight && this.refreshState === REFRESHSTATUS.RELEASE) {
                    this._setRefreshStatus(REFRESHSTATUS.PULL);
                }
            }

            if (this.state.useLoadMore) {
                if (this.maxScrollY - y > 0 && this.loadState === LOADSTATUS.PULL) {
                    // this._setRefreshStatus(LOADSTATUS.RELEASE);
                    this._setLoadStatus(LOADSTATUS.RELEASE);
                } else if (this.maxScrollY - y <= 0 && this.loadState === LOADSTATUS.RELEASE) {
                    // this._setRefreshStatus(LOADSTATUS.PULL);
                    this._setLoadStatus(LOADSTATUS.PULL);
                }
            }
        }
    }, {
        key: '_animate',
        value: function _animate(destX, destY, duration, easingFn) {
            var _this5 = this;

            var self = this;
            var startX = this.x;
            var startY = this.y;
            var startTime = _utils2.default.getTime();
            var destTime = startTime + duration;

            var step = function step() {
                var now = _utils2.default.getTime();
                var easing = easingFn((now - startTime) / duration);
                var newX = (destX - startX) * easing + startX;
                var newY = (destY - startY) * easing + startY;

                if (now >= destTime) {
                    self.isAnimating = false;
                    self._translate(destX, destY);

                    if (!self._resetPosition(self.props.bounceTime)) {
                        self._execEvent('onScrollEnd');
                    }

                    return;
                }

                self._translate(newX, newY);

                _this5._execEvent('onScroll');

                if (self.isAnimating) {
                    cancelrAF(self.rAF);
                    self.rAF = rAF(step);
                }
            };

            this.isAnimating = true;
            step();
        }
    }, {
        key: '_setRefreshStatus',
        value: function _setRefreshStatus(status) {
            var _this6 = this;

            if (!this.state.usePullRefresh) {
                return;
            }

            var _prevRefreshState = this.refreshState;
            this.refreshState = status;

            Object.keys(REFRESHSTATUS).forEach(function (item) {
                var _ref = REFRESHSTATUS[item];
                if (_this6.refs[_ref]) {
                    _this6.refs[_ref].style.display = status === _ref ? '' : 'none';
                }
            });

            var releaseIcon = this.refs[REFRESHSTATUS.RELEASE].querySelector('i');
            var pullIcon = this.refs[REFRESHSTATUS.PULL].querySelector('i');

            // todo: 为啥用了react之后，这个地方需要setTimeout才能正常动画
            setTimeout(function () {
                if (_prevRefreshState === REFRESHSTATUS.PULL && status === REFRESHSTATUS.RELEASE) {
                    releaseIcon.style[_utils2.default.style.transform] = '';
                    pullIcon.style[_utils2.default.style.transform] = 'rotate(180deg)';
                } else {
                    releaseIcon.style[_utils2.default.style.transform] = 'rotate(-180deg)';
                    pullIcon.style[_utils2.default.style.transform] = '';
                }
            }, 0);
        }
    }, {
        key: '_setLoadStatus',
        value: function _setLoadStatus(status) {
            var _this7 = this;

            if (!this.state.useLoadMore) {
                return;
            }

            var _prevLoadState = this.loadState;
            this.loadState = status;

            Object.keys(LOADSTATUS).forEach(function (item) {
                var _ref = LOADSTATUS[item];
                if (_this7.refs[_ref]) {
                    _this7.refs[_ref].style.display = status === _ref ? '' : 'none';
                }
            });

            var releaseIcon = this.refs[LOADSTATUS.RELEASE].querySelector('i');
            var pullIcon = this.refs[LOADSTATUS.PULL].querySelector('i');

            // todo: 为啥用了react之后，这个地方需要setTimeout才能正常动画
            setTimeout(function () {
                if (_prevLoadState === LOADSTATUS.PULL && status === LOADSTATUS.RELEASE) {
                    releaseIcon.style[_utils2.default.style.transform] = '';
                    pullIcon.style[_utils2.default.style.transform] = 'rotate(180deg)';
                } else {
                    releaseIcon.style[_utils2.default.style.transform] = 'rotate(-180deg)';
                    pullIcon.style[_utils2.default.style.transform] = '';
                }
            }, 0);
        }

        /**
         * @method startRefreshing
         * @param {Number} [time] 滚动到顶部的时间，默认为 300ms
         * @description 强制开始刷新。这个方法一般是用在切换筛选项或者关键字等场景，来达到回到顶部并且开始刷新的效果。如果是用户下拉触发 `onRefresh` 时，就不需要再调用这个方法了。
         */

    }, {
        key: 'startRefreshing',
        value: function startRefreshing() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

            if (this.state.usePullRefresh && this.refreshState !== REFRESHSTATUS.LOAD) {
                this._setRefreshStatus(REFRESHSTATUS.LOAD);
                this.scrollTo(this.x, this.props.pullRefreshHeight, time);

                this._execEvent('onRefresh');
            }
        }

        /**
         * @method stopRefreshing
         * @param {Bool} status 刷新的状态。true表示加载成功，false表示加载失败。
         * @param {Object} [config] 停止刷新的动画配置
         * @param {number} [config.duration] 回到顶部的动画时间，默认是300ms
         * @description 停止刷新，停止之后会自动滚动到顶部。
         */

    }, {
        key: 'stopRefreshing',
        value: function stopRefreshing(status) {
            var _this8 = this;

            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { duration: 300 };

            if (this.state.usePullRefresh && this.refreshState === REFRESHSTATUS.LOAD) {
                this._setRefreshStatus(status ? REFRESHSTATUS.SUCCESS : REFRESHSTATUS.FAIL);

                // 方案一：放在scrollTo的回调中处理状态，但是scrollTo的回调有时候会有问题；可以通过this.disabled = true 来禁止滚动解决现有的问题
                // this.scrollTo(this.x, 0, 300, null, ()=>{
                //     this._setRefreshStatus(REFRESHSTATUS.PULL);
                // });

                // 方案二：setTimeout的方式，但是不准确，尤其是在比较卡的机器上
                this.scrollTo(this.x, 0, config.duration);
                this.disabled = true;
                setTimeout(function () {
                    _this8._setRefreshStatus(REFRESHSTATUS.PULL);
                    _this8._setLoadStatus(LOADSTATUS.PULL);
                    _this8.disabled = false;
                }, config.duration);
            }
        }

        /**
         * @method stopLoading
         * @param {Bool} status 刷新的状态。true表示加载了更多数据，false表示没有更多数据了。
         * @description 停止加载更多。
         */

    }, {
        key: 'stopLoading',
        value: function stopLoading(status) {
            if (this.state.useLoadMore && this.loadState === LOADSTATUS.LOAD) {
                this._setLoadStatus(status ? LOADSTATUS.PULL : LOADSTATUS.NOMORE);
            }
        }

        /**
         * @method _refreshLoadMore
         * @skip
         * @private
         * @description 更新useLoadMore属性时的逻辑（该逻辑必须放到refresh之后，因为refresh才会计算的到正确的scrollerHeight）
         *
         * 1. 如果是去掉useLoadMore，需要重新设置位置（因为scrollerHeight变少了）
         * 2. 如果是加上useLoadMore，需要设置LoadMore的位置（此时的scrollerHeight是包括loadMoreHeight的，所以需要减去loadMoreHHeight）
         */

    }, {
        key: '_refreshLoadMore',
        value: function _refreshLoadMore() {
            if (!this.state.useLoadMore) {
                this._resetPosition();
            } else {
                if (this.refs.LoadMore) {
                    this.refs.LoadMore.style.top = this.scrollerHeight - this.props.loadMoreHeight + 'px';
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _props = this.props,
                extraClass = _props.extraClass,
                containerExtraClass = _props.containerExtraClass,
                pullRefreshHeight = _props.pullRefreshHeight,
                loadMoreHeight = _props.loadMoreHeight,
                stickyOffset = _props.stickyOffset;

            var pullRefreshContent = void 0;
            var loadMoreContent = void 0;

            if (this.state.usePullRefresh) {
                var pullRefreshTpl = _react2.default.createElement(
                    'div',
                    {
                        ref: 'pullrefresh',
                        className: 'yo-load',
                        style: {
                            height: pullRefreshHeight + 'px',
                            lineHeight: pullRefreshHeight + 'px',
                            top: -pullRefreshHeight + 'px'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_pull' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF07B'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_release' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF079'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u91CA\u653E\u7ACB\u5373\u66F4\u65B0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_load' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-loading' },
                            '\uF089'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52AA\u529B\u52A0\u8F7D\u4E2D...'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_success' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-succ' },
                            '\uF078'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52A0\u8F7D\u6210\u529F'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_fail' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-fail' },
                            '\uF077'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52A0\u8F7D\u5931\u8D25'
                        )
                    )
                );

                pullRefreshContent = this.props.renderPullRefresh ? this.props.renderPullRefresh() : pullRefreshTpl;
            }

            if (this.state.useLoadMore) {
                var loadMoreTpl = _react2.default.createElement(
                    'div',
                    {
                        ref: 'LoadMore',
                        className: 'yo-load',
                        style: {
                            height: loadMoreHeight + 'px',
                            lineHeight: loadMoreHeight + 'px',
                            top: -loadMoreHeight + 'px'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_pull' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF079'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_release' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF07B'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u91CA\u653E\u7ACB\u5373\u52A0\u8F7D'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_load' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-loading' },
                            '\uF089'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u6B63\u5728\u52A0\u8F7D...'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_nomore' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u6CA1\u6709\u66F4\u591A\u4E86...'
                        )
                    )
                );

                loadMoreContent = this.props.renderLoadMore ? this.props.renderLoadMore() : loadMoreTpl;
            }

            var wrapperStyle = Object.assign({ overflow: 'hidden' }, this.props.style);
            var scrollerStyle = Object.assign({}, this.props.containerExtraStyle, this._scrollerStyle);
            var scrollerContent = void 0;
            var _wrapperClassName = (0, _classnames2.default)('yo-scroller', extraClass);
            var _scrollerClassName = (0, _classnames2.default)('scroller', containerExtraClass);

            if (this.noWrapper) {
                // 1. 不需要滚动容器（只适用于特殊的、内容的宽高已知的情况）
                scrollerContent = _react2.default.cloneElement(this.props.children, {
                    ref: 'scroller',
                    onTouchStart: function onTouchStart(evt) {
                        return _this9._handleTouchStart(evt);
                    },
                    onTouchMove: function onTouchMove(evt) {
                        return _this9._handleTouchMove(evt);
                    },
                    onTouchEnd: function onTouchEnd(evt) {
                        return _this9._handleTouchEnd(evt);
                    },
                    onTouchCancel: function onTouchCancel(evt) {
                        return _this9._handleTouchEnd(evt);
                    },
                    onTransitionEnd: function onTransitionEnd(evt) {
                        return _this9._handleTransitionEnd(evt);
                    }
                });
            } else if (this.props.children && !this.props.children.length && typeof this.props.children.type === 'string' && !this.state.usePullRefresh && !this.state.useLoadMore) {
                // 2. 将内容的最外层节点当做滚动容器
                if (this.props.children.props && this.props.children.props.className) {
                    _scrollerClassName = (0, _classnames2.default)('scroller', this.props.children.props.className);
                } else {
                    _scrollerClassName = 'scroller';
                }

                var content = _react2.default.cloneElement(this.props.children, {
                    ref: 'scroller',
                    className: _scrollerClassName,
                    style: scrollerStyle
                });

                scrollerContent = _react2.default.createElement(
                    'div',
                    {
                        ref: 'wrapper',
                        className: _wrapperClassName,
                        onTouchStart: function onTouchStart(evt) {
                            return _this9._handleTouchStart(evt);
                        },
                        onTouchMove: function onTouchMove(evt) {
                            return _this9._handleTouchMove(evt);
                        },
                        onTouchEnd: function onTouchEnd(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTouchCancel: function onTouchCancel(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTransitionEnd: function onTransitionEnd(evt) {
                            return _this9._handleTransitionEnd(evt);
                        },
                        style: wrapperStyle
                    },
                    _react2.default.createElement('div', {
                        ref: 'stickyNode',
                        style: { position: 'absolute', top: stickyOffset, left: 0, right: 0, zIndex: 9999 },
                        className: 'sticky'
                    }),
                    content
                );
            } else {
                // 3. 在内容的外面加一层滚动容器
                scrollerContent = _react2.default.createElement(
                    'div',
                    {
                        ref: 'wrapper',
                        className: _wrapperClassName,
                        onTouchStart: function onTouchStart(evt) {
                            return _this9._handleTouchStart(evt);
                        },
                        onTouchMove: function onTouchMove(evt) {
                            return _this9._handleTouchMove(evt);
                        },
                        onTouchEnd: function onTouchEnd(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTouchCancel: function onTouchCancel(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTransitionEnd: function onTransitionEnd(evt) {
                            return _this9._handleTransitionEnd(evt);
                        },
                        style: wrapperStyle
                    },
                    _react2.default.createElement('div', {
                        ref: 'stickyNode',
                        style: { position: 'absolute', top: stickyOffset, left: 0, right: 0, zIndex: 9999 },
                        className: 'sticky'
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: _scrollerClassName, ref: 'scroller', style: scrollerStyle },
                        this.props.children,
                        pullRefreshContent,
                        loadMoreContent
                    )
                );
            }

            return scrollerContent;
        }
    }]);

    return Scroller;
}(_react.Component);

Scroller.ease = _utils2.default.ease;
Scroller.childContextTypes = {
    scroller: _react.PropTypes.object,
    isScroller: _react.PropTypes.bool
};
exports.default = Scroller;


Scroller.defaultProps = defaultProps;
Scroller.propTypes = propTypes;
Scroller.Sticky = _sticky2.default;
Scroller.LazyImage = _lazyimage2.default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = function () {
    var me = {};
    var _elementStyle = document.createElement('div').style;

    var _vendor = function () {
        var vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT'];
        var transform = void 0;

        for (var i = 0, l = vendors.length; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    }();

    var _prefixStyle = function _prefixStyle(style) {
        if (_vendor === false) {
            return false;
        }
        if (_vendor === '') {
            return style;
        }
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    };

    me.getTime = Date.now || function getTime() {
        return new Date().getTime();
    };

    me.getRAF = function () {
        function basicRAF(callback) {
            return window.setTimeout(callback, 1000 / 60);
        }

        var rAF = window.cancelAnimationFrame && window.requestAnimationFrame || window.webkitCancelAnimationFrame && window.webkitRequestAnimationFrame || window.mozCancelAnimationFrame && window.mozRequestAnimationFrame || window.oCancelAnimationFrame && window.oRequestAnimationFrame || window.msCancelAnimationFrame && window.msRequestAnimationFrame || basicRAF;

        var cancelrAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

        if (me.isBadAndroid) {
            rAF = basicRAF;
            cancelrAF = window.clearTimeout;
        }

        return { rAF: rAF, cancelrAF: cancelrAF };
    };

    me.extend = function (target, obj) {
        Object.keys(obj).forEach(function (i) {
            target[i] = obj[i];
        });
    };

    me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            destination = void 0,
            duration = void 0;
        var speed = Math.abs(distance) / time;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    var _transform = _prefixStyle('transform');

    me.extend(me, {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    });

    /*
     This should find all Android browsers lower than build 535.19 (both stock browser and webview)
     - galaxy S2 is ok
     - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
     - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     */
    me.isBadAndroid = function () {
        var appVersion = window.navigator.appVersion;
        var _isBadAndroid = false;
        // Android browser is not a chrome browser.
        if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
            var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
            if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : _typeof(safariVersion)) === 'object' && safariVersion.length >= 2) {
                _isBadAndroid = parseFloat(safariVersion[1]) < 535.19;
            } else {
                _isBadAndroid = true;
            }
        } else {
            _isBadAndroid = false;
        }

        return _isBadAndroid;
    }();

    me.extend(me.style = {}, {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    });

    me.offset = function (el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;

        // jshint -W084
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        // jshint +W084

        return { left: left, top: top };
    };

    me.preventDefaultException = function (el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }

        return false;
    };

    me.extend(me.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1

        // mousedown: 2,
        // mousemove: 2,
        // mouseup: 2,
        //
        // pointerdown: 3,
        // pointermove: 3,
        // pointerup: 3,
        //
        // MSPointerDown: 3,
        // MSPointerMove: 3,
        // MSPointerUp: 3
    });

    me.extend(me.ease = {}, {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function fn(k) {
                return k * (2 - k);
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function fn(k) {
                var _k = k - 1;
                return Math.sqrt(1 - _k * _k);
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function fn(k) {
                var b = 4;
                var _k = k - 1;
                return _k * _k * ((b + 1) * _k + b) + 1;
            }
        },
        bounce: {
            style: '',
            fn: function fn(k) {
                var y = void 0,
                    _k = k;

                if (_k / 1 < 1 / 2.75) {
                    _k = _k / 1;
                    y = 7.5625 * _k * _k;
                } else if (k < 2 / 2.75) {
                    _k -= 1.5 / 2.75;
                    y = 7.5625 * _k * _k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    _k -= 2.25 / 2.75;
                    y = 7.5625 * _k * _k + 0.9375;
                } else {
                    _k -= 2.625 / 2.75;
                    y = 7.5625 * _k * _k + 0.984375;
                }

                return y;
            }
        },
        elastic: {
            style: '',
            fn: function fn(k) {
                var f = 0.22,
                    e = 0.4;

                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }

                return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
            }
        }
    });

    return me;
}();

exports.default = utils;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "utils.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(54);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _util = __webpack_require__(49);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Sticky
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description `Sticky` 组件，只能在 `Scroller` 内部或者列表系列组件的 `staticSection` 中使用，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 它内部的子元素在 `Scroller` 滚动时将会获得吸顶效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * `Sticky` 是一个虚拟组件，它只会给它的唯一子元素添加额外的逻辑，而不会改变原有的 `dom` 结构。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./sticky.md}{instruUrl: scroller/sticky.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version  3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Sticky = function (_Component) {
    _inherits(Sticky, _Component);

    function Sticky() {
        _classCallCheck(this, Sticky);

        var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this));

        _this.domNode = null;
        _this.height = null;
        _this.offsetTop = null;
        _this.className = null;
        return _this;
    }

    _createClass(Sticky, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scroller = this.context.scroller;

            if (this.scroller) {
                this.initialize();
                this.scroller.stickyHeaders.push(this);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.initialize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this2 = this;

            if (this.scroller) {
                this.scroller.stickyHeaders = this.scroller.stickyHeaders.filter(function (header) {
                    return header !== _this2;
                });
            }
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            var height = this.props.height;

            this.domNode = _reactDom2.default.findDOMNode(this);
            if (height == null) {
                this.height = this.domNode.offsetHeight;
            } else {
                this.height = this.props.height;
            }
            this.offsetTop = (0, _util.getElementOffsetY)(this.domNode, null);
            this.className = this.domNode.className;
            this.onlyChild = _react2.default.Children.only(this.props.children);
            this.stickyExtraClass = this.props.stickyExtraClass;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return Sticky;
}(_react.Component);

Sticky.propTypes = {
    /**
     * @property stickyExtraClass
     * @type String
     * @default null
     * @description 在Sticky的子元素处在吸顶状态时，为Scroller的sticky容器添加的额外样式类。
     */
    stickyExtraClass: _react.PropTypes.string,
    /**
     * @property height
     * @type number
     * @default null
     * @version 3.0.6
     * @description 吸顶元素的高度，在infinite的列表组件的staticSection中使用时，设置这个属性可以提高列表的滚动性能。
     */
    height: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
};
Sticky.defaultProps = {
    stickyExtraClass: ''
};
Sticky.contextTypes = {
    scroller: _react.PropTypes.object
};
exports.default = Sticky;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.TAP_DELAY = undefined;

var _reactDom = __webpack_require__(54);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TAP_SLOP = 5; /**
                   * touchable手势处理,解决Scroller内部的手势冲突
                   * 在滚动时不会触发active
                   * 在active之后发生滚动会取消active状态
                   */
var TAP_DELAY = exports.TAP_DELAY = 50;
/**
 * @param endPoint
 * @param startPoint
 * @returns {number}
 * 根据个点的坐标计算出位移
 */
function getDistance(endPoint, startPoint) {
    return Math.sqrt(Math.pow(endPoint.pageX - startPoint.pageX, 2) + Math.pow(endPoint.pageY - startPoint.pageY, 2));
}

/**
 * @param endPoint
 * @param startPoint
 * @returns {boolean}
 * 根据两个点的位移判断是否应该取消Tap事件的触发
 */
function onTouchMoveShouldCancelTap(endPoint, startPoint) {
    return getDistance(endPoint, startPoint) > TAP_SLOP;
}

/**
 * @param evt
 * @returns {touch/null}
 * 获取触点
 */
function getTouchPoint(evt) {
    return evt.touches.length ? { pageX: evt.touches[0].pageX, pageY: evt.touches[0].pageY } : null;
}

/**
 * @param domNode
 * @param activeClass
 * 移除item的activeClass
 */
function removeActiveClass(domNode, activeClass) {
    if (domNode && activeClass) {
        domNode.className = domNode.className.replace(' ' + activeClass, '');
    }
}

/**
 * @param scroller
 * @returns {boolean}
 * 判断组件是否在滚动
 */
function isScrolling(scroller) {
    return scroller ? scroller.isScrolling : false;
}

function isAnySwipeMenuOpen(swipeMenuList) {
    return swipeMenuList ? swipeMenuList.openIndex !== -1 : false;
}

// touchStart的位置,是否需要放弃Tap触发,Tap周期(start,move,end)是否已经结束
var startPoint = void 0,
    shouldAbortTap = void 0;
var captured = null;

function _default(component, scroller, swipeMenuList, activeClass, onTap, _onTouchStart) {
    var gestureObj = {
        onTouchStart: function onTouchStart(evt) {
            var domNode = _reactDom2.default.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
            // 如果组件正在滚动,直接放弃Tap触发
            shouldAbortTap = isScrolling(scroller) || isAnySwipeMenuOpen(swipeMenuList);
            startPoint = getTouchPoint(evt);
            _onTouchStart(evt);
            if (!captured) {
                captured = domNode;
            }
            // TAP_DELAY之后再次判断是否要触发Tap,如果这段时间内出现了大的位移,if后面的逻辑就不会执行
            setTimeout(function () {
                var className = activeClass;
                if (!shouldAbortTap && className && captured === domNode) {
                    domNode.className += ' ' + className;
                }
            }, TAP_DELAY);
        },
        onTouchMove: function onTouchMove(evt) {
            var domNode = _reactDom2.default.findDOMNode(component);
            var currentPoint = getTouchPoint(evt);
            // 根据touchmove的距离判断是否要放弃tap
            if (onTouchMoveShouldCancelTap(currentPoint, startPoint)) {
                shouldAbortTap = true;
                captured = null;
                removeActiveClass(domNode, activeClass);
            }
        },
        onTouchEnd: function onTouchEnd(evt) {
            var target = evt.target;
            var domNode = _reactDom2.default.findDOMNode(component);
            // 如果需要触发tap,在TAP_DELAY之后触发onTap回调
            if (!shouldAbortTap && captured === domNode) {
                setTimeout(function () {
                    onTap(target);
                    removeActiveClass(domNode, activeClass);
                    captured = null;
                }, TAP_DELAY + 10);
            } else if (shouldAbortTap) {
                captured = null;
            }
        },
        onTouchCancel: function onTouchCancel() {
            var domNode = _reactDom2.default.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
        }
    };

    return gestureObj;
}
exports.default = _default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "gesture.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _gesture = __webpack_require__(157);

var _gesture2 = _interopRequireDefault(_gesture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Touchable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description `Touchable` 组件是一个"虚拟"组件，它不会真的在文档中创建一个 `dom` 节点作为根节点，而是返回它唯一的子组件的一个克隆，并给它绑定一些手势事件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 除了能给 `dom` 绑定 `tap` 事件之外，它还解决了一些移动端的手势"顽疾"，例如触摸反馈和滚动/触摸的冲突问题。在需要绑定 `tap` 事件的情况下，应该优先使用 `Touchable`，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 而不是直接把 `tap` 事件回调绑定给 `dom`。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./touchable.md}{instruUrl: touchable.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Touchable = function (_Component) {
    _inherits(Touchable, _Component);

    function Touchable() {
        _classCallCheck(this, Touchable);

        return _possibleConstructorReturn(this, (Touchable.__proto__ || Object.getPrototypeOf(Touchable)).apply(this, arguments));
    }

    _createClass(Touchable, [{
        key: 'render',
        value: function render() {
            if (process.env.NODE_ENV !== 'production') {
                if (this.props.touchClass == null && !this.props.internalUse) {
                    console.error('yo-touchable: Touchable组件没有设置touchClass, 出于用户体验考虑, 应该尽量给触摸区域添加触摸反馈。');
                }
            }

            var onlyChild = _react2.default.Children.only(this.props.children);
            var gestureObj = (0, _gesture2.default)(this, this.context.scroller, this.context.swipeMenuList, this.props.touchClass, this.props.onTap, this.props.onTouchStart);
            var onTouchStart = gestureObj.onTouchStart,
                onTouchMove = gestureObj.onTouchMove,
                onTouchEnd = gestureObj.onTouchEnd,
                onTouchCancel = gestureObj.onTouchCancel;


            return _react2.default.cloneElement(onlyChild, { onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onTouchCancel: onTouchCancel });
        }
    }]);

    return Touchable;
}(_react.Component);

Touchable.propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 触摸Touchable时附加的className，可以用来实现Native常见的触摸反馈功能(例如给触摸区域添加深色背景或者改变透明度等等)。
     */
    touchClass: _react.PropTypes.string,
    /**
     * @property onTap
     * @type Function
     * @default null
     * @param {DOMElement} target tap事件的target
     * @description 给Touchable绑定的onTap事件。
     */
    onTap: _react.PropTypes.func,
    /**
     * @skip 给List定制的属性
     */
    onTouchStart: _react.PropTypes.func,
    /**
     * @skip 内部使用标志
     */
    internalUse: _react.PropTypes.bool,
    children: _react.PropTypes.object
};
Touchable.defaultProps = {
    onTouchStart: function onTouchStart() {},
    touchClass: null,
    onTap: function onTap() {},
    internalUse: false
};
Touchable.contextTypes = {
    scroller: _react.PropTypes.object,
    swipeMenuList: _react.PropTypes.object
};
exports.default = Touchable;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\project\\react-project\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(54);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(94);

var _index = __webpack_require__(136);

var _index2 = _interopRequireDefault(_index);

var _board = __webpack_require__(134);

var _board2 = _interopRequireDefault(_board);

var _search = __webpack_require__(138);

var _search2 = _interopRequireDefault(_search);

var _cart = __webpack_require__(135);

var _cart2 = _interopRequireDefault(_cart);

var _my = __webpack_require__(137);

var _my2 = _interopRequireDefault(_my);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(139);

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.hashHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _index2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _board2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'board', component: _board2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'search', component: _search2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'cart', component: _cart2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'my', component: _my2.default })
  )
), document.getElementById('root'));

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\project\\react-project\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "app.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(170);

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = {
  topAbort: null,
  topAnimationEnd: null,
  topAnimationIteration: null,
  topAnimationStart: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topInvalid: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topTransitionEnd: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
};

var EventConstants = {
  topLevelTypes: topLevelTypes
};

module.exports = EventConstants;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(50);

var invariant = __webpack_require__(42);

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : _prodInvariant('96', pluginName) : void 0;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : _prodInvariant('97', pluginName) : void 0;
    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : _prodInvariant('98', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : _prodInvariant('99', eventName) : void 0;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : _prodInvariant('100', registrationName) : void 0;
  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  if (process.env.NODE_ENV !== 'production') {
    var lowerCasedName = registrationName.toLowerCase();
    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in __DEV__.
   * @type {Object}
   */
  possibleRegistrationNames: process.env.NODE_ENV !== 'production' ? {} : null,
  // Trust the developer to only use possibleRegistrationNames in __DEV__

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (injectedEventPluginOrder) {
    !!eventPluginOrder ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : _prodInvariant('101') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
        !!namesToPlugins[pluginName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : _prodInvariant('102', pluginName) : void 0;
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function (event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    if (dispatchConfig.phasedRegistrationNames !== undefined) {
      // pulling phasedRegistrationNames out of dispatchConfig helps Flow see
      // that it is not undefined.
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

      for (var phase in phasedRegistrationNames) {
        if (!phasedRegistrationNames.hasOwnProperty(phase)) {
          continue;
        }
        var pluginModule = EventPluginRegistry.registrationNameModules[phasedRegistrationNames[phase]];
        if (pluginModule) {
          return pluginModule;
        }
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function () {
    eventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      var possibleRegistrationNames = EventPluginRegistry.possibleRegistrationNames;
      for (var lowerCasedName in possibleRegistrationNames) {
        if (possibleRegistrationNames.hasOwnProperty(lowerCasedName)) {
          delete possibleRegistrationNames[lowerCasedName];
        }
      }
    }
  }

};

module.exports = EventPluginRegistry;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var EventPluginHub = __webpack_require__(98);
var EventPluginUtils = __webpack_require__(67);

var accumulateInto = __webpack_require__(100);
var forEachAccumulated = __webpack_require__(101);
var warning = __webpack_require__(66);

var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(inst, 'Dispatching inst must not be null') : void 0;
  }
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginUtils.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? EventPluginUtils.getParentInstance(targetInst) : null;
    EventPluginUtils.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  EventPluginUtils.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(50);

var invariant = __webpack_require__(42);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(359);

var PooledClass = __webpack_require__(165);

var emptyFunction = __webpack_require__(95);
var warning = __webpack_require__(66);

var didWarnForAddedNewProperty = false;
var isProxySupported = typeof Proxy === 'function';

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  if (process.env.NODE_ENV !== 'production') {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    if (process.env.NODE_ENV !== 'production') {
      delete this[propName]; // this has a getter/setter for warnings
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  return this;
}

_assign(SyntheticEvent.prototype, {

  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      // eslint-disable-line valid-typeof
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // eslint-disable-line valid-typeof
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (process.env.NODE_ENV !== 'production') {
        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
      } else {
        this[propName] = null;
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    if (process.env.NODE_ENV !== 'production') {
      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
    }
  }

});

SyntheticEvent.Interface = EventInterface;

if (process.env.NODE_ENV !== 'production') {
  if (isProxySupported) {
    /*eslint-disable no-func-assign */
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function (target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function (constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function (target, prop, value) {
            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
              process.env.NODE_ENV !== 'production' ? warning(didWarnForAddedNewProperty || target.isPersistent(), 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re adding a new property in the synthetic event object. ' + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
    });
    /*eslint-enable no-func-assign */
  }
}
/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  _assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = _assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);

module.exports = SyntheticEvent;

/**
  * Helper to nullify syntheticEvent instance properties when destructing
  *
  * @param {object} SyntheticEvent
  * @param {String} propName
  * @return {object} defineProperty object
  */
function getPooledWarningPropertyDefinition(propName, getVal) {
  var isFunction = typeof getVal === 'function';
  return {
    configurable: true,
    set: set,
    get: get
  };

  function set(val) {
    var action = isFunction ? 'setting the method' : 'setting the property';
    warn(action, 'This is effectively a no-op');
    return val;
  }

  function get() {
    var action = isFunction ? 'accessing the method' : 'accessing the property';
    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
    warn(action, result);
    return getVal;
  }

  function warn(action, result) {
    var warningCondition = false;
    process.env.NODE_ENV !== 'production' ? warning(warningCondition, 'This synthetic event is reused for performance reasons. If you\'re seeing this, ' + 'you\'re %s `%s` on a released/nullified synthetic event. %s. ' + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var SyntheticEvent = __webpack_require__(166);

var getEventTarget = __webpack_require__(169);

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var shallowCompare = __webpack_require__(102);

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 *
 * See https://facebook.github.io/react/docs/pure-render-mixin.html
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TapEventPlugin
 * @typechecks static-only
 */



var EventConstants = __webpack_require__(162);
var EventPluginUtils = __webpack_require__(67);
var EventPropagators = __webpack_require__(164);
var SyntheticUIEvent = __webpack_require__(167);
var TouchEventUtils = __webpack_require__(172);
var ViewportMetrics = __webpack_require__(168);

var keyOf = __webpack_require__(141);
var topLevelTypes = EventConstants.topLevelTypes;

var isStartish = EventPluginUtils.isStartish;
var isEndish = EventPluginUtils.isEndish;

var isTouch = function(topLevelType) {
  var touchTypes = [
    'topTouchCancel',
    'topTouchEnd',
    'topTouchStart',
    'topTouchMove'
  ];
  return touchTypes.indexOf(topLevelType) >= 0;
}

/**
 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
 * in order to still be considered a 'tap' event.
 */
var tapMoveThreshold = 10;
var ignoreMouseThreshold = 750;
var startCoords = {x: null, y: null};
var lastTouchEvent = null;

var Axis = {
  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
};

function getAxisCoordOfEvent(axis, nativeEvent) {
  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
  if (singleTouch) {
    return singleTouch[axis.page];
  }
  return axis.page in nativeEvent ?
    nativeEvent[axis.page] :
    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
}

function getDistance(coords, nativeEvent) {
  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
  return Math.pow(
    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
    0.5
  );
}

var touchEvents = [
  'topTouchStart',
  'topTouchCancel',
  'topTouchEnd',
  'topTouchMove',
];

var dependencies = [
  'topMouseDown',
  'topMouseMove',
  'topMouseUp',
].concat(touchEvents);

var eventTypes = {
  touchTap: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchTap: null}),
      captured: keyOf({onTouchTapCapture: null})
    },
    dependencies: dependencies
  }
};

var now = (function() {
  if (Date.now) {
    return Date.now;
  } else {
    // IE8 support: http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in
    return function () {
      return +new Date;
    }
  }
})();

function createTapEventPlugin(shouldRejectClick) {
  return {

    tapMoveThreshold: tapMoveThreshold,

    ignoreMouseThreshold: ignoreMouseThreshold,

    eventTypes: eventTypes,

    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} targetInst The listening component root node.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {

      if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
        return null;
      }

      if (isTouch(topLevelType)) {
        lastTouchEvent = now();
      } else {
        if (shouldRejectClick(lastTouchEvent, now())) {
          return null;
        }
      }

      var event = null;
      var distance = getDistance(startCoords, nativeEvent);
      if (isEndish(topLevelType) && distance < tapMoveThreshold) {
        event = SyntheticUIEvent.getPooled(
          eventTypes.touchTap,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      if (isStartish(topLevelType)) {
        startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
        startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
      } else if (isEndish(topLevelType)) {
        startCoords.x = 0;
        startCoords.y = 0;
      }
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }

  };
}

module.exports = createTapEventPlugin;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TouchEventUtils
 */

var TouchEventUtils = {
  /**
   * Utility function for common case of extracting out the primary touch from a
   * touch event.
   * - `touchEnd` events usually do not have the `touches` property.
   *   http://stackoverflow.com/questions/3666929/
   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
   *
   * @param {Event} nativeEvent Native event that may or may not be a touch.
   * @return {TouchesObject?} an object with pageX and pageY or null.
   */
  extractSingleTouch: function(nativeEvent) {
    var touches = nativeEvent.touches;
    var changedTouches = nativeEvent.changedTouches;
    var hasTouches = touches && touches.length > 0;
    var hasChangedTouches = changedTouches && changedTouches.length > 0;

    return !hasTouches && hasChangedTouches ? changedTouches[0] :
           hasTouches ? touches[0] :
           nativeEvent;
  }
};

module.exports = TouchEventUtils;


/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = function(lastTouchEvent, clickTimestamp) {
  if (lastTouchEvent && (clickTimestamp - lastTouchEvent) < 750) {
    return true;
  }
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var invariant = __webpack_require__(42);
var defaultClickRejectionStrategy = __webpack_require__(173);

var alreadyInjected = false;

module.exports = function injectTapEventPlugin (strategyOverrides) {
  strategyOverrides = strategyOverrides || {}
  var shouldRejectClick = strategyOverrides.shouldRejectClick || defaultClickRejectionStrategy;

  if (process.env.NODE_ENV !== 'production') {
    invariant(
      !alreadyInjected,
      'injectTapEventPlugin(): Can only be called once per application lifecycle.\n\n\
It is recommended to call injectTapEventPlugin() just before you call \
ReactDOM.render(). If you are using an external library which calls injectTapEventPlugin() \
itself, please contact the maintainer as it shouldn\'t be called in library code and \
should be injected by the application.'
    )
  }

  alreadyInjected = true;

  __webpack_require__(98).injection.injectEventPluginsByName({
    'TapEventPlugin':       __webpack_require__(171)(shouldRejectClick)
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 177 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(187);
module.exports = __webpack_require__(26).RegExp.escape;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(76)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(179);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(25)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(37)
  , gOPS    = __webpack_require__(63)
  , pIE     = __webpack_require__(53);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(37)
  , toIObject = __webpack_require__(17);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(185)
  , invoke    = __webpack_require__(59)
  , aFunction = __webpack_require__(13);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(186)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(107)});

__webpack_require__(44)('copyWithin');

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(23)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(68)});

__webpack_require__(44)('fill');

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(23)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(23)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(44)(KEY);

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(23)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(44)(KEY);

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(23)(0)
  , STRICT   = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(27)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(10)
  , call           = __webpack_require__(116)
  , isArrayIter    = __webpack_require__(75)
  , toLength       = __webpack_require__(9)
  , createProperty = __webpack_require__(69)
  , getIterFn      = __webpack_require__(92);

$export($export.S + $export.F * !__webpack_require__(61)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(55)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(76)});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(17)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(52) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(17)
  , toInteger     = __webpack_require__(32)
  , toLength      = __webpack_require__(9)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(23)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(69);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(109);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(109);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(73)
  , cof        = __webpack_require__(20)
  , toIndex    = __webpack_require__(40)
  , toLength   = __webpack_require__(9)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(23)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(10)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39)('Array');

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(10)
  , toPrimitive = __webpack_require__(25);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(14)(proto, TO_PRIMITIVE, __webpack_require__(181));

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(15)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(110)});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(19)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(7).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7).f
  , createDesc = __webpack_require__(31)
  , has        = __webpack_require__(12)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(118)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(80);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(79);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(80)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(118)});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(80)});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(79)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(79)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(12)
  , cof               = __webpack_require__(20)
  , inheritIfRequired = __webpack_require__(74)
  , toPrimitive       = __webpack_require__(25)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(36).f
  , gOPD              = __webpack_require__(18).f
  , dP                = __webpack_require__(7).f
  , $trim             = __webpack_require__(48).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(35)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(15)(global, NUMBER, $Number);
}

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(115)});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(115)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(125);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(126);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(32)
  , aNumberValue = __webpack_require__(106)
  , repeat       = __webpack_require__(87)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(106)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(119)});

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(35)});

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(120)});

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(7).f});

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(17)
  , $getOwnPropertyDescriptor = __webpack_require__(18).f;

__webpack_require__(24)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(24)('getOwnPropertyNames', function(){
  return __webpack_require__(121).f;
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(10)
  , $getPrototypeOf = __webpack_require__(19);

__webpack_require__(24)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(24)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(127)});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(10)
  , $keys    = __webpack_require__(37);

__webpack_require__(24)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(24)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(82).set});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(51)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(15)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(125);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(126);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(34)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(27)
  , classof            = __webpack_require__(51)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(13)
  , anInstance         = __webpack_require__(33)
  , forOf              = __webpack_require__(45)
  , speciesConstructor = __webpack_require__(84)
  , task               = __webpack_require__(89).set
  , microtask          = __webpack_require__(81)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(38)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(47)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(26)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(35)
  , aFunction  = __webpack_require__(13)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(110)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(7)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(25);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(18).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(77)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(18)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(19)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(18)
  , getPrototypeOf = __webpack_require__(19)
  , has            = __webpack_require__(12)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(124)});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(82);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(7)
  , gOPD           = __webpack_require__(18)
  , getPrototypeOf = __webpack_require__(19)
  , has            = __webpack_require__(12)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(31)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(74)
  , dP                = __webpack_require__(7).f
  , gOPN              = __webpack_require__(36).f
  , isRegExp          = __webpack_require__(60)
  , $flags            = __webpack_require__(58)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(15)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(57)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(57)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(57)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(57)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(60)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(131);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(58)
  , DESCRIPTORS = __webpack_require__(6)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(15)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(16)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(16)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(16)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(16)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(85)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(9)
  , context   = __webpack_require__(86)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(72)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(16)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(16)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(16)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(40)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(86)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(72)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(16)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(85)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(78)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(16)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(17)
  , toLength  = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(87)
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(16)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(9)
  , context     = __webpack_require__(86)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(72)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(16)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(16)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(16)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(48)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(15)
  , META           = __webpack_require__(30).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(64)
  , setToStringTag = __webpack_require__(47)
  , uid            = __webpack_require__(41)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(129)
  , wksDefine      = __webpack_require__(91)
  , keyOf          = __webpack_require__(183)
  , enumKeys       = __webpack_require__(182)
  , isArray        = __webpack_require__(76)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(17)
  , toPrimitive    = __webpack_require__(25)
  , createDesc     = __webpack_require__(31)
  , _create        = __webpack_require__(35)
  , gOPNExt        = __webpack_require__(121)
  , $GOPD          = __webpack_require__(18)
  , $DP            = __webpack_require__(7)
  , $keys          = __webpack_require__(37)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(36).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(53).f  = $propertyIsEnumerable;
  __webpack_require__(63).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(34)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(65)
  , buffer       = __webpack_require__(90)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(40)
  , toLength     = __webpack_require__(9)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(84)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(65).ABV, {
  DataView: __webpack_require__(90).DataView
});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(113);

// 23.4 WeakSet Objects
__webpack_require__(56)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(55)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(44)('includes');

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(81)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(112)('Map')});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(10)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(10)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(123)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(124)
  , toIObject      = __webpack_require__(17)
  , gOPD           = __webpack_require__(18)
  , createProperty = __webpack_require__(69);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(10)
  , toPrimitive              = __webpack_require__(25)
  , getPrototypeOf           = __webpack_require__(19)
  , getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(10)
  , toPrimitive              = __webpack_require__(25)
  , getPrototypeOf           = __webpack_require__(19)
  , getOwnPropertyDescriptor = __webpack_require__(18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(123)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(26)
  , microtask   = __webpack_require__(81)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(13)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(33)
  , redefineAll = __webpack_require__(38)
  , hide        = __webpack_require__(14)
  , forOf       = __webpack_require__(45)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(39)('Observable');

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(132)
  , from                    = __webpack_require__(108)
  , metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(19)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(19)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(28)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(19)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(28)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(28)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(13)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(112)('Set')});

/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(85)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(21)
  , toLength    = __webpack_require__(9)
  , isRegExp    = __webpack_require__(60)
  , getFlags    = __webpack_require__(58)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(77)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(128);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(128);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(48)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91)('asyncIterator');

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91)('observable');

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(93)
  , redefine      = __webpack_require__(15)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(14)
  , Iterators     = __webpack_require__(46)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(89);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(59)
  , partial    = __webpack_require__(184)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(307);
__webpack_require__(246);
__webpack_require__(248);
__webpack_require__(247);
__webpack_require__(250);
__webpack_require__(252);
__webpack_require__(257);
__webpack_require__(251);
__webpack_require__(249);
__webpack_require__(259);
__webpack_require__(258);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(253);
__webpack_require__(245);
__webpack_require__(256);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(213);
__webpack_require__(215);
__webpack_require__(214);
__webpack_require__(263);
__webpack_require__(262);
__webpack_require__(233);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(294);
__webpack_require__(299);
__webpack_require__(306);
__webpack_require__(297);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(295);
__webpack_require__(300);
__webpack_require__(302);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(296);
__webpack_require__(298);
__webpack_require__(301);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(208);
__webpack_require__(210);
__webpack_require__(209);
__webpack_require__(212);
__webpack_require__(211);
__webpack_require__(197);
__webpack_require__(195);
__webpack_require__(201);
__webpack_require__(198);
__webpack_require__(204);
__webpack_require__(206);
__webpack_require__(194);
__webpack_require__(200);
__webpack_require__(191);
__webpack_require__(205);
__webpack_require__(189);
__webpack_require__(203);
__webpack_require__(202);
__webpack_require__(196);
__webpack_require__(199);
__webpack_require__(188);
__webpack_require__(190);
__webpack_require__(193);
__webpack_require__(192);
__webpack_require__(207);
__webpack_require__(93);
__webpack_require__(279);
__webpack_require__(284);
__webpack_require__(131);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(264);
__webpack_require__(130);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(319);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(314);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(312);
__webpack_require__(315);
__webpack_require__(313);
__webpack_require__(316);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(272);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(278);
__webpack_require__(277);
__webpack_require__(320);
__webpack_require__(346);
__webpack_require__(349);
__webpack_require__(348);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(347);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(331);
__webpack_require__(334);
__webpack_require__(330);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(323);
__webpack_require__(345);
__webpack_require__(354);
__webpack_require__(322);
__webpack_require__(324);
__webpack_require__(326);
__webpack_require__(325);
__webpack_require__(327);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(339);
__webpack_require__(338);
__webpack_require__(341);
__webpack_require__(340);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(321);
__webpack_require__(335);
__webpack_require__(357);
__webpack_require__(356);
__webpack_require__(355);
module.exports = __webpack_require__(26);

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(358);

__webpack_require__(140);

__webpack_require__(178);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)))

/***/ })
/******/ ]);