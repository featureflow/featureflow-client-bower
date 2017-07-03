(function (exports) {
'use strict';

var name = "featureflow-client";
var version = "0.7.2";
var description = "Featureflow Javascipt Client";
var author = "Featureflow <featureflow@featureflow.io>";
var license = "Apache-2.0";
var keywords = ["featureflow", "feature", "analytics", "client"];
var files = ["dist"];
var repository = { "type": "git", "url": "git+https://github.com/featureflow/featureflow-javascript-sdk.git" };
var main = "dist/featureflow.umd";
var scripts = { "build-bower": "rollup -c", "build-lib": "webpack src/index.js dist/featureflow.umd.js", "build-min": "webpack -p src/index.js dist/featureflow.umd.min.js", "build": "node ./scripts/build.js", "watch": "webpack --watch src/index.js dist/featureflow.umd.js", "test": "karma start --single-run", "test:watch": "karma start --auto-watch --reporters=dots", "prepublish": "node ./scripts/build.js", "publish:bower": "node ./scripts/bower.js", "flow": "flow", "example": "webpack-dev-server --config ./example/webpack.config.js --content-base example/ --inline --port 8182" };
var devDependencies = { "babel": "^6.23.0", "babel-core": "^6.23.1", "babel-loader": "^6.3.0", "babel-plugin-transform-flow-strip-types": "^6.22.0", "babel-plugin-transform-object-rest-spread": "^6.23.0", "babel-preset-es2015": "^6.22.0", "chai": "3.5.0", "css-loader": "^0.26.1", "file-loader": "^0.10.0", "flow-bin": "^0.39.0", "gzip-size": "3.0.0", "html-webpack-plugin": "^2.28.0", "in-publish": "2.0.0", "karma": "0.13.22", "karma-chai": "0.1.0", "karma-chrome-launcher": "1.0.1", "karma-mocha": "1.0.1", "karma-mocha-reporter": "2.0.4", "karma-phantomjs-launcher": "0.2.1", "karma-phantomjs-shim": "1.1.2", "karma-sinon": "1.0.5", "karma-sourcemap-loader": "0.3.7", "karma-webpack": "2.0.2", "mocha": "2.5.3", "phantomjs": "1.9.18", "pretty-bytes": "3.0.1", "readline-sync": "1.4.4", "rollup": "^0.43.0", "rollup-plugin-babel": "^2.7.1", "rollup-plugin-commonjs": "^8.0.2", "rollup-plugin-json": "^2.3.0", "rollup-plugin-node-resolve": "^3.0.0", "rollup-plugin-uglify": "^2.0.1", "semver-compare": "^1.0.0", "sinon": "1.17.4", "style-loader": "^0.13.1", "webpack": "2.2.1", "webpack-dev-server": "^2.3.0" };
var dependencies = { "js-cookie": "^2.1.3", "tiny-emitter": "^1.1.0" };
var packageJSON = {
	name: name,
	version: version,
	description: description,
	author: author,
	license: license,
	keywords: keywords,
	files: files,
	repository: repository,
	main: main,
	scripts: scripts,
	devDependencies: devDependencies,
	dependencies: dependencies
};

function request(endpoint, config) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var request = new XMLHttpRequest();
  request.addEventListener('load', function () {
    if (request.status === 200 && request.getResponseHeader('Content-Type') === "application/json;charset=UTF-8") {
      callback(null, JSON.parse(request.responseText));
    } else {
      callback(request.statusText || 'non 200 response status code');
    }
  });
  request.addEventListener('error', function () {
    callback('error connecting with server');
  });
  request.open(config.method, endpoint);
  request.setRequestHeader('X-Featureflow-Client', 'javascript-' + packageJSON.version);
  if (config.body) {
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(config.body));
  } else {
    request.send();
  }
  return request;
}

function base64URLEncode(context) {
  return btoa(JSON.stringify(context));
}

