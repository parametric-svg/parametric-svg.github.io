/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var parametricSVG = _interopRequire(__webpack_require__(1));

	// Cache DOM elements.

	var logo = document.getElementById("logo");

	var stretchOut = document.getElementById("stretch-out");
	var fill = document.getElementById("fill");
	var stretchDown = document.getElementById("stretch-down");

	// Cache parametricSVG stuff.

	var tree = parametricSVG(logo);
	var parameters = {};
	function updateSVG() {
	  parametricSVG(tree, parameters);
	}

	// Hook up events.

	var hiddenClass = "rolled-up";

	stretchOut.addEventListener("input", function () {
	  parameters.stretchOut = +stretchOut.value;
	  updateSVG();
	  fill.classList.remove(hiddenClass);
	});

	function fillInput() {
	  parameters.fill = fill.value;
	  updateSVG();
	  stretchDown.classList.remove(hiddenClass);
	}
	function fallbackFillValue() {
	  if (!fill.value) fill.value = "#9eab05";
	}
	fill.addEventListener("input", fillInput);
	fill.addEventListener("focus", function () {
	  fallbackFillValue();
	  fill.select();
	});
	fill.addEventListener("blur", function () {
	  fallbackFillValue();
	  fillInput();
	});

	stretchDown.addEventListener("input", function () {
	  parameters.stretchDown = +stretchDown.value;
	  updateSVG();
	});

	// Set focus.

	stretchOut.focus();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = parametricSVG;

	var VirtualTree = _interopRequire(__webpack_require__(2));

	var getParameters = _interopRequire(__webpack_require__(3));

	var validateParameter = _interopRequire(__webpack_require__(4));

	function parametricSVG(root) {
	  var parameters = arguments[1] === undefined ? {} : arguments[1];

	  var tree = undefined,
	      svgRoot = undefined,
	      element = undefined;

	  if (!parameters || typeof parameters != "object") throw new TypeError("parametricSVG: " + "If you pass `parameters`, it must be an object.");
	  var parsedParameters = {};
	  for (var parameter in parameters) {
	    if (parameters.hasOwnProperty(parameter)) {
	      parsedParameters[parameter] = validateParameter(parameters[parameter]);
	    }
	  } /**
	     * Parse and render all elements within the `svgRoot`. Defaults set with `<ref>` elements
	     * will be used for calculation, unless you override them with `parameters`.
	     *
	     * @param  {SVGSVGElement}  svgRoot
	     *   An `<svg>` element.
	     *
	     * @param  {Object}  [parameters]
	     *   A hash of additional parameters. They'll extend and override defaults set with `<ref>`
	     *   elements.
	     *
	     * @returns {VirtualTree}
	     *   A cached virtual DOM tree for lightning-fast redraws.
	     *
	     * @function parametricSVG
	     */
	  if ((svgRoot = root) instanceof SVGSVGElement) {
	    tree = new VirtualTree(Array.from(svgRoot.childNodes), { _parameters: Object.assign(getParameters(svgRoot), parsedParameters)
	    });
	  }

	  /**
	   * Pass any SVG node (like `<circle>`) to parse and render the node and all its descendants.
	   *
	   * @param  {SVGElement}  element
	   *
	   * @param  {Object}  parameters
	   *   A hash of parameters.
	   *
	   * @returns {VirtualTree}
	   *   A cached virtual DOM tree for lightning-fast redraws.
	   *
	   * @function parametricSVG
	   */
	  else if ((element = root) instanceof SVGElement) {
	    tree = new VirtualTree([element], { _parameters: parsedParameters });
	  }

	  /**
	   * Pass a cached `VirtualTree` to render the tree without reparsing any DOM. This is the fastest
	   * option.
	   *
	   * @param  {VirtualTree}  virtualTree
	   *
	   * @param  {Object}  [parameters]
	   *   Supply a hash of additional parameters. They'll extend and replace cached ones.
	   *
	   * @returns {VirtualTree}
	   *   A cached virtual DOM tree for lightning-fast redraws.
	   *
	   * @function parametricSVG
	   */
	  else if ((tree = root) instanceof VirtualTree) {
	    Object.assign(tree._parameters, parsedParameters);
	  } else throw new TypeError("parametricSVG: " + "The first argument must be an `SVGSVGElement`, `SVGElement`, or `VirtualTree`.");

	  return tree._render();
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var SVG_NAMESPACE = __webpack_require__(5).SVG_NAMESPACE;

	var ParametricAttribute = _interopRequire(__webpack_require__(6));

	var warn = _interopRequire(__webpack_require__(7));

	var getParameter = function (virtualTree) {
	  return function getParameter(name) {
	    return virtualTree._parameters[name] || { error: new ReferenceError("Parameter not declared")
	    };
	  };
	};

	/**
	 * @class VirtualTree
	 */

	var VirtualTree = (function () {
	  function VirtualTree(entryPoints, properties) {
	    _classCallCheck(this, VirtualTree);

	    // Extend the instance's properties with `properties`.
	    Object.assign(this, { _parameters: {},
	      _parametricAttributes: []
	    }, properties);

	    // Populate `this._parameters`.
	    var parametricAttributes = this._parametricAttributes;
	    var pushAttributeIfValid = function (element) {
	      return function (attribute) {
	        var parametricAttribute = new ParametricAttribute(attribute, element);
	        if (!parametricAttribute.error) parametricAttributes.push(parametricAttribute);
	      };
	    };
	    entryPoints.forEach(function recurse(element) {
	      if (element.namespaceURI === SVG_NAMESPACE) {
	        Array.from(element.attributes).forEach(pushAttributeIfValid(element));
	      }
	      Array.from(element.childNodes).forEach(recurse);
	    });

	    // Allow chaining.
	    return this;
	  }

	  _createClass(VirtualTree, {
	    _render: {
	      value: function _render() {
	        var _this = this;

	        // Call `.update()` on every ParametricAttribute,
	        this._parametricAttributes.forEach(function (parametricAttribute) {
	          var parameters = parametricAttribute.parameterNames.map(getParameter(_this));

	          // ...warning if errors have been found,
	          var errors = parameters.filter(function (parameter) {
	            return parameter.error;
	          });
	          if (errors.length) errors.forEach(function (parameter) {
	            return warn("Error while attempting to evaluate `parametric:" + parametricAttribute.name + "`.\n" + "Element:", parametricAttribute.element, "\n" + "Error:", parameter.error);
	          });

	          // ...or passing relevant values from `this._parameters`.
	          else parametricAttribute.update.apply(parametricAttribute, _toConsumableArray(parameters.map(function (parameter) {
	            return parameter.value;
	          })));
	        });

	        // Allow chaining.
	        return this;
	      }
	    }
	  });

	  return VirtualTree;
	})();

	module.exports = VirtualTree;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = getParameters;

	__webpack_require__(9);

	var asObject = _interopRequire(__webpack_require__(10));

	var evalExpression = _interopRequire(__webpack_require__(8));

	var validateParameter = _interopRequire(__webpack_require__(4));

	var warn = _interopRequire(__webpack_require__(7));

	var _settings = __webpack_require__(5);

	var PARAMETRIC_NAMESPACE = _settings.PARAMETRIC_NAMESPACE;
	var PARAMETRIC_NAMESPACE_PREFIX = _settings.PARAMETRIC_NAMESPACE_PREFIX;
	var SVG_NAMESPACE = _settings.SVG_NAMESPACE;
	var SVG_NAMESPACE_PREFIX = _settings.SVG_NAMESPACE_PREFIX;

	function namespaceParameters(svgRoot, namespace) {
	  var prefix = arguments[2] === undefined ? null : arguments[2];

	  var textContent = undefined;
	  // Get `<ref>` elements belonging to the `namespace`,
	  var elements = Array.from(svgRoot.getElementsByTagNameNS(namespace, "ref"));

	  // …or fall back to `<prefix:ref>` (no namespace support in HTML5).
	  if (!elements.length && prefix) elements = Array.from(svgRoot.getElementsByTagName(prefix + ":ref"));

	  // Map the keys and values to an object and return.
	  return asObject(elements.map(function (element) {
	    var value = undefined,
	        error = undefined,
	        validated = undefined;
	    var key = element.getAttribute("param");
	    var rawValue = element.getAttribute("default") || (textContent = element.firstChild) && textContent.nodeValue || "null";

	    try {
	      validated = validateParameter(evalExpression(rawValue));
	    } catch (e) {
	      error = e;
	    }
	    if (!error) {
	      value = validated.value;
	      error = validated.error;
	    }
	    if (error) warn("Error while parsing default parameter.\n" + "Element:", element, "\n" + "Error:", error);

	    return { key: key,
	      value: { error: error, value: value }
	    };
	  }));
	}

	function getParameters(svgRoot) {
	  return Object.assign({}, namespaceParameters(svgRoot, SVG_NAMESPACE, SVG_NAMESPACE_PREFIX), namespaceParameters(svgRoot, PARAMETRIC_NAMESPACE, PARAMETRIC_NAMESPACE_PREFIX));
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = validateParameter;

	function validateParameter(value) {
	  if (typeof value == "number" && !isNaN(value) || typeof value == "boolean" || typeof value == "string" || value === null) {
	    return { value: value };
	  } else {
	    return { error: new SyntaxError("Invalid parameter value: " + value) };
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PARAMETRIC_NAMESPACE = "https://parametric-svg.github.io/v0.2";
	exports.PARAMETRIC_NAMESPACE = PARAMETRIC_NAMESPACE;
	var PARAMETRIC_NAMESPACE_PREFIX = "parametric";

	exports.PARAMETRIC_NAMESPACE_PREFIX = PARAMETRIC_NAMESPACE_PREFIX;
	var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	exports.SVG_NAMESPACE = SVG_NAMESPACE;
	var SVG_NAMESPACE_PREFIX = "svg";
	exports.SVG_NAMESPACE_PREFIX = SVG_NAMESPACE_PREFIX;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _settings = __webpack_require__(5);

	var PARAMETRIC_NAMESPACE = _settings.PARAMETRIC_NAMESPACE;
	var PARAMETRIC_NAMESPACE_PREFIX = _settings.PARAMETRIC_NAMESPACE_PREFIX;

	var parseParametricValue = _interopRequire(__webpack_require__(11));

	var warn = _interopRequire(__webpack_require__(7));

	var ParametricAttribute = (function () {
	  function ParametricAttribute(attribute, element) {
	    _classCallCheck(this, ParametricAttribute);

	    var name = attribute.localName;

	    // Error if the `attribute` doesn't belong to the `element`'s namespace.
	    if (attribute.namespaceURI !== PARAMETRIC_NAMESPACE) {
	      var attributeNameParts = undefined;
	      if ((attributeNameParts = name.split(":")).length == 2 && attributeNameParts[0] == PARAMETRIC_NAMESPACE_PREFIX) name = attributeNameParts[1];else {
	        return { error: new Error("Not a parametric attribute.") };
	      }
	    }

	    // Error and warn if the parametric attribute is invalid.
	    var parametricFunction = parseParametricValue(attribute.value);
	    {
	      var error = undefined;
	      if (error = parametricFunction.error) {
	        warn("Invalid attribute `parametric:" + name + "`.\n" + "Element:", element, "\n" + "Error:", error);
	        return { error: error };
	      }
	    }

	    // Otherwise all is well. Populate the properties.
	    return Object.assign(this, { name: name,
	      element: element,
	      parameterNames: parametricFunction.parameterNames,
	      func: parametricFunction.func
	    });
	  }

	  _createClass(ParametricAttribute, {
	    update: {
	      value: function update() {
	        var _ref;

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var _ref2 = this;

	        var element = _ref2.element;
	        var name = _ref2.name;

	        var result = (_ref = this).func.apply(_ref, args);
	        if (result != null) {
	          element.setAttributeNS(null, name, result);
	        } else if (result === null) {
	          element.removeAttributeNS(null, name);
	        }
	        return this;
	      }
	    }
	  });

	  return ParametricAttribute;
	})();

	module.exports = ParametricAttribute;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = warn;

	function warn(message) {
	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments[_key];
	  }

	  return console.warn.apply(console, ["parametricSVG: " + message].concat(rest));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function evalExpression (code) { 'use strict';
	    return (new Function
	        ( 'return ('
	        +   code
	        +   ');'
	        ))();
	    };


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
	    factory(exports, module);
	  }
	})(function (exports, module) {
	  "use strict";

	  //
	  // as/object
	  // -------------------------------------------------------------------------------------------------
	  // Maps an array of `{key: "a", value: "b"}` pairs to a new `{a: "b"}` object.
	  //
	  /**
	   * @function asObject
	   *
	   * @param {Array} array
	   *    The array of key-value pairs to be mapped.
	   *
	   * @param {Object} [options]
	   * - {Number} [depth=1]
	   *    The depth to which the `array`'s pairs should be traversed. Set it to `Infinity` to map the
	   *    whole structure.
	   *
	   * @returns {Object}
	   *    A new object mapped from the array.
	   */
	  module.exports = asObject;
	  function asObject(array, options) {
	    // Parse options.
	    var depth = !options || typeof options == "undefined" ? 1 : options.depth;

	    // End recursion if we've reached a depth of 0.
	    if (!depth) return array;

	    // Create an empty `result` object.
	    var result = {};
	    // For every `pair` of the given `array`:
	    var i = 0;var l = array.length;
	    while (i < l) {
	      var pair = array[i++];
	      // - skip the `pair` if it has no `key`
	      if (!pair || !pair.hasOwnProperty("key")) continue;

	      // - save `pair.value` as `value`
	      var value = pair.value;

	      // - recurse if the `value` is an array
	      if (value instanceof Array) {
	        value = asObject(value, { depth: depth - 1 });
	      }

	      // - save `value` as `result[pair.key]`
	      result[pair.key] = value;
	    }

	    // Return the `result`.
	    return result;
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	module.exports = parseParametricValue;

	var acorn = _interopRequire(__webpack_require__(13));

	function parseParametricValue(value) {
	  // Parse the value into an AST.
	  var ast = undefined;
	  try {
	    ast = acorn.parse(value);
	  } catch (error) {
	    return { error: error };
	  }

	  // Error if the value is not exactly one expression.
	  if (ast.type != "Program" || !ast.body) {
	    return { error: new SyntaxError("Unknown format of parametric attribute.") };
	  }if (ast.body.length != 1) {
	    return { error: new SyntaxError("A parametric attribute must be exactly one ES expression.") };
	  } // Find parameter names.
	  var parameterNames = [];
	  (function recurse(branch) {
	    if (branch.type == "Identifier") {
	      parameterNames.push(branch.name);
	      return;
	    }

	    var twig = undefined;
	    for (var key in branch) {
	      if (branch.hasOwnProperty(key)) {
	        if ((twig = branch[key]) && typeof twig == "object") recurse(twig);
	      }
	    }
	  })(ast.body[0]);

	  // Parse the `value` as a function – error if that fails.
	  var func = undefined;
	  try {
	    func = Function.apply(null, parameterNames.concat("return (" + value + ");"));
	  } catch (error) {
	    return { error: error };
	  }

	  // Return the function and parameter names.
	  return { parameterNames: parameterNames, func: func };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel/polyfill is allowed");
	}
	global._babelPolyfill = true;

	__webpack_require__(14);
	__webpack_require__(15);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Acorn is a tiny, fast JavaScript parser written in JavaScript.
	//
	// Acorn was written by Marijn Haverbeke and various contributors and
	// released under an MIT license. The Unicode regexps (for identifiers
	// and whitespace) were taken from [Esprima](http://esprima.org) by
	// Ariya Hidayat.
	//
	// Git repositories for Acorn are available at
	//
	//     http://marijnhaverbeke.nl/git/acorn
	//     https://github.com/marijnh/acorn.git
	//
	// Please use the [github bug tracker][ghbt] to report issues.
	//
	// [ghbt]: https://github.com/marijnh/acorn/issues
	//
	// This file defines the main parser interface. The library also comes
	// with a [error-tolerant parser][dammit] and an
	// [abstract syntax tree walker][walk], defined in other files.
	//
	// [dammit]: acorn_loose.js
	// [walk]: util/walk.js

	(function(root, mod) {
	  if (true) return mod(exports); // CommonJS
	  if (true) return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (mod), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  mod(root.acorn || (root.acorn = {})); // Plain browser env
	})(this, function(exports) {
	  "use strict";

	  exports.version = "0.12.0";

	  // The main exported interface (under `self.acorn` when in the
	  // browser) is a `parse` function that takes a code string and
	  // returns an abstract syntax tree as specified by [Mozilla parser
	  // API][api], with the caveat that inline XML is not recognized.
	  //
	  // [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

	  var options, input, inputLen, sourceFile;

	  exports.parse = function(inpt, opts) {
	    input = String(inpt); inputLen = input.length;
	    setOptions(opts);
	    initTokenState();
	    var startPos = options.locations ? [tokPos, curPosition()] : tokPos;
	    initParserState();
	    return parseTopLevel(options.program || startNodeAt(startPos));
	  };

	  // A second optional argument can be given to further configure
	  // the parser process. These options are recognized:

	  var defaultOptions = exports.defaultOptions = {
	    // `ecmaVersion` indicates the ECMAScript version to parse. Must
	    // be either 3, or 5, or 6. This influences support for strict
	    // mode, the set of reserved words, support for getters and
	    // setters and other features.
	    ecmaVersion: 5,
	    // Turn on `strictSemicolons` to prevent the parser from doing
	    // automatic semicolon insertion.
	    strictSemicolons: false,
	    // When `allowTrailingCommas` is false, the parser will not allow
	    // trailing commas in array and object literals.
	    allowTrailingCommas: true,
	    // By default, reserved words are not enforced. Enable
	    // `forbidReserved` to enforce them. When this option has the
	    // value "everywhere", reserved words and keywords can also not be
	    // used as property names.
	    forbidReserved: false,
	    // When enabled, a return at the top level is not considered an
	    // error.
	    allowReturnOutsideFunction: false,
	    // When enabled, import/export statements are not constrained to
	    // appearing at the top of the program.
	    allowImportExportEverywhere: false,
	    // When enabled, hashbang directive in the beginning of file
	    // is allowed and treated as a line comment.
	    allowHashBang: false,
	    // When `locations` is on, `loc` properties holding objects with
	    // `start` and `end` properties in `{line, column}` form (with
	    // line being 1-based and column 0-based) will be attached to the
	    // nodes.
	    locations: false,
	    // A function can be passed as `onToken` option, which will
	    // cause Acorn to call that function with object in the same
	    // format as tokenize() returns. Note that you are not
	    // allowed to call the parser from the callback—that will
	    // corrupt its internal state.
	    onToken: null,
	    // A function can be passed as `onComment` option, which will
	    // cause Acorn to call that function with `(block, text, start,
	    // end)` parameters whenever a comment is skipped. `block` is a
	    // boolean indicating whether this is a block (`/* */`) comment,
	    // `text` is the content of the comment, and `start` and `end` are
	    // character offsets that denote the start and end of the comment.
	    // When the `locations` option is on, two more parameters are
	    // passed, the full `{line, column}` locations of the start and
	    // end of the comments. Note that you are not allowed to call the
	    // parser from the callback—that will corrupt its internal state.
	    onComment: null,
	    // Nodes have their start and end characters offsets recorded in
	    // `start` and `end` properties (directly on the node, rather than
	    // the `loc` object, which holds line/column data. To also add a
	    // [semi-standardized][range] `range` property holding a `[start,
	    // end]` array with the same numbers, set the `ranges` option to
	    // `true`.
	    //
	    // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
	    ranges: false,
	    // It is possible to parse multiple files into a single AST by
	    // passing the tree produced by parsing the first file as
	    // `program` option in subsequent parses. This will add the
	    // toplevel forms of the parsed file to the `Program` (top) node
	    // of an existing parse tree.
	    program: null,
	    // When `locations` is on, you can pass this to record the source
	    // file in every node's `loc` object.
	    sourceFile: null,
	    // This value, if given, is stored in every node, whether
	    // `locations` is on or off.
	    directSourceFile: null,
	    // When enabled, parenthesized expressions are represented by
	    // (non-standard) ParenthesizedExpression nodes
	    preserveParens: false
	  };

	  // This function tries to parse a single expression at a given
	  // offset in a string. Useful for parsing mixed-language formats
	  // that embed JavaScript expressions.

	  exports.parseExpressionAt = function(inpt, pos, opts) {
	    input = String(inpt); inputLen = input.length;
	    setOptions(opts);
	    initTokenState(pos);
	    initParserState();
	    return parseExpression();
	  };

	  var isArray = function (obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };

	  function setOptions(opts) {
	    options = {};
	    for (var opt in defaultOptions)
	      options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
	    sourceFile = options.sourceFile || null;
	    if (isArray(options.onToken)) {
	      var tokens = options.onToken;
	      options.onToken = function (token) {
	        tokens.push(token);
	      };
	    }
	    if (isArray(options.onComment)) {
	      var comments = options.onComment;
	      options.onComment = function (block, text, start, end, startLoc, endLoc) {
	        var comment = {
	          type: block ? 'Block' : 'Line',
	          value: text,
	          start: start,
	          end: end
	        };
	        if (options.locations) {
	          comment.loc = new SourceLocation();
	          comment.loc.start = startLoc;
	          comment.loc.end = endLoc;
	        }
	        if (options.ranges)
	          comment.range = [start, end];
	        comments.push(comment);
	      };
	    }
	    isKeyword = options.ecmaVersion >= 6 ? isEcma6Keyword : isEcma5AndLessKeyword;
	  }

	  // The `getLineInfo` function is mostly useful when the
	  // `locations` option is off (for performance reasons) and you
	  // want to find the line/column position for a given character
	  // offset. `input` should be the code string that the offset refers
	  // into.

	  var getLineInfo = exports.getLineInfo = function(input, offset) {
	    for (var line = 1, cur = 0;;) {
	      lineBreak.lastIndex = cur;
	      var match = lineBreak.exec(input);
	      if (match && match.index < offset) {
	        ++line;
	        cur = match.index + match[0].length;
	      } else break;
	    }
	    return {line: line, column: offset - cur};
	  };

	  function Token() {
	    this.type = tokType;
	    this.value = tokVal;
	    this.start = tokStart;
	    this.end = tokEnd;
	    if (options.locations) {
	      this.loc = new SourceLocation();
	      this.loc.end = tokEndLoc;
	    }
	    if (options.ranges)
	      this.range = [tokStart, tokEnd];
	  }

	  exports.Token = Token;

	  // Acorn is organized as a tokenizer and a recursive-descent parser.
	  // The `tokenize` export provides an interface to the tokenizer.
	  // Because the tokenizer is optimized for being efficiently used by
	  // the Acorn parser itself, this interface is somewhat crude and not
	  // very modular. Performing another parse or call to `tokenize` will
	  // reset the internal state, and invalidate existing tokenizers.

	  exports.tokenize = function(inpt, opts) {
	    input = String(inpt); inputLen = input.length;
	    setOptions(opts);
	    initTokenState();
	    skipSpace();

	    function getToken() {
	      lastEnd = tokEnd;
	      readToken();
	      return new Token();
	    }
	    getToken.jumpTo = function(pos, exprAllowed) {
	      tokPos = pos;
	      if (options.locations) {
	        tokCurLine = 1;
	        tokLineStart = lineBreak.lastIndex = 0;
	        var match;
	        while ((match = lineBreak.exec(input)) && match.index < pos) {
	          ++tokCurLine;
	          tokLineStart = match.index + match[0].length;
	        }
	      }
	      tokExprAllowed = !!exprAllowed;
	      skipSpace();
	    };
	    getToken.current = function() { return new Token(); };
	    if (typeof Symbol !== 'undefined') {
	      getToken[Symbol.iterator] = function () {
	        return {
	          next: function () {
	            var token = getToken();
	            return {
	              done: token.type === _eof,
	              value: token
	            };
	          }
	        };
	      };
	    }
	    getToken.options = options;
	    return getToken;
	  };

	  // State is kept in (closure-)global variables. We already saw the
	  // `options`, `input`, and `inputLen` variables above.

	  // The current position of the tokenizer in the input.

	  var tokPos;

	  // The start and end offsets of the current token.

	  var tokStart, tokEnd;

	  // When `options.locations` is true, these hold objects
	  // containing the tokens start and end line/column pairs.

	  var tokStartLoc, tokEndLoc;

	  // The type and value of the current token. Token types are objects,
	  // named by variables against which they can be compared, and
	  // holding properties that describe them (indicating, for example,
	  // the precedence of an infix operator, and the original name of a
	  // keyword token). The kind of value that's held in `tokVal` depends
	  // on the type of the token. For literals, it is the literal value,
	  // for operators, the operator name, and so on.

	  var tokType, tokVal;

	  // Internal state for the tokenizer. To distinguish between division
	  // operators and regular expressions, it remembers whether the last
	  // token was one that is allowed to be followed by an expression. In
	  // some cases, notably after ')' or '}' tokens, the situation
	  // depends on the context before the matching opening bracket, so
	  // tokContext keeps a stack of information about current bracketed
	  // forms.

	  var tokContext, tokExprAllowed;

	  // When `options.locations` is true, these are used to keep
	  // track of the current line, and know when a new line has been
	  // entered.

	  var tokCurLine, tokLineStart;

	  // These store the position of the previous token, which is useful
	  // when finishing a node and assigning its `end` position.

	  var lastStart, lastEnd, lastEndLoc;

	  // This is the parser's state. `inFunction` is used to reject
	  // `return` statements outside of functions, `inGenerator` to
	  // reject `yield`s outside of generators, `labels` to verify
	  // that `break` and `continue` have somewhere to jump to, and
	  // `strict` indicates whether strict mode is on.

	  var inFunction, inGenerator, labels, strict;

	  function initParserState() {
	    lastStart = lastEnd = tokPos;
	    if (options.locations) lastEndLoc = curPosition();
	    inFunction = inGenerator = false;
	    labels = [];
	    skipSpace();
	    readToken();
	  }

	  // This function is used to raise exceptions on parse errors. It
	  // takes an offset integer (into the current `input`) to indicate
	  // the location of the error, attaches the position to the end
	  // of the error message, and then raises a `SyntaxError` with that
	  // message.

	  function raise(pos, message) {
	    var loc = getLineInfo(input, pos);
	    message += " (" + loc.line + ":" + loc.column + ")";
	    var err = new SyntaxError(message);
	    err.pos = pos; err.loc = loc; err.raisedAt = tokPos;
	    throw err;
	  }

	  // Reused empty array added for node fields that are always empty.

	  var empty = [];

	  // ## Token types

	  // The assignment of fine-grained, information-carrying type objects
	  // allows the tokenizer to store the information it has about a
	  // token in a way that is very cheap for the parser to look up.

	  // All token type variables start with an underscore, to make them
	  // easy to recognize.

	  // These are the general types. The `type` property is only used to
	  // make them recognizeable when debugging.

	  var _num = {type: "num"}, _regexp = {type: "regexp"}, _string = {type: "string"};
	  var _name = {type: "name"}, _eof = {type: "eof"};

	  // Keyword tokens. The `keyword` property (also used in keyword-like
	  // operators) indicates that the token originated from an
	  // identifier-like word, which is used when parsing property names.
	  //
	  // The `beforeExpr` property is used to disambiguate between regular
	  // expressions and divisions. It is set on all token types that can
	  // be followed by an expression (thus, a slash after them would be a
	  // regular expression).
	  //
	  // `isLoop` marks a keyword as starting a loop, which is important
	  // to know when parsing a label, in order to allow or disallow
	  // continue jumps to that label.

	  var _break = {keyword: "break"}, _case = {keyword: "case", beforeExpr: true}, _catch = {keyword: "catch"};
	  var _continue = {keyword: "continue"}, _debugger = {keyword: "debugger"}, _default = {keyword: "default"};
	  var _do = {keyword: "do", isLoop: true}, _else = {keyword: "else", beforeExpr: true};
	  var _finally = {keyword: "finally"}, _for = {keyword: "for", isLoop: true}, _function = {keyword: "function"};
	  var _if = {keyword: "if"}, _return = {keyword: "return", beforeExpr: true}, _switch = {keyword: "switch"};
	  var _throw = {keyword: "throw", beforeExpr: true}, _try = {keyword: "try"}, _var = {keyword: "var"};
	  var _let = {keyword: "let"}, _const = {keyword: "const"};
	  var _while = {keyword: "while", isLoop: true}, _with = {keyword: "with"}, _new = {keyword: "new", beforeExpr: true};
	  var _this = {keyword: "this"};
	  var _class = {keyword: "class"}, _extends = {keyword: "extends", beforeExpr: true};
	  var _export = {keyword: "export"}, _import = {keyword: "import"};
	  var _yield = {keyword: "yield", beforeExpr: true};

	  // The keywords that denote values.

	  var _null = {keyword: "null", atomValue: null}, _true = {keyword: "true", atomValue: true};
	  var _false = {keyword: "false", atomValue: false};

	  // Some keywords are treated as regular operators. `in` sometimes
	  // (when parsing `for`) needs to be tested against specifically, so
	  // we assign a variable name to it for quick comparing.

	  var _in = {keyword: "in", binop: 7, beforeExpr: true};

	  // Map keyword names to token types.

	  var keywordTypes = {"break": _break, "case": _case, "catch": _catch,
	                      "continue": _continue, "debugger": _debugger, "default": _default,
	                      "do": _do, "else": _else, "finally": _finally, "for": _for,
	                      "function": _function, "if": _if, "return": _return, "switch": _switch,
	                      "throw": _throw, "try": _try, "var": _var, "let": _let, "const": _const,
	                      "while": _while, "with": _with,
	                      "null": _null, "true": _true, "false": _false, "new": _new, "in": _in,
	                      "instanceof": {keyword: "instanceof", binop: 7, beforeExpr: true}, "this": _this,
	                      "typeof": {keyword: "typeof", prefix: true, beforeExpr: true},
	                      "void": {keyword: "void", prefix: true, beforeExpr: true},
	                      "delete": {keyword: "delete", prefix: true, beforeExpr: true},
	                      "class": _class, "extends": _extends,
	                      "export": _export, "import": _import, "yield": _yield};

	  // Punctuation token types. Again, the `type` property is purely for debugging.

	  var _bracketL = {type: "[", beforeExpr: true}, _bracketR = {type: "]"}, _braceL = {type: "{", beforeExpr: true};
	  var _braceR = {type: "}"}, _parenL = {type: "(", beforeExpr: true}, _parenR = {type: ")"};
	  var _comma = {type: ",", beforeExpr: true}, _semi = {type: ";", beforeExpr: true};
	  var _colon = {type: ":", beforeExpr: true}, _dot = {type: "."}, _question = {type: "?", beforeExpr: true};
	  var _arrow = {type: "=>", beforeExpr: true}, _template = {type: "template"};
	  var _ellipsis = {type: "...", beforeExpr: true};
	  var _backQuote = {type: "`"}, _dollarBraceL = {type: "${", beforeExpr: true};

	  // Operators. These carry several kinds of properties to help the
	  // parser use them properly (the presence of these properties is
	  // what categorizes them as operators).
	  //
	  // `binop`, when present, specifies that this operator is a binary
	  // operator, and will refer to its precedence.
	  //
	  // `prefix` and `postfix` mark the operator as a prefix or postfix
	  // unary operator. `isUpdate` specifies that the node produced by
	  // the operator should be of type UpdateExpression rather than
	  // simply UnaryExpression (`++` and `--`).
	  //
	  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
	  // binary operators with a very low precedence, that should result
	  // in AssignmentExpression nodes.

	  var _slash = {binop: 10, beforeExpr: true}, _eq = {isAssign: true, beforeExpr: true};
	  var _assign = {isAssign: true, beforeExpr: true};
	  var _incDec = {postfix: true, prefix: true, isUpdate: true}, _prefix = {prefix: true, beforeExpr: true};
	  var _logicalOR = {binop: 1, beforeExpr: true};
	  var _logicalAND = {binop: 2, beforeExpr: true};
	  var _bitwiseOR = {binop: 3, beforeExpr: true};
	  var _bitwiseXOR = {binop: 4, beforeExpr: true};
	  var _bitwiseAND = {binop: 5, beforeExpr: true};
	  var _equality = {binop: 6, beforeExpr: true};
	  var _relational = {binop: 7, beforeExpr: true};
	  var _bitShift = {binop: 8, beforeExpr: true};
	  var _plusMin = {binop: 9, prefix: true, beforeExpr: true};
	  var _modulo = {binop: 10, beforeExpr: true};

	  // '*' may be multiply or have special meaning in ES6
	  var _star = {binop: 10, beforeExpr: true};

	  // Provide access to the token types for external users of the
	  // tokenizer.

	  exports.tokTypes = {bracketL: _bracketL, bracketR: _bracketR, braceL: _braceL, braceR: _braceR,
	                      parenL: _parenL, parenR: _parenR, comma: _comma, semi: _semi, colon: _colon,
	                      dot: _dot, ellipsis: _ellipsis, question: _question, slash: _slash, eq: _eq,
	                      name: _name, eof: _eof, num: _num, regexp: _regexp, string: _string,
	                      arrow: _arrow, template: _template, star: _star, assign: _assign,
	                      backQuote: _backQuote, dollarBraceL: _dollarBraceL};
	  for (var kw in keywordTypes) exports.tokTypes["_" + kw] = keywordTypes[kw];

	  // This is a trick taken from Esprima. It turns out that, on
	  // non-Chrome browsers, to check whether a string is in a set, a
	  // predicate containing a big ugly `switch` statement is faster than
	  // a regular expression, and on Chrome the two are about on par.
	  // This function uses `eval` (non-lexical) to produce such a
	  // predicate from a space-separated string of words.
	  //
	  // It starts by sorting the words by length.

	  function makePredicate(words) {
	    words = words.split(" ");
	    var f = "", cats = [];
	    out: for (var i = 0; i < words.length; ++i) {
	      for (var j = 0; j < cats.length; ++j)
	        if (cats[j][0].length == words[i].length) {
	          cats[j].push(words[i]);
	          continue out;
	        }
	      cats.push([words[i]]);
	    }
	    function compareTo(arr) {
	      if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
	      f += "switch(str){";
	      for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
	      f += "return true}return false;";
	    }

	    // When there are more than three length categories, an outer
	    // switch first dispatches on the lengths, to save on comparisons.

	    if (cats.length > 3) {
	      cats.sort(function(a, b) {return b.length - a.length;});
	      f += "switch(str.length){";
	      for (var i = 0; i < cats.length; ++i) {
	        var cat = cats[i];
	        f += "case " + cat[0].length + ":";
	        compareTo(cat);
	      }
	      f += "}";

	    // Otherwise, simply generate a flat `switch` statement.

	    } else {
	      compareTo(words);
	    }
	    return new Function("str", f);
	  }

	  // The ECMAScript 3 reserved word list.

	  var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");

	  // ECMAScript 5 reserved words.

	  var isReservedWord5 = makePredicate("class enum extends super const export import");

	  // The additional reserved words in strict mode.

	  var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");

	  // The forbidden variable names in strict mode.

	  var isStrictBadIdWord = makePredicate("eval arguments");

	  // And the keywords.

	  var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

	  var isEcma5AndLessKeyword = makePredicate(ecma5AndLessKeywords);

	  var isEcma6Keyword = makePredicate(ecma5AndLessKeywords + " let const class extends export import yield");

	  var isKeyword = isEcma5AndLessKeyword;

	  // ## Character categories

	  // Big ugly regular expressions that match characters in the
	  // whitespace, identifier, and identifier-start categories. These
	  // are only applied when a character is found to actually have a
	  // code point above 128.
	  // Generated by `tools/generate-identifier-regex.js`.

	  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
	  var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
	  var nonASCIIidentifierChars = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19B0-\u19C0\u19C8\u19C9\u19D0-\u19D9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
	  var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	  var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

	  // Whether a single character denotes a newline.

	  var newline = /[\n\r\u2028\u2029]/;

	  function isNewLine(code) {
	    return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
	  }

	  // Matches a whole line break (where CRLF is considered a single
	  // line break). Used to count lines.

	  var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;

	  // Test whether a given character code starts an identifier.

	  var isIdentifierStart = exports.isIdentifierStart = function(code) {
	    if (code < 65) return code === 36;
	    if (code < 91) return true;
	    if (code < 97) return code === 95;
	    if (code < 123)return true;
	    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
	  };

	  // Test whether a given character is part of an identifier.

	  var isIdentifierChar = exports.isIdentifierChar = function(code) {
	    if (code < 48) return code === 36;
	    if (code < 58) return true;
	    if (code < 65) return false;
	    if (code < 91) return true;
	    if (code < 97) return code === 95;
	    if (code < 123)return true;
	    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
	  };

	  // ## Tokenizer

	  // These are used when `options.locations` is on, for the
	  // `tokStartLoc` and `tokEndLoc` properties.

	  function Position(line, col) {
	    this.line = line;
	    this.column = col;
	  }

	  Position.prototype.offset = function(n) {
	    return new Position(this.line, this.column + n);
	  };

	  function curPosition() {
	    return new Position(tokCurLine, tokPos - tokLineStart);
	  }

	  // Reset the token state. Used at the start of a parse.

	  function initTokenState(pos) {
	    if (pos) {
	      tokPos = pos;
	      tokLineStart = Math.max(0, input.lastIndexOf("\n", pos));
	      tokCurLine = input.slice(0, tokLineStart).split(newline).length;
	    } else {
	      tokCurLine = 1;
	      tokPos = tokLineStart = 0;
	    }
	    tokType = _eof;
	    tokContext = [b_stat];
	    tokExprAllowed = true;
	    strict = false;
	    if (tokPos === 0 && options.allowHashBang && input.slice(0, 2) === '#!') {
	      skipLineComment(2);
	    }
	  }

	  // The algorithm used to determine whether a regexp can appear at a
	  // given point in the program is loosely based on sweet.js' approach.
	  // See https://github.com/mozilla/sweet.js/wiki/design

	  var b_stat = {token: "{", isExpr: false}, b_expr = {token: "{", isExpr: true}, b_tmpl = {token: "${", isExpr: true};
	  var p_stat = {token: "(", isExpr: false}, p_expr = {token: "(", isExpr: true};
	  var q_tmpl = {token: "`", isExpr: true}, f_expr = {token: "function", isExpr: true};

	  function curTokContext() {
	    return tokContext[tokContext.length - 1];
	  }

	  function braceIsBlock(prevType) {
	    var parent;
	    if (prevType === _colon && (parent = curTokContext()).token == "{")
	      return !parent.isExpr;
	    if (prevType === _return)
	      return newline.test(input.slice(lastEnd, tokStart));
	    if (prevType === _else || prevType === _semi || prevType === _eof)
	      return true;
	    if (prevType == _braceL)
	      return curTokContext() === b_stat;
	    return !tokExprAllowed;
	  }

	  // Called at the end of every token. Sets `tokEnd`, `tokVal`, and
	  // maintains `tokContext` and `tokExprAllowed`, and skips the space
	  // after the token, so that the next one's `tokStart` will point at
	  // the right position.

	  function finishToken(type, val) {
	    tokEnd = tokPos;
	    if (options.locations) tokEndLoc = curPosition();
	    var prevType = tokType, preserveSpace = false;
	    tokType = type;
	    tokVal = val;

	    // Update context info
	    if (type === _parenR || type === _braceR) {
	      var out = tokContext.pop();
	      if (out === b_tmpl) {
	        preserveSpace = true;
	      } else if (out === b_stat && curTokContext() === f_expr) {
	        tokContext.pop();
	        tokExprAllowed = false;
	      } else {
	        tokExprAllowed = !(out && out.isExpr);
	      }
	    } else if (type === _braceL) {
	      tokContext.push(braceIsBlock(prevType) ? b_stat : b_expr);
	      tokExprAllowed = true;
	    } else if (type === _dollarBraceL) {
	      tokContext.push(b_tmpl);
	      tokExprAllowed = true;
	    } else if (type == _parenL) {
	      var statementParens = prevType === _if || prevType === _for || prevType === _with || prevType === _while;
	      tokContext.push(statementParens ? p_stat : p_expr);
	      tokExprAllowed = true;
	    } else if (type == _incDec) {
	      // tokExprAllowed stays unchanged
	    } else if (type.keyword && prevType == _dot) {
	      tokExprAllowed = false;
	    } else if (type == _function) {
	      if (curTokContext() !== b_stat) {
	        tokContext.push(f_expr);
	      }
	      tokExprAllowed = false;
	    } else if (type === _backQuote) {
	      if (curTokContext() === q_tmpl) {
	        tokContext.pop();
	      } else {
	        tokContext.push(q_tmpl);
	        preserveSpace = true;
	      }
	      tokExprAllowed = false;
	    } else {
	      tokExprAllowed = type.beforeExpr;
	    }

	    if (!preserveSpace) skipSpace();
	  }

	  function skipBlockComment() {
	    var startLoc = options.onComment && options.locations && curPosition();
	    var start = tokPos, end = input.indexOf("*/", tokPos += 2);
	    if (end === -1) raise(tokPos - 2, "Unterminated comment");
	    tokPos = end + 2;
	    if (options.locations) {
	      lineBreak.lastIndex = start;
	      var match;
	      while ((match = lineBreak.exec(input)) && match.index < tokPos) {
	        ++tokCurLine;
	        tokLineStart = match.index + match[0].length;
	      }
	    }
	    if (options.onComment)
	      options.onComment(true, input.slice(start + 2, end), start, tokPos,
	                        startLoc, options.locations && curPosition());
	  }

	  function skipLineComment(startSkip) {
	    var start = tokPos;
	    var startLoc = options.onComment && options.locations && curPosition();
	    var ch = input.charCodeAt(tokPos+=startSkip);
	    while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
	      ++tokPos;
	      ch = input.charCodeAt(tokPos);
	    }
	    if (options.onComment)
	      options.onComment(false, input.slice(start + startSkip, tokPos), start, tokPos,
	                        startLoc, options.locations && curPosition());
	  }

	  // Called at the start of the parse and after every token. Skips
	  // whitespace and comments, and.

	  function skipSpace() {
	    while (tokPos < inputLen) {
	      var ch = input.charCodeAt(tokPos);
	      if (ch === 32) { // ' '
	        ++tokPos;
	      } else if (ch === 13) {
	        ++tokPos;
	        var next = input.charCodeAt(tokPos);
	        if (next === 10) {
	          ++tokPos;
	        }
	        if (options.locations) {
	          ++tokCurLine;
	          tokLineStart = tokPos;
	        }
	      } else if (ch === 10 || ch === 8232 || ch === 8233) {
	        ++tokPos;
	        if (options.locations) {
	          ++tokCurLine;
	          tokLineStart = tokPos;
	        }
	      } else if (ch > 8 && ch < 14) {
	        ++tokPos;
	      } else if (ch === 47) { // '/'
	        var next = input.charCodeAt(tokPos + 1);
	        if (next === 42) { // '*'
	          skipBlockComment();
	        } else if (next === 47) { // '/'
	          skipLineComment(2);
	        } else break;
	      } else if (ch === 160) { // '\xa0'
	        ++tokPos;
	      } else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
	        ++tokPos;
	      } else {
	        break;
	      }
	    }
	  }

	  // ### Token reading

	  // This is the function that is called to fetch the next token. It
	  // is somewhat obscure, because it works in character codes rather
	  // than characters, and because operator parsing has been inlined
	  // into it.
	  //
	  // All in the name of speed.
	  //
	  function readToken_dot() {
	    var next = input.charCodeAt(tokPos + 1);
	    if (next >= 48 && next <= 57) return readNumber(true);
	    var next2 = input.charCodeAt(tokPos + 2);
	    if (options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
	      tokPos += 3;
	      return finishToken(_ellipsis);
	    } else {
	      ++tokPos;
	      return finishToken(_dot);
	    }
	  }

	  function readToken_slash() { // '/'
	    var next = input.charCodeAt(tokPos + 1);
	    if (tokExprAllowed) {++tokPos; return readRegexp();}
	    if (next === 61) return finishOp(_assign, 2);
	    return finishOp(_slash, 1);
	  }

	  function readToken_mult_modulo(code) { // '%*'
	    var next = input.charCodeAt(tokPos + 1);
	    if (next === 61) return finishOp(_assign, 2);
	    return finishOp(code === 42 ? _star : _modulo, 1);
	  }

	  function readToken_pipe_amp(code) { // '|&'
	    var next = input.charCodeAt(tokPos + 1);
	    if (next === code) return finishOp(code === 124 ? _logicalOR : _logicalAND, 2);
	    if (next === 61) return finishOp(_assign, 2);
	    return finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
	  }

	  function readToken_caret() { // '^'
	    var next = input.charCodeAt(tokPos + 1);
	    if (next === 61) return finishOp(_assign, 2);
	    return finishOp(_bitwiseXOR, 1);
	  }

	  function readToken_plus_min(code) { // '+-'
	    var next = input.charCodeAt(tokPos + 1);
	    if (next === code) {
	      if (next == 45 && input.charCodeAt(tokPos + 2) == 62 &&
	          newline.test(input.slice(lastEnd, tokPos))) {
	        // A `-->` line comment
	        skipLineComment(3);
	        skipSpace();
	        return readToken();
	      }
	      return finishOp(_incDec, 2);
	    }
	    if (next === 61) return finishOp(_assign, 2);
	    return finishOp(_plusMin, 1);
	  }

	  function readToken_lt_gt(code) { // '<>'
	    var next = input.charCodeAt(tokPos + 1);
	    var size = 1;
	    if (next === code) {
	      size = code === 62 && input.charCodeAt(tokPos + 2) === 62 ? 3 : 2;
	      if (input.charCodeAt(tokPos + size) === 61) return finishOp(_assign, size + 1);
	      return finishOp(_bitShift, size);
	    }
	    if (next == 33 && code == 60 && input.charCodeAt(tokPos + 2) == 45 &&
	        input.charCodeAt(tokPos + 3) == 45) {
	      // `<!--`, an XML-style comment that should be interpreted as a line comment
	      skipLineComment(4);
	      skipSpace();
	      return readToken();
	    }
	    if (next === 61)
	      size = input.charCodeAt(tokPos + 2) === 61 ? 3 : 2;
	    return finishOp(_relational, size);
	  }

	  function readToken_eq_excl(code) { // '=!', '=>'
	    var next = input.charCodeAt(tokPos + 1);
	    if (next === 61) return finishOp(_equality, input.charCodeAt(tokPos + 2) === 61 ? 3 : 2);
	    if (code === 61 && next === 62 && options.ecmaVersion >= 6) { // '=>'
	      tokPos += 2;
	      return finishToken(_arrow);
	    }
	    return finishOp(code === 61 ? _eq : _prefix, 1);
	  }

	  function getTokenFromCode(code) {
	    switch (code) {
	    // The interpretation of a dot depends on whether it is followed
	    // by a digit or another two dots.
	    case 46: // '.'
	      return readToken_dot();

	    // Punctuation tokens.
	    case 40: ++tokPos; return finishToken(_parenL);
	    case 41: ++tokPos; return finishToken(_parenR);
	    case 59: ++tokPos; return finishToken(_semi);
	    case 44: ++tokPos; return finishToken(_comma);
	    case 91: ++tokPos; return finishToken(_bracketL);
	    case 93: ++tokPos; return finishToken(_bracketR);
	    case 123: ++tokPos; return finishToken(_braceL);
	    case 125: ++tokPos; return finishToken(_braceR);
	    case 58: ++tokPos; return finishToken(_colon);
	    case 63: ++tokPos; return finishToken(_question);

	    case 96: // '`'
	      if (options.ecmaVersion >= 6) {
	        ++tokPos;
	        return finishToken(_backQuote);
	      } else {
	        return false;
	      }

	    case 48: // '0'
	      var next = input.charCodeAt(tokPos + 1);
	      if (next === 120 || next === 88) return readRadixNumber(16); // '0x', '0X' - hex number
	      if (options.ecmaVersion >= 6) {
	        if (next === 111 || next === 79) return readRadixNumber(8); // '0o', '0O' - octal number
	        if (next === 98 || next === 66) return readRadixNumber(2); // '0b', '0B' - binary number
	      }
	    // Anything else beginning with a digit is an integer, octal
	    // number, or float.
	    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: // 1-9
	      return readNumber(false);

	    // Quotes produce strings.
	    case 34: case 39: // '"', "'"
	      return readString(code);

	    // Operators are parsed inline in tiny state machines. '=' (61) is
	    // often referred to. `finishOp` simply skips the amount of
	    // characters it is given as second argument, and returns a token
	    // of the type given by its first argument.

	    case 47: // '/'
	      return readToken_slash();

	    case 37: case 42: // '%*'
	      return readToken_mult_modulo(code);

	    case 124: case 38: // '|&'
	      return readToken_pipe_amp(code);

	    case 94: // '^'
	      return readToken_caret();

	    case 43: case 45: // '+-'
	      return readToken_plus_min(code);

	    case 60: case 62: // '<>'
	      return readToken_lt_gt(code);

	    case 61: case 33: // '=!'
	      return readToken_eq_excl(code);

	    case 126: // '~'
	      return finishOp(_prefix, 1);
	    }

	    return false;
	  }

	  function readToken() {
	    tokStart = tokPos;
	    if (options.locations) tokStartLoc = curPosition();
	    if (tokPos >= inputLen) return finishToken(_eof);

	    if (curTokContext() === q_tmpl) {
	      return readTmplToken();
	    }

	    var code = input.charCodeAt(tokPos);

	    // Identifier or keyword. '\uXXXX' sequences are allowed in
	    // identifiers, so '\' also dispatches to that.
	    if (isIdentifierStart(code) || code === 92 /* '\' */) return readWord();

	    var tok = getTokenFromCode(code);

	    if (tok === false) {
	      // If we are here, we either found a non-ASCII identifier
	      // character, or something that's entirely disallowed.
	      var ch = String.fromCharCode(code);
	      if (ch === "\\" || nonASCIIidentifierStart.test(ch)) return readWord();
	      raise(tokPos, "Unexpected character '" + ch + "'");
	    }
	    return tok;
	  }

	  function finishOp(type, size) {
	    var str = input.slice(tokPos, tokPos + size);
	    tokPos += size;
	    finishToken(type, str);
	  }

	  var regexpUnicodeSupport = false;
	  try { new RegExp("\uffff", "u"); regexpUnicodeSupport = true; }
	  catch(e) {}

	  // Parse a regular expression. Some context-awareness is necessary,
	  // since a '/' inside a '[]' set does not end the expression.

	  function readRegexp() {
	    var content = "", escaped, inClass, start = tokPos;
	    for (;;) {
	      if (tokPos >= inputLen) raise(start, "Unterminated regular expression");
	      var ch = input.charAt(tokPos);
	      if (newline.test(ch)) raise(start, "Unterminated regular expression");
	      if (!escaped) {
	        if (ch === "[") inClass = true;
	        else if (ch === "]" && inClass) inClass = false;
	        else if (ch === "/" && !inClass) break;
	        escaped = ch === "\\";
	      } else escaped = false;
	      ++tokPos;
	    }
	    var content = input.slice(start, tokPos);
	    ++tokPos;
	    // Need to use `readWord1` because '\uXXXX' sequences are allowed
	    // here (don't ask).
	    var mods = readWord1();
	    var tmp = content;
	    if (mods) {
	      var validFlags = /^[gmsiy]*$/;
	      if (options.ecmaVersion >= 6) validFlags = /^[gmsiyu]*$/;
	      if (!validFlags.test(mods)) raise(start, "Invalid regular expression flag");
	      if (mods.indexOf('u') >= 0 && !regexpUnicodeSupport) {
	        // Replace each astral symbol and every Unicode code point
	        // escape sequence that represents such a symbol with a single
	        // ASCII symbol to avoid throwing on regular expressions that
	        // are only valid in combination with the `/u` flag.
	        tmp = tmp
	          .replace(/\\u\{([0-9a-fA-F]{5,6})\}/g, "x")
	          .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
	      }
	    }
	    // Detect invalid regular expressions.
	    try {
	      new RegExp(tmp);
	    } catch (e) {
	      if (e instanceof SyntaxError) raise(start, "Error parsing regular expression: " + e.message);
	      raise(e);
	    }
	    // Get a regular expression object for this pattern-flag pair, or `null` in
	    // case the current environment doesn't support the flags it uses.
	    try {
	      var value = new RegExp(content, mods);
	    } catch (err) {
	      value = null;
	    }
	    return finishToken(_regexp, {pattern: content, flags: mods, value: value});
	  }

	  // Read an integer in the given radix. Return null if zero digits
	  // were read, the integer value otherwise. When `len` is given, this
	  // will return `null` unless the integer has exactly `len` digits.

	  function readInt(radix, len) {
	    var start = tokPos, total = 0;
	    for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
	      var code = input.charCodeAt(tokPos), val;
	      if (code >= 97) val = code - 97 + 10; // a
	      else if (code >= 65) val = code - 65 + 10; // A
	      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
	      else val = Infinity;
	      if (val >= radix) break;
	      ++tokPos;
	      total = total * radix + val;
	    }
	    if (tokPos === start || len != null && tokPos - start !== len) return null;

	    return total;
	  }

	  function readRadixNumber(radix) {
	    tokPos += 2; // 0x
	    var val = readInt(radix);
	    if (val == null) raise(tokStart + 2, "Expected number in radix " + radix);
	    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");
	    return finishToken(_num, val);
	  }

	  // Read an integer, octal integer, or floating-point number.

	  function readNumber(startsWithDot) {
	    var start = tokPos, isFloat = false, octal = input.charCodeAt(tokPos) === 48;
	    if (!startsWithDot && readInt(10) === null) raise(start, "Invalid number");
	    if (input.charCodeAt(tokPos) === 46) {
	      ++tokPos;
	      readInt(10);
	      isFloat = true;
	    }
	    var next = input.charCodeAt(tokPos);
	    if (next === 69 || next === 101) { // 'eE'
	      next = input.charCodeAt(++tokPos);
	      if (next === 43 || next === 45) ++tokPos; // '+-'
	      if (readInt(10) === null) raise(start, "Invalid number");
	      isFloat = true;
	    }
	    if (isIdentifierStart(input.charCodeAt(tokPos))) raise(tokPos, "Identifier directly after number");

	    var str = input.slice(start, tokPos), val;
	    if (isFloat) val = parseFloat(str);
	    else if (!octal || str.length === 1) val = parseInt(str, 10);
	    else if (/[89]/.test(str) || strict) raise(start, "Invalid number");
	    else val = parseInt(str, 8);
	    return finishToken(_num, val);
	  }

	  // Read a string value, interpreting backslash-escapes.

	  function readCodePoint() {
	    var ch = input.charCodeAt(tokPos), code;

	    if (ch === 123) {
	      if (options.ecmaVersion < 6) unexpected();
	      ++tokPos;
	      code = readHexChar(input.indexOf('}', tokPos) - tokPos);
	      ++tokPos;
	      if (code > 0x10FFFF) unexpected();
	    } else {
	      code = readHexChar(4);
	    }

	    // UTF-16 Encoding
	    if (code <= 0xFFFF) {
	      return String.fromCharCode(code);
	    }
	    var cu1 = ((code - 0x10000) >> 10) + 0xD800;
	    var cu2 = ((code - 0x10000) & 1023) + 0xDC00;
	    return String.fromCharCode(cu1, cu2);
	  }

	  function readString(quote) {
	    var out = "", chunkStart = ++tokPos;
	    for (;;) {
	      if (tokPos >= inputLen) raise(tokStart, "Unterminated string constant");
	      var ch = input.charCodeAt(tokPos);
	      if (ch === quote) break;
	      if (ch === 92) { // '\'
	        out += input.slice(chunkStart, tokPos);
	        out += readEscapedChar();
	        chunkStart = tokPos;
	      } else {
	        if (isNewLine(ch)) raise(tokStart, "Unterminated string constant");
	        ++tokPos;
	      }
	    }
	    out += input.slice(chunkStart, tokPos++);
	    return finishToken(_string, out);
	  }

	  // Reads template string tokens.

	  function readTmplToken() {
	    var out = "", chunkStart = tokPos;
	    for (;;) {
	      if (tokPos >= inputLen) raise(tokStart, "Unterminated template");
	      var ch = input.charCodeAt(tokPos);
	      if (ch === 96 || ch === 36 && input.charCodeAt(tokPos + 1) === 123) { // '`', '${'
	        if (tokPos === tokStart && tokType === _template) {
	          if (ch === 36) {
	            tokPos += 2;
	            return finishToken(_dollarBraceL);
	          } else {
	            ++tokPos;
	            return finishToken(_backQuote);
	          }
	        }
	        out += input.slice(chunkStart, tokPos);
	        return finishToken(_template, out);
	      }
	      if (ch === 92) { // '\'
	        out += input.slice(chunkStart, tokPos);
	        out += readEscapedChar();
	        chunkStart = tokPos;
	      } else if (isNewLine(ch)) {
	        out += input.slice(chunkStart, tokPos);
	        ++tokPos;
	        if (ch === 13 && input.charCodeAt(tokPos) === 10) {
	          ++tokPos;
	          out += "\n";
	        } else {
	          out += String.fromCharCode(ch);
	        }
	        if (options.locations) {
	          ++tokCurLine;
	          tokLineStart = tokPos;
	        }
	        chunkStart = tokPos;
	      } else {
	        ++tokPos;
	      }
	    }
	  }

	  // Used to read escaped characters

	  function readEscapedChar() {
	    var ch = input.charCodeAt(++tokPos);
	    var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
	    if (octal) octal = octal[0];
	    while (octal && parseInt(octal, 8) > 255) octal = octal.slice(0, -1);
	    if (octal === "0") octal = null;
	    ++tokPos;
	    if (octal) {
	      if (strict) raise(tokPos - 2, "Octal literal in strict mode");
	      tokPos += octal.length - 1;
	      return String.fromCharCode(parseInt(octal, 8));
	    } else {
	      switch (ch) {
	        case 110: return "\n"; // 'n' -> '\n'
	        case 114: return "\r"; // 'r' -> '\r'
	        case 120: return String.fromCharCode(readHexChar(2)); // 'x'
	        case 117: return readCodePoint(); // 'u'
	        case 116: return "\t"; // 't' -> '\t'
	        case 98: return "\b"; // 'b' -> '\b'
	        case 118: return "\u000b"; // 'v' -> '\u000b'
	        case 102: return "\f"; // 'f' -> '\f'
	        case 48: return "\0"; // 0 -> '\0'
	        case 13: if (input.charCodeAt(tokPos) === 10) ++tokPos; // '\r\n'
	        case 10: // ' \n'
	          if (options.locations) { tokLineStart = tokPos; ++tokCurLine; }
	          return "";
	        default: return String.fromCharCode(ch);
	      }
	    }
	  }

	  // Used to read character escape sequences ('\x', '\u', '\U').

	  function readHexChar(len) {
	    var n = readInt(16, len);
	    if (n === null) raise(tokStart, "Bad character escape sequence");
	    return n;
	  }

	  // Used to signal to callers of `readWord1` whether the word
	  // contained any escape sequences. This is needed because words with
	  // escape sequences must not be interpreted as keywords.

	  var containsEsc;

	  // Read an identifier, and return it as a string. Sets `containsEsc`
	  // to whether the word contained a '\u' escape.
	  //
	  // Incrementally adds only escaped chars, adding other chunks as-is
	  // as a micro-optimization.

	  function readWord1() {
	    containsEsc = false;
	    var word = "", first = true, chunkStart = tokPos;
	    while (tokPos < inputLen) {
	      var ch = input.charCodeAt(tokPos);
	      if (isIdentifierChar(ch)) {
	        ++tokPos;
	      } else if (ch === 92) { // "\"
	        containsEsc = true;
	        word += input.slice(chunkStart, tokPos);
	        if (input.charCodeAt(++tokPos) != 117) // "u"
	          raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
	        ++tokPos;
	        var esc = readHexChar(4);
	        var escStr = String.fromCharCode(esc);
	        if (!escStr) raise(tokPos - 1, "Invalid Unicode escape");
	        if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
	          raise(tokPos - 4, "Invalid Unicode escape");
	        word += escStr;
	        chunkStart = tokPos;
	      } else {
	        break;
	      }
	      first = false;
	    }
	    return word + input.slice(chunkStart, tokPos);
	  }

	  // Read an identifier or keyword token. Will check for reserved
	  // words when necessary.

	  function readWord() {
	    var word = readWord1();
	    var type = _name;
	    if (!containsEsc && isKeyword(word))
	      type = keywordTypes[word];
	    return finishToken(type, word);
	  }

	  // ## Parser

	  // A recursive descent parser operates by defining functions for all
	  // syntactic elements, and recursively calling those, each function
	  // advancing the input stream and returning an AST node. Precedence
	  // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
	  // instead of `(!x)[1]` is handled by the fact that the parser
	  // function that parses unary prefix operators is called first, and
	  // in turn calls the function that parses `[]` subscripts — that
	  // way, it'll receive the node for `x[1]` already parsed, and wraps
	  // *that* in the unary operator node.
	  //
	  // Acorn uses an [operator precedence parser][opp] to handle binary
	  // operator precedence, because it is much more compact than using
	  // the technique outlined above, which uses different, nesting
	  // functions to specify precedence, for all of the ten binary
	  // precedence levels that JavaScript defines.
	  //
	  // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

	  // ### Parser utilities

	  // Continue to the next token.

	  function next() {
	    if (options.onToken)
	      options.onToken(new Token());

	    lastStart = tokStart;
	    lastEnd = tokEnd;
	    lastEndLoc = tokEndLoc;
	    readToken();
	  }

	  // Enter strict mode. Re-reads the next number or string to
	  // please pedantic tests ("use strict"; 010; -- should fail).

	  function setStrict(strct) {
	    strict = strct;
	    if (tokType !== _num && tokType !== _string) return;
	    tokPos = tokStart;
	    if (options.locations) {
	      while (tokPos < tokLineStart) {
	        tokLineStart = input.lastIndexOf("\n", tokLineStart - 2) + 1;
	        --tokCurLine;
	      }
	    }
	    skipSpace();
	    readToken();
	  }

	  // Start an AST node, attaching a start offset.

	  function Node() {
	    this.type = null;
	    this.start = tokStart;
	    this.end = null;
	  }

	  exports.Node = Node;

	  function SourceLocation() {
	    this.start = tokStartLoc;
	    this.end = null;
	    if (sourceFile !== null) this.source = sourceFile;
	  }

	  function startNode() {
	    var node = new Node();
	    if (options.locations)
	      node.loc = new SourceLocation();
	    if (options.directSourceFile)
	      node.sourceFile = options.directSourceFile;
	    if (options.ranges)
	      node.range = [tokStart, 0];
	    return node;
	  }

	  // Sometimes, a node is only started *after* the token stream passed
	  // its start position. The functions below help storing a position
	  // and creating a node from a previous position.

	  function storeCurrentPos() {
	    return options.locations ? [tokStart, tokStartLoc] : tokStart;
	  }

	  function startNodeAt(pos) {
	    var node = new Node(), start = pos;
	    if (options.locations) {
	      node.loc = new SourceLocation();
	      node.loc.start = start[1];
	      start = pos[0];
	    }
	    node.start = start;
	    if (options.directSourceFile)
	      node.sourceFile = options.directSourceFile;
	    if (options.ranges)
	      node.range = [start, 0];

	    return node;
	  }

	  // Finish an AST node, adding `type` and `end` properties.

	  function finishNode(node, type) {
	    node.type = type;
	    node.end = lastEnd;
	    if (options.locations)
	      node.loc.end = lastEndLoc;
	    if (options.ranges)
	      node.range[1] = lastEnd;
	    return node;
	  }

	  // Finish node at given position

	  function finishNodeAt(node, type, pos) {
	    if (options.locations) { node.loc.end = pos[1]; pos = pos[0]; }
	    node.type = type;
	    node.end = pos;
	    if (options.ranges)
	      node.range[1] = pos;
	    return node;
	  }

	  // Test whether a statement node is the string literal `"use strict"`.

	  function isUseStrict(stmt) {
	    return options.ecmaVersion >= 5 && stmt.type === "ExpressionStatement" &&
	      stmt.expression.type === "Literal" && stmt.expression.value === "use strict";
	  }

	  // Predicate that tests whether the next token is of the given
	  // type, and if yes, consumes it as a side effect.

	  function eat(type) {
	    if (tokType === type) {
	      next();
	      return true;
	    } else {
	      return false;
	    }
	  }

	  // Tests whether parsed token is a contextual keyword.

	  function isContextual(name) {
	    return tokType === _name && tokVal === name;
	  }

	  // Consumes contextual keyword if possible.

	  function eatContextual(name) {
	    return tokVal === name && eat(_name);
	  }

	  // Asserts that following token is given contextual keyword.

	  function expectContextual(name) {
	    if (!eatContextual(name)) unexpected();
	  }

	  // Test whether a semicolon can be inserted at the current position.

	  function canInsertSemicolon() {
	    return !options.strictSemicolons &&
	      (tokType === _eof || tokType === _braceR || newline.test(input.slice(lastEnd, tokStart)));
	  }

	  // Consume a semicolon, or, failing that, see if we are allowed to
	  // pretend that there is a semicolon at this position.

	  function semicolon() {
	    if (!eat(_semi) && !canInsertSemicolon()) unexpected();
	  }

	  // Expect a token of a given type. If found, consume it, otherwise,
	  // raise an unexpected token error.

	  function expect(type) {
	    eat(type) || unexpected();
	  }

	  // Raise an unexpected token error.

	  function unexpected(pos) {
	    raise(pos != null ? pos : tokStart, "Unexpected token");
	  }

	  // Checks if hash object has a property.

	  function has(obj, propName) {
	    return Object.prototype.hasOwnProperty.call(obj, propName);
	  }

	  // Convert existing expression atom to assignable pattern
	  // if possible.

	  function toAssignable(node, isBinding) {
	    if (options.ecmaVersion >= 6 && node) {
	      switch (node.type) {
	        case "Identifier":
	        case "ObjectPattern":
	        case "ArrayPattern":
	        case "AssignmentPattern":
	          break;

	        case "ObjectExpression":
	          node.type = "ObjectPattern";
	          for (var i = 0; i < node.properties.length; i++) {
	            var prop = node.properties[i];
	            if (prop.kind !== "init") raise(prop.key.start, "Object pattern can't contain getter or setter");
	            toAssignable(prop.value, isBinding);
	          }
	          break;

	        case "ArrayExpression":
	          node.type = "ArrayPattern";
	          toAssignableList(node.elements, isBinding);
	          break;

	        case "AssignmentExpression":
	          if (node.operator === "=") {
	            node.type = "AssignmentPattern";
	          } else {
	            raise(node.left.end, "Only '=' operator can be used for specifying default value.");
	          }
	          break;

	        case "MemberExpression":
	          if (!isBinding) break;

	        default:
	          raise(node.start, "Assigning to rvalue");
	      }
	    }
	    return node;
	  }

	  // Convert list of expression atoms to binding list.

	  function toAssignableList(exprList, isBinding) {
	    if (exprList.length) {
	      for (var i = 0; i < exprList.length - 1; i++) {
	        toAssignable(exprList[i], isBinding);
	      }
	      var last = exprList[exprList.length - 1];
	      switch (last.type) {
	        case "RestElement":
	          break;
	        case "SpreadElement":
	          last.type = "RestElement";
	          var arg = last.argument;
	          toAssignable(arg, isBinding);
	          if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern")
	            unexpected(arg.start);
	          break;
	        default:
	          toAssignable(last, isBinding);
	      }
	    }
	    return exprList;
	  }

	  // Parses spread element.

	  function parseSpread(refShorthandDefaultPos) {
	    var node = startNode();
	    next();
	    node.argument = parseMaybeAssign(refShorthandDefaultPos);
	    return finishNode(node, "SpreadElement");
	  }

	  function parseRest() {
	    var node = startNode();
	    next();
	    node.argument = tokType === _name || tokType === _bracketL ? parseBindingAtom() : unexpected();
	    return finishNode(node, "RestElement");
	  }

	  // Parses lvalue (assignable) atom.

	  function parseBindingAtom() {
	    if (options.ecmaVersion < 6) return parseIdent();
	    switch (tokType) {
	      case _name:
	        return parseIdent();

	      case _bracketL:
	        var node = startNode();
	        next();
	        node.elements = parseBindingList(_bracketR, true);
	        return finishNode(node, "ArrayPattern");

	      case _braceL:
	        return parseObj(true);

	      default:
	        unexpected();
	    }
	  }

	  function parseBindingList(close, allowEmpty) {
	    var elts = [], first = true;
	    while (!eat(close)) {
	      first ? first = false : expect(_comma);
	      if (tokType === _ellipsis) {
	        elts.push(parseRest());
	        expect(close);
	        break;
	      }
	      elts.push(allowEmpty && tokType === _comma ? null : parseMaybeDefault());
	    }
	    return elts;
	  }

	  // Parses assignment pattern around given atom if possible.

	  function parseMaybeDefault(startPos, left) {
	    startPos = startPos || storeCurrentPos();
	    left = left || parseBindingAtom();
	    if (!eat(_eq)) return left;
	    var node = startNodeAt(startPos);
	    node.operator = "=";
	    node.left = left;
	    node.right = parseMaybeAssign();
	    return finishNode(node, "AssignmentPattern");
	  }

	  // Verify that argument names are not repeated, and it does not
	  // try to bind the words `eval` or `arguments`.

	  function checkFunctionParam(param, nameHash) {
	    switch (param.type) {
	      case "Identifier":
	        if (isStrictReservedWord(param.name) || isStrictBadIdWord(param.name))
	          raise(param.start, "Defining '" + param.name + "' in strict mode");
	        if (has(nameHash, param.name))
	          raise(param.start, "Argument name clash in strict mode");
	        nameHash[param.name] = true;
	        break;

	      case "ObjectPattern":
	        for (var i = 0; i < param.properties.length; i++)
	          checkFunctionParam(param.properties[i].value, nameHash);
	        break;

	      case "ArrayPattern":
	        for (var i = 0; i < param.elements.length; i++) {
	          var elem = param.elements[i];
	          if (elem) checkFunctionParam(elem, nameHash);
	        }
	        break;

	      case "RestElement":
	        return checkFunctionParam(param.argument, nameHash);
	    }
	  }

	  // Check if property name clashes with already added.
	  // Object/class getters and setters are not allowed to clash —
	  // either with each other or with an init property — and in
	  // strict mode, init properties are also not allowed to be repeated.

	  function checkPropClash(prop, propHash) {
	    if (options.ecmaVersion >= 6) return;
	    var key = prop.key, name;
	    switch (key.type) {
	      case "Identifier": name = key.name; break;
	      case "Literal": name = String(key.value); break;
	      default: return;
	    }
	    var kind = prop.kind || "init", other;
	    if (has(propHash, name)) {
	      other = propHash[name];
	      var isGetSet = kind !== "init";
	      if ((strict || isGetSet) && other[kind] || !(isGetSet ^ other.init))
	        raise(key.start, "Redefinition of property");
	    } else {
	      other = propHash[name] = {
	        init: false,
	        get: false,
	        set: false
	      };
	    }
	    other[kind] = true;
	  }

	  // Verify that a node is an lval — something that can be assigned
	  // to.

	  function checkLVal(expr, isBinding) {
	    switch (expr.type) {
	      case "Identifier":
	        if (strict && (isStrictBadIdWord(expr.name) || isStrictReservedWord(expr.name)))
	          raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
	        break;

	      case "MemberExpression":
	        if (isBinding) raise(expr.start, "Binding to member expression");
	        break;

	      case "ObjectPattern":
	        for (var i = 0; i < expr.properties.length; i++)
	          checkLVal(expr.properties[i].value, isBinding);
	        break;

	      case "ArrayPattern":
	        for (var i = 0; i < expr.elements.length; i++) {
	          var elem = expr.elements[i];
	          if (elem) checkLVal(elem, isBinding);
	        }
	        break;

	      case "AssignmentPattern":
	        checkLVal(expr.left);
	        break;

	      case "RestElement":
	        checkLVal(expr.argument);
	        break;

	      default:
	        raise(expr.start, "Assigning to rvalue");
	    }
	  }

	  // ### Statement parsing

	  // Parse a program. Initializes the parser, reads any number of
	  // statements, and wraps them in a Program node.  Optionally takes a
	  // `program` argument.  If present, the statements will be appended
	  // to its body instead of creating a new node.

	  function parseTopLevel(node) {
	    var first = true;
	    if (!node.body) node.body = [];
	    while (tokType !== _eof) {
	      var stmt = parseStatement(true, true);
	      node.body.push(stmt);
	      if (first && isUseStrict(stmt)) setStrict(true);
	      first = false;
	    }

	    next();
	    return finishNode(node, "Program");
	  }

	  var loopLabel = {kind: "loop"}, switchLabel = {kind: "switch"};

	  // Parse a single statement.
	  //
	  // If expecting a statement and finding a slash operator, parse a
	  // regular expression literal. This is to handle cases like
	  // `if (foo) /blah/.exec(foo);`, where looking at the previous token
	  // does not help.

	  function parseStatement(declaration, topLevel) {
	    var starttype = tokType, node = startNode();

	    // Most types of statements are recognized by the keyword they
	    // start with. Many are trivial to parse, some require a bit of
	    // complexity.

	    switch (starttype) {
	    case _break: case _continue: return parseBreakContinueStatement(node, starttype.keyword);
	    case _debugger: return parseDebuggerStatement(node);
	    case _do: return parseDoStatement(node);
	    case _for: return parseForStatement(node);
	    case _function:
	      if (!declaration && options.ecmaVersion >= 6) unexpected();
	      return parseFunctionStatement(node);
	    case _class:
	      if (!declaration) unexpected();
	      return parseClass(node, true);
	    case _if: return parseIfStatement(node);
	    case _return: return parseReturnStatement(node);
	    case _switch: return parseSwitchStatement(node);
	    case _throw: return parseThrowStatement(node);
	    case _try: return parseTryStatement(node);
	    case _let: case _const: if (!declaration) unexpected(); // NOTE: falls through to _var
	    case _var: return parseVarStatement(node, starttype.keyword);
	    case _while: return parseWhileStatement(node);
	    case _with: return parseWithStatement(node);
	    case _braceL: return parseBlock(); // no point creating a function for this
	    case _semi: return parseEmptyStatement(node);
	    case _export:
	    case _import:
	      if (!topLevel && !options.allowImportExportEverywhere)
	        raise(tokStart, "'import' and 'export' may only appear at the top level");
	      return starttype === _import ? parseImport(node) : parseExport(node);

	      // If the statement does not start with a statement keyword or a
	      // brace, it's an ExpressionStatement or LabeledStatement. We
	      // simply start parsing an expression, and afterwards, if the
	      // next token is a colon and the expression was a simple
	      // Identifier node, we switch to interpreting it as a label.
	    default:
	      var maybeName = tokVal, expr = parseExpression();
	      if (starttype === _name && expr.type === "Identifier" && eat(_colon))
	        return parseLabeledStatement(node, maybeName, expr);
	      else return parseExpressionStatement(node, expr);
	    }
	  }

	  function parseBreakContinueStatement(node, keyword) {
	    var isBreak = keyword == "break";
	    next();
	    if (eat(_semi) || canInsertSemicolon()) node.label = null;
	    else if (tokType !== _name) unexpected();
	    else {
	      node.label = parseIdent();
	      semicolon();
	    }

	    // Verify that there is an actual destination to break or
	    // continue to.
	    for (var i = 0; i < labels.length; ++i) {
	      var lab = labels[i];
	      if (node.label == null || lab.name === node.label.name) {
	        if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
	        if (node.label && isBreak) break;
	      }
	    }
	    if (i === labels.length) raise(node.start, "Unsyntactic " + keyword);
	    return finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
	  }

	  function parseDebuggerStatement(node) {
	    next();
	    semicolon();
	    return finishNode(node, "DebuggerStatement");
	  }

	  function parseDoStatement(node) {
	    next();
	    labels.push(loopLabel);
	    node.body = parseStatement(false);
	    labels.pop();
	    expect(_while);
	    node.test = parseParenExpression();
	    if (options.ecmaVersion >= 6)
	      eat(_semi);
	    else
	      semicolon();
	    return finishNode(node, "DoWhileStatement");
	  }

	  // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
	  // loop is non-trivial. Basically, we have to parse the init `var`
	  // statement or expression, disallowing the `in` operator (see
	  // the second parameter to `parseExpression`), and then check
	  // whether the next token is `in` or `of`. When there is no init
	  // part (semicolon immediately after the opening parenthesis), it
	  // is a regular `for` loop.

	  function parseForStatement(node) {
	    next();
	    labels.push(loopLabel);
	    expect(_parenL);
	    if (tokType === _semi) return parseFor(node, null);
	    if (tokType === _var || tokType === _let) {
	      var init = startNode(), varKind = tokType.keyword, isLet = tokType === _let;
	      next();
	      parseVar(init, true, varKind);
	      finishNode(init, "VariableDeclaration");
	      if ((tokType === _in || (options.ecmaVersion >= 6 && isContextual("of"))) && init.declarations.length === 1 &&
	          !(isLet && init.declarations[0].init))
	        return parseForIn(node, init);
	      return parseFor(node, init);
	    }
	    var refShorthandDefaultPos = {start: 0};
	    var init = parseExpression(true, refShorthandDefaultPos);
	    if (tokType === _in || (options.ecmaVersion >= 6 && isContextual("of"))) {
	      toAssignable(init);
	      checkLVal(init);
	      return parseForIn(node, init);
	    } else if (refShorthandDefaultPos.start) {
	      unexpected(refShorthandDefaultPos.start);
	    }
	    return parseFor(node, init);
	  }

	  function parseFunctionStatement(node) {
	    next();
	    return parseFunction(node, true);
	  }

	  function parseIfStatement(node) {
	    next();
	    node.test = parseParenExpression();
	    node.consequent = parseStatement(false);
	    node.alternate = eat(_else) ? parseStatement(false) : null;
	    return finishNode(node, "IfStatement");
	  }

	  function parseReturnStatement(node) {
	    if (!inFunction && !options.allowReturnOutsideFunction)
	      raise(tokStart, "'return' outside of function");
	    next();

	    // In `return` (and `break`/`continue`), the keywords with
	    // optional arguments, we eagerly look for a semicolon or the
	    // possibility to insert one.

	    if (eat(_semi) || canInsertSemicolon()) node.argument = null;
	    else { node.argument = parseExpression(); semicolon(); }
	    return finishNode(node, "ReturnStatement");
	  }

	  function parseSwitchStatement(node) {
	    next();
	    node.discriminant = parseParenExpression();
	    node.cases = [];
	    expect(_braceL);
	    labels.push(switchLabel);

	    // Statements under must be grouped (by label) in SwitchCase
	    // nodes. `cur` is used to keep the node that we are currently
	    // adding statements to.

	    for (var cur, sawDefault; tokType != _braceR;) {
	      if (tokType === _case || tokType === _default) {
	        var isCase = tokType === _case;
	        if (cur) finishNode(cur, "SwitchCase");
	        node.cases.push(cur = startNode());
	        cur.consequent = [];
	        next();
	        if (isCase) cur.test = parseExpression();
	        else {
	          if (sawDefault) raise(lastStart, "Multiple default clauses"); sawDefault = true;
	          cur.test = null;
	        }
	        expect(_colon);
	      } else {
	        if (!cur) unexpected();
	        cur.consequent.push(parseStatement(true));
	      }
	    }
	    if (cur) finishNode(cur, "SwitchCase");
	    next(); // Closing brace
	    labels.pop();
	    return finishNode(node, "SwitchStatement");
	  }

	  function parseThrowStatement(node) {
	    next();
	    if (newline.test(input.slice(lastEnd, tokStart)))
	      raise(lastEnd, "Illegal newline after throw");
	    node.argument = parseExpression();
	    semicolon();
	    return finishNode(node, "ThrowStatement");
	  }

	  function parseTryStatement(node) {
	    next();
	    node.block = parseBlock();
	    node.handler = null;
	    if (tokType === _catch) {
	      var clause = startNode();
	      next();
	      expect(_parenL);
	      clause.param = parseBindingAtom();
	      checkLVal(clause.param, true);
	      expect(_parenR);
	      clause.guard = null;
	      clause.body = parseBlock();
	      node.handler = finishNode(clause, "CatchClause");
	    }
	    node.guardedHandlers = empty;
	    node.finalizer = eat(_finally) ? parseBlock() : null;
	    if (!node.handler && !node.finalizer)
	      raise(node.start, "Missing catch or finally clause");
	    return finishNode(node, "TryStatement");
	  }

	  function parseVarStatement(node, kind) {
	    next();
	    parseVar(node, false, kind);
	    semicolon();
	    return finishNode(node, "VariableDeclaration");
	  }

	  function parseWhileStatement(node) {
	    next();
	    node.test = parseParenExpression();
	    labels.push(loopLabel);
	    node.body = parseStatement(false);
	    labels.pop();
	    return finishNode(node, "WhileStatement");
	  }

	  function parseWithStatement(node) {
	    if (strict) raise(tokStart, "'with' in strict mode");
	    next();
	    node.object = parseParenExpression();
	    node.body = parseStatement(false);
	    return finishNode(node, "WithStatement");
	  }

	  function parseEmptyStatement(node) {
	    next();
	    return finishNode(node, "EmptyStatement");
	  }

	  function parseLabeledStatement(node, maybeName, expr) {
	    for (var i = 0; i < labels.length; ++i)
	      if (labels[i].name === maybeName) raise(expr.start, "Label '" + maybeName + "' is already declared");
	    var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
	    labels.push({name: maybeName, kind: kind});
	    node.body = parseStatement(true);
	    labels.pop();
	    node.label = expr;
	    return finishNode(node, "LabeledStatement");
	  }

	  function parseExpressionStatement(node, expr) {
	    node.expression = expr;
	    semicolon();
	    return finishNode(node, "ExpressionStatement");
	  }

	  // Used for constructs like `switch` and `if` that insist on
	  // parentheses around their expression.

	  function parseParenExpression() {
	    expect(_parenL);
	    var val = parseExpression();
	    expect(_parenR);
	    return val;
	  }

	  // Parse a semicolon-enclosed block of statements, handling `"use
	  // strict"` declarations when `allowStrict` is true (used for
	  // function bodies).

	  function parseBlock(allowStrict) {
	    var node = startNode(), first = true, oldStrict;
	    node.body = [];
	    expect(_braceL);
	    while (!eat(_braceR)) {
	      var stmt = parseStatement(true);
	      node.body.push(stmt);
	      if (first && allowStrict && isUseStrict(stmt)) {
	        oldStrict = strict;
	        setStrict(strict = true);
	      }
	      first = false;
	    }
	    if (oldStrict === false) setStrict(false);
	    return finishNode(node, "BlockStatement");
	  }

	  // Parse a regular `for` loop. The disambiguation code in
	  // `parseStatement` will already have parsed the init statement or
	  // expression.

	  function parseFor(node, init) {
	    node.init = init;
	    expect(_semi);
	    node.test = tokType === _semi ? null : parseExpression();
	    expect(_semi);
	    node.update = tokType === _parenR ? null : parseExpression();
	    expect(_parenR);
	    node.body = parseStatement(false);
	    labels.pop();
	    return finishNode(node, "ForStatement");
	  }

	  // Parse a `for`/`in` and `for`/`of` loop, which are almost
	  // same from parser's perspective.

	  function parseForIn(node, init) {
	    var type = tokType === _in ? "ForInStatement" : "ForOfStatement";
	    next();
	    node.left = init;
	    node.right = parseExpression();
	    expect(_parenR);
	    node.body = parseStatement(false);
	    labels.pop();
	    return finishNode(node, type);
	  }

	  // Parse a list of variable declarations.

	  function parseVar(node, noIn, kind) {
	    node.declarations = [];
	    node.kind = kind;
	    for (;;) {
	      var decl = startNode();
	      decl.id = parseBindingAtom();
	      checkLVal(decl.id, true);
	      decl.init = eat(_eq) ? parseMaybeAssign(noIn) : (kind === _const.keyword ? unexpected() : null);
	      node.declarations.push(finishNode(decl, "VariableDeclarator"));
	      if (!eat(_comma)) break;
	    }
	    return node;
	  }

	  // ### Expression parsing

	  // These nest, from the most general expression type at the top to
	  // 'atomic', nondivisible expression types at the bottom. Most of
	  // the functions will simply let the function(s) below them parse,
	  // and, *if* the syntactic construct they handle is present, wrap
	  // the AST node that the inner parser gave them in another node.

	  // Parse a full expression. The optional arguments are used to
	  // forbid the `in` operator (in for loops initalization expressions)
	  // and provide reference for storing '=' operator inside shorthand
	  // property assignment in contexts where both object expression
	  // and object pattern might appear (so it's possible to raise
	  // delayed syntax error at correct position).

	  function parseExpression(noIn, refShorthandDefaultPos) {
	    var start = storeCurrentPos();
	    var expr = parseMaybeAssign(noIn, refShorthandDefaultPos);
	    if (tokType === _comma) {
	      var node = startNodeAt(start);
	      node.expressions = [expr];
	      while (eat(_comma)) node.expressions.push(parseMaybeAssign(noIn, refShorthandDefaultPos));
	      return finishNode(node, "SequenceExpression");
	    }
	    return expr;
	  }

	  // Parse an assignment expression. This includes applications of
	  // operators like `+=`.

	  function parseMaybeAssign(noIn, refShorthandDefaultPos) {
	    var failOnShorthandAssign;
	    if (!refShorthandDefaultPos) {
	      refShorthandDefaultPos = {start: 0};
	      failOnShorthandAssign = true;
	    } else {
	      failOnShorthandAssign = false;
	    }
	    var start = storeCurrentPos();
	    var left = parseMaybeConditional(noIn, refShorthandDefaultPos);
	    if (tokType.isAssign) {
	      var node = startNodeAt(start);
	      node.operator = tokVal;
	      node.left = tokType === _eq ? toAssignable(left) : left;
	      refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly
	      checkLVal(left);
	      next();
	      node.right = parseMaybeAssign(noIn);
	      return finishNode(node, "AssignmentExpression");
	    } else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
	      unexpected(refShorthandDefaultPos.start);
	    }
	    return left;
	  }

	  // Parse a ternary conditional (`?:`) operator.

	  function parseMaybeConditional(noIn, refShorthandDefaultPos) {
	    var start = storeCurrentPos();
	    var expr = parseExprOps(noIn, refShorthandDefaultPos);
	    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
	    if (eat(_question)) {
	      var node = startNodeAt(start);
	      node.test = expr;
	      node.consequent = parseMaybeAssign();
	      expect(_colon);
	      node.alternate = parseMaybeAssign(noIn);
	      return finishNode(node, "ConditionalExpression");
	    }
	    return expr;
	  }

	  // Start the precedence parser.

	  function parseExprOps(noIn, refShorthandDefaultPos) {
	    var start = storeCurrentPos();
	    var expr = parseMaybeUnary(refShorthandDefaultPos);
	    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
	    return parseExprOp(expr, start, -1, noIn);
	  }

	  // Parse binary operators with the operator precedence parsing
	  // algorithm. `left` is the left-hand side of the operator.
	  // `minPrec` provides context that allows the function to stop and
	  // defer further parser to one of its callers when it encounters an
	  // operator that has a lower precedence than the set it is parsing.

	  function parseExprOp(left, leftStart, minPrec, noIn) {
	    var prec = tokType.binop;
	    if (prec != null && (!noIn || tokType !== _in)) {
	      if (prec > minPrec) {
	        var node = startNodeAt(leftStart);
	        node.left = left;
	        node.operator = tokVal;
	        var op = tokType;
	        next();
	        var start = storeCurrentPos();
	        node.right = parseExprOp(parseMaybeUnary(), start, prec, noIn);
	        finishNode(node, (op === _logicalOR || op === _logicalAND) ? "LogicalExpression" : "BinaryExpression");
	        return parseExprOp(node, leftStart, minPrec, noIn);
	      }
	    }
	    return left;
	  }

	  // Parse unary operators, both prefix and postfix.

	  function parseMaybeUnary(refShorthandDefaultPos) {
	    if (tokType.prefix) {
	      var node = startNode(), update = tokType.isUpdate;
	      node.operator = tokVal;
	      node.prefix = true;
	      next();
	      node.argument = parseMaybeUnary();
	      if (refShorthandDefaultPos && refShorthandDefaultPos.start) unexpected(refShorthandDefaultPos.start);
	      if (update) checkLVal(node.argument);
	      else if (strict && node.operator === "delete" &&
	               node.argument.type === "Identifier")
	        raise(node.start, "Deleting local variable in strict mode");
	      return finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
	    }
	    var start = storeCurrentPos();
	    var expr = parseExprSubscripts(refShorthandDefaultPos);
	    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
	    while (tokType.postfix && !canInsertSemicolon()) {
	      var node = startNodeAt(start);
	      node.operator = tokVal;
	      node.prefix = false;
	      node.argument = expr;
	      checkLVal(expr);
	      next();
	      expr = finishNode(node, "UpdateExpression");
	    }
	    return expr;
	  }

	  // Parse call, dot, and `[]`-subscript expressions.

	  function parseExprSubscripts(refShorthandDefaultPos) {
	    var start = storeCurrentPos();
	    var expr = parseExprAtom(refShorthandDefaultPos);
	    if (refShorthandDefaultPos && refShorthandDefaultPos.start) return expr;
	    return parseSubscripts(expr, start);
	  }

	  function parseSubscripts(base, start, noCalls) {
	    if (eat(_dot)) {
	      var node = startNodeAt(start);
	      node.object = base;
	      node.property = parseIdent(true);
	      node.computed = false;
	      return parseSubscripts(finishNode(node, "MemberExpression"), start, noCalls);
	    } else if (eat(_bracketL)) {
	      var node = startNodeAt(start);
	      node.object = base;
	      node.property = parseExpression();
	      node.computed = true;
	      expect(_bracketR);
	      return parseSubscripts(finishNode(node, "MemberExpression"), start, noCalls);
	    } else if (!noCalls && eat(_parenL)) {
	      var node = startNodeAt(start);
	      node.callee = base;
	      node.arguments = parseExprList(_parenR, false);
	      return parseSubscripts(finishNode(node, "CallExpression"), start, noCalls);
	    } else if (tokType === _backQuote) {
	      var node = startNodeAt(start);
	      node.tag = base;
	      node.quasi = parseTemplate();
	      return parseSubscripts(finishNode(node, "TaggedTemplateExpression"), start, noCalls);
	    } return base;
	  }

	  // Parse an atomic expression — either a single token that is an
	  // expression, an expression started by a keyword like `function` or
	  // `new`, or an expression wrapped in punctuation like `()`, `[]`,
	  // or `{}`.

	  function parseExprAtom(refShorthandDefaultPos) {
	    switch (tokType) {
	    case _this:
	      var node = startNode();
	      next();
	      return finishNode(node, "ThisExpression");

	    case _yield:
	      if (inGenerator) return parseYield();

	    case _name:
	      var start = storeCurrentPos();
	      var id = parseIdent(tokType !== _name);
	      if (!canInsertSemicolon() && eat(_arrow)) {
	        return parseArrowExpression(startNodeAt(start), [id]);
	      }
	      return id;

	    case _regexp:
	      var node = startNode();
	      node.regex = {pattern: tokVal.pattern, flags: tokVal.flags};
	      node.value = tokVal.value;
	      node.raw = input.slice(tokStart, tokEnd);
	      next();
	      return finishNode(node, "Literal");

	    case _num: case _string:
	      var node = startNode();
	      node.value = tokVal;
	      node.raw = input.slice(tokStart, tokEnd);
	      next();
	      return finishNode(node, "Literal");

	    case _null: case _true: case _false:
	      var node = startNode();
	      node.value = tokType.atomValue;
	      node.raw = tokType.keyword;
	      next();
	      return finishNode(node, "Literal");

	    case _parenL:
	      return parseParenAndDistinguishExpression();

	    case _bracketL:
	      var node = startNode();
	      next();
	      // check whether this is array comprehension or regular array
	      if (options.ecmaVersion >= 7 && tokType === _for) {
	        return parseComprehension(node, false);
	      }
	      node.elements = parseExprList(_bracketR, true, true, refShorthandDefaultPos);
	      return finishNode(node, "ArrayExpression");

	    case _braceL:
	      return parseObj(false, refShorthandDefaultPos);

	    case _function:
	      var node = startNode();
	      next();
	      return parseFunction(node, false);

	    case _class:
	      return parseClass(startNode(), false);

	    case _new:
	      return parseNew();

	    case _backQuote:
	      return parseTemplate();

	    default:
	      unexpected();
	    }
	  }

	  function parseParenAndDistinguishExpression() {
	    var start = storeCurrentPos(), val;
	    if (options.ecmaVersion >= 6) {
	      next();

	      if (options.ecmaVersion >= 7 && tokType === _for) {
	        return parseComprehension(startNodeAt(start), true);
	      }

	      var innerStart = storeCurrentPos(), exprList = [], first = true;
	      var refShorthandDefaultPos = {start: 0}, spreadStart, innerParenStart;
	      while (tokType !== _parenR) {
	        first ? first = false : expect(_comma);
	        if (tokType === _ellipsis) {
	          spreadStart = tokStart;
	          exprList.push(parseRest());
	          break;
	        } else {
	          if (tokType === _parenL && !innerParenStart) {
	            innerParenStart = tokStart;
	          }
	          exprList.push(parseMaybeAssign(false, refShorthandDefaultPos));
	        }
	      }
	      var innerEnd = storeCurrentPos();
	      expect(_parenR);

	      if (!canInsertSemicolon() && eat(_arrow)) {
	        if (innerParenStart) unexpected(innerParenStart);
	        return parseArrowExpression(startNodeAt(start), exprList);
	      }

	      if (!exprList.length) unexpected(lastStart);
	      if (spreadStart) unexpected(spreadStart);
	      if (refShorthandDefaultPos.start) unexpected(refShorthandDefaultPos.start);

	      if (exprList.length > 1) {
	        val = startNodeAt(innerStart);
	        val.expressions = exprList;
	        finishNodeAt(val, "SequenceExpression", innerEnd);
	      } else {
	        val = exprList[0];
	      }
	    } else {
	      val = parseParenExpression();
	    }

	    if (options.preserveParens) {
	      var par = startNodeAt(start);
	      par.expression = val;
	      return finishNode(par, "ParenthesizedExpression");
	    } else {
	      return val;
	    }
	  }

	  // New's precedence is slightly tricky. It must allow its argument
	  // to be a `[]` or dot subscript expression, but not a call — at
	  // least, not without wrapping it in parentheses. Thus, it uses the

	  function parseNew() {
	    var node = startNode();
	    next();
	    var start = storeCurrentPos();
	    node.callee = parseSubscripts(parseExprAtom(), start, true);
	    if (eat(_parenL)) node.arguments = parseExprList(_parenR, false);
	    else node.arguments = empty;
	    return finishNode(node, "NewExpression");
	  }

	  // Parse template expression.

	  function parseTemplateElement() {
	    var elem = startNode();
	    elem.value = {
	      raw: input.slice(tokStart, tokEnd),
	      cooked: tokVal
	    };
	    next();
	    elem.tail = tokType === _backQuote;
	    return finishNode(elem, "TemplateElement");
	  }

	  function parseTemplate() {
	    var node = startNode();
	    next();
	    node.expressions = [];
	    var curElt = parseTemplateElement();
	    node.quasis = [curElt];
	    while (!curElt.tail) {
	      expect(_dollarBraceL);
	      node.expressions.push(parseExpression());
	      expect(_braceR);
	      node.quasis.push(curElt = parseTemplateElement());
	    }
	    next();
	    return finishNode(node, "TemplateLiteral");
	  }

	  // Parse an object literal or binding pattern.

	  function parseObj(isPattern, refShorthandDefaultPos) {
	    var node = startNode(), first = true, propHash = {};
	    node.properties = [];
	    next();
	    while (!eat(_braceR)) {
	      if (!first) {
	        expect(_comma);
	        if (options.allowTrailingCommas && eat(_braceR)) break;
	      } else first = false;

	      var prop = startNode(), isGenerator, start;
	      if (options.ecmaVersion >= 6) {
	        prop.method = false;
	        prop.shorthand = false;
	        if (isPattern || refShorthandDefaultPos) {
	          start = storeCurrentPos();
	        }
	        if (!isPattern) {
	          isGenerator = eat(_star);
	        }
	      }
	      parsePropertyName(prop);
	      if (eat(_colon)) {
	        prop.value = isPattern ? parseMaybeDefault() : parseMaybeAssign(false, refShorthandDefaultPos);
	        prop.kind = "init";
	      } else if (options.ecmaVersion >= 6 && tokType === _parenL) {
	        if (isPattern) unexpected();
	        prop.kind = "init";
	        prop.method = true;
	        prop.value = parseMethod(isGenerator);
	      } else if (options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" &&
	                 (prop.key.name === "get" || prop.key.name === "set") &&
	                 (tokType != _comma && tokType != _braceR)) {
	        if (isGenerator || isPattern) unexpected();
	        prop.kind = prop.key.name;
	        parsePropertyName(prop);
	        prop.value = parseMethod(false);
	      } else if (options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
	        prop.kind = "init";
	        if (isPattern) {
	          prop.value = parseMaybeDefault(start, prop.key);
	        } else if (tokType === _eq && refShorthandDefaultPos) {
	          if (!refShorthandDefaultPos.start)
	            refShorthandDefaultPos.start = tokStart;
	          prop.value = parseMaybeDefault(start, prop.key);
	        } else {
	          prop.value = prop.key;
	        }
	        prop.shorthand = true;
	      } else unexpected();

	      checkPropClash(prop, propHash);
	      node.properties.push(finishNode(prop, "Property"));
	    }
	    return finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
	  }

	  function parsePropertyName(prop) {
	    if (options.ecmaVersion >= 6) {
	      if (eat(_bracketL)) {
	        prop.computed = true;
	        prop.key = parseExpression();
	        expect(_bracketR);
	        return;
	      } else {
	        prop.computed = false;
	      }
	    }
	    prop.key = (tokType === _num || tokType === _string) ? parseExprAtom() : parseIdent(true);
	  }

	  // Initialize empty function node.

	  function initFunction(node) {
	    node.id = null;
	    if (options.ecmaVersion >= 6) {
	      node.generator = false;
	      node.expression = false;
	    }
	  }

	  // Parse a function declaration or literal (depending on the
	  // `isStatement` parameter).

	  function parseFunction(node, isStatement, allowExpressionBody) {
	    initFunction(node);
	    if (options.ecmaVersion >= 6) {
	      node.generator = eat(_star);
	    }
	    if (isStatement || tokType === _name) {
	      node.id = parseIdent();
	    }
	    expect(_parenL);
	    node.params = parseBindingList(_parenR, false);
	    parseFunctionBody(node, allowExpressionBody);
	    return finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
	  }

	  // Parse object or class method.

	  function parseMethod(isGenerator) {
	    var node = startNode();
	    initFunction(node);
	    expect(_parenL);
	    node.params = parseBindingList(_parenR, false);
	    var allowExpressionBody;
	    if (options.ecmaVersion >= 6) {
	      node.generator = isGenerator;
	      allowExpressionBody = true;
	    } else {
	      allowExpressionBody = false;
	    }
	    parseFunctionBody(node, allowExpressionBody);
	    return finishNode(node, "FunctionExpression");
	  }

	  // Parse arrow function expression with given parameters.

	  function parseArrowExpression(node, params) {
	    initFunction(node);
	    node.params = toAssignableList(params, true);
	    parseFunctionBody(node, true);
	    return finishNode(node, "ArrowFunctionExpression");
	  }

	  // Parse function body and check parameters.

	  function parseFunctionBody(node, allowExpression) {
	    var isExpression = allowExpression && tokType !== _braceL;

	    if (isExpression) {
	      node.body = parseMaybeAssign();
	      node.expression = true;
	    } else {
	      // Start a new scope with regard to labels and the `inFunction`
	      // flag (restore them to their old value afterwards).
	      var oldInFunc = inFunction, oldInGen = inGenerator, oldLabels = labels;
	      inFunction = true; inGenerator = node.generator; labels = [];
	      node.body = parseBlock(true);
	      node.expression = false;
	      inFunction = oldInFunc; inGenerator = oldInGen; labels = oldLabels;
	    }

	    // If this is a strict mode function, verify that argument names
	    // are not repeated, and it does not try to bind the words `eval`
	    // or `arguments`.
	    if (strict || !isExpression && node.body.body.length && isUseStrict(node.body.body[0])) {
	      var nameHash = {};
	      if (node.id)
	        checkFunctionParam(node.id, {});
	      for (var i = 0; i < node.params.length; i++)
	        checkFunctionParam(node.params[i], nameHash);
	    }
	  }

	  // Parse a class declaration or literal (depending on the
	  // `isStatement` parameter).

	  function parseClass(node, isStatement) {
	    next();
	    node.id = tokType === _name ? parseIdent() : isStatement ? unexpected() : null;
	    node.superClass = eat(_extends) ? parseExprSubscripts() : null;
	    var classBody = startNode();
	    classBody.body = [];
	    expect(_braceL);
	    while (!eat(_braceR)) {
	      if (eat(_semi)) continue;
	      var method = startNode();
	      var isGenerator = eat(_star);
	      parsePropertyName(method);
	      if (tokType !== _parenL && !method.computed && method.key.type === "Identifier" &&
	          method.key.name === "static") {
	        if (isGenerator) unexpected();
	        method['static'] = true;
	        isGenerator = eat(_star);
	        parsePropertyName(method);
	      } else {
	        method['static'] = false;
	      }
	      if (tokType !== _parenL && !method.computed && method.key.type === "Identifier" &&
	          (method.key.name === "get" || method.key.name === "set")) {
	        if (isGenerator) unexpected();
	        method.kind = method.key.name;
	        parsePropertyName(method);
	      } else {
	        method.kind = "";
	      }
	      method.value = parseMethod(isGenerator);
	      classBody.body.push(finishNode(method, "MethodDefinition"));
	    }
	    node.body = finishNode(classBody, "ClassBody");
	    return finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
	  }

	  // Parses a comma-separated list of expressions, and returns them as
	  // an array. `close` is the token type that ends the list, and
	  // `allowEmpty` can be turned on to allow subsequent commas with
	  // nothing in between them to be parsed as `null` (which is needed
	  // for array literals).

	  function parseExprList(close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
	    var elts = [], first = true;
	    while (!eat(close)) {
	      if (!first) {
	        expect(_comma);
	        if (allowTrailingComma && options.allowTrailingCommas && eat(close)) break;
	      } else first = false;

	      if (allowEmpty && tokType === _comma) {
	        elts.push(null);
	      } else {
	        if (tokType === _ellipsis)
	          elts.push(parseSpread(refShorthandDefaultPos));
	        else
	          elts.push(parseMaybeAssign(false, refShorthandDefaultPos));
	      }
	    }
	    return elts;
	  }

	  // Parse the next token as an identifier. If `liberal` is true (used
	  // when parsing properties), it will also convert keywords into
	  // identifiers.

	  function parseIdent(liberal) {
	    var node = startNode();
	    if (liberal && options.forbidReserved == "everywhere") liberal = false;
	    if (tokType === _name) {
	      if (!liberal &&
	          (options.forbidReserved &&
	           (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(tokVal) ||
	           strict && isStrictReservedWord(tokVal)) &&
	          input.slice(tokStart, tokEnd).indexOf("\\") == -1)
	        raise(tokStart, "The keyword '" + tokVal + "' is reserved");
	      node.name = tokVal;
	    } else if (liberal && tokType.keyword) {
	      node.name = tokType.keyword;
	    } else {
	      unexpected();
	    }
	    next();
	    return finishNode(node, "Identifier");
	  }

	  // Parses module export declaration.

	  function parseExport(node) {
	    next();
	    // export var|const|let|function|class ...;
	    if (tokType === _var || tokType === _const || tokType === _let || tokType === _function || tokType === _class) {
	      node.declaration = parseStatement(true);
	      node['default'] = false;
	      node.specifiers = null;
	      node.source = null;
	    } else
	    // export default ...;
	    if (eat(_default)) {
	      var expr = parseMaybeAssign();
	      if (expr.id) {
	        switch (expr.type) {
	          case "FunctionExpression": expr.type = "FunctionDeclaration"; break;
	          case "ClassExpression": expr.type = "ClassDeclaration"; break;
	        }
	      }
	      node.declaration = expr;
	      node['default'] = true;
	      node.specifiers = null;
	      node.source = null;
	      semicolon();
	    } else {
	      // export * from '...';
	      // export { x, y as z } [from '...'];
	      var isBatch = tokType === _star;
	      node.declaration = null;
	      node['default'] = false;
	      node.specifiers = parseExportSpecifiers();
	      if (eatContextual("from")) {
	        node.source = tokType === _string ? parseExprAtom() : unexpected();
	      } else {
	        if (isBatch) unexpected();
	        node.source = null;
	      }
	      semicolon();
	    }
	    return finishNode(node, "ExportDeclaration");
	  }

	  // Parses a comma-separated list of module exports.

	  function parseExportSpecifiers() {
	    var nodes = [], first = true;
	    if (tokType === _star) {
	      // export * from '...'
	      var node = startNode();
	      next();
	      nodes.push(finishNode(node, "ExportBatchSpecifier"));
	    } else {
	      // export { x, y as z } [from '...']
	      expect(_braceL);
	      while (!eat(_braceR)) {
	        if (!first) {
	          expect(_comma);
	          if (options.allowTrailingCommas && eat(_braceR)) break;
	        } else first = false;

	        var node = startNode();
	        node.id = parseIdent(tokType === _default);
	        node.name = eatContextual("as") ? parseIdent(true) : null;
	        nodes.push(finishNode(node, "ExportSpecifier"));
	      }
	    }
	    return nodes;
	  }

	  // Parses import declaration.

	  function parseImport(node) {
	    next();
	    // import '...';
	    if (tokType === _string) {
	      node.specifiers = [];
	      node.source = parseExprAtom();
	      node.kind = "";
	    } else {
	      node.specifiers = parseImportSpecifiers();
	      expectContextual("from");
	      node.source = tokType === _string ? parseExprAtom() : unexpected();
	    }
	    semicolon();
	    return finishNode(node, "ImportDeclaration");
	  }

	  // Parses a comma-separated list of module imports.

	  function parseImportSpecifiers() {
	    var nodes = [], first = true;
	    if (tokType === _name) {
	      // import defaultObj, { x, y as z } from '...'
	      var node = startNode();
	      node.id = parseIdent();
	      checkLVal(node.id, true);
	      node.name = null;
	      node['default'] = true;
	      nodes.push(finishNode(node, "ImportSpecifier"));
	      if (!eat(_comma)) return nodes;
	    }
	    if (tokType === _star) {
	      var node = startNode();
	      next();
	      expectContextual("as");
	      node.name = parseIdent();
	      checkLVal(node.name, true);
	      nodes.push(finishNode(node, "ImportBatchSpecifier"));
	      return nodes;
	    }
	    expect(_braceL);
	    while (!eat(_braceR)) {
	      if (!first) {
	        expect(_comma);
	        if (options.allowTrailingCommas && eat(_braceR)) break;
	      } else first = false;

	      var node = startNode();
	      node.id = parseIdent(true);
	      node.name = eatContextual("as") ? parseIdent() : null;
	      checkLVal(node.name || node.id, true);
	      node['default'] = false;
	      nodes.push(finishNode(node, "ImportSpecifier"));
	    }
	    return nodes;
	  }

	  // Parses yield expression inside generator.

	  function parseYield() {
	    var node = startNode();
	    next();
	    if (eat(_semi) || canInsertSemicolon()) {
	      node.delegate = false;
	      node.argument = null;
	    } else {
	      node.delegate = eat(_star);
	      node.argument = parseMaybeAssign();
	    }
	    return finishNode(node, "YieldExpression");
	  }

	  // Parses array and generator comprehensions.

	  function parseComprehension(node, isGenerator) {
	    node.blocks = [];
	    while (tokType === _for) {
	      var block = startNode();
	      next();
	      expect(_parenL);
	      block.left = parseBindingAtom();
	      checkLVal(block.left, true);
	      expectContextual("of");
	      block.right = parseExpression();
	      expect(_parenR);
	      node.blocks.push(finishNode(block, "ComprehensionBlock"));
	    }
	    node.filter = eat(_if) ? parseParenExpression() : null;
	    node.body = parseExpression();
	    expect(isGenerator ? _parenR : _bracketR);
	    node.generator = isGenerator;
	    return finishNode(node, "ComprehensionExpression");
	  }
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Core.js 0.5.4
	 * https://github.com/zloirock/core-js
	 * License: http://rock.mit-license.org
	 * © 2015 Denis Pushkarev
	 */
	!function(global, framework, undefined){
	'use strict';

	/******************************************************************************
	 * Module : common                                                            *
	 ******************************************************************************/

	  // Shortcuts for [[Class]] & property names
	var OBJECT          = 'Object'
	  , FUNCTION        = 'Function'
	  , ARRAY           = 'Array'
	  , STRING          = 'String'
	  , NUMBER          = 'Number'
	  , REGEXP          = 'RegExp'
	  , DATE            = 'Date'
	  , MAP             = 'Map'
	  , SET             = 'Set'
	  , WEAKMAP         = 'WeakMap'
	  , WEAKSET         = 'WeakSet'
	  , SYMBOL          = 'Symbol'
	  , PROMISE         = 'Promise'
	  , MATH            = 'Math'
	  , ARGUMENTS       = 'Arguments'
	  , PROTOTYPE       = 'prototype'
	  , CONSTRUCTOR     = 'constructor'
	  , TO_STRING       = 'toString'
	  , TO_STRING_TAG   = TO_STRING + 'Tag'
	  , TO_LOCALE       = 'toLocaleString'
	  , HAS_OWN         = 'hasOwnProperty'
	  , FOR_EACH        = 'forEach'
	  , ITERATOR        = 'iterator'
	  , FF_ITERATOR     = '@@' + ITERATOR
	  , PROCESS         = 'process'
	  , CREATE_ELEMENT  = 'createElement'
	  // Aliases global objects and prototypes
	  , Function        = global[FUNCTION]
	  , Object          = global[OBJECT]
	  , Array           = global[ARRAY]
	  , String          = global[STRING]
	  , Number          = global[NUMBER]
	  , RegExp          = global[REGEXP]
	  , Date            = global[DATE]
	  , Map             = global[MAP]
	  , Set             = global[SET]
	  , WeakMap         = global[WEAKMAP]
	  , WeakSet         = global[WEAKSET]
	  , Symbol          = global[SYMBOL]
	  , Math            = global[MATH]
	  , TypeError       = global.TypeError
	  , RangeError      = global.RangeError
	  , setTimeout      = global.setTimeout
	  , setImmediate    = global.setImmediate
	  , clearImmediate  = global.clearImmediate
	  , parseInt        = global.parseInt
	  , isFinite        = global.isFinite
	  , process         = global[PROCESS]
	  , nextTick        = process && process.nextTick
	  , document        = global.document
	  , html            = document && document.documentElement
	  , navigator       = global.navigator
	  , define          = global.define
	  , ArrayProto      = Array[PROTOTYPE]
	  , ObjectProto     = Object[PROTOTYPE]
	  , FunctionProto   = Function[PROTOTYPE]
	  , Infinity        = 1 / 0
	  , DOT             = '.'
	  // Methods from https://github.com/DeveloperToolsWG/console-object/blob/master/api.md
	  , CONSOLE_METHODS = 'assert,clear,count,debug,dir,dirxml,error,exception,' +
	      'group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,' +
	      'markTimeline,profile,profileEnd,table,time,timeEnd,timeline,' +
	      'timelineEnd,timeStamp,trace,warn';

	// http://jsperf.com/core-js-isobject
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	// Native function?
	var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);

	// Object internal [[Class]] or toStringTag
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
	var toString = ObjectProto[TO_STRING];
	function setToStringTag(it, tag, stat){
	  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
	}
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	function classof(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[SYMBOL_TAG]) == 'string' ? T : cof(O);
	}

	// Function
	var call  = FunctionProto.call
	  , apply = FunctionProto.apply
	  , REFERENCE_GET;
	// Partial apply
	function part(/* ...args */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , args   = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , i = 0, j = 0, _args;
	    if(!holder && !_length)return invoke(fn, args, that);
	    _args = args.slice();
	    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
	    while(_length > j)_args.push(arguments[j++]);
	    return invoke(fn, _args, that);
	  }
	}
	// Optional / simple context binding
	function ctx(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    }
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    }
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    }
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	  }
	}
	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	function invoke(fn, args, that){
	  var un = that === undefined;
	  switch(args.length | 0){
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
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	}
	function construct(target, argumentsList /*, newTarget*/){
	  var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
	    , instance = create(isObject(proto) ? proto : ObjectProto)
	    , result   = apply.call(target, instance, argumentsList);
	  return isObject(result) ? result : instance;
	}

	// Object:
	var create           = Object.create
	  , getPrototypeOf   = Object.getPrototypeOf
	  , setPrototypeOf   = Object.setPrototypeOf
	  , defineProperty   = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , getOwnDescriptor = Object.getOwnPropertyDescriptor
	  , getKeys          = Object.keys
	  , getNames         = Object.getOwnPropertyNames
	  , getSymbols       = Object.getOwnPropertySymbols
	  , isFrozen         = Object.isFrozen
	  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
	  // Dummy, fix for not array-like ES3 string in es5 module
	  , ES5Object        = Object
	  , Dict;
	function toObject(it){
	  return ES5Object(assertDefined(it));
	}
	function returnIt(it){
	  return it;
	}
	function returnThis(){
	  return this;
	}
	function get(object, key){
	  if(has(object, key))return object[key];
	}
	function ownKeys(it){
	  assertObject(it);
	  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
	}
	// 19.1.2.1 Object.assign(target, source, ...)
	var assign = Object.assign || function(target, source){
	  var T = Object(assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	}
	function keyOf(object, el){
	  var O      = toObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	}

	// Array
	// array('str1,str2,str3') => ['str1', 'str2', 'str3']
	function array(it){
	  return String(it).split(',');
	}
	var push    = ArrayProto.push
	  , unshift = ArrayProto.unshift
	  , slice   = ArrayProto.slice
	  , splice  = ArrayProto.splice
	  , indexOf = ArrayProto.indexOf
	  , forEach = ArrayProto[FOR_EACH];
	/*
	 * 0 -> forEach
	 * 1 -> map
	 * 2 -> filter
	 * 3 -> some
	 * 4 -> every
	 * 5 -> find
	 * 6 -> findIndex
	 */
	function createArrayMethod(type){
	  var isMap       = type == 1
	    , isFilter    = type == 2
	    , isSome      = type == 3
	    , isEvery     = type == 4
	    , isFindIndex = type == 6
	    , noholes     = type == 5 || isFindIndex;
	  return function(callbackfn/*, that = undefined */){
	    var O      = Object(assertDefined(this))
	      , that   = arguments[1]
	      , self   = ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = isMap ? Array(length) : isFilter ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(noholes || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(type){
	        if(isMap)result[index] = res;             // map
	        else if(res)switch(type){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(isEvery)return false;           // every
	      }
	    }
	    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
	  }
	}
	function createArrayContains(isContains){
	  return function(el /*, fromIndex = 0 */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = toIndex(arguments[1], length);
	    if(isContains && el != el){
	      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
	    } else for(;length > index; index++)if(isContains || index in O){
	      if(O[index] === el)return isContains || index;
	    } return !isContains && -1;
	  }
	}
	function generic(A, B){
	  // strange IE quirks mode bug -> use typeof vs isFunction
	  return typeof A == 'function' ? A : B;
	}

	// Math
	var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
	  , pow    = Math.pow
	  , abs    = Math.abs
	  , ceil   = Math.ceil
	  , floor  = Math.floor
	  , max    = Math.max
	  , min    = Math.min
	  , random = Math.random
	  , trunc  = Math.trunc || function(it){
	      return (it > 0 ? floor : ceil)(it);
	    }
	// 20.1.2.4 Number.isNaN(number)
	function sameNaN(number){
	  return number != number;
	}
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it) ? 0 : trunc(it);
	}
	// 7.1.15 ToLength
	function toLength(it){
	  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
	}
	function toIndex(index, length){
	  var index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	}
	function lz(num){
	  return num > 9 ? num : '0' + num;
	}

	function createReplacer(regExp, replace, isStatic){
	  var replacer = isObject(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  }
	}
	function createPointAt(toString){
	  return function(pos){
	    var s = String(assertDefined(this))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return toString ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? toString ? s.charAt(i) : a
	      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  }
	}

	// Assertion & errors
	var REDUCE_ERROR = 'Reduce of empty object with no initial value';
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError('Function called on null or undefined');
	  return it;
	}
	function assertFunction(it){
	  assert(isFunction(it), it, ' is not a function!');
	  return it;
	}
	function assertObject(it){
	  assert(isObject(it), it, ' is not an object!');
	  return it;
	}
	function assertInstance(it, Constructor, name){
	  assert(it instanceof Constructor, name, ": use the 'new' operator!");
	}

	// Property descriptors & Symbol
	function descriptor(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  }
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return defineProperty(object, key, descriptor(bitmap, value));
	  } : simpleSet;
	}
	function uid(key){
	  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
	}
	function getWellKnownSymbol(name, setter){
	  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
	}
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	      try {
	        return defineProperty({}, 'a', {get: function(){ return 2 }}).a == 2;
	      } catch(e){}
	    }()
	  , sid    = 0
	  , hidden = createDefiner(1)
	  , set    = Symbol ? simpleSet : hidden
	  , safeSymbol = Symbol || uid;
	function assignHidden(target, src){
	  for(var key in src)hidden(target, key, src[key]);
	  return target;
	}

	var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
	  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
	  , SYMBOL_SPECIES     = getWellKnownSymbol('species');
	function setSpecies(C){
	  if(framework || !isNative(C))defineProperty(C, SYMBOL_SPECIES, {
	    configurable: true,
	    get: returnThis
	  });
	}

	// Iterators
	var SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR)
	  , SYMBOL_TAG      = getWellKnownSymbol(TO_STRING_TAG)
	  , SUPPORT_FF_ITER = FF_ITERATOR in ArrayProto
	  , ITER  = safeSymbol('iter')
	  , KEY   = 1
	  , VALUE = 2
	  , Iterators = {}
	  , IteratorPrototype = {}
	  , NATIVE_ITERATORS = SYMBOL_ITERATOR in ArrayProto
	    // Safari define byggy iterators w/o `next`
	  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, returnThis);
	function setIterator(O, value){
	  hidden(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  SUPPORT_FF_ITER && hidden(O, FF_ITERATOR, value);
	}
	function createIterator(Constructor, NAME, next, proto){
	  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	}
	function defineIterator(Constructor, NAME, value, DEFAULT){
	  var proto = Constructor[PROTOTYPE]
	    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
	  if(framework){
	    // Define iterator
	    setIterator(proto, iter);
	    if(iter !== value){
	      var iterProto = getPrototypeOf(iter.call(new Constructor));
	      // Set @@toStringTag to native iterators
	      setToStringTag(iterProto, NAME + ' Iterator', true);
	      // FF fix
	      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
	    }
	  }
	  // Plug for library
	  Iterators[NAME] = iter;
	  // FF & v8 fix
	  Iterators[NAME + ' Iterator'] = returnThis;
	  return iter;
	}
	function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
	  function createIter(kind){
	    return function(){
	      return new Constructor(this, kind);
	    }
	  }
	  createIterator(Constructor, NAME, next);
	  var entries = createIter(KEY+VALUE)
	    , values  = createIter(VALUE);
	  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
	  else entries = defineIterator(Base, NAME, entries, 'entries');
	  if(DEFAULT){
	    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
	      entries: entries,
	      keys: IS_SET ? values : createIter(KEY),
	      values: values
	    });
	  }
	}
	function iterResult(done, value){
	  return {value: value, done: !!done};
	}
	function isIterable(it){
	  var O      = Object(it)
	    , Symbol = global[SYMBOL]
	    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
	  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
	}
	function getIterator(it){
	  var Symbol  = global[SYMBOL]
	    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
	    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
	  return assertObject(getIter.call(it));
	}
	function stepCall(fn, value, entries){
	  return entries ? invoke(fn, value) : fn(value);
	}
	function forOf(iterable, entries, fn, that){
	  var iterator = getIterator(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false)return;
	}

	// core
	var NODE = cof(process) == PROCESS
	  , core = {}
	  , path = framework ? global : core
	  , old  = global.core
	  , exportGlobal
	  // type bitmap
	  , FORCED = 1
	  , GLOBAL = 2
	  , STATIC = 4
	  , PROTO  = 8
	  , BIND   = 16
	  , WRAP   = 32
	  , SIMPLE = 64;
	function $define(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & GLOBAL
	    , target   = isGlobal ? global : (type & STATIC)
	        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // there is a similar native
	    own = !(type & FORCED) && target && key in target
	      && (!isFunction(target[key]) || isNative(target[key]));
	    // export native or passed
	    out = (own ? target : source)[key];
	    // prevent global pollution for namespaces
	    if(!framework && isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & BIND && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & WRAP && !framework && target[key] == out){
	      exp = function(param){
	        return this instanceof out ? new out(param) : out(param);
	      }
	      exp[PROTOTYPE] = out[PROTOTYPE];
	    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
	    // extend global
	    if(framework && target && !own){
	      if(isGlobal || type & SIMPLE)target[key] = out;
	      else delete target[key] && hidden(target, key, out);
	    }
	    // export
	    if(exports[key] != out)hidden(exports, key, exp);
	  }
	}
	// CommonJS export
	if(typeof module != 'undefined' && module.exports)module.exports = core;
	// RequireJS export
	else if(isFunction(define) && define.amd)define(function(){return core});
	// Export to global object
	else exportGlobal = true;
	if(exportGlobal || framework){
	  core.noConflict = function(){
	    global.core = old;
	    return core;
	  }
	  global.core = core;
	}

	/******************************************************************************
	 * Module : es6.symbol                                                        *
	 ******************************************************************************/

	// ECMAScript 6 symbols shim
	!function(TAG, SymbolRegistry, AllSymbols, setter){
	  // 19.4.1.1 Symbol([description])
	  if(!isNative(Symbol)){
	    Symbol = function(description){
	      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
	      var tag = uid(description)
	        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
	      AllSymbols[tag] = sym;
	      DESC && setter && defineProperty(ObjectProto, tag, {
	        configurable: true,
	        set: function(value){
	          hidden(this, tag, value);
	        }
	      });
	      return sym;
	    }
	    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
	      return this[TAG];
	    });
	  }
	  $define(GLOBAL + WRAP, {Symbol: Symbol});
	  
	  var symbolStatics = {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function(key){
	      return has(SymbolRegistry, key += '')
	        ? SymbolRegistry[key]
	        : SymbolRegistry[key] = Symbol(key);
	    },
	    // 19.4.2.4 Symbol.iterator
	    iterator: SYMBOL_ITERATOR,
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: part.call(keyOf, SymbolRegistry),
	    // 19.4.2.10 Symbol.species
	    species: SYMBOL_SPECIES,
	    // 19.4.2.13 Symbol.toStringTag
	    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
	    // 19.4.2.14 Symbol.unscopables
	    unscopables: SYMBOL_UNSCOPABLES,
	    pure: safeSymbol,
	    set: set,
	    useSetter: function(){setter = true},
	    useSimple: function(){setter = false}
	  };
	  // 19.4.2.2 Symbol.hasInstance
	  // 19.4.2.3 Symbol.isConcatSpreadable
	  // 19.4.2.6 Symbol.match
	  // 19.4.2.8 Symbol.replace
	  // 19.4.2.9 Symbol.search
	  // 19.4.2.11 Symbol.split
	  // 19.4.2.12 Symbol.toPrimitive
	  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
	    function(it){
	      symbolStatics[it] = getWellKnownSymbol(it);
	    }
	  );
	  $define(STATIC, SYMBOL, symbolStatics);
	  
	  setToStringTag(Symbol, SYMBOL);
	  
	  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
	      return result;
	    },
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
	      return result;
	    }
	  });
	}(safeSymbol('tag'), {}, {}, true);

	/******************************************************************************
	 * Module : es6.object                                                        *
	 ******************************************************************************/

	!function(tmp){
	  var objectStatic = {
	    // 19.1.3.1 Object.assign(target, source)
	    assign: assign,
	    // 19.1.3.10 Object.is(value1, value2)
	    is: function(x, y){
	      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	    }
	  };
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  // Works with __proto__ only. Old v8 can't works with null proto objects.
	  '__proto__' in ObjectProto && function(buggy, set){
	    try {
	      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
	      set({}, ArrayProto);
	    } catch(e){ buggy = true }
	    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
	      assertObject(O);
	      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
	      if(buggy)O.__proto__ = proto;
	      else set(O, proto);
	      return O;
	    }
	  }();
	  $define(STATIC, OBJECT, objectStatic);
	  
	  if(framework){
	    // 19.1.3.6 Object.prototype.toString()
	    tmp[SYMBOL_TAG] = DOT;
	    if(cof(tmp) != DOT)hidden(ObjectProto, TO_STRING, function(){
	      return '[object ' + classof(this) + ']';
	    });
	  }
	  
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, MATH, true);
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	}({});

	/******************************************************************************
	 * Module : es6.object.statics-accept-primitives                              *
	 ******************************************************************************/

	!function(){
	  // Object static methods accept primitives
	  function wrapObjectMethod(key, MODE){
	    var fn  = Object[key]
	      , exp = core[OBJECT][key]
	      , f   = 0
	      , o   = {};
	    if(!exp || isNative(exp)){
	      o[key] = MODE == 1 ? function(it){
	        return isObject(it) ? fn(it) : it;
	      } : MODE == 2 ? function(it){
	        return isObject(it) ? fn(it) : true;
	      } : MODE == 3 ? function(it){
	        return isObject(it) ? fn(it) : false;
	      } : MODE == 4 ? function(it, key){
	        return fn(toObject(it), key);
	      } : function(it){
	        return fn(toObject(it));
	      };
	      try { fn(DOT) }
	      catch(e){ f = 1 }
	      $define(STATIC + FORCED * f, OBJECT, o);
	    }
	  }
	  wrapObjectMethod('freeze', 1);
	  wrapObjectMethod('seal', 1);
	  wrapObjectMethod('preventExtensions', 1);
	  wrapObjectMethod('isFrozen', 2);
	  wrapObjectMethod('isSealed', 2);
	  wrapObjectMethod('isExtensible', 3);
	  wrapObjectMethod('getOwnPropertyDescriptor', 4);
	  wrapObjectMethod('getPrototypeOf');
	  wrapObjectMethod('keys');
	  wrapObjectMethod('getOwnPropertyNames');
	}();

	/******************************************************************************
	 * Module : es6.function                                                      *
	 ******************************************************************************/

	!function(NAME){
	  // 19.2.4.2 name
	  NAME in FunctionProto || defineProperty(FunctionProto, NAME, {
	    configurable: true,
	    get: function(){
	      var match = String(this).match(/^\s*function ([^ (]*)/)
	        , name  = match ? match[1] : '';
	      has(this, NAME) || defineProperty(this, NAME, descriptor(5, name));
	      return name;
	    },
	    set: function(value){
	      has(this, NAME) || defineProperty(this, NAME, descriptor(0, value));
	    }
	  });
	}('name');

	/******************************************************************************
	 * Module : es6.number.constructor                                            *
	 ******************************************************************************/

	Number('0o1') && Number('0b1') || function(_Number, NumberProto){
	  function toNumber(it){
	    if(isObject(it))it = toPrimitive(it);
	    if(typeof it == 'string' && it.length > 2 && it.charCodeAt(0) == 48){
	      var binary = false;
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : binary = true;
	        case 79 : case 111 : return parseInt(it.slice(2), binary ? 2 : 8);
	      }
	    } return +it;
	  }
	  function toPrimitive(it){
	    var fn, val;
	    if(isFunction(fn = it.valueOf) && !isObject(val = fn.call(it)))return val;
	    if(isFunction(fn = it[TO_STRING]) && !isObject(val = fn.call(it)))return val;
	    throw TypeError("Can't convert object to number");
	  }
	  Number = function Number(it){
	    return this instanceof Number ? new _Number(toNumber(it)) : toNumber(it);
	  }
	  forEach.call(DESC ? getNames(_Number)
	  : array('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY'), function(key){
	    key in Number || defineProperty(Number, key, getOwnDescriptor(_Number, key));
	  });
	  Number[PROTOTYPE] = NumberProto;
	  NumberProto[CONSTRUCTOR] = Number;
	  hidden(global, NUMBER, Number);
	}(Number, Number[PROTOTYPE]);

	/******************************************************************************
	 * Module : es6.number                                                        *
	 ******************************************************************************/

	!function(isInteger){
	  $define(STATIC, NUMBER, {
	    // 20.1.2.1 Number.EPSILON
	    EPSILON: pow(2, -52),
	    // 20.1.2.2 Number.isFinite(number)
	    isFinite: function(it){
	      return typeof it == 'number' && isFinite(it);
	    },
	    // 20.1.2.3 Number.isInteger(number)
	    isInteger: isInteger,
	    // 20.1.2.4 Number.isNaN(number)
	    isNaN: sameNaN,
	    // 20.1.2.5 Number.isSafeInteger(number)
	    isSafeInteger: function(number){
	      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	    },
	    // 20.1.2.6 Number.MAX_SAFE_INTEGER
	    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	    // 20.1.2.10 Number.MIN_SAFE_INTEGER
	    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	    // 20.1.2.12 Number.parseFloat(string)
	    parseFloat: parseFloat,
	    // 20.1.2.13 Number.parseInt(string, radix)
	    parseInt: parseInt
	  });
	// 20.1.2.3 Number.isInteger(number)
	}(Number.isInteger || function(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	});

	/******************************************************************************
	 * Module : es6.math                                                          *
	 ******************************************************************************/

	// ECMAScript 6 shim
	!function(){
	  // 20.2.2.28 Math.sign(x)
	  var E    = Math.E
	    , exp  = Math.exp
	    , log  = Math.log
	    , sqrt = Math.sqrt
	    , sign = Math.sign || function(x){
	        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	      };
	  
	  // 20.2.2.5 Math.asinh(x)
	  function asinh(x){
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	  }
	  // 20.2.2.14 Math.expm1(x)
	  function expm1(x){
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	  }
	    
	  $define(STATIC, MATH, {
	    // 20.2.2.3 Math.acosh(x)
	    acosh: function(x){
	      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	    },
	    // 20.2.2.5 Math.asinh(x)
	    asinh: asinh,
	    // 20.2.2.7 Math.atanh(x)
	    atanh: function(x){
	      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	    },
	    // 20.2.2.9 Math.cbrt(x)
	    cbrt: function(x){
	      return sign(x = +x) * pow(abs(x), 1 / 3);
	    },
	    // 20.2.2.11 Math.clz32(x)
	    clz32: function(x){
	      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
	    },
	    // 20.2.2.12 Math.cosh(x)
	    cosh: function(x){
	      return (exp(x = +x) + exp(-x)) / 2;
	    },
	    // 20.2.2.14 Math.expm1(x)
	    expm1: expm1,
	    // 20.2.2.16 Math.fround(x)
	    // TODO: fallback for IE9-
	    fround: function(x){
	      return new Float32Array([x])[0];
	    },
	    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	    hypot: function(value1, value2){
	      var sum  = 0
	        , len1 = arguments.length
	        , len2 = len1
	        , args = Array(len1)
	        , larg = -Infinity
	        , arg;
	      while(len1--){
	        arg = args[len1] = +arguments[len1];
	        if(arg == Infinity || arg == -Infinity)return Infinity;
	        if(arg > larg)larg = arg;
	      }
	      larg = arg || 1;
	      while(len2--)sum += pow(args[len2] / larg, 2);
	      return larg * sqrt(sum);
	    },
	    // 20.2.2.18 Math.imul(x, y)
	    imul: function(x, y){
	      var UInt16 = 0xffff
	        , xn = +x
	        , yn = +y
	        , xl = UInt16 & xn
	        , yl = UInt16 & yn;
	      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	    },
	    // 20.2.2.20 Math.log1p(x)
	    log1p: function(x){
	      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	    },
	    // 20.2.2.21 Math.log10(x)
	    log10: function(x){
	      return log(x) / Math.LN10;
	    },
	    // 20.2.2.22 Math.log2(x)
	    log2: function(x){
	      return log(x) / Math.LN2;
	    },
	    // 20.2.2.28 Math.sign(x)
	    sign: sign,
	    // 20.2.2.30 Math.sinh(x)
	    sinh: function(x){
	      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	    },
	    // 20.2.2.33 Math.tanh(x)
	    tanh: function(x){
	      var a = expm1(x = +x)
	        , b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    },
	    // 20.2.2.34 Math.trunc(x)
	    trunc: trunc
	  });
	}();

	/******************************************************************************
	 * Module : es6.string                                                        *
	 ******************************************************************************/

	!function(fromCharCode){
	  function assertNotRegExp(it){
	    if(cof(it) == REGEXP)throw TypeError();
	  }
	  
	  $define(STATIC, STRING, {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function(x){
	      var res = []
	        , len = arguments.length
	        , i   = 0
	        , code
	      while(len > i){
	        code = +arguments[i++];
	        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000
	          ? fromCharCode(code)
	          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	        );
	      } return res.join('');
	    },
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function(callSite){
	      var raw = toObject(callSite.raw)
	        , len = toLength(raw.length)
	        , sln = arguments.length
	        , res = []
	        , i   = 0;
	      while(len > i){
	        res.push(String(raw[i++]));
	        if(i < sln)res.push(String(arguments[i]));
	      } return res.join('');
	    }
	  });
	  
	  $define(PROTO, STRING, {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: createPointAt(false),
	    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	    endsWith: function(searchString /*, endPosition = @length */){
	      assertNotRegExp(searchString);
	      var that = String(assertDefined(this))
	        , endPosition = arguments[1]
	        , len = toLength(that.length)
	        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
	      searchString += '';
	      return that.slice(end - searchString.length, end) === searchString;
	    },
	    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	    includes: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
	    },
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: function(count){
	      var str = String(assertDefined(this))
	        , res = ''
	        , n   = toInteger(count);
	      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
	      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	      return res;
	    },
	    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	    startsWith: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      var that  = String(assertDefined(this))
	        , index = toLength(min(arguments[1], that.length));
	      searchString += '';
	      return that.slice(index, index + searchString.length) === searchString;
	    }
	  });
	}(String.fromCharCode);

	/******************************************************************************
	 * Module : es6.array                                                         *
	 ******************************************************************************/

	!function(){
	  $define(STATIC, ARRAY, {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	      var O       = Object(assertDefined(arrayLike))
	        , mapfn   = arguments[1]
	        , mapping = mapfn !== undefined
	        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	        , index   = 0
	        , length, result, iter, step;
	      if(isIterable(O))for(iter = getIterator(O), result = new (generic(this, Array)); !(step = iter.next()).done; index++){
	        result[index] = mapping ? f(step.value, index) : step.value;
	      } else for(result = new (generic(this, Array))(length = toLength(O.length)); length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	      result.length = index;
	      return result;
	    },
	    // 22.1.2.3 Array.of( ...items)
	    of: function(/* ...args */){
	      var index  = 0
	        , length = arguments.length
	        , result = new (generic(this, Array))(length);
	      while(length > index)result[index] = arguments[index++];
	      result.length = length;
	      return result;
	    }
	  });
	  
	  $define(PROTO, ARRAY, {
	    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
	      var O     = Object(assertDefined(this))
	        , len   = toLength(O.length)
	        , to    = toIndex(target, len)
	        , from  = toIndex(start, len)
	        , end   = arguments[2]
	        , fin   = end === undefined ? len : toIndex(end, len)
	        , count = min(fin - from, len - to)
	        , inc   = 1;
	      if(from < to && to < from + count){
	        inc  = -1;
	        from = from + count - 1;
	        to   = to + count - 1;
	      }
	      while(count-- > 0){
	        if(from in O)O[to] = O[from];
	        else delete O[to];
	        to += inc;
	        from += inc;
	      } return O;
	    },
	    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	    fill: function(value /*, start = 0, end = @length */){
	      var O      = Object(assertDefined(this))
	        , length = toLength(O.length)
	        , index  = toIndex(arguments[1], length)
	        , end    = arguments[2]
	        , endPos = end === undefined ? length : toIndex(end, length);
	      while(endPos > index)O[index++] = value;
	      return O;
	    },
	    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	    find: createArrayMethod(5),
	    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	    findIndex: createArrayMethod(6)
	  });
	  
	  if(framework){
	    // 22.1.3.31 Array.prototype[@@unscopables]
	    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
	      ArrayUnscopables[it] = true;
	    });
	    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
	  }  
	  
	  setSpecies(Array);
	}();

	/******************************************************************************
	 * Module : es6.iterators                                                     *
	 ******************************************************************************/

	!function(at){
	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  defineStdIterators(Array, ARRAY, function(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , kind  = iter.k
	      , index = iter.i++;
	    if(!O || index >= O.length){
	      iter.o = undefined;
	      return iterResult(1);
	    }
	    if(kind == KEY)  return iterResult(0, index);
	    if(kind == VALUE)return iterResult(0, O[index]);
	                     return iterResult(0, [index, O[index]]);
	  }, VALUE);
	  
	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators[ARGUMENTS] = Iterators[ARRAY];
	  
	  // 21.1.3.27 String.prototype[@@iterator]()
	  defineStdIterators(String, STRING, function(iterated){
	    set(this, ITER, {o: String(iterated), i: 0});
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , index = iter.i
	      , point;
	    if(index >= O.length)return iterResult(1);
	    point = at.call(O, index);
	    iter.i += point.length;
	    return iterResult(0, point);
	  });
	}(createPointAt(true));

	/******************************************************************************
	 * Module : es6.regexp                                                        *
	 ******************************************************************************/

	!function(RegExpProto, _RegExp){
	  function assertRegExpWrapper(fn){
	    return function(){
	      assert(cof(this) === REGEXP);
	      return fn(this);
	    }
	  }
	  
	  // RegExp allows a regex with flags as the pattern
	  if(DESC && !function(){try{return RegExp(/a/g, 'i') == '/a/i'}catch(e){}}()){
	    RegExp = function RegExp(pattern, flags){
	      return new _RegExp(cof(pattern) == REGEXP && flags !== undefined
	        ? pattern.source : pattern, flags);
	    }
	    forEach.call(getNames(_RegExp), function(key){
	      key in RegExp || defineProperty(RegExp, key, {
	        configurable: true,
	        get: function(){ return _RegExp[key] },
	        set: function(it){ _RegExp[key] = it }
	      });
	    });
	    RegExpProto[CONSTRUCTOR] = RegExp;
	    RegExp[PROTOTYPE] = RegExpProto;
	    hidden(global, REGEXP, RegExp);
	  }
	  
	  // 21.2.5.3 get RegExp.prototype.flags()
	  if(/./g.flags != 'g')defineProperty(RegExpProto, 'flags', {
	    configurable: true,
	    get: assertRegExpWrapper(createReplacer(/^.*\/(\w*)$/, '$1', true))
	  });
	  
	  // 21.2.5.12 get RegExp.prototype.sticky()
	  // 21.2.5.15 get RegExp.prototype.unicode()
	  forEach.call(array('sticky,unicode'), function(key){
	    key in /./ || defineProperty(RegExpProto, key, DESC ? {
	      configurable: true,
	      get: assertRegExpWrapper(function(){
	        return false;
	      })
	    } : descriptor(5, false));
	  });
	  
	  setSpecies(RegExp);
	}(RegExp[PROTOTYPE], RegExp);

	/******************************************************************************
	 * Module : web.immediate                                                     *
	 ******************************************************************************/

	// setImmediate shim
	// Node.js 0.9+ & IE10+ has setImmediate, else:
	isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
	  var postMessage      = global.postMessage
	    , addEventListener = global.addEventListener
	    , MessageChannel   = global.MessageChannel
	    , counter          = 0
	    , queue            = {}
	    , defer, channel, port;
	  setImmediate = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    }
	    defer(counter);
	    return counter;
	  }
	  clearImmediate = function(id){
	    delete queue[id];
	  }
	  function run(id){
	    if(has(queue, id)){
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  }
	  function listner(event){
	    run(event.data);
	  }
	  // Node.js 0.8-
	  if(NODE){
	    defer = function(id){
	      nextTick(part.call(run, id));
	    }
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    }
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
	    defer = function(id){
	      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run(id);
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(run, 0, id);
	    }
	  }
	}('onreadystatechange');
	$define(GLOBAL + BIND, {
	  setImmediate:   setImmediate,
	  clearImmediate: clearImmediate
	});

	/******************************************************************************
	 * Module : es6.promise                                                       *
	 ******************************************************************************/

	// ES6 promises shim
	// Based on https://github.com/getify/native-promise-only/
	!function(Promise, test){
	  isFunction(Promise) && isFunction(Promise.resolve)
	  && Promise.resolve(test = new Promise(function(){})) == test
	  || function(asap, DEF){
	    function isThenable(o){
	      var then;
	      if(isObject(o))then = o.then;
	      return isFunction(then) ? then : false;
	    }
	    function notify(def){
	      var chain = def.chain;
	      chain.length && asap(function(){
	        var msg = def.msg
	          , ok  = def.state == 1
	          , i   = 0;
	        while(chain.length > i)!function(react){
	          var cb = ok ? react.ok : react.fail
	            , ret, then;
	          try {
	            if(cb){
	              ret = cb === true ? msg : cb(msg);
	              if(ret === react.P){
	                react.rej(TypeError(PROMISE + '-chain cycle'));
	              } else if(then = isThenable(ret)){
	                then.call(ret, react.res, react.rej);
	              } else react.res(ret);
	            } else react.rej(msg);
	          } catch(err){
	            react.rej(err);
	          }
	        }(chain[i++]);
	        chain.length = 0;
	      });
	    }
	    function resolve(msg){
	      var def = this
	        , then, wrapper;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      try {
	        if(then = isThenable(msg)){
	          wrapper = {def: def, done: false}; // wrap
	          then.call(msg, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
	        } else {
	          def.msg = msg;
	          def.state = 1;
	          notify(def);
	        }
	      } catch(err){
	        reject.call(wrapper || {def: def, done: false}, err); // wrap
	      }
	    }
	    function reject(msg){
	      var def = this;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      def.msg = msg;
	      def.state = 2;
	      notify(def);
	    }
	    function getConstructor(C){
	      var S = assertObject(C)[SYMBOL_SPECIES];
	      return S != undefined ? S : C;
	    }
	    // 25.4.3.1 Promise(executor)
	    Promise = function(executor){
	      assertFunction(executor);
	      assertInstance(this, Promise, PROMISE);
	      var def = {chain: [], state: 0, done: false, msg: undefined};
	      hidden(this, DEF, def);
	      try {
	        executor(ctx(resolve, def, 1), ctx(reject, def, 1));
	      } catch(err){
	        reject.call(def, err);
	      }
	    }
	    assignHidden(Promise[PROTOTYPE], {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function(onFulfilled, onRejected){
	        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
	        var react = {
	          ok:   isFunction(onFulfilled) ? onFulfilled : true,
	          fail: isFunction(onRejected)  ? onRejected  : false
	        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
	          react.res = assertFunction(resolve);
	          react.rej = assertFunction(reject);
	        }), def = this[DEF];
	        def.chain.push(react);
	        def.state && notify(def);
	        return P;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function(onRejected){
	        return this.then(undefined, onRejected);
	      }
	    });
	    assignHidden(Promise, {
	      // 25.4.4.1 Promise.all(iterable)
	      all: function(iterable){
	        var Promise = getConstructor(this)
	          , values  = [];
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, push, values);
	          var remaining = values.length
	            , results   = Array(remaining);
	          if(remaining)forEach.call(values, function(promise, index){
	            Promise.resolve(promise).then(function(value){
	              results[index] = value;
	              --remaining || resolve(results);
	            }, reject);
	          });
	          else resolve(results);
	        });
	      },
	      // 25.4.4.4 Promise.race(iterable)
	      race: function(iterable){
	        var Promise = getConstructor(this);
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, function(promise){
	            Promise.resolve(promise).then(resolve, reject);
	          });
	        });
	      },
	      // 25.4.4.5 Promise.reject(r)
	      reject: function(r){
	        return new (getConstructor(this))(function(resolve, reject){
	          reject(r);
	        });
	      },
	      // 25.4.4.6 Promise.resolve(x)
	      resolve: function(x){
	        return isObject(x) && DEF in x && getPrototypeOf(x) === this[PROTOTYPE]
	          ? x : new (getConstructor(this))(function(resolve, reject){
	            resolve(x);
	          });
	      }
	    });
	  }(nextTick || setImmediate, safeSymbol('def'));
	  setToStringTag(Promise, PROMISE);
	  setSpecies(Promise);
	  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
	}(global[PROMISE]);

	/******************************************************************************
	 * Module : es6.collections                                                   *
	 ******************************************************************************/

	// ECMAScript 6 collections shim
	!function(){
	  var UID   = safeSymbol('uid')
	    , O1    = safeSymbol('O1')
	    , WEAK  = safeSymbol('weak')
	    , LEAK  = safeSymbol('leak')
	    , LAST  = safeSymbol('last')
	    , FIRST = safeSymbol('first')
	    , SIZE  = DESC ? safeSymbol('size') : 'size'
	    , uid   = 0
	    , tmp   = {};
	  
	  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
	    var ADDER = isMap ? 'set' : 'add'
	      , proto = C && C[PROTOTYPE]
	      , O     = {};
	    function initFromIterable(that, iterable){
	      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
	      return that;
	    }
	    function fixSVZ(key, chain){
	      var method = proto[key];
	      if(framework)proto[key] = function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      };
	    }
	    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
	      // create collection constructor
	      C = isWeak
	        ? function(iterable){
	            assertInstance(this, C, NAME);
	            set(this, UID, uid++);
	            initFromIterable(this, iterable);
	          }
	        : function(iterable){
	            var that = this;
	            assertInstance(that, C, NAME);
	            set(that, O1, create(null));
	            set(that, SIZE, 0);
	            set(that, LAST, undefined);
	            set(that, FIRST, undefined);
	            initFromIterable(that, iterable);
	          };
	      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
	      isWeak || defineProperty(C[PROTOTYPE], 'size', {get: function(){
	        return assertDefined(this[SIZE]);
	      }});
	    } else {
	      var Native = C
	        , inst   = new C
	        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
	        , buggyZero;
	      // wrap to init collections from iterable
	      if(!NATIVE_ITERATORS || !C.length){
	        C = function(iterable){
	          assertInstance(this, C, NAME);
	          return initFromIterable(new Native, iterable);
	        }
	        C[PROTOTYPE] = proto;
	        if(framework)proto[CONSTRUCTOR] = C;
	      }
	      isWeak || inst[FOR_EACH](function(val, key){
	        buggyZero = 1 / key === -Infinity;
	      });
	      // fix converting -0 key to +0
	      if(buggyZero){
	        fixSVZ('delete');
	        fixSVZ('has');
	        isMap && fixSVZ('get');
	      }
	      // + fix .add & .set for chaining
	      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
	    }
	    setToStringTag(C, NAME);
	    setSpecies(C);
	    
	    O[NAME] = C;
	    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
	    
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        iter.o = undefined;
	        return iterResult(1);
	      }
	      // return step by kind
	      if(kind == KEY)  return iterResult(0, entry.k);
	      if(kind == VALUE)return iterResult(0, entry.v);
	                       return iterResult(0, [entry.k, entry.v]);   
	    }, isMap ? KEY+VALUE : VALUE, !isMap);
	    
	    return C;
	  }
	  
	  function fastKey(it, create){
	    // return primitive with prefix
	    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	    // can't set id to frozen object
	    if(isFrozen(it))return 'F';
	    if(!has(it, UID)){
	      // not necessary to add id
	      if(!create)return 'E';
	      // add missing object id
	      hidden(it, UID, ++uid);
	    // return object id with prefix
	    } return 'O' + it[UID];
	  }
	  function getEntry(that, key){
	    // fast case
	    var index = fastKey(key), entry;
	    if(index != 'F')return that[O1][index];
	    // frozen object case
	    for(entry = that[FIRST]; entry; entry = entry.n){
	      if(entry.k == key)return entry;
	    }
	  }
	  function def(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry)entry.v = value;
	    // create new entry
	    else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  }

	  var collectionMethods = {
	    // 23.1.3.1 Map.prototype.clear()
	    // 23.2.3.2 Set.prototype.clear()
	    clear: function(){
	      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	        entry.r = true;
	        if(entry.p)entry.p = entry.p.n = undefined;
	        delete data[entry.i];
	      }
	      that[FIRST] = that[LAST] = undefined;
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
	        delete that[O1][entry.i];
	        entry.r = true;
	        if(prev)prev.n = next;
	        if(next)next.p = prev;
	        if(that[FIRST] == entry)that[FIRST] = next;
	        if(that[LAST] == entry)that[LAST] = prev;
	        that[SIZE]--;
	      } return !!entry;
	    },
	    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	    forEach: function(callbackfn /*, that = undefined */){
	      var f = ctx(callbackfn, arguments[1], 3)
	        , entry;
	      while(entry = entry ? entry.n : this[FIRST]){
	        f(entry.v, entry.k, this);
	        // revert to the last existing entry
	        while(entry && entry.r)entry = entry.p;
	      }
	    },
	    // 23.1.3.7 Map.prototype.has(key)
	    // 23.2.3.7 Set.prototype.has(value)
	    has: function(key){
	      return !!getEntry(this, key);
	    }
	  }
	  
	  // 23.1 Map Objects
	  Map = getCollection(Map, MAP, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function(key){
	      var entry = getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function(key, value){
	      return def(this, key === 0 ? 0 : key, value);
	    }
	  }, collectionMethods, true);
	  
	  // 23.2 Set Objects
	  Set = getCollection(Set, SET, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function(value){
	      return def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, collectionMethods);
	  
	  function defWeak(that, key, value){
	    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
	    else {
	      has(key, WEAK) || hidden(key, WEAK, {});
	      key[WEAK][that[UID]] = value;
	    } return that;
	  }
	  function leakStore(that){
	    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
	  }
	  
	  var weakMethods = {
	    // 23.3.3.2 WeakMap.prototype.delete(key)
	    // 23.4.3.3 WeakSet.prototype.delete(value)
	    'delete': function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this)['delete'](key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
	    },
	    // 23.3.3.4 WeakMap.prototype.has(key)
	    // 23.4.3.4 WeakSet.prototype.has(value)
	    has: function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this).has(key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]);
	    }
	  };
	  
	  // 23.3 WeakMap Objects
	  WeakMap = getCollection(WeakMap, WEAKMAP, {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function(key){
	      if(isObject(key)){
	        if(isFrozen(key))return leakStore(this).get(key);
	        if(has(key, WEAK))return key[WEAK][this[UID]];
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function(key, value){
	      return defWeak(this, key, value);
	    }
	  }, weakMethods, true, true);
	  
	  // IE11 WeakMap frozen keys fix
	  if(framework && new WeakMap().set(Object.freeze(tmp), 7).get(tmp) != 7){
	    forEach.call(array('delete,has,get,set'), function(key){
	      var method = WeakMap[PROTOTYPE][key];
	      WeakMap[PROTOTYPE][key] = function(a, b){
	        // store frozen objects on leaky map
	        if(isObject(a) && isFrozen(a)){
	          var result = leakStore(this)[key](a, b);
	          return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	        } return method.call(this, a, b);
	      };
	    });
	  }
	  
	  // 23.4 WeakSet Objects
	  WeakSet = getCollection(WeakSet, WEAKSET, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function(value){
	      return defWeak(this, value, true);
	    }
	  }, weakMethods, false, true);
	}();

	/******************************************************************************
	 * Module : es6.reflect                                                       *
	 ******************************************************************************/

	!function(){
	  function Enumerate(iterated){
	    var keys = [], key;
	    for(key in iterated)keys.push(key);
	    set(this, ITER, {o: iterated, a: keys, i: 0});
	  }
	  createIterator(Enumerate, OBJECT, function(){
	    var iter = this[ITER]
	      , keys = iter.a
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!((key = keys[iter.i++]) in iter.o));
	    return iterResult(0, key);
	  });
	  
	  function wrap(fn){
	    return function(it){
	      assertObject(it);
	      try {
	        return fn.apply(undefined, arguments), true;
	      } catch(e){
	        return false;
	      }
	    }
	  }
	  
	  function reflectGet(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc)return has(desc, 'value')
	      ? desc.value
	      : desc.get === undefined
	        ? undefined
	        : desc.get.call(receiver);
	    return isObject(proto = getPrototypeOf(target))
	      ? reflectGet(proto, propertyKey, receiver)
	      : undefined;
	  }
	  function reflectSet(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , ownDesc  = getOwnDescriptor(assertObject(target), propertyKey)
	      , existingDescriptor, proto;
	    if(!ownDesc){
	      if(isObject(proto = getPrototypeOf(target))){
	        return reflectSet(proto, propertyKey, V, receiver);
	      }
	      ownDesc = descriptor(0);
	    }
	    if(has(ownDesc, 'value')){
	      if(ownDesc.writable === false || !isObject(receiver))return false;
	      existingDescriptor = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
	      existingDescriptor.value = V;
	      return defineProperty(receiver, propertyKey, existingDescriptor), true;
	    }
	    return ownDesc.set === undefined
	      ? false
	      : (ownDesc.set.call(receiver, V), true);
	  }
	  var isExtensible = Object.isExtensible || returnIt;
	  
	  var reflect = {
	    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	    apply: ctx(call, apply, 3),
	    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	    construct: construct,
	    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	    defineProperty: wrap(defineProperty),
	    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	    deleteProperty: function(target, propertyKey){
	      var desc = getOwnDescriptor(assertObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    },
	    // 26.1.5 Reflect.enumerate(target)
	    enumerate: function(target){
	      return new Enumerate(assertObject(target));
	    },
	    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	    get: reflectGet,
	    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	    getOwnPropertyDescriptor: function(target, propertyKey){
	      return getOwnDescriptor(assertObject(target), propertyKey);
	    },
	    // 26.1.8 Reflect.getPrototypeOf(target)
	    getPrototypeOf: function(target){
	      return getPrototypeOf(assertObject(target));
	    },
	    // 26.1.9 Reflect.has(target, propertyKey)
	    has: function(target, propertyKey){
	      return propertyKey in target;
	    },
	    // 26.1.10 Reflect.isExtensible(target)
	    isExtensible: function(target){
	      return !!isExtensible(assertObject(target));
	    },
	    // 26.1.11 Reflect.ownKeys(target)
	    ownKeys: ownKeys,
	    // 26.1.12 Reflect.preventExtensions(target)
	    preventExtensions: wrap(Object.preventExtensions || returnIt),
	    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	    set: reflectSet
	  }
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
	    return setPrototypeOf(assertObject(target), proto), true;
	  };
	  
	  $define(GLOBAL, {Reflect: {}});
	  $define(STATIC, 'Reflect', reflect);
	}();

	/******************************************************************************
	 * Module : es7.proposals                                                     *
	 ******************************************************************************/

	!function(){
	  $define(PROTO, ARRAY, {
	    // https://github.com/domenic/Array.prototype.includes
	    includes: createArrayContains(true)
	  });
	  $define(PROTO, STRING, {
	    // https://github.com/mathiasbynens/String.prototype.at
	    at: createPointAt(true)
	  });
	  
	  function createObjectToArray(isEntries){
	    return function(object){
	      var O      = toObject(object)
	        , keys   = getKeys(object)
	        , length = keys.length
	        , i      = 0
	        , result = Array(length)
	        , key;
	      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	      else while(length > i)result[i] = O[keys[i++]];
	      return result;
	    }
	  }
	  $define(STATIC, OBJECT, {
	    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
	    values: createObjectToArray(false),
	    entries: createObjectToArray(true)
	  });
	  $define(STATIC, REGEXP, {
	    // https://gist.github.com/kangax/9698100
	    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	  });
	}();

	/******************************************************************************
	 * Module : es7.abstract-refs                                                 *
	 ******************************************************************************/

	// https://github.com/zenparsing/es-abstract-refs
	!function(REFERENCE){
	  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
	  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
	    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
	  
	  $define(STATIC, SYMBOL, {
	    referenceGet: REFERENCE_GET,
	    referenceSet: REFERENCE_SET,
	    referenceDelete: REFERENCE_DELETE
	  });
	  
	  hidden(FunctionProto, REFERENCE_GET, returnThis);
	  
	  function setMapMethods(Constructor){
	    if(Constructor){
	      var MapProto = Constructor[PROTOTYPE];
	      hidden(MapProto, REFERENCE_GET, MapProto.get);
	      hidden(MapProto, REFERENCE_SET, MapProto.set);
	      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
	    }
	  }
	  setMapMethods(Map);
	  setMapMethods(WeakMap);
	}('reference');

	/******************************************************************************
	 * Module : js.array.statics                                                  *
	 ******************************************************************************/

	// JavaScript 1.6 / Strawman array statics shim
	!function(arrayStatics){
	  function setArrayStatics(keys, length){
	    forEach.call(array(keys), function(key){
	      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
	    });
	  }
	  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
	  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	                  'reduce,reduceRight,copyWithin,fill,turn');
	  $define(STATIC, ARRAY, arrayStatics);
	}({});

	/******************************************************************************
	 * Module : web.dom.itarable                                                  *
	 ******************************************************************************/

	!function(NodeList){
	  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
	    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
	  }
	  Iterators.NodeList = Iterators[ARRAY];
	}(global.NodeList);
	}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), true);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
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

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

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
	    return new Generator(innerFn, outerFn, self || null, tryLocsList || []);
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
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";

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
	    genFun.__proto__ = GeneratorFunctionPrototype;
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    return new Promise(function(resolve, reject) {
	      var generator = wrap(innerFn, outerFn, self, tryLocsList);
	      var callNext = step.bind(generator.next);
	      var callThrow = step.bind(generator["throw"]);

	      function step(arg) {
	        var record = tryCatch(this, null, arg);
	        if (record.type === "throw") {
	          reject(record.arg);
	          return;
	        }

	        var info = record.arg;
	        if (info.done) {
	          resolve(info.value);
	        } else {
	          Promise.resolve(info.value).then(callNext, callThrow);
	        }
	      }

	      callNext();
	    });
	  };

	  function Generator(innerFn, outerFn, self, tryLocsList) {
	    var generator = outerFn ? Object.create(outerFn.prototype) : this;
	    var context = new Context(tryLocsList);
	    var state = GenStateSuspendedStart;

	    function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;

	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          if (state === GenStateSuspendedStart &&
	              typeof arg !== "undefined") {
	            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	            throw new TypeError(
	              "attempt to send " + JSON.stringify(arg) + " to newborn generator"
	            );
	          }

	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            delete context.sent;
	          }

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;

	          if (method === "next") {
	            context.dispatchException(record.arg);
	          } else {
	            arg = record.arg;
	          }
	        }
	      }
	    }

	    generator.next = invoke.bind(generator, "next");
	    generator["throw"] = invoke.bind(generator, "throw");
	    generator["return"] = invoke.bind(generator, "return");

	    return generator;
	  }

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

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
	    this.reset();
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

	    reset: function() {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      // Pre-initialize at least 20 temporary variables to enable hidden
	      // class optimizations for simple generators.
	      for (var tempIndex = 0, tempName;
	           hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20;
	           ++tempIndex) {
	        this[tempName] = null;
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
	        return !!caught;
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

	    _findFinallyEntry: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") && (
	              entry.finallyLoc === finallyLoc ||
	              this.prev < entry.finallyLoc)) {
	          return entry;
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      var entry = this._findFinallyEntry();
	      var record = entry ? entry.completion : {};

	      record.type = type;
	      record.arg = arg;

	      if (entry) {
	        this.next = entry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      var entry = this._findFinallyEntry(finallyLoc);
	      return this.complete(entry.completion, entry.afterLoc);
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

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);