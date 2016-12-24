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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _wsmanager = __webpack_require__(2);
	
	var _wsmanager2 = _interopRequireDefault(_wsmanager);
	
	var _router = __webpack_require__(23);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _signin = __webpack_require__(48);
	
	var _signin2 = _interopRequireDefault(_signin);
	
	var _signup = __webpack_require__(131);
	
	var _signup2 = _interopRequireDefault(_signup);
	
	var _gameGate = __webpack_require__(132);
	
	var _gameGate2 = _interopRequireDefault(_gameGate);
	
	var _main = __webpack_require__(134);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _app = __webpack_require__(137);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.wsm = new _wsmanager2.default('ws://' + window.location.host);
	console.log(wsm);
	
	
	window.onload = function () {
	    var routerConfig = function routerConfig() {
	        new _router2.default().addRoute('/signin', _signin2.default).addRoute('/signup', _signup2.default).addRoute('/app', _app2.default).addRoute('/gameGate', _gameGate2.default).addRoute('/', _main2.default).start();
	    };
	
	    routerConfig();
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WSManager = function () {
		function WSManager(url) {
			var _this = this;
	
			(0, _classCallCheck3.default)(this, WSManager);
	
			console.log("here");
			this.listeners = [];
			this.ready = false;
			this.otherListeners = [];
			this.socket = new WebSocket(url);
			this.socket.onerror = function (err) {};
			this.socket.onopen = function () {
				if (this.ready) this.send({ action: 'ready' });
			};
			this.socket.onclose = function () {};
			this.socket.onmessage = function (msg) {
				console.log(msg);
				var obj = JSON.parse(msg.data);
				_this.listeners.forEach(function (el) {
					if (el.wsFilter != null && el.wsFilter.test(obj.action)) {
						el.onMessage(obj.data, obj.action);
					}
				});
				_this.otherListeners.forEach(function (listener) {
					if (listener.reg.test(obj.action)) {
						listener.callback(obj.data);
					}
				});
			};
		}
	
		(0, _createClass3.default)(WSManager, [{
			key: 'myOn',
			value: function myOn(reg, callback) {
				this.otherListeners.push({
					reg: reg,
					callback: callback
				});
			}
		}, {
			key: 'addBlock',
			value: function addBlock(block) {
				this.listeners.push(block);
			}
		}, {
			key: 'start',
			value: function start() {
				try {
					this.send({ action: 'ready' });
				} catch (err) {};
				this.ready = true;
			}
		}, {
			key: 'send',
			value: function send(msg) {
				this.socket.send(msg);
			}
		}]);
		return WSManager;
	}();
	
	exports.default = WSManager;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(5);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	var $Object = __webpack_require__(10).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(18), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(11)
	  , hide      = __webpack_require__(13)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
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

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(12);
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

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(14)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(18) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(15)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(21)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(18) && !__webpack_require__(19)(function(){
	  return Object.defineProperty(__webpack_require__(20)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(19)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(16);
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

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _route = __webpack_require__(24);
	
	var _route2 = _interopRequireDefault(_route);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Router = function () {
	    /**
	     * Создаёт новый роутер или возвращает уже созданный инстанс
	     */
	    function Router() {
	        (0, _classCallCheck3.default)(this, Router);
	
	        if (Router.__instance) {
	            return Router.__instance;
	        }
	
	        this.routes = [];
	        this.pathsHistory = [];
	        this.activeRoute = null;
	
	        this.history = window.history;
	        this.started = false;
	
	        Router.__instance = this;
	    }
	
	    /**
	     * Добавляет новый Route в роутер
	     * @param {string} pathname - Шаблон пути
	     * @param {View} view - Класс конкретной View
	     * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
	     * @returns {Router}
	     */
	
	
	    (0, _createClass3.default)(Router, [{
	        key: 'addRoute',
	        value: function addRoute(pathname, view) {
	            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var route = new _route2.default(pathname, view, options);
	            route.setRouter(this);
	            this.routes.push(route);
	            return this;
	        }
	
	        /**
	         * Запускает роутер и переходит по текущему пути в приложении
	         * @param {Object} [state={}] - Объект state, который передаётся в первый вызов onroute
	         */
	
	    }, {
	        key: 'start',
	        value: function start() {
	            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            window.onpopstate = function (event) {
	                var state = event.state;
	                var pathname = window.location.pathname;
	                this.pathsHistory.push(pathname);
	                this.onroute(pathname, state);
	            }.bind(this);
	
	            var pathname = window.location.pathname;
	            this.pathsHistory.push(pathname);
	            this.onroute(pathname, state);
	            this.started = true;
	        }
	
	        /**
	         * Функция, вызываемая при переходе на новый роут в приложении
	         * @param {string} pathname - Путь, по которому происходит переход
	         * @param {Object} [state={}] - Объект state, который передаётся в вызов метода navigate
	         */
	
	    }, {
	        key: 'onroute',
	        value: function onroute(pathname) {
	            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            // console.log(this.pathsHistory);
	            var route = this.routes.find(function (route) {
	                return route.match(pathname);
	            });
	            if (!route) {
	                return;
	            }
	
	            if (this.activeRoute) {
	                this.activeRoute.leave();
	            }
	
	            this.activeRoute = route;
	            this.activeRoute.navigate(pathname, state);
	        }
	
	        /**
	         * Программный переход на новый путь
	         * @param {string} pathname - Путь
	         * @param {Object} [state={}] - Объект state, который передаётся в вызов history.pushState
	         */
	
	    }, {
	        key: 'go',
	        value: function go(pathname) {
	            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            if (this.started) {
	                if (window.location.pathname === pathname) {
	                    return;
	                }
	                this.history.pushState(state, '', pathname);
	                this.pathsHistory.push(pathname);
	                this.onroute(pathname, state);
	            }
	        }
	
	        /**
	         * Позволяет установить свою собственную реализацию History API
	         * @param {Object} history - должен предоставлять реализацию методов back(), forward(), pushState()
	         */
	
	    }, {
	        key: 'setHistory',
	        value: function setHistory(history) {
	            this.history = history;
	        }
	
	        /**
	         * Возврат на один шаг назад в истории браузера
	         */
	
	    }, {
	        key: 'back',
	        value: function back() {
	            this.history.back();
	        }
	
	        /**
	         * Переход на один шаг вперёд в истории браузера
	         */
	
	    }, {
	        key: 'forward',
	        value: function forward() {
	            this.history.forward();
	        }
	    }]);
	    return Router;
	}();
	
	exports.default = Router;
	
	window.Router = Router;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _assign = __webpack_require__(25);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _pathToRegex = __webpack_require__(47);
	
	var _pathToRegex2 = _interopRequireDefault(_pathToRegex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var id = 0;
	
	/** Класс представляет собой Путь в вашем приложении */
	
	var Route = function () {
	    /**
	     * Создаёт новый Route - ассоциирует некоторую view с шаблоном пути
	     * @param {string} pathname - Шаблон пути
	     * @param {View} view - Класс конкретной View
	     * @param {Object} [options={}] - Дополнительные параметры, которые будут переданы во view при её создании и инициализации
	     */
	    function Route(pathname, view) {
	        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	        (0, _classCallCheck3.default)(this, Route);
	
	        //TODO: Сущий адище, нам нужно менеджерить депсы
	        this.pathToRegex = window.pathToRegex;
	        this.id = 'p' + id;
	        id++;
	        this.pathname = pathname;
	        this.regex = this.pathToRegex(pathname);
	        this.View = view;
	        this.options = options;
	    }
	
	    /**
	     * Проверяет, соответствует ли переданный pathname текущему Route
	     * @param {string} pathname - Путь в приложении
	     * @returns {boolean} Результат проверки
	     */
	
	
	    (0, _createClass3.default)(Route, [{
	        key: 'match',
	        value: function match(pathname) {
	            return !!this.regex(pathname);
	        }
	
	        /**
	         * Активирует текущий Route (переходит по нему)
	         * @param {string} pathname - Путь в приложении
	         * @param {Object} [state={}] - Объект state, который был передан в событие popstate для объекта window
	         */
	
	    }, {
	        key: 'navigate',
	        value: function navigate(pathname) {
	            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            state = state || {};
	            var keys = this.regex(pathname);
	            if (!this._view) {
	                var view = new this.View(this.options);
	                view.init(this.options);
	                view.setRouter(this.__router);
	                this._view = view;
	            }
	
	            this._view.resume((0, _assign2.default)(state, keys));
	        }
	
	        /**
	         * Деактивирует текущий Route
	         */
	
	    }, {
	        key: 'leave',
	        value: function leave() {
	            this._view && this._view.pause();
	        }
	
	        /**
	         * Устанавливает текущему Route инстанс роутера
	         * @param {Router} router - Инстанс роутера
	         */
	
	    }, {
	        key: 'setRouter',
	        value: function setRouter(router) {
	            this.__router = router;
	        }
	    }]);
	    return Route;
	}();
	
	exports.default = Route;
	
	window.Route = Route;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	module.exports = __webpack_require__(10).Object.assign;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(28)});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(29)
	  , gOPS     = __webpack_require__(44)
	  , pIE      = __webpack_require__(45)
	  , toObject = __webpack_require__(46)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(19)(function(){
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

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(43);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(31)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
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

/***/ },
/* 31 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys')
	  , uid    = __webpack_require__(42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 45 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	var pathToRegex = function pathToRegex(pathname) {
		var keyNames = [];
		var parts = pathname.split('/').filter(function (part) {
			return part;
		}).map(function (part) {
			if (/^:/.exec(part)) {
				keyNames.push(part.slice(1));
				return new RegExp('^/([^/]+)($|/)', 'i');
			}
			return new RegExp('^/' + part + '($|/)', 'i');
		});
	
		return function (path) {
			console.log("path before=" + path);
			var keys = [];
			var check = parts.every(function (regexp, step) {
				var tmp = regexp.exec(path);
				if (!tmp) {
					return false;
				}
				if (tmp.length === 3) {
					keys.push(tmp[1]);
					path = path.replace(regexp, '$2');
				} else {
					path = path.replace(regexp, '$1');
				}
				return true;
			});
	
			if (check && (path == '' || path == '/')) {
				return keys.reduce(function (prev, curr, pos) {
					prev[keyNames[pos]] = curr;
					return prev;
				}, {});
			}
			return null;
		};
	};
	window.pathToRegex = pathToRegex;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _form = __webpack_require__(97);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _linkedButton = __webpack_require__(128);
	
	var _linkedButton2 = _interopRequireDefault(_linkedButton);
	
	var _view = __webpack_require__(129);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _signin = __webpack_require__(130);
	
	var _signin2 = _interopRequireDefault(_signin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SignInView = function (_View) {
	    (0, _inherits3.default)(SignInView, _View);
	
	    function SignInView() {
	        (0, _classCallCheck3.default)(this, SignInView);
	        return (0, _possibleConstructorReturn3.default)(this, (SignInView.__proto__ || (0, _getPrototypeOf2.default)(SignInView)).call(this));
	    }
	
	    (0, _createClass3.default)(SignInView, [{
	        key: 'init',
	        value: function init() {
	            this.setClasses(['content', 'js-signin']);
	            this.signInForm = new _form2.default({
	                title: 'sign in',
	                classes: ['form', 'form-signin'],
	                action: 'signin',
	                data: {
	                    fields: [{
	                        label: 'Enter username',
	                        attrs: {
	                            name: 'username',
	                            type: 'text'
	                        }
	                    }, {
	                        label: 'Enter password',
	                        attrs: {
	                            name: 'password',
	                            type: 'password'
	                        }
	                    }],
	                    controls: [{
	                        text: 'enter',
	                        classes: ['btn', 'btn_submit'],
	                        attrs: {
	                            type: 'submit'
	                        }
	                    }, {
	                        text: 'reset',
	                        classes: ['btn', 'btn_reset'],
	                        attrs: {
	                            type: 'reset'
	                        }
	                    }]
	                }
	            });
	
	            this.signUpBtn = new _linkedButton2.default({
	                text: 'sign up',
	                url: '/signup',
	                classes: ['btn', 'btn_signup']
	            });
	
	            this._el.innerHTML = (0, _signin2.default)();
	            this._el.querySelector('.form_sign-in').appendChild(this.signInForm._get());
	            this._el.querySelector('.sign-up-control').appendChild(this.signUpBtn._get());
	            document.querySelector('.app').appendChild(this._el);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.hide();
	            this.signInForm.resetForm();
	        }
	    }]);
	    return SignInView;
	}(_view2.default);
	
	exports.default = SignInView;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	module.exports = __webpack_require__(10).Object.getPrototypeOf;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(46)
	  , $getPrototypeOf = __webpack_require__(52);
	
	__webpack_require__(53)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(31)
	  , toObject    = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(10)
	  , fails   = __webpack_require__(19);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(55);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(56);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(75);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(58);
	__webpack_require__(70);
	module.exports = __webpack_require__(74).f('iterator');

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(59)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(60)(String, 'String', function(iterated){
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

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
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

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(61)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(62)
	  , hide           = __webpack_require__(13)
	  , has            = __webpack_require__(31)
	  , Iterators      = __webpack_require__(63)
	  , $iterCreate    = __webpack_require__(64)
	  , setToStringTag = __webpack_require__(68)
	  , getPrototypeOf = __webpack_require__(52)
	  , ITERATOR       = __webpack_require__(69)('iterator')
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

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(65)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(68)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(13)(IteratorPrototype, __webpack_require__(69)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(15)
	  , dPs         = __webpack_require__(66)
	  , enumBugKeys = __webpack_require__(43)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(20)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(67).appendChild(iframe);
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


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(14)
	  , anObject = __webpack_require__(15)
	  , getKeys  = __webpack_require__(29);
	
	module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(14).f
	  , has = __webpack_require__(31)
	  , TAG = __webpack_require__(69)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(41)('wks')
	  , uid        = __webpack_require__(42)
	  , Symbol     = __webpack_require__(9).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71);
	var global        = __webpack_require__(9)
	  , hide          = __webpack_require__(13)
	  , Iterators     = __webpack_require__(63)
	  , TO_STRING_TAG = __webpack_require__(69)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(72)
	  , step             = __webpack_require__(73)
	  , Iterators        = __webpack_require__(63)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(60)(Array, 'Array', function(iterated, kind){
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

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(69);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(9)
	  , has            = __webpack_require__(31)
	  , DESCRIPTORS    = __webpack_require__(18)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(62)
	  , META           = __webpack_require__(78).KEY
	  , $fails         = __webpack_require__(19)
	  , shared         = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(68)
	  , uid            = __webpack_require__(42)
	  , wks            = __webpack_require__(69)
	  , wksExt         = __webpack_require__(74)
	  , wksDefine      = __webpack_require__(79)
	  , keyOf          = __webpack_require__(80)
	  , enumKeys       = __webpack_require__(81)
	  , isArray        = __webpack_require__(82)
	  , anObject       = __webpack_require__(15)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(21)
	  , createDesc     = __webpack_require__(22)
	  , _create        = __webpack_require__(65)
	  , gOPNExt        = __webpack_require__(83)
	  , $GOPD          = __webpack_require__(85)
	  , $DP            = __webpack_require__(14)
	  , $keys          = __webpack_require__(29)
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
	  __webpack_require__(84).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(45).f  = $propertyIsEnumerable;
	  __webpack_require__(44).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(61)){
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
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(42)('meta')
	  , isObject = __webpack_require__(16)
	  , has      = __webpack_require__(31)
	  , setDesc  = __webpack_require__(14).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(19)(function(){
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

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(9)
	  , core           = __webpack_require__(10)
	  , LIBRARY        = __webpack_require__(61)
	  , wksExt         = __webpack_require__(74)
	  , defineProperty = __webpack_require__(14).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(29)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(29)
	  , gOPS    = __webpack_require__(44)
	  , pIE     = __webpack_require__(45);
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

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(84).f
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


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(30)
	  , hiddenKeys = __webpack_require__(43).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(45)
	  , createDesc     = __webpack_require__(22)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(21)
	  , has            = __webpack_require__(31)
	  , IE8_DOM_DEFINE = __webpack_require__(17)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 86 */
/***/ function(module, exports) {



/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79)('asyncIterator');

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(79)('observable');

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(90);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(94);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(55);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(93).set});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(16)
	  , anObject = __webpack_require__(15);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(85).f(Object.prototype, '__proto__').set, 2);
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

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	var $Object = __webpack_require__(10).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(65)});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(98);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _button = __webpack_require__(102);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _input = __webpack_require__(119);
	
	var _input2 = _interopRequireDefault(_input);
	
	var _router = __webpack_require__(23);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _form = __webpack_require__(123);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _user = __webpack_require__(124);
	
	var _user2 = _interopRequireDefault(_user);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Form = function (_Block) {
	    (0, _inherits3.default)(Form, _Block);
	
	    function Form() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { action: action, data: {} };
	        (0, _classCallCheck3.default)(this, Form);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call(this, 'form', options));
	
	        _this.action = options.action;
	        _this.data = options.data;
	
	        _this.render();
	        return _this;
	    }
	
	    (0, _createClass3.default)(Form, [{
	        key: 'render',
	        value: function render() {
	            this._updateHtml();
	            this._initFields();
	            this._initControls();
	            this._setListeners();
	        }
	    }, {
	        key: '_updateHtml',
	        value: function _updateHtml() {
	            this._el.innerHTML = (0, _form2.default)();
	        }
	    }, {
	        key: '_initFields',
	        value: function _initFields() {
	            var _this2 = this;
	
	            var _data$fields = this.data.fields,
	                fields = _data$fields === undefined ? [] : _data$fields;
	
	            this.fields = {};
	            fields.forEach(function (data) {
	                var input = new _input2.default({
	                    label: data.label,
	                    attrs: data.attrs
	                });
	                _this2.fields[data.attrs.name] = input;
	                _this2._el.querySelector('.js-fields').appendChild(input._get());
	            });
	        }
	    }, {
	        key: '_initControls',
	        value: function _initControls() {
	            var _this3 = this;
	
	            var _data$controls = this.data.controls,
	                controls = _data$controls === undefined ? [] : _data$controls;
	
	            controls.forEach(function (data) {
	                var control = new _button2.default({
	                    text: data.text,
	                    classes: data.classes,
	                    attrs: data.attrs
	                });
	                _this3._el.querySelector('.js-controls').appendChild(control._get());
	            });
	        }
	    }, {
	        key: '_setListeners',
	        value: function _setListeners() {
	            var _this4 = this;
	
	            this.on('reset', function (event) {
	                event.preventDefault();
	                _this4.resetForm();
	            });
	
	            this.on('submit', function (event) {
	                event.preventDefault();
	                new _router2.default().go('/gameGate');
	            });
	
	            this._el.querySelector('.close').addEventListener('click', function () {
	                new _router2.default().go('/');
	            });
	
	            (0, _keys2.default)(this.fields).forEach(function (name) {
	                _this4.fields[name].field.addEventListener('focus', function () {
	                    _this4.fields[name].active();
	                });
	                _this4.fields[name].field.addEventListener('blur', function () {
	                    _this4.validate();
	                });
	            });
	        }
	    }, {
	        key: 'validate',
	        value: function validate() {
	            this.action === 'signin' ? this.signInCheck() : this.signUpCheck();
	        }
	    }, {
	        key: 'signInCheck',
	        value: function signInCheck() {
	            var username = this.fields['username'];
	            var password = this.fields['password'];
	
	            username.isEmpty() ? username.resetActive() : this.isValidUsername(username);
	            password.isEmpty() ? password.resetActive() : this.isValidPassword(password);
	        }
	    }, {
	        key: 'signUpCheck',
	        value: function signUpCheck() {
	            var username = this.fields['username'];
	            var password = this.fields['password'];
	            var password2 = this.fields['password2'];
	
	            username.isEmpty() ? username.resetActive() : this.isValidUsername(username);
	            password.isEmpty() ? password.resetActive() : this.isValidPassword(password);
	            password2.isEmpty() ? password2.resetActive() : this.isSamePasswords(password, password2);
	        }
	    }, {
	        key: 'isValidUsername',
	        value: function isValidUsername(username) {
	            var re = /^\w{6,10}$/;
	            re.test(username.field.value) ? username.valid() : username.invalid('Bad name. It should contain 6-10 symbols!');
	        }
	    }, {
	        key: 'isValidPassword',
	        value: function isValidPassword(password) {
	            var re = /^\w{6,20}$/;
	            re.test(password.field.value) ? password.valid() : password.invalid('Bad password. It should contain 6-20 symbols!');
	        }
	    }, {
	        key: 'isSamePasswords',
	        value: function isSamePasswords(password1, password2) {
	            password1.field.value === password2.field.value ? password2.valid() : password2.invalid('Passwords doesn\'t match! Please, try again.');
	        }
	    }, {
	        key: 'resetForm',
	        value: function resetForm() {
	            var _this5 = this;
	
	            (0, _keys2.default)(this.fields).forEach(function (name) {
	                _this5.fields[name].reset();
	            });
	        }
	    }, {
	        key: 'getFormData',
	        value: function getFormData() {
	            var form = this._el;
	            var elements = form.elements;
	            var fields = {};
	
	            fields.username = elements.username.value;
	            fields.password = elements.password.value;
	            fields.action = this._action;
	
	            return fields;
	        }
	    }]);
	    return Form;
	}(_block2.default);
	
	exports.default = Form;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	module.exports = __webpack_require__(10).Object.keys;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(46)
	  , $keys    = __webpack_require__(29);
	
	__webpack_require__(53)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(98);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Block = function () {
	    function Block(name) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        (0, _classCallCheck3.default)(this, Block);
	
	        this._el = document.createElement(name);
	
	        this.setAttrs(options.attrs);
	        this.setClasses(options.classes);
	    }
	
	    (0, _createClass3.default)(Block, [{
	        key: 'setAttrs',
	        value: function setAttrs() {
	            var _this = this;
	
	            var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            (0, _keys2.default)(attrs).forEach(function (name) {
	                _this._el.setAttribute(name, attrs[name]);
	            });
	        }
	    }, {
	        key: 'setClasses',
	        value: function setClasses() {
	            var _this2 = this;
	
	            var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	            classes.forEach(function (name) {
	                _this2._el.classList.add(name);
	            });
	        }
	    }, {
	        key: 'renderTo',
	        value: function renderTo(element) {
	            element.appendChild(this._el);
	        }
	    }, {
	        key: 'append',
	        value: function append(element) {
	            if (element instanceof Block) {
	                this._el.appendChild(element._get());
	            } else {
	                this._el.appendChild(element);
	            }
	        }
	    }, {
	        key: 'on',
	        value: function on(type, callback) {
	            this._el.addEventListener(type, callback);
	        }
	    }, {
	        key: 'stop',
	        value: function stop(type, callback) {
	            this._el.removeEventListener(type, callback);
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this._el.outerHTML;
	        }
	    }, {
	        key: '_get',
	        value: function _get() {
	            return this._el;
	        }
	    }]);
	    return Block;
	}();
	
	exports.default = Block;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(103);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Button = function (_Block) {
	    (0, _inherits3.default)(Button, _Block);
	
	    function Button(options) {
	        (0, _classCallCheck3.default)(this, Button);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, 'button', options));
	
	        _this._el.innerText = options.text || 'press me';
	
	        _this.on('click', function () {
	            _this.animate();
	        });
	        return _this;
	    }
	
	    (0, _createClass3.default)(Button, [{
	        key: 'animate',
	        value: function animate() {
	            var _this2 = this;
	
	            return new _promise2.default(function (resolve, reject) {
	                var duration = 0.3,
	                    delay = 0.08;
	                TweenMax.to(_this2._el, duration, {
	                    scaleY: 1.6,
	                    ease: Expo.easeOut
	                });
	                TweenMax.to(_this2._el, duration, {
	                    scaleX: 1.2,
	                    scaleY: 1,
	                    ease: Back.easeOut,
	                    easeParams: [3],
	                    delay: delay
	                });
	                TweenMax.to(_this2._el, duration * 1.25, {
	                    scaleX: 1,
	                    scaleY: 1,
	                    ease: Back.easeOut,
	                    easeParams: [6],
	                    delay: delay * 3
	                });
	
	                setTimeout(resolve, 1200);
	            });
	        }
	    }]);
	    return Button;
	}(_block2.default);
	
	exports.default = Button;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	__webpack_require__(58);
	__webpack_require__(70);
	__webpack_require__(105);
	module.exports = __webpack_require__(10).Promise;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(61)
	  , global             = __webpack_require__(9)
	  , ctx                = __webpack_require__(11)
	  , classof            = __webpack_require__(106)
	  , $export            = __webpack_require__(8)
	  , isObject           = __webpack_require__(16)
	  , aFunction          = __webpack_require__(12)
	  , anInstance         = __webpack_require__(107)
	  , forOf              = __webpack_require__(108)
	  , speciesConstructor = __webpack_require__(112)
	  , task               = __webpack_require__(113).set
	  , microtask          = __webpack_require__(115)()
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
	      , FakePromise = (promise.constructor = {})[__webpack_require__(69)('species')] = function(exec){ exec(empty, empty); };
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
	  Internal.prototype = __webpack_require__(116)($Promise.prototype, {
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
	__webpack_require__(68)($Promise, PROMISE);
	__webpack_require__(117)(PROMISE);
	Wrapper = __webpack_require__(10)[PROMISE];
	
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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(118)(function(iter){
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

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(69)('toStringTag')
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

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(11)
	  , call        = __webpack_require__(109)
	  , isArrayIter = __webpack_require__(110)
	  , anObject    = __webpack_require__(15)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(111)
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

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(15);
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

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(63)
	  , ITERATOR   = __webpack_require__(69)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(106)
	  , ITERATOR  = __webpack_require__(69)('iterator')
	  , Iterators = __webpack_require__(63);
	module.exports = __webpack_require__(10).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(15)
	  , aFunction = __webpack_require__(12)
	  , SPECIES   = __webpack_require__(69)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(11)
	  , invoke             = __webpack_require__(114)
	  , html               = __webpack_require__(67)
	  , cel                = __webpack_require__(20)
	  , global             = __webpack_require__(9)
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
	  if(__webpack_require__(34)(process) == 'process'){
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

/***/ },
/* 114 */
/***/ function(module, exports) {

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

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , macrotask = __webpack_require__(113).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
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

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(13);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(9)
	  , core        = __webpack_require__(10)
	  , dP          = __webpack_require__(14)
	  , DESCRIPTORS = __webpack_require__(18)
	  , SPECIES     = __webpack_require__(69)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(69)('iterator')
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

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _input = __webpack_require__(120);
	
	var _input2 = _interopRequireDefault(_input);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Input = function (_Block) {
	    (0, _inherits3.default)(Input, _Block);
	
	    function Input() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        (0, _classCallCheck3.default)(this, Input);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this, 'div', {
	            classes: ['input__wrap']
	        }));
	
	        _this.data = options;
	        _this.render();
	        return _this;
	    }
	
	    (0, _createClass3.default)(Input, [{
	        key: 'render',
	        value: function render() {
	            this._updateHtml();
	            this._setItems();
	            this._drawLine();
	            this._animate();
	        }
	    }, {
	        key: '_updateHtml',
	        value: function _updateHtml() {
	            this._el.innerHTML = (0, _input2.default)(this.data);
	        }
	    }, {
	        key: '_setItems',
	        value: function _setItems() {
	            this.wrap = this._el.querySelector('.form__input');
	            this.field = this._el.querySelector('input');
	            this.name = this.field.name;
	            this.error = this._el.querySelector('.input__error');
	        }
	    }, {
	        key: 'active',
	        value: function active() {
	            this.setActive();
	            this.resetValid();
	            this.resetInvalid();
	        }
	    }, {
	        key: 'valid',
	        value: function valid() {
	            this.resetInvalid();
	            this.setValid();
	        }
	    }, {
	        key: 'invalid',
	        value: function invalid(errText) {
	            this.resetValid();
	            this.setInvalid(errText);
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.resetActive();
	            this.resetValid();
	            this.resetInvalid();
	            this.resetValue();
	        }
	    }, {
	        key: 'setValid',
	        value: function setValid() {
	            this.wrap.classList.add('valid');
	            this.wrap.style.transformOrigin = "bottom";
	        }
	    }, {
	        key: 'resetValid',
	        value: function resetValid() {
	            this.wrap.classList.remove('valid');
	        }
	    }, {
	        key: 'setInvalid',
	        value: function setInvalid(errText) {
	            this.wrap.classList.add('invalid');
	            this.wrap.style.transformOrigin = "center";
	            this.error.innerHTML = errText;
	        }
	    }, {
	        key: 'resetInvalid',
	        value: function resetInvalid() {
	            this.wrap.classList.remove('invalid');
	            this.error.innerHTML = '';
	        }
	    }, {
	        key: 'setActive',
	        value: function setActive() {
	            this.wrap.classList.add('active');
	        }
	    }, {
	        key: 'resetActive',
	        value: function resetActive() {
	            this.wrap.classList.remove('active');
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            return this.field.value;
	        }
	    }, {
	        key: 'resetValue',
	        value: function resetValue() {
	            this.field.value = '';
	        }
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty() {
	            return this.field.value === '' ? true : false;
	        }
	    }, {
	        key: '_drawLine',
	        value: function _drawLine() {
	            this._line = Snap(this._el.querySelector('.input__line'));
	            this._qCurve = 400 / 2;
	            this._textPath = this._line.path("M0 0 " + 400 + " 0");
	        }
	    }, {
	        key: 'runAnimate',
	        value: function runAnimate() {
	            var _this2 = this;
	
	            setTimeout(function () {
	                _this2._textPath.animate({
	                    d: "M0 0 Q" + _this2._qCurve + " 40 " + 400 + " 0"
	                }, 150, mina.easeout);
	            }, 200);
	
	            setTimeout(function () {
	                _this2._textPath.animate({
	                    d: "M0 0 Q" + _this2._qCurve + " -30 " + 400 + " 0"
	                }, 150, mina.easeout);
	            }, 400);
	
	            setTimeout(function () {
	                _this2._textPath.animate({
	                    d: "M0 0 " + 400 + " 0"
	                }, 200, mina.easein);
	            }, 600);
	        }
	    }, {
	        key: '_animate',
	        value: function _animate() {
	            var _this3 = this;
	
	            this.field.addEventListener('focus', function () {
	                _this3.runAnimate();
	            });
	        }
	    }]);
	    return Input;
	}(_block2.default);
	
	exports.default = Input;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(121);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (attrs, label) {pug_html = pug_html + "\u003Cdiv class=\"form__input\"\u003E\u003Clabel" + (pug.attr("for", `${attrs.name}`, true, true)) + "\u003E" + (pug.escape(null == (pug_interp = label) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003Cinput" + (pug.attr("type", `${attrs.type}`, true, true)+pug.attr("name", `${attrs.name}`, true, true)+" autocomplete=\"off\"") + "\u003E\u003C\u002Fdiv\u003E\u003Cp class=\"input__error\"\u003E\u003C\u002Fp\u003E\u003Csvg class=\"input__line\"\u003E\u003C\u002Fsvg\u003E";}.call(this,"attrs" in locals_for_with?locals_for_with.attrs:typeof attrs!=="undefined"?attrs:undefined,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
	module.exports = template;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pug_has_own_property = Object.prototype.hasOwnProperty;
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = pug_merge;
	function pug_merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = pug_merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	
	  for (var key in b) {
	    if (key === 'class') {
	      var valA = a[key] || [];
	      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
	    } else if (key === 'style') {
	      var valA = pug_style(a[key]);
	      var valB = pug_style(b[key]);
	      a[key] = valA + (valA && valB && ';') + valB;
	    } else {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Process array, object, or string as a string of classes delimited by a space.
	 *
	 * If `val` is an array, all members of it and its subarrays are counted as
	 * classes. If `escaping` is an array, then whether or not the item in `val` is
	 * escaped depends on the corresponding item in `escaping`. If `escaping` is
	 * not an array, no escaping is done.
	 *
	 * If `val` is an object, all the keys whose value is truthy are counted as
	 * classes. No escaping is done.
	 *
	 * If `val` is a string, it is counted as a class. No escaping is done.
	 *
	 * @param {(Array.<string>|Object.<string, boolean>|string)} val
	 * @param {?Array.<string>} escaping
	 * @return {String}
	 */
	exports.classes = pug_classes;
	function pug_classes_array(val, escaping) {
	  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
	  for (var i = 0; i < val.length; i++) {
	    className = pug_classes(val[i]);
	    if (!className) continue;
	    escapeEnabled && escaping[i] && (className = pug_escape(className));
	    classString = classString + padding + className;
	    padding = ' ';
	  }
	  return classString;
	}
	function pug_classes_object(val) {
	  var classString = '', padding = '';
	  for (var key in val) {
	    if (key && val[key] && pug_has_own_property.call(val, key)) {
	      classString = classString + padding + key;
	      padding = ' ';
	    }
	  }
	  return classString;
	}
	function pug_classes(val, escaping) {
	  if (Array.isArray(val)) {
	    return pug_classes_array(val, escaping);
	  } else if (val && typeof val === 'object') {
	    return pug_classes_object(val);
	  } else {
	    return val || '';
	  }
	}
	
	/**
	 * Convert object or string to a string of CSS styles delimited by a semicolon.
	 *
	 * @param {(Object.<string, string>|string)} val
	 * @return {String}
	 */
	
	exports.style = pug_style;
	function pug_style(val) {
	  if (!val) return '';
	  if (typeof val === 'object') {
	    var out = '', delim = '';
	    for (var style in val) {
	      /* istanbul ignore else */
	      if (pug_has_own_property.call(val, style)) {
	        out = out + delim + style + ':' + val[style];
	        delim = ';';
	      }
	    }
	    return out;
	  } else {
	    val = '' + val;
	    if (val[val.length - 1] === ';') return val.slice(0, -1);
	    return val;
	  }
	};
	
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = pug_attr;
	function pug_attr(key, val, escaped, terse) {
	  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
	    return '';
	  }
	  if (val === true) {
	    return ' ' + (terse ? key : key + '="' + key + '"');
	  }
	  if (typeof val.toJSON === 'function') {
	    val = val.toJSON();
	  }
	  if (typeof val !== 'string') {
	    val = JSON.stringify(val);
	    if (!escaped && val.indexOf('"') !== -1) {
	      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
	    }
	  }
	  if (escaped) val = pug_escape(val);
	  return ' ' + key + '="' + val + '"';
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} terse whether to use HTML5 terse boolean attributes
	 * @return {String}
	 */
	exports.attrs = pug_attrs;
	function pug_attrs(obj, terse){
	  var attrs = '';
	
	  for (var key in obj) {
	    if (pug_has_own_property.call(obj, key)) {
	      var val = obj[key];
	
	      if ('class' === key) {
	        val = pug_classes(val);
	        attrs = pug_attr(key, val, false, terse) + attrs;
	        continue;
	      }
	      if ('style' === key) {
	        val = pug_style(val);
	      }
	      attrs += pug_attr(key, val, false, terse);
	    }
	  }
	
	  return attrs;
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var pug_match_html = /["&<>]/;
	exports.escape = pug_escape;
	function pug_escape(_html){
	  var html = '' + _html;
	  var regexResult = pug_match_html.exec(html);
	  if (!regexResult) return _html;
	
	  var result = '';
	  var i, lastIndex, escape;
	  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
	    switch (html.charCodeAt(i)) {
	      case 34: escape = '&quot;'; break;
	      case 38: escape = '&amp;'; break;
	      case 60: escape = '&lt;'; break;
	      case 62: escape = '&gt;'; break;
	      default: continue;
	    }
	    if (lastIndex !== i) result += html.substring(lastIndex, i);
	    lastIndex = i + 1;
	    result += escape;
	  }
	  if (lastIndex !== i) return result + html.substring(lastIndex, i);
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the pug in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @param {String} str original source
	 * @api private
	 */
	
	exports.rethrow = pug_rethrow;
	function pug_rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(122).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    pug_rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Pug') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 122 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(121);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ci class=\"fa fa-5x fa-times close\" aria-hidden=\"true\"\u003E\u003C\u002Fi\u003E\u003Cdiv class=\"js-fields\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"js-controls\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _model = __webpack_require__(125);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var User = function (_Model) {
		(0, _inherits3.default)(User, _Model);
	
		function User(attributes) {
			(0, _classCallCheck3.default)(this, User);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, attributes));
	
			_this.tail = attributes.action;
			return _this;
		}
	
		(0, _createClass3.default)(User, [{
			key: 'sendUser',
			value: function sendUser() {
				return this.send('POST', this.attributes, this.url);
			}
		}, {
			key: 'defaults',
			get: function get() {
				return {
					username: '',
					password: '',
					formType: ''
				};
			}
		}, {
			key: 'url',
			get: function get() {
				return '/user/' + this.tail + '/';
			}
		}]);
		return User;
	}(_model2.default);
	
	exports.default = User;
	;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(126);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(103);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _typeof2 = __webpack_require__(55);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _keys = __webpack_require__(98);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _assign = __webpack_require__(25);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Model = function () {
	    function Model(attributes) {
	        (0, _classCallCheck3.default)(this, Model);
	
	        this.attributes = (0, _assign2.default)({}, this.defaults, this._clean(attributes));
	    }
	
	    (0, _createClass3.default)(Model, [{
	        key: '_clean',
	        value: function _clean(attributes) {
	            var _this = this;
	
	            if (null != attributes) (0, _keys2.default)(attributes).forEach(function (key) {
	                if (attributes[key] === undefined) {
	                    delete attributes[key];
	                }
	
	                if ((0, _typeof3.default)(attributes[key]) === 'object' && attributes[key] !== null) {
	                    _this._clean(attributes[key]);
	                }
	            });
	
	            return attributes;
	        }
	    }, {
	        key: 'fetch',
	        value: function fetch() {
	            var _this2 = this;
	
	            return this.send('GET', { id: this.attributes.id }).then(function (data) {
	                return JSON.parse(data);
	            }).then(function (json) {
	                _this2.attributes = json;
	                return _this2.attributes;
	            });
	        }
	    }, {
	        key: 'save',
	        value: function save() {
	            var _this3 = this;
	
	            var method = this.attributes.id ? 'PUT' : 'POST';
	            return this.send(method, this.attributes).then(function (data) {
	                return JSON.parse(data);
	            }).then(function (json) {
	                _this3.attributes.id = json.name;
	                return _this3.attributes;
	            });
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            var _this4 = this;
	
	            return this.send('DELETE', { id: this.attributes.id }).then(function () {
	                _this4.attributes = {};
	            });
	        }
	    }, {
	        key: 'send',
	        value: function send(method, data, url) {
	            var _this5 = this;
	
	            return new _promise2.default(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open(method, _this5.baseUrl + url, true);
	                xhr.setRequestHeader('Content-type', 'application/json');
	
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === XMLHttpRequest.DONE) {
	                        if (xhr.status === 200) {
	                            resolve(xhr.responseText);
	                        } else {
	                            reject();
	                        }
	                    }
	                };
	                xhr.send((0, _stringify2.default)(data));
	            });
	        }
	    }, {
	        key: 'baseUrl',
	        get: function get() {
	            return 'https://monopolygames.herokuapp.com';
	        }
	    }, {
	        key: 'defaults',
	        get: function get() {
	            return {};
	        }
	    }]);
	    return Model;
	}();
	
	exports.default = Model;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(10)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(103);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _router = __webpack_require__(23);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _button = __webpack_require__(102);
	
	var _button2 = _interopRequireDefault(_button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LinkedButton = function (_Button) {
	    (0, _inherits3.default)(LinkedButton, _Button);
	
	    function LinkedButton(options) {
	        (0, _classCallCheck3.default)(this, LinkedButton);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (LinkedButton.__proto__ || (0, _getPrototypeOf2.default)(LinkedButton)).call(this, options));
	
	        _this.setLink(options.url);
	        return _this;
	    }
	
	    (0, _createClass3.default)(LinkedButton, [{
	        key: 'setLink',
	        value: function setLink(url) {
	            var _this2 = this;
	
	            this.on('click', function () {
	                _this2.loader().then(function () {
	                    new _router2.default().go(url);
	                }).then(function () {
	                    _this2.resetLoader();
	                });
	            });
	        }
	    }, {
	        key: 'loader',
	        value: function loader() {
	            var _this3 = this;
	
	            return new _promise2.default(function (resolve, reject) {
	                _this3._el.disabled = true;
	                var loader = document.querySelector('.loader');
	                loader.children.forEach = [].forEach;
	                var index = 1;
	                loader.children.forEach(function (wave) {
	                    wave.classList.add('wave' + index++);
	                });
	                setTimeout(resolve, 3000);
	            });
	        }
	    }, {
	        key: 'resetLoader',
	        value: function resetLoader() {
	            this._el.disabled = false;
	            var loader = document.querySelector('.loader');
	            loader.children.forEach = [].forEach;
	            var index = 1;
	            loader.children.forEach(function (wave) {
	                wave.classList.remove('wave' + index++);
	            });
	        }
	    }]);
	    return LinkedButton;
	}(_button2.default);
	
	exports.default = LinkedButton;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(98);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var View = function () {
	    /**
	     * Создаёт новую view
	     * @param {Object} [options={}] - Объект с параметрами
	     */
	    function View() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        (0, _classCallCheck3.default)(this, View);
	
	        this.tagName = options.tagName || 'div';
	        this._el = document.createElement(this.tagName);
	    }
	
	    /**
	     * Инициализация параметров view (выполняется сразу после создания)
	     * Необходимо перепределять
	     * @param {Object} [options={}] - Объект с параметрами
	     */
	
	
	    (0, _createClass3.default)(View, [{
	        key: 'init',
	        value: function init() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.setAttrs(options.attrs);
	            this.setClasses(options.classes);
	        }
	
	        /**
	         * Вызывается при приостановке работы view (при скрытии view или переходе на другую view)
	         * Необходимо переопределять своей логикой
	         * @param {Object} [options={}] - Объект с параметрами
	         */
	
	    }, {
	        key: 'pause',
	        value: function pause() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.hide();
	        }
	
	        /**
	         * Вызывается при начале или продолжении работы view (после того, как view была скрыта)
	         * Необходимо переопределять своей логикой
	         * @param {Object} [options={}] - Объект с параметрами
	         */
	
	    }, {
	        key: 'resume',
	        value: function resume() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this.show();
	        }
	
	        /**
	         * Показывает view
	         * @param {Object} [options={}] - Объект с параметрами
	         */
	
	    }, {
	        key: 'show',
	        value: function show() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this._el.style.display = 'flex';
	        }
	
	        /**
	         * Скрывает view
	         * @param {Object} [options={}] - Объект с параметрами
	         */
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            this._el.style.display = 'none';
	            this._el.hidden = true;
	        }
	
	        /**
	         * Рендерит view
	         * Необходимо переопределять
	         * @param {Object} [options={}] - Объект с параметрами
	         */
	
	    }, {
	        key: 'render',
	        value: function render() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        }
	
	        /**
	         * Вставляет текущую view в переданный элемент
	         * @param {HTMLElement} el - HTML-элемент, к которому добавляется элемент текущей view
	         */
	
	    }, {
	        key: 'appendTo',
	        value: function appendTo(el) {
	            el.appendChild(this._el);
	        }
	
	        /**
	         * Удаляет элемент текущей view
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove() {
	            this._el && this._el.remove();
	        }
	
	        /**
	         * Заменяет элемент текущей view
	         * @param {HTMLElement} el - HTML-элемент, который становится элементом текущей view
	         */
	
	    }, {
	        key: 'setElement',
	        value: function setElement(el) {
	            this._el && this._el.remove();
	            this._el = el;
	        }
	
	        /**
	         * Устанавливает текущей view набор атрибутов
	         * @param {Object} [attrs={}] - Объект с атрибутами, которые будут установлены у текущего элемента view
	         */
	
	    }, {
	        key: 'setAttrs',
	        value: function setAttrs() {
	            var _this = this;
	
	            var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	            (0, _keys2.default)(attrs).forEach(function (name) {
	                _this._el.setAttribute(name, attrs[name]);
	            });
	        }
	    }, {
	        key: 'setClasses',
	        value: function setClasses() {
	            var _this2 = this;
	
	            var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	            classes.forEach(function (name) {
	                _this2._el.classList.add(name);
	            });
	        }
	
	        /**
	         * Возвращает строку, содержашую текстовое представление текущей view
	         * @returns {string}
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this._el.outerHTML;
	        }
	
	        /**
	         * Устанавливает текущей view роутер
	         * @param {Router} router - инстанс роутера
	         */
	
	    }, {
	        key: 'setRouter',
	        value: function setRouter(router) {
	            this.router = router;
	        }
	    }]);
	    return View;
	}();
	
	exports.default = View;
	
	window.View = View;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(121);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"form_sign-in\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sign-up-control\"\u003E\u003Ch1\u003EOR\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _form = __webpack_require__(97);
	
	var _form2 = _interopRequireDefault(_form);
	
	var _view = __webpack_require__(129);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SignUpView = function (_View) {
	    (0, _inherits3.default)(SignUpView, _View);
	
	    function SignUpView() {
	        (0, _classCallCheck3.default)(this, SignUpView);
	        return (0, _possibleConstructorReturn3.default)(this, (SignUpView.__proto__ || (0, _getPrototypeOf2.default)(SignUpView)).call(this));
	    }
	
	    (0, _createClass3.default)(SignUpView, [{
	        key: 'init',
	        value: function init() {
	            this.setClasses(['content', 'js-signup']);
	
	            this.signUpForm = new _form2.default({
	                title: 'sign up',
	                classes: ['form', 'form-signup'],
	                action: 'signup',
	                data: {
	                    fields: [{
	                        label: 'Enter username',
	                        attrs: {
	                            name: 'username',
	                            type: 'text'
	                        }
	                    }, {
	                        label: 'Enter password',
	                        attrs: {
	                            name: 'password',
	                            type: 'password'
	                        }
	                    }, {
	                        label: 'Repeat password',
	                        attrs: {
	                            name: 'password2',
	                            type: 'password'
	                        }
	                    }],
	                    controls: [{
	                        text: 'submit',
	                        classes: ['btn', 'btn_submit'],
	                        attrs: {
	                            type: 'submit'
	                        }
	                    }, {
	                        text: 'reset',
	                        classes: ['btn', 'btn_reset'],
	                        attrs: {
	                            type: 'reset'
	                        }
	                    }]
	                }
	            });
	            this._el.appendChild(this.signUpForm._get());
	            document.querySelector('.app').appendChild(this._el);
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.hide();
	            this.signUpForm.resetForm();
	        }
	    }]);
	    return SignUpView;
	}(_view2.default);
	
	exports.default = SignUpView;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _view = __webpack_require__(129);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _gameGate = __webpack_require__(133);
	
	var _gameGate2 = _interopRequireDefault(_gameGate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GameGateView = function (_View) {
	    (0, _inherits3.default)(GameGateView, _View);
	
	    function GameGateView() {
	        (0, _classCallCheck3.default)(this, GameGateView);
	        return (0, _possibleConstructorReturn3.default)(this, (GameGateView.__proto__ || (0, _getPrototypeOf2.default)(GameGateView)).call(this));
	    }
	
	    (0, _createClass3.default)(GameGateView, [{
	        key: 'init',
	        value: function init() {
	            var _this2 = this;
	
	            this.setClasses(['content', 'js-gameGate']);
	            this._el = document.createElement('div');
	            this.game = new _gameGate2.default(this._el);
	            document.querySelector('.gameGate').appendChild(this._el);
	            wsm.myOn(/start/, function (msg) {
	                new Router().go('/app');
	                _this2.game.active = false;
	            });
	        }
	    }]);
	    return GameGateView;
	}(_view2.default);
	
	exports.default = GameGateView;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(126);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GameGate = function (_Block) {
		(0, _inherits3.default)(GameGate, _Block);
	
		function GameGate(options) {
			(0, _classCallCheck3.default)(this, GameGate);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (GameGate.__proto__ || (0, _getPrototypeOf2.default)(GameGate)).call(this, 'options', options));
	
			_this._el = options;
			_this.active = true;
			_this.fn();
			wsm.myOn(/openGames/, function (data) {
				_this._el.innerHTML = '';
				_this.mainForm = document.createElement('form');
				data.forEach(function (el) {
					var domObj = document.createElement('button');
					domObj.setAttribute("class", "btn btn_submit");
					domObj.setAttribute("name", 'in' + el[0]);
					domObj.innerHTML = 'Вступить';
					_this.mainForm.appendChild(domObj);
				});
				_this.newGameButton = document.createElement('button');
				_this.newGameButton.setAttribute("class", "btn btn_submit");
				_this.newGameButton.setAttribute("name", 'newGame');
				_this.newGameButton.innerHTML = 'Создать игру';
				_this.mainForm.appendChild(_this.newGameButton);
				_this._el.appendChild(_this.mainForm);
				_this.mainForm.addEventListener("click", function (event) {
					event.preventDefault();
					if (event.target.name == 'newGame') {
						wsm.send((0, _stringify2.default)({
							action: 'createGame',
							data: 2
						}));
					} else {
						console.log(event.target.name);
						wsm.send((0, _stringify2.default)({
							action: 'joinGame',
							data: 0
						}));
					}
				});
			});
			return _this;
		}
	
		(0, _createClass3.default)(GameGate, [{
			key: 'fn',
			value: function fn() {
				if (this.active) {
					window.wsm.send((0, _stringify2.default)({
						action: 'openGamesStatus',
						data: null }));
					setTimeout(this.fn.bind(this), 1000);
				}
			}
		}]);
		return GameGate;
	}(_block2.default);
	
	exports.default = GameGate;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _view = __webpack_require__(129);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _menu = __webpack_require__(135);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MainView = function (_View) {
	    (0, _inherits3.default)(MainView, _View);
	
	    function MainView() {
	        (0, _classCallCheck3.default)(this, MainView);
	        return (0, _possibleConstructorReturn3.default)(this, (MainView.__proto__ || (0, _getPrototypeOf2.default)(MainView)).call(this));
	    }
	
	    (0, _createClass3.default)(MainView, [{
	        key: 'init',
	        value: function init() {
	            this.setClasses(['content', 'js-main']);
	
	            this.backgroundImg = new _block2.default('img', {
	                classes: ['content__background-img', 'main-background-img'],
	                attrs: {
	                    src: 'img/back.png'
	                }
	            });
	
	            this.menu = new _menu2.default({
	                el: this._el,
	                items: [{
	                    text: 'play',
	                    url: '/signin',
	                    classes: ['btn', 'btn_play', 'btn_with_shadow']
	                }]
	            });
	
	            this._el.appendChild(this.backgroundImg._get());
	            document.querySelector('.app').appendChild(this._el);
	        }
	    }]);
	    return MainView;
	}(_view2.default);
	
	exports.default = MainView;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	var _button = __webpack_require__(102);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _linkedButton = __webpack_require__(128);
	
	var _linkedButton2 = _interopRequireDefault(_linkedButton);
	
	var _main = __webpack_require__(136);
	
	var _main2 = _interopRequireDefault(_main);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Menu = function (_Block) {
	    (0, _inherits3.default)(Menu, _Block);
	
	    function Menu() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        (0, _classCallCheck3.default)(this, Menu);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call(this, 'div'));
	
	        _this._el = options.el;
	        _this._items = options.items;
	        _this.render();
	        return _this;
	    }
	
	    (0, _createClass3.default)(Menu, [{
	        key: 'render',
	        value: function render() {
	            this._updateHtml();
	            this._installItems();
	        }
	    }, {
	        key: '_updateHtml',
	        value: function _updateHtml() {
	            this._el.innerHTML = (0, _main2.default)();
	        }
	    }, {
	        key: '_installItems',
	        value: function _installItems() {
	            var _this2 = this;
	
	            this._items.forEach(function (item) {
	                var control = new _linkedButton2.default({
	                    text: item.text,
	                    url: item.url,
	                    classes: item.classes,
	                    attrs: item.attrs
	                });
	                _this2._el.querySelector('.menu').appendChild(control._get());
	            });
	        }
	    }]);
	    return Menu;
	}(_block2.default);
	
	exports.default = Menu;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(121);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"menu\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _game = __webpack_require__(138);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _view = __webpack_require__(129);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _app = __webpack_require__(142);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _block = __webpack_require__(101);
	
	var _block2 = _interopRequireDefault(_block);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AppView = function (_View) {
	    (0, _inherits3.default)(AppView, _View);
	
	    function AppView() {
	        (0, _classCallCheck3.default)(this, AppView);
	        return (0, _possibleConstructorReturn3.default)(this, (AppView.__proto__ || (0, _getPrototypeOf2.default)(AppView)).call(this));
	    }
	
	    (0, _createClass3.default)(AppView, [{
	        key: 'init',
	        value: function init() {
	            this.setClasses(['content', 'js-app']);
	            this._el = document.createElement('canvas');
	            this._el.setAttribute('width', 1400);
	            this._el.setAttribute('height', 650);
	            this._el.setAttribute('style', 'justify-content:space-between;');
	            console.log(this._el.getBoundingClientRect());
	            this.game = new _game2.default(this._el);
	            document.querySelector('.app').appendChild(this._el);
	        }
	    }]);
	    return AppView;
	}(_view2.default);
	
	exports.default = AppView;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _timemanager = __webpack_require__(139);
	
	var _timemanager2 = _interopRequireDefault(_timemanager);
	
	var _uimanager = __webpack_require__(140);
	
	var _uimanager2 = _interopRequireDefault(_uimanager);
	
	var _elements = __webpack_require__(141);
	
	var _elements2 = _interopRequireDefault(_elements);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Game = function Game(canvas) {
		(0, _classCallCheck3.default)(this, Game);
	
		this._el = canvas;
		this.ctx = canvas.getContext('2d');
		this.ctx.strokeRect(0, 0, this._el.width, this._el.height);
		this.ws = window.wsm;
		this.ui = new _uimanager2.default(this.ctx, this._el);
		this.time = new _timemanager2.default(this.ctx);
		this.root = new _elements2.default(this._el, this.ctx, this.ui, this.ws, this.time);
		this.ws.start();
	};
	
	exports.default = Game;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TimeManager = function () {
		function TimeManager(cfx) {
			(0, _classCallCheck3.default)(this, TimeManager);
	
			this.listeners = [];
			this.isStopped = true;
		}
	
		(0, _createClass3.default)(TimeManager, [{
			key: "start",
			value: function start(root) {
				this.root = root;
				this.isStopped = false;
				this.startLoop();
			}
		}, {
			key: "startLoop",
			value: function startLoop() {
				var time = void 0;
				var isStopped = this.isStopped;
				var exec = this.exec.bind(this);
				function step() {
					var now = Date.now();
					var dt = now - (time || now);
					time = now;
					if (!isStopped) {
						requestAnimationFrame(step);
					}
					exec(dt);
				}
				step();
			}
		}, {
			key: "exec",
			value: function exec(dt) {
				var keys = this.keys;
				this.root.clear();
				this.listeners.forEach(function (listener) {
					listener.update(dt);
				});
				this.root.update(dt);
				this.root.draw();
			}
		}, {
			key: "addBlock",
			value: function addBlock(block) {
				this.listeners.push(block);
			}
		}]);
		return TimeManager;
	}();
	
	exports.default = TimeManager;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UIManager = function () {
		function UIManager(ctx, example) {
			var _this = this;
	
			(0, _classCallCheck3.default)(this, UIManager);
	
			this.clickable = [];
			example.addEventListener('click', function (event) {
				_this.clickable.forEach(function (el) {
					el.unSelect();
					if (el.x < event.pageX && el.y < event.pageY && el.x + el.width > event.pageX && el.y + el.height > event.pageY) {
						el.onClick(event.pageX - el.x, event.pageY - el.y);
					}
				});
			});
		}
	
		(0, _createClass3.default)(UIManager, [{
			key: 'addBlock',
			value: function addBlock(block) {
				this.clickable.push(block);
			}
		}]);
		return UIManager;
	}();
	
	exports.default = UIManager;
	
	window.UIManger = UIManager;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _stringify = __webpack_require__(126);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _getPrototypeOf = __webpack_require__(49);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _possibleConstructorReturn2 = __webpack_require__(54);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(89);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classCallCheck2 = __webpack_require__(3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(4);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var COLORS = ['#11FF11', '#FF1111', '#1111FF', '#1FF111', '#111FF1', '#1F1F11', '#11F1F1', '#F1F1F1'];
	
	var COLORS_BACK = ['#11AA11', '#AA1111', '#1111AA', '#1AA111', '#111AA1', '#1A1A11', '#11A1A1', '#A1A1A1'];
	
	var Block = function () {
		function Block(ctx, x, y, width, height, text) {
			var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '#55FFFF';
			(0, _classCallCheck3.default)(this, Block);
	
			this.color = color;
			this.x = x;
			this.y = y;
			this.ctx = ctx;
			this.text = text;
			this.width = width;
			this.height = height;
			this.isVisiable = true;
			this.isHidden = false;
			this.isSelected = false;
			this.isEnable = true;
		}
	
		(0, _createClass3.default)(Block, [{
			key: 'select',
			value: function select() {
				if (this.isVisiable) {
					this.isSelected = true;
					this.clear();
				}
			}
		}, {
			key: 'unSelect',
			value: function unSelect() {
				if (this.isVisiable) {
					this.isSelected = false;
					this.clear();
				}
			}
		}, {
			key: 'onReady',
			value: function onReady() {}
		}, {
			key: 'onClick',
			value: function onClick() {
				if (this.isVisiable && this.isEnable) {
					this.select();
					this.onReady();
				}
				return this.isVisiable;
			}
		}, {
			key: 'onMessage',
			value: function onMessage(event) {
				this.show();
			}
		}, {
			key: 'hide',
			value: function hide() {
				this.isHidden = true;
				this._hide();
			}
		}, {
			key: '_hide',
			value: function _hide() {
				this.isVisiable = false;
				this.clear();
				if (this.blocks != null) {
					this.blocks.forEach(function (el) {
						el._hide();
					});
				}
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.ctx.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
			}
		}, {
			key: 'show',
			value: function show() {
				this.isHidden = false;
				this._show();
			}
		}, {
			key: '_show',
			value: function _show() {
				if (this.isHidden == false) {
					this.isVisiable = true;
					if (this.blocks != null) {
						this.blocks.forEach(function (el) {
							el._show();
						});
					}
				}
			}
		}, {
			key: 'draw',
			value: function draw() {
				if (this.isVisiable) {
					this.ctx.fillStyle = '#FFFFFF';
					this.ctx.fillRect(this.x, this.y, this.width, this.height);
					if (this.isSelected) {
						this.ctx.fillStyle = this.color;
						this.ctx.fillRect(this.x, this.y, this.width, this.height);
					} else {
						if (this.isEnable) {
							this.ctx.fillStyle = '#5500FF';
							this.ctx.strokeRect(this.x, this.y, this.width, this.height);
						} else {
							this.ctx.fillStyle = '#111111';
							this.ctx.fillRect(this.x, this.y, this.width, this.height);
						}
					}
					if (this.text != null) {
						this.ctx.fillStyle = "#00F";
						this.ctx.font = "italic 15pt Arial";
						this.ctx.fillText(this.text, this.x + 10, this.y + this.height - 10);
					}
					if (this.blocks != null) {
						this.blocks.forEach(function (el) {
							el.draw();
						});
					}
				}
			}
		}, {
			key: 'update',
			value: function update(time) {
				this.move && this.move();
			}
		}]);
		return Block;
	}();
	
	var Field = function (_Block) {
		(0, _inherits3.default)(Field, _Block);
	
		function Field(ctx, x, y, width, height, num, owner, fld) {
			(0, _classCallCheck3.default)(this, Field);
	
			var _this = (0, _possibleConstructorReturn3.default)(this, (Field.__proto__ || (0, _getPrototypeOf2.default)(Field)).call(this, ctx, x, y, width, height, num));
	
			_this.fld = fld;
			_this.num = num;
			_this.isSelected = true;
			_this.owner = -1;
			return _this;
		}
	
		(0, _createClass3.default)(Field, [{
			key: 'onReady',
			value: function onReady() {
				this.fld.showFld(this.num);
			}
		}, {
			key: 'draw',
			value: function draw() {
				if (this.isVisiable) {
					if (this.owner >= 0) {
						this.ctx.fillStyle = COLORS_BACK[this.owner];
						this.ctx.fillRect(this.x, this.y, this.width, this.height);
						this.ctx.fillStyle = '#0';
						this.ctx.strokeRect(this.x, this.y, this.width, this.height);
					} else {
						this.ctx.fillStyle = '#5500FF';
						this.ctx.strokeRect(this.x, this.y, this.width, this.height);
					}
					if (this.text != null) {
						this.ctx.fillStyle = "#00F";
						this.ctx.font = "italic 15pt Arial";
						this.ctx.fillText(this.text, this.x + 10, this.y + this.height - 10);
					}
					if (this.blocks != null) {
						this.blocks.forEach(function (el) {
							el.draw();
						});
					}
				}
			}
		}]);
		return Field;
	}(Block);
	
	var User = function (_Block2) {
		(0, _inherits3.default)(User, _Block2);
	
		function User(ctx, num, data, parent) {
			var cash = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 5000;
			(0, _classCallCheck3.default)(this, User);
	
			var _this2 = (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).call(this, ctx, 10, 10 + 80 * num, 300, 60, data));
	
			_this2.cash = cash;
			_this2.blocks = [];
			_this2.num = num;
			_this2.pos = 0;
			_this2.moneyField = new Block(ctx, 200, 10 + 80 * num, 110, 60, _this2.cash);
			_this2.blocks.push(_this2.moneyField);
			return _this2;
		}
	
		(0, _createClass3.default)(User, [{
			key: 'addCash',
			value: function addCash(sum) {
				this.cash += sum;
				this.moneyField.text = this.cash;
			}
		}, {
			key: 'setCash',
			value: function setCash(cash) {
				console.log("++>" + cash);
				this.cash = cash;
				this.moneyField.text = this.cash;
			}
		}, {
			key: 'onReady',
			value: function onReady() {}
		}]);
		return User;
	}(Block);
	
	var AuctionMenue = function (_Block3) {
		(0, _inherits3.default)(AuctionMenue, _Block3);
	
		function AuctionMenue(ctx, ui, ws) {
			(0, _classCallCheck3.default)(this, AuctionMenue);
	
			var _this3 = (0, _possibleConstructorReturn3.default)(this, (AuctionMenue.__proto__ || (0, _getPrototypeOf2.default)(AuctionMenue)).call(this, ctx, 480, 200, 300, 100));
	
			_this3.ws = ws;
			_this3.wsFilter = /auction/;
			_this3.blocks = [];
			_this3.w = 120;
			_this3.h = 30;
			_this3.textField = new Block(ctx, _this3.x + 10, _this3.y + 10, _this3.width - 20, 40, 'Купить предприятие');
			_this3.blocks.push(_this3.textField);
			_this3.yes = new Block(ctx, _this3.x + 10, _this3.y + _this3.height - _this3.h - 10, _this3.w, _this3.h, 'Купить');
			_this3.yes.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "auction.yes",
					data: 0
				}));
				_this3.hide();
			};
	
			_this3.blocks.push(_this3.yes);
			_this3.not = new Block(ctx, _this3.x + _this3.width - 10 - _this3.w, _this3.y + _this3.height - _this3.h - 10, _this3.w, _this3.h, 'Отказаться');
			_this3.not.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "auction.not",
					data: 0
				}));
				_this3.hide();
			};
			_this3.blocks.push(_this3.not);
			_this3.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			_this3.hide();
			ws.addBlock(_this3);
			return _this3;
		}
	
		(0, _createClass3.default)(AuctionMenue, [{
			key: 'onMessage',
			value: function onMessage(event) {
				this.yes.isSelceted = false;
				this.textField.text = '\u041A\u0443\u043F\u0438\u0442\u044C ' + event.field + ' \u0437\u0430 ' + event.cost + '$';
				if (event.enable) {
					this.yes.isEnable = true;
				} else {
					this.yes.isEnable = false;
				}
				this.show();
			}
		}]);
		return AuctionMenue;
	}(Block);
	
	var FieldMenue = function (_Block4) {
		(0, _inherits3.default)(FieldMenue, _Block4);
	
		function FieldMenue(ctx, ui, ws) {
			(0, _classCallCheck3.default)(this, FieldMenue);
	
			var _this4 = (0, _possibleConstructorReturn3.default)(this, (FieldMenue.__proto__ || (0, _getPrototypeOf2.default)(FieldMenue)).call(this, ctx, 480, 200, 300, 100));
	
			_this4.ws = ws;
			_this4.field = 0;
			_this4.blocks = [];
			_this4.w = 120;
			_this4.h = 30;
			_this4.textField = new Block(ctx, _this4.x + 10, _this4.y + 10, _this4.width - 20, 40, 'Field menue');
			_this4.blocks.push(_this4.textField);
			_this4.upgrage = new Block(ctx, _this4.x + 10, _this4.y + _this4.height - _this4.h - 10, _this4.w, _this4.h, 'Улучшить');
			_this4.upgrage.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "field.upgrade",
					data: _this4.field
				}));
				_this4.hide();
			};
			_this4.blocks.push(_this4.upgrage);
			_this4.zalozhit = new Block(ctx, _this4.x + _this4.width - 10 - _this4.w, _this4.y + _this4.height - _this4.h - 10, _this4.w, _this4.h, 'Заложить');
			_this4.zalozhit.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "field.zalozhit",
					data: _this4.field
				}));
				_this4.hide();
			};
			_this4.blocks.push(_this4.zalozhit);
			_this4.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			_this4.hide();
			ws.addBlock(_this4);
			return _this4;
		}
	
		(0, _createClass3.default)(FieldMenue, [{
			key: 'showFld',
			value: function showFld(val) {
				this.field = val;
				this.textField.text = this.field;
				this.show();
			}
		}]);
		return FieldMenue;
	}(Block);
	
	var TradeMenue = function (_Block5) {
		(0, _inherits3.default)(TradeMenue, _Block5);
	
		function TradeMenue(ctx, ui) {
			(0, _classCallCheck3.default)(this, TradeMenue);
	
			var _this5 = (0, _possibleConstructorReturn3.default)(this, (TradeMenue.__proto__ || (0, _getPrototypeOf2.default)(TradeMenue)).call(this, ctx, 480, 200, 300, 300));
	
			_this5.blocks = [];
			_this5.wsFilter = /trade/;
			_this5.w = 120;
			_this5.h = 30;
			_this5.blocks.push(new Block(ctx, _this5.x + 10, _this5.y + _this5.height - _this5.h - 10, _this5.w, _this5.h));
			_this5.blocks.push(new Block(ctx, _this5.x + _this5.width - 10 - _this5.w, _this5.y + _this5.height - _this5.h - 10, _this5.w, _this5.h));
			_this5.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			_this5.hide();
			ws.addBlock(_this5);
			return _this5;
		}
	
		return TradeMenue;
	}(Block);
	
	var PayMenue = function (_Block6) {
		(0, _inherits3.default)(PayMenue, _Block6);
	
		function PayMenue(ctx, ui, ws) {
			(0, _classCallCheck3.default)(this, PayMenue);
	
			var _this6 = (0, _possibleConstructorReturn3.default)(this, (PayMenue.__proto__ || (0, _getPrototypeOf2.default)(PayMenue)).call(this, ctx, 480, 200, 300, 100));
	
			_this6.ws = ws;
			_this6.wsFilter = /pay/;
			_this6.blocks = [];
			_this6.w = 120;
			_this6.h = 30;
			_this6.textField = new Block(ctx, _this6.x + 10, _this6.y + 10, _this6.width - 20, 40, 'Need Pay');
			_this6.blocks.push(_this6.textField);
			_this6.yes = new Block(ctx, _this6.x + 10, _this6.y + _this6.height - _this6.h - 10, _this6.w, _this6.h, 'Pay');
			_this6.yes.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "pay",
					data: 0
				}));
				_this6.hide();
			};
	
			_this6.blocks.push(_this6.yes);
			_this6.not = new Block(ctx, _this6.x + _this6.width - 10 - _this6.w, _this6.y + _this6.height - _this6.h - 10, _this6.w, _this6.h, 'Not pay');
			_this6.not.onReady = function () {
				ws.send((0, _stringify2.default)({
					action: "notPay",
					data: 0
				}));
				_this6.hide();
			};
			_this6.blocks.push(_this6.not);
			_this6.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			_this6.hide();
			ws.addBlock(_this6);
			return _this6;
		}
	
		(0, _createClass3.default)(PayMenue, [{
			key: 'onMessage',
			value: function onMessage(event) {
				this.yes.isSelceted = false;
				this.textField.text = 'Need pay ' + event.cost;
				if (event.enable) {
					this.yes.isEnable = true;
				} else {
					this.yes.isEnable = false;
				}
				this.show();
			}
		}]);
		return PayMenue;
	}(Block);
	
	var MyStepMenue = function (_Block7) {
		(0, _inherits3.default)(MyStepMenue, _Block7);
	
		function MyStepMenue(ctx, ui, ws) {
			(0, _classCallCheck3.default)(this, MyStepMenue);
	
			var _this7 = (0, _possibleConstructorReturn3.default)(this, (MyStepMenue.__proto__ || (0, _getPrototypeOf2.default)(MyStepMenue)).call(this, ctx, 480, 200, 300, 300));
	
			_this7.blocks = [];
			_this7.wsFilter = /myStep/;
			_this7.w = 120;
			_this7.h = 30;
			var el = new Block(ctx, _this7.x + _this7.width / 2 - _this7.w / 2, _this7.y + _this7.height - _this7.h - 10, _this7.w, _this7.h, "Roll Dice");
			el.onReady = function () {
				ws.send((0, _stringify2.default)({ action: "rollDice", data: null }));
				_this7.hide();
			};
			_this7.blocks.push(new Block(ctx, _this7.x + 10, _this7.y + 10, _this7.width - 20, _this7.height - 80, "Roll Dice"));
			_this7.blocks.push(el);
			_this7.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			_this7.hide();
			ws.addBlock(_this7);
			return _this7;
		}
	
		return MyStepMenue;
	}(Block);
	
	var GameSquare = function (_Block8) {
		(0, _inherits3.default)(GameSquare, _Block8);
	
		function GameSquare(ctx, ui, fld) {
			(0, _classCallCheck3.default)(this, GameSquare);
	
			var _this8 = (0, _possibleConstructorReturn3.default)(this, (GameSquare.__proto__ || (0, _getPrototypeOf2.default)(GameSquare)).call(this, ctx, 350, 10, 610, 610));
	
			_this8.fld = fld;
			_this8.blocks = [];
			_this8.w = 50;
			_this8.h = 80;
			var j = 0;
			_this8.blocks.push(new Field(ctx, _this8.x, _this8.y, _this8.h, _this8.h, j++, -1, _this8.fld));
			for (var i = 0; i < 9; i++) {
				_this8.blocks.push(new Field(ctx, _this8.x + _this8.h + i * _this8.w, _this8.y + 0, _this8.w, _this8.h, j++, -1, _this8.fld));
			}
			_this8.blocks.push(new Field(ctx, _this8.x + 9 * _this8.w + _this8.h, _this8.y, _this8.h, _this8.h, j++, -1, _this8.fld));
			for (var i = 0; i < 9; i++) {
				_this8.blocks.push(new Field(ctx, _this8.x + 9 * _this8.w + _this8.h, _this8.y + _this8.h + _this8.w * i, _this8.h, _this8.w, j++, -1, _this8.fld));
			}
			_this8.blocks.push(new Field(ctx, _this8.x + 9 * _this8.w + _this8.h, _this8.y + 9 * _this8.w + _this8.h, _this8.h, _this8.h, j++, -1, _this8.fld));
			for (var i = 8; i >= 0; i--) {
				_this8.blocks.push(new Field(ctx, _this8.x + _this8.h + i * _this8.w, _this8.y + 9 * _this8.w + _this8.h, _this8.w, _this8.h, j++, -1, _this8.fld));
			}
			_this8.blocks.push(new Field(ctx, _this8.x, _this8.y + 9 * _this8.w + _this8.h, _this8.h, _this8.h, j++, -1, _this8.fld));
			for (var i = 8; i >= 0; i--) {
				_this8.blocks.push(new Field(ctx, _this8.x + 0, _this8.y + _this8.h + _this8.w * i, _this8.h, _this8.w, j++, -1, _this8.fld));
			}
			_this8.blocks.forEach(function (el) {
				ui.addBlock(el);
			});
			return _this8;
		}
	
		(0, _createClass3.default)(GameSquare, [{
			key: 'update',
			value: function update(obj) {
				console.log('update(obj)');
				var field = obj.field;
				var owner = obj.owner;
				this.blocks[field].owner = owner;
			}
		}, {
			key: 'getPlants',
			value: function getPlants() {
				return this.blocks;
			}
		}]);
		return GameSquare;
	}(Block);
	
	var UsersBox = function (_Block9) {
		(0, _inherits3.default)(UsersBox, _Block9);
	
		function UsersBox(ctx, ui, ws) {
			(0, _classCallCheck3.default)(this, UsersBox);
	
			var _this9 = (0, _possibleConstructorReturn3.default)(this, (UsersBox.__proto__ || (0, _getPrototypeOf2.default)(UsersBox)).call(this, ctx, 10, 10, 300, 650));
	
			_this9.blocks = [];
			_this9.ui = ui;
			_this9.ws = ws;
			_this9.cte = ctx;
			_this9.wsFilter = /gameState|moneyState|buyField/;
			ws.addBlock(_this9);
			return _this9;
		}
	
		(0, _createClass3.default)(UsersBox, [{
			key: 'onMessage',
			value: function onMessage(msg, act) {
				var _this10 = this;
	
				if (act == 'gameState') {
					(function () {
						var i = 0;
						_this10.blocks = msg.names.map(function (el) {
							var block = new User(_this10.ctx, i++, el);
							_this10.ui.addBlock(block);
							block.show();
							return block;
						});
					})();
				} else if (act == 'moneyState') {
					var _i = 0;
					console.log("I AM HERE");
					for (_i = 0; _i < msg.length; _i++) {
						this.blocks[_i].setCash(msg[_i]);
					}
				} else if (act == 'buyField') {
					console.log('here');
					this.blocks[msg.owner].addCash(-msg.cost);
				}
			}
		}, {
			key: 'getUsers',
			value: function getUsers() {
				return this.blocks;
			}
		}]);
		return UsersBox;
	}(Block);
	
	var Root = function (_Block10) {
		(0, _inherits3.default)(Root, _Block10);
	
		function Root(obj, ctx, ui, ws, time) {
			(0, _classCallCheck3.default)(this, Root);
	
			var _this11 = (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || (0, _getPrototypeOf2.default)(Root)).call(this, ctx, 0, 0, obj.width, obj.height));
	
			time.start(_this11);
			_this11.ws = ws;
			_this11.wsFilter = /step|buyField/;
			_this11.blocks = [];
			_this11.ctx = ctx;
			_this11.ub = new UsersBox(ctx, ui, ws);
			_this11.blocks.push(_this11.ub);
			_this11.fld = new FieldMenue(ctx, ui, ws);
			_this11.blocks.push(_this11.fld);
			_this11.gs = new GameSquare(ctx, ui, _this11.fld);
			_this11.blocks.push(_this11.gs);
			_this11.fg = new Figures(ctx, _this11.gs.blocks, ws, time);
			_this11.blocks.push(_this11.fg);
			_this11.blocks.push(new AuctionMenue(ctx, ui, ws));
			//this.blocks.push(new TradeMenue(ctx, ui));
			_this11.blocks.push(new MyStepMenue(ctx, ui, ws));
			_this11.blocks.push(new PayMenue(ctx, ui, ws));
			_this11.ws.addBlock(_this11);
			return _this11;
		}
	
		(0, _createClass3.default)(Root, [{
			key: 'onMessage',
			value: function onMessage(val, action) {
				if (action == 'step') {
					this.fg.steps(val.step);
				} else if (action == 'buyField') {
					this.gs.update(val);
				}
			}
		}]);
		return Root;
	}(Block);
	
	exports.default = Root;
	
	var Figures = function (_Block11) {
		(0, _inherits3.default)(Figures, _Block11);
	
		function Figures(ctx, blocks, ws, time) {
			(0, _classCallCheck3.default)(this, Figures);
	
			var _this12 = (0, _possibleConstructorReturn3.default)(this, (Figures.__proto__ || (0, _getPrototypeOf2.default)(Figures)).call(this, ctx, 0, 0, 0, 0));
	
			_this12.time = time;
			_this12.cur = 0;
			_this12.ws = ws;
			_this12.ctx = ctx;
			_this12.wsFilter = /gameState|step/;
			_this12.blocks = [];
			_this12.bs = blocks;
			ws.addBlock(_this12);
			return _this12;
		}
	
		(0, _createClass3.default)(Figures, [{
			key: 'steps',
			value: function steps(val) {
				this.blocks[this.cur].steps += val;
				this.cur = (this.cur + 1) % this.blocks.length;
			}
		}, {
			key: 'onMessage',
			value: function onMessage(data, action) {
				var _this13 = this;
	
				if (action == "gameState") {
					(function () {
						var i = 0;
						_this13.blocks = data.names.map(function (player) {
							return new Figure(_this13.ctx, _this13.bs, { num: i++, pos: 0 }, _this13.time);
						});
					})();
				} else if (action == "step") {}
			}
		}]);
		return Figures;
	}(Block);
	
	var Figure = function (_Block12) {
		(0, _inherits3.default)(Figure, _Block12);
	
		function Figure(ctx, blocks) {
			var player = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { num: 0, pos: 0 };
			var time = arguments[3];
			(0, _classCallCheck3.default)(this, Figure);
	
			var _this14 = (0, _possibleConstructorReturn3.default)(this, (Figure.__proto__ || (0, _getPrototypeOf2.default)(Figure)).call(this, ctx, blocks[player.pos].x, blocks[player.pos].y + player.num * 25, 20, 20, "", COLORS[player.num]));
	
			_this14.time = time;
			_this14.isSelected = true;
			_this14.show();
			_this14.player = player;
			_this14.steps = 0;
			_this14.pos = _this14.player.pos;
			_this14.num = _this14.player.num;
			_this14.bs = blocks;
			_this14.time.addBlock(_this14);
			return _this14;
		}
	
		(0, _createClass3.default)(Figure, [{
			key: 'move',
			value: function move(dt) {
				if (this.steps > 0) {
					if (this.bs[(this.pos + 1) % 40].x > this.x) {
						this.x += 5;
						if (this.bs[(this.pos + 1) % 40].x <= this.x) {
							this.pos += 1;
							this.pos = this.pos % 40;
							this.x = this.bs[this.pos].x;
							this.y = this.bs[this.pos].y + this.num * 25;
							this.steps -= 1;
						}
					} else if (this.bs[(this.pos + 1) % 40].x < this.x) {
						this.x -= 5;
						if (this.bs[(this.pos + 1) % 40].x >= this.x) {
							this.pos += 1;
							this.pos = this.pos % 40;
							this.x = this.bs[this.pos].x;
							this.y = this.bs[this.pos].y + this.num * 25;
							this.steps -= 1;
						}
					} else if (this.bs[(this.pos + 1) % 40].y > this.y - this.num * 25) {
						this.y += 5;
						if (this.bs[(this.pos + 1) % 40].y <= this.y - this.num * 25) {
							this.pos += 1;
							this.pos = this.pos % 40;
							this.x = this.bs[this.pos].x;
							this.y = this.bs[this.pos].y + this.num * 25;
							this.steps -= 1;
						}
					} else if (this.bs[(this.pos + 1) % 40].y < this.y - this.num * 25) {
						this.y -= 5;
						if (this.bs[(this.pos + 1) % 40].y >= this.y - this.num * 25) {
							this.pos += 1;
							this.pos = this.pos % 40;
							this.x = this.bs[this.pos].x;
							this.y = this.bs[this.pos].y + this.num * 25;
							this.steps -= 1;
						}
					}
				}
			}
		}]);
		return Figure;
	}(Block);

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(121);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"block\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map