var RestClient = {
  getFeatures: function getFeatures(baseUrl, apiKey, context) {
    var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var callback = arguments[4];

    var query = keys.length > 0 ? '?keys=' + keys.join(',') : '';
    request(baseUrl + '/api/js/v1/evaluate/' + apiKey + '/context/' + encodeURI(base64URLEncode(context)) + query, { method: 'GET' }, callback);
  },
  postGoalEvent: function postGoalEvent(baseUrl, apiKey, contextKey, goalKey, evaluatedFeaturesMap, callback) {
    request(baseUrl + '/api/js/v1/event/' + apiKey, {
      method: 'POST',
      body: [{
        type: 'goal',
        data: {
          contextKey: contextKey,
          goalKey: goalKey,
          hits: 1,
          evaluated: evaluatedFeaturesMap
        }
      }]
    }, callback);
  },
  postEvaluateEvent: function postEvaluateEvent(baseUrl, apiKey, contextKey, featureKey, variant, callback) {
    request(baseUrl + '/api/js/v1/event/' + apiKey, {
      method: 'POST',
      body: [{
        type: 'evaluate',
        data: {
          contextKey: contextKey,
          featureKey: featureKey,
          variant: variant,
          hits: 1
        }
      }]
    }, callback);
  }
};

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evaluate = function () {
  function Evaluate(value) {
    _classCallCheck$1(this, Evaluate);

    this.storedValue = value.toLowerCase();
  }

  _createClass$1(Evaluate, [{
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

var LOADED = 'LOADED';
var LOADED_FROM_CACHE = 'LOADED_FROM_CACHE';
var ERROR = 'ERROR';
var INIT = 'INIT';
var UPDATED_FEATURE = 'UPDATED_FEATURE';

var Events = {
  INIT: INIT,
  LOADED: LOADED,
  LOADED_FROM_CACHE: LOADED_FROM_CACHE,
  ERROR: ERROR,
  UPDATED_FEATURE: UPDATED_FEATURE
};

function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];

    return this;
  }
};

var index$1 = E;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof undefined === 'function' && undefined.amd) {
		undefined(factory);
		registeredInModuleLoader = true;
	}
	if ((_typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return document.cookie = [key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_BASE_URL = 'https://app.featureflow.io';
var DEFAULT_RTM_URL = 'https://rtm.featureflow.io';

var DEFAULT_CONFIG = {
  baseUrl: DEFAULT_BASE_URL,
  rtmUrl: DEFAULT_RTM_URL,
  streaming: true,
  defaultFeatures: {},
  useCookies: true
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

    this.receivedInitialResponse = false;
    this.emitter = new index$1();
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

        RestClient.getFeatures(_this.config.baseUrl, _this.apiKey, _this.context, keys, function (error, features) {
          if (!error) {
            _this.features = _extends({}, _this.features, features);
            saveFeatures(_this.apiKey, _this.context.key, _this.features);
            _this.emitter.emit(Events.UPDATED_FEATURE, features);
            callback(undefined, features);
          } else {
            _this.emitter.emit(Events.ERROR, error);
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
        key: context.key || this.getAnonymousKey(),
        values: context.values
      };

      this.features = loadFeatures(this.apiKey, this.context.key);
      // Put this in timeout so we can listen to all events before it is returned
      setTimeout(function () {
        _this2.emitter.emit(Events.LOADED_FROM_CACHE, _this2.features);

        RestClient.getFeatures(_this2.config.baseUrl, _this2.apiKey, _this2.context, [], function (error, features) {
          _this2.receivedInitialResponse = true;
          if (!error) {
            _this2.features = features || {};
            saveFeatures(_this2.apiKey, _this2.context.key, _this2.features);
            _this2.emitter.emit(Events.INIT, features);
            _this2.emitter.emit(Events.LOADED, features);
            callback(undefined, features);
          } else {
            _this2.emitter.emit(Events.ERROR, error);
            callback(error);
          }
          return _this2.context;
        });
      }, 0);
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
      var evaluate = new Evaluate(this.features[key] || this.config.defaultFeatures[key] || 'off');
      RestClient.postEvaluateEvent(this.config.baseUrl, this.apiKey, this.context.key, key, evaluate.value(), function () {});
      return evaluate;
    }
  }, {
    key: 'goal',
    value: function goal(_goal) {
      return RestClient.postGoalEvent(this.config.baseUrl, this.apiKey, this.context.key, _goal, this.getFeatures(), function () {});
    }
  }, {
    key: 'getAnonymousKey',
    value: function getAnonymousKey() {
      return localStorage.getItem('ff-anonymous-key') || this.resetAnonymousKey();
    }
  }, {
    key: 'resetAnonymousKey',
    value: function resetAnonymousKey() {
      var anonymousKey = 'anonymous:' + Math.random().toString(36).substring(10);
      localStorage.setItem('ff-anonymous-key', anonymousKey);

      if (this.config.useCookies) {
        //Set the anonymous key cookie for potential future usage with Server SDK
        js_cookie.set('ff-anonymous-key', anonymousKey);
      }
      return anonymousKey;
    }
  }, {
    key: 'hasReceivedInitialResponse',
    value: function hasReceivedInitialResponse() {
      return this.receivedInitialResponse;
    }
  }]);

  return FeatureflowClient;
}();

function init(apiKey) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return new FeatureflowClient(apiKey, context, config);
}

var events = Events;

var index = {
  init: init,
  events: events
};

if (window.VERSION !== undefined) {
  module.exports.version = window.VERSION;
}

exports.init = init;
exports.events = events;
exports['default'] = index;

}((this.Featureflow = this.Featureflow || {})));
