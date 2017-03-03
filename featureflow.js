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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function getJSON(endpoint, callback) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', function () {
    if (request.status === 200 && request.getResponseHeader('Content-type') === "application/json;charset=UTF-8") {
      callback(null, JSON.parse(request.responseText));
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

function base64URLEncode(context) {
  return btoa(JSON.stringify(context));
}

/* harmony default export */ __webpack_exports__["a"] = {
  getFeatures: function getFeatures(baseUrl, apiKey, context) {
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var callback = arguments[4];

    var query = keys.length > 0 ? '?keys=' + keys.join(',') : '';
    getJSON(baseUrl + '/api/js/v1/evaluate/' + apiKey + '/context/' + encodeURI(base64URLEncode(context)) + query, callback);
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RestClient__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tiny_emitter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var DEFAULT_CONTEXT_VALUES = {
  key: 'anonymous'
};

var DEFAULT_BASE_URL = 'https://app.featureflow.io';
var DEFAULT_RTM_URL = 'https://rtm.featureflow.io';

var DEFAULT_CONFIG = {
  baseUrl: DEFAULT_BASE_URL,
  rtmUrl: DEFAULT_RTM_URL,
  streaming: true,
  defaultFeatures: {}
};

var INIT_MODULE_ERROR = new Error('init() has not been called with a valid apiKey');

var events = {
  LOADED: 'LOADED',
  ERROR: 'ERROR',
  UPDATED_FEATURE: 'UPDATED_FEATURE'
};

function init(apiKey) {
  var _context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var features = {};
  var config = void 0;
  var context = void 0;
  var emitter = new __WEBPACK_IMPORTED_MODULE_1_tiny_emitter___default.a();

  //1. They must have an api key
  if (!apiKey) {
    throw INIT_MODULE_ERROR;
  }

  //2. Extend the default configuration
  config = _extends({}, DEFAULT_CONFIG, _config);

  //3. Load initial data
  updateContext(_context);

  //4. Set up realtime streaming
  if (config.streaming) {
    var es = new window.EventSource(config.rtmUrl + '/api/js/v1/stream/' + apiKey);
    es.onmessage = function (e) {
      var keys = [];
      try {
        keys = JSON.parse(e.data);
      } catch (err) {
        //Ah well, we tried...
      }

      __WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */].getFeatures(config.baseUrl, apiKey, context, keys, function (error, _features) {
        features = _extends({}, features, _features);
        emitter.emit(events.UPDATED_FEATURE, _features);
      });
    };
  }

  function updateContext(_context) {
    context = _extends({}, DEFAULT_CONTEXT_VALUES, _context);

    try {
      features = JSON.parse(localStorage.getItem('ff:' + context.key + ':' + apiKey) || '{}');
    } catch (err) {
      features = {};
    }

    __WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */].getFeatures(config.baseUrl, apiKey, context, [], function (error, _features) {
      if (!error) {
        features = _features || {};
        localStorage.setItem('ff:' + context.key + ':' + apiKey, JSON.stringify(features));
        emitter.emit(events.LOADED, _features);
      } else {
        emitter.emit(events.ERROR, error);
      }
    });
    return context;
  }

  var Evaluate = function () {
    function Evaluate(key) {
      _classCallCheck(this, Evaluate);

      this.key = key;
    }

    _createClass(Evaluate, [{
      key: 'value',
      value: function value() {
        return features[this.key] || config.defaultFeatures[this.key] || 'off';
      }
    }, {
      key: 'is',
      value: function is(value) {
        return value.toLowerCase() === this.value().toLowerCase();
      }
    }, {
      key: 'isOn',
      value: function isOn() {
        return this.is('on');
      }
    }, {
      key: 'isOff',
      value: function isOff() {
        return this.is('off');
      }
    }]);

    return Evaluate;
  }();

  function getFeatures() {
    return features;
  }

  function getContext() {
    return context;
  }

  return {
    updateContext: updateContext,
    getFeatures: getFeatures,
    getContext: getContext,
    evaluate: function evaluate(value) {
      return new Evaluate(value);
    },
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter)
  };
}

/* harmony default export */ __webpack_exports__["default"] = {
  init: init,
  events: events
};

if (window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2)(module)))

/***/ })
/******/ ]);
});