/*!
 * Featureflow Client v0.2.5
 * Web: https://www.featureflow.io/
 * Date: 2017-03-23T22:53:51.004Z
 * Licence: Apache-2.0
 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LOADED */
/* unused harmony export ERROR */
/* unused harmony export UPDATED_FEATURE */
var LOADED = 'LOADED';
var ERROR = 'ERROR';
var UPDATED_FEATURE = 'UPDATED_FEATURE';

/* harmony default export */ __webpack_exports__["a"] = {
  LOADED: LOADED,
  ERROR: ERROR,
  UPDATED_FEATURE: UPDATED_FEATURE
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RestClient__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Evaluate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tiny_emitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tiny_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_tiny_emitter__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function loadFeatures(apiKey, contextKey) {
  try {
    return JSON.parse(localStorage.getItem('ff:' + contextKey + ':' + apiKey) || '{}');
  } catch (err) {
    return {};
  }
}

function saveFeatures(apiKey, contextKey, features) {
  return localStorage.setItem('ff:' + contextKey + ':' + apiKey, JSON.stringify(features));
}

var FeatureflowClient = function () {
  function FeatureflowClient(apiKey) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _this = this;

    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    _classCallCheck(this, FeatureflowClient);

    this.emitter = new __WEBPACK_IMPORTED_MODULE_3_tiny_emitter___default.a();
    this.apiKey = apiKey;

    //1. They must have an api key
    if (!this.apiKey) {
      throw INIT_MODULE_ERROR;
    }

    //2. Extend the default configuration
    this.config = _extends({}, DEFAULT_CONFIG, config);

    //3. Load initial data
    this.updateContext(context);

    //4. Set up realtime streaming
    if (this.config.streaming) {
      var es = new window.EventSource(this.config.rtmUrl + '/api/js/v1/stream/' + this.apiKey);
      es.onmessage = function (e) {
        var keys = [];
        try {
          keys = JSON.parse(e.data);
        } catch (err) {
          //Ah well, we tried...
        }

        __WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */].getFeatures(_this.config.baseUrl, _this.apiKey, _this.context, keys, function (error, features) {
          if (!error) {
            _this.features = _extends({}, _this.features, features);
            saveFeatures(_this.apiKey, _this.context.key, _this.features);
            _this.emitter.emit(__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].UPDATED_FEATURE, features);
            callback(undefined, features);
          } else {
            _this.emitter.emit(__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].ERROR, error);
            callback(error);
          }
        });
      };
    }

    //Bind event emitter
    this.on = this.emitter.on.bind(this.emitter);
    this.off = this.emitter.off.bind(this.emitter);
  }

  _createClass(FeatureflowClient, [{
    key: 'updateContext',
    value: function updateContext() {
      var _this2 = this;

      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.context = {
        key: context.key || DEFAULT_CONTEXT_VALUES.key,
        values: context.values
      };

      this.features = loadFeatures(this.apiKey, this.context.key);

      __WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */].getFeatures(this.config.baseUrl, this.apiKey, this.context, [], function (error, features) {
        if (!error) {
          _this2.features = features || {};
          saveFeatures(_this2.apiKey, _this2.context.key, _this2.features);
          _this2.emitter.emit(__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].LOADED, features);
          callback(undefined, features);
        } else {
          _this2.emitter.emit(__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].ERROR, error);
          callback(error);
        }
        return _this2.context;
      });
    }
  }, {
    key: 'getFeatures',
    value: function getFeatures() {
      return this.features;
    }
  }, {
    key: 'getContext',
    value: function getContext() {
      return this.context;
    }
  }, {
    key: 'evaluate',
    value: function evaluate(key) {
      return new __WEBPACK_IMPORTED_MODULE_1__Evaluate__["a" /* default */](this.features[key] || this.config.defaultFeatures[key] || 'off');
    }
  }, {
    key: 'goal',
    value: function goal(_goal) {
      return __WEBPACK_IMPORTED_MODULE_0__RestClient__["a" /* default */].postGoalEvent(this.config.baseUrl, this.apiKey, _goal, this.getFeatures(), function () {});
    }
  }]);

  return FeatureflowClient;
}();

