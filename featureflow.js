(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Featureflow"] = factory();
	else
		root["Featureflow"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function EventEmitter() {
    var eventEmitter = {};
    var _listeners = {};

    eventEmitter.initEventEmitter = function () {
        this._listeners = {};
    };

    eventEmitter.initEventEmitterType = function (type) {
        if (!type) {
            return;
        }
        this._listeners[type] = [];
    };

    eventEmitter.hasEventListener = function (type) {
        if (!this.listener) {
            return false;
        }

        if (type && !this.listener[type]) {
            return false;
        }

        return true;
    };

    eventEmitter.addListener = function (type, fn) {
        if (!this._listeners) {
            this.initEventEmitter();
        }
        if (!this._listeners[type]) {
            this.initEventEmitterType(type);
        }
        this._listeners[type].push(fn);

        this.emit('newListener', type, fn);
    };

    eventEmitter.on = eventEmitter.addListener;

    eventEmitter.one = function (type, fn) {
        fn._oneTimeListener = true;
        this.addListener(type, fn);
    };

    eventEmitter.removeListener = function (type, fn) {
        if (!this._listeners) {
            return;
        }
        if (!this._listeners[type]) {
            return;
        }
        if (isNaN(this._listeners[type].length)) {
            return;
        }

        if (!type) {
            this.initEventEmitter();
            this.emit('removeListener', type, fn);
            return;
        }
        if (!fn) {
            this.initEventEmitterType(type);
            this.emit('removeListener', type, fn);
            return;
        }

        var self = this;
        for (var i = 0; i < this._listeners[type].length; i++) {
            (function (listener, index) {
                if (listener === fn) {
                    self._listeners[type].splice(index, 1);
                }
            })(this._listeners[type][i], i);
        }
        this.emit('removeListener', type, fn);
    };

    eventEmitter.emit = function (type) {
        if (!this._listeners) {
            return;
        }
        if (!this._listeners[type]) {
            return;
        }
        if (isNaN(this._listeners[type].length)) {
            return;
        }

        var self = this,
            args = [].slice.call(arguments, 1);

        for (var i = 0; i < this._listeners[type].length; i++) {
            (function (listener) {
                listener.apply(self, args);
                if (listener._oneTimeListener) {
                    self.removeListener(type, listener);
                }
            })(this._listeners[type][i]);
        }
    };

    eventEmitter.listeners = function (type) {
        if (!type) {
            return undefined;
        }
        return this._listeners[type];
    };

    // jquery style alias
    eventEmitter.trigger = eventEmitter.emit;
    eventEmitter.off = eventEmitter.removeListener;

    return eventEmitter;
}

/* harmony default export */ __webpack_exports__["a"] = EventEmitter;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by oliver on 23/11/16.
 */
function FeatureflowContext(context) {
    var featureflowContext = context;

    featureflowContext.update = function (context) {
        context = clone(context);
    };

    featureflowContext.getContext = function () {
        return clone(context);
    };

    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    return featureflowContext;
}

/* harmony default export */ __webpack_exports__["a"] = FeatureflowContext;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getJSON(endpoint, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        if (request.status === 200 && request.getResponseHeader('Content-type') === "application/json;charset=UTF-8") {
            callback(JSON.parse(request.responseText));
        } else {
            callback(request.statusText);
        }
    });
    request.addEventListener('error', function () {
        callback(request.statusText);
    });
    request.open('GET', endpoint);
    request.send();
    return request;
}

function RestClient(baseUrl, apiKey) {
    function base64URLEncode(context) {
        return btoa(JSON.stringify(context)); //.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    }

    return {
        getControls: function getControls(context, callback) {
            var contextData = encodeURI(base64URLEncode(context));
            var url = baseUrl + '/api/js/v1/evaluate/' + apiKey + "/context/" + contextData;
            getJSON(url, callback);
        }
    };
}

/* harmony default export */ __webpack_exports__["a"] = RestClient;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RestClient__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventEmitter__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FeatureflowContext__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var context = void 0;
var restClient = void 0;
var eventEmitter = void 0;
var environment = void 0;
var controlsUrl = void 0;
var baseUrl = void 0;
var EVENT_READY = 'ready';
var EVENT_UPDATED_CONTEXT = 'update:context';
var EVENT_UPDATED_CONTROLS = 'update:controls';

var DEFAULT_CONTEXT_VALUES = {
  key: 'anonymous'
};

var featureflow = {
  controls: {},
  env: {},
  context: {},
  on: on,
  removeListener: removeListener,
  updateContext: updateContext,
  evaluate: evaluate
};

function evaluate(key, failoverValue) {
  return featureflow.controls && featureflow.controls.hasOwnProperty(key) && featureflow.controls[key] !== null ? featureflow.controls[key] : failoverValue;
};

function on(event, handler) {
  eventEmitter.on(event, handler);
}
function removeListener(eventName, listener) {
  eventEmitter.removeListener(eventName, listener);
}

function updateContext(contextVals) {
  context = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__FeatureflowContext__["a" /* default */])(contextVals);
  restClient.getControls(context.getContext(), function (response) {
    localStorage.setItem(environment + ":" + context.getContext().key, JSON.stringify(response));
    featureflow.controls = response;
    featureflow.context = context.getContext();
    eventEmitter.emit(EVENT_UPDATED_CONTEXT, context.getContext());
    eventEmitter.emit(EVENT_UPDATED_CONTROLS, response);
  });
}

function init(apiKey) {
  var contextVals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _extends({}, DEFAULT_CONTEXT_VALUES);
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  featureflow.controls = {};
  eventEmitter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__EventEmitter__["a" /* default */])();
  controlsUrl = config.controlsUrl || 'https://controls.featureflow.io';
  baseUrl = config.baseUrl || 'https://app.featureflow.io';
  restClient = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */])(baseUrl, apiKey);

  //1. Set the context
  context = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__FeatureflowContext__["a" /* default */])(contextVals);

  //2. Load evaluated controls from featureflow
  restClient.getControls(context.getContext(), function (response) {
    localStorage.setItem(environment + ":" + context.getContext().key, JSON.stringify(response));
    featureflow.controls = response;
    featureflow.context = context.getContext();
    eventEmitter.emit(EVENT_READY);
  });

  // //3. Set up SSE if required
  // let es = new window.EventSource(baseUrl + '/api/js/v1/stream/' + apiKey);
  // //.add("Accept", "text/event-stream")
  // es.addEventListener('message', function (e) {
  //   console.log(e.data);
  //   //alert('got event: ' + e);
  //   //reevaluate control
  //   eventEmitter.emit(EVENT_UPDATED_CONTEXT);
  // }, false);
  //4. Send an event

  return featureflow;
}

/* harmony default export */ __webpack_exports__["default"] = {
  init: init
};

if (window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ })
/******/ ]);
});