/* harmony default export */ __webpack_exports__["a"] = FeatureflowClient;

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
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evaluate = function () {
  function Evaluate(value) {
    _classCallCheck(this, Evaluate);

    this.storedValue = value.toLowerCase();
  }

  _createClass(Evaluate, [{
    key: 'value',
    value: function value() {
      return this.storedValue;
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

/* harmony default export */ __webpack_exports__["a"] = Evaluate;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__package_json__);


function request(endpoint, config, callback) {
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
  request.open(config.method, endpoint);
  request.setRequestHeader('X-Featureflow-Client', 'javascript-' + __WEBPACK_IMPORTED_MODULE_0__package_json___default.a.version);
  if (config.body) {
    request.setRequestHeader('ContentType', 'application/json');
    request.send(JSON.stringify(config.body));
  } else {
    request.send();
  }
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
    request(baseUrl + '/api/js/v1/evaluate/' + apiKey + '/context/' + encodeURI(base64URLEncode(context)) + query, { method: 'GET' }, callback);
  },
  postGoalEvent: function postGoalEvent(baseUrl, apiKey, key, evaluated, callback) {
    request(baseUrl + '/api/js/v1/goalevent/' + apiKey, {
      method: 'POST',
      body: {
        key: key,
        hits: 1,
        evaluated: evaluated
      }
    }, callback);
  }
};

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"name": "featureflow-client",
	"version": "0.2.5",
	"description": "Featureflow Javascipt Client",
	"author": "Featureflow <featureflow@featureflow.io>",
	"license": "Apache-2.0",
	"keywords": [
		"featureflow",
		"feature",
		"analytics",
		"client"
	],
	"files": [
		"dist"
	],
	"repository": {
		"type": "git",
		"url": "git+https://github.com/featureflow/featureflow-javascript-sdk.git"
	},
	"main": "dist/featureflow",
	"scripts": {
		"build-lib": "webpack src/index.js dist/featureflow.js",
		"build-min": "webpack -p src/index.js dist/featureflow.min.js",
		"build": "node ./scripts/build.js",
		"watch": "webpack --watch src/index.js dist/featureflow.js",
		"test": "karma start --single-run",
		"test:watch": "karma start --auto-watch --reporters=dots",
		"prepublish": "node ./scripts/prepublish.js",
		"flow": "flow",
		"example": "webpack-dev-server --config ./example/webpack.config.js --content-base example/ --inline --port 8182"
	},
	"devDependencies": {
		"babel": "^6.23.0",
		"babel-core": "^6.23.1",
		"babel-loader": "^6.3.0",
		"babel-plugin-transform-flow-strip-types": "^6.22.0",
		"babel-plugin-transform-object-rest-spread": "^6.23.0",
		"babel-preset-es2015": "^6.22.0",
		"chai": "3.5.0",
		"css-loader": "^0.26.1",
		"file-loader": "^0.10.0",
		"flow-bin": "^0.39.0",
		"gzip-size": "3.0.0",
		"html-webpack-plugin": "^2.28.0",
		"in-publish": "2.0.0",
		"karma": "0.13.22",
		"karma-chai": "0.1.0",
		"karma-chrome-launcher": "1.0.1",
		"karma-mocha": "1.0.1",
		"karma-mocha-reporter": "2.0.4",
		"karma-phantomjs-launcher": "0.2.1",
		"karma-phantomjs-shim": "1.1.2",
		"karma-sinon": "1.0.5",
		"karma-sourcemap-loader": "0.3.7",
		"karma-webpack": "2.0.2",
		"mocha": "2.5.3",
		"phantomjs": "1.9.18",
		"pretty-bytes": "3.0.1",
		"readline-sync": "1.4.4",
		"semver-compare": "^1.0.0",
		"sinon": "1.17.4",
		"style-loader": "^0.13.1",
		"webpack": "2.2.1",
		"webpack-dev-server": "^2.3.0"
	},
	"dependencies": {
		"tiny-emitter": "^1.1.0"
	}
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FeatureflowClient__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });




function init(apiKey) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new __WEBPACK_IMPORTED_MODULE_0__FeatureflowClient__["a" /* default */](apiKey, context, config);
}

var events = __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */];

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