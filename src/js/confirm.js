(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],2:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],3:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mask = _interopRequireDefault(require("./mask"));

var Confirm =
/*#__PURE__*/
function () {
  function Confirm() {
    (0, _classCallCheck2.default)(this, Confirm);
    this.confirm = null;
    this.title = null;
    this.content = null;
    this.ok = null;
    this.cancel = null;
    this.mask = null;
  }

  (0, _createClass2.default)(Confirm, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      var confirm = document.createElement('div'),
          header = document.createElement('div'),
          content = document.createElement('div'),
          footer = document.createElement('div'),
          ok = document.createElement('div'),
          cancel = document.createElement('div');
      confirm.className = 'my-confirm';
      header.className = 'my-confirm-title';
      content.className = 'my-confirm-content';
      footer.className = 'my-confirm-footer';
      ok.className = 'my-confirm-ok';
      cancel.className = 'my-confirm-cancel';
      header.innerHTML = options.title;
      content.innerHTML = options.content;
      ok.innerHTML = options.okText;
      cancel.innerHTML = options.cancelText;
      options.hasOwnProperty('title') && confirm.appendChild(header);
      confirm.appendChild(content);
      footer.appendChild(ok);
      footer.appendChild(cancel);
      confirm.appendChild(footer);
      confirm.style.minHeight = options.hasOwnProperty('title') ? '160px' : '120px';
      document.querySelector('body').appendChild(confirm);
      this.confirm = confirm;
      this.title = header;
      this.content = content;
      this.ok = ok;
      this.cancel = cancel;
      this.mask = new _mask.default();
      ok.addEventListener('click', function () {
        typeof options.ok === 'function' ? options.ok() : _this.hide();

        _this.hide();
      });
      cancel.addEventListener('click', function () {
        _this.hide();
      });
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this2 = this;

      var option = Object.assign({
        content: '请选择',
        okText: '好的',
        cancelText: '取消'
      }, options);

      if (this.confirm === null) {
        this.init(option);
        setTimeout(function () {
          _this2.mask.show();

          _this2.title.innerHTML = option.title;
          _this2.content.innerHTML = option.content;
          _this2.ok.innerHTML = option.okText;
          _this2.cancel.innerHTML = option.cancelText;
          _this2.confirm.style.display = 'block';
          setTimeout(function () {
            _this2.confirm.style.transform = 'translate(-50%,-50%) scale(1,1)';
            _this2.confirm.style.opacity = 1;
          }, 0);
        }, 100);
      } else {
        this.mask.show();
        this.title.innerHTML = option.title;
        this.content.innerHTML = option.content;
        this.ok.innerHTML = option.okText;
        this.cancel.innerHTML = option.cancelText;
        this.confirm.style.display = 'block';
        setTimeout(function () {
          _this2.confirm.style.transform = ' translate(-50%,-50%) scale(1,1)';
          _this2.confirm.style.opacity = 1;
        }, 0);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (this.confirm && this.confirm.style.display === 'block') {
        this.confirm.style.transform = 'translate(-50%,-50%) scale(.7,.7)';
        this.confirm.style.opacity = 0;
        this.mask.hide();
        setTimeout(function () {
          _this3.confirm.style.display = 'none';
        }, 550);
      }
    }
  }]);
  return Confirm;
}();

exports.default = Confirm;
},{"./mask":5,"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Mask =
/*#__PURE__*/
function () {
  function Mask() {
    (0, _classCallCheck2.default)(this, Mask);
    this.mask = null;
  }

  (0, _createClass2.default)(Mask, [{
    key: "init",
    value: function init() {
      var mask = document.createElement('div');
      mask.className = 'mask';
      document.querySelector('body').appendChild(mask);
      this.mask = mask;
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this.mask !== null) {
        if (this.mask.style.display !== 'block') {
          this.mask.style.display = 'block';
          setTimeout(function () {
            _this.mask.style.opacity = 1;
          }, 0);
        }
      } else {
        this.init();
        setTimeout(function () {
          _this.mask.style.display = 'block';
          setTimeout(function () {
            _this.mask.style.opacity = 1;
          }, 0);
        }, 0);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.mask !== null) {
        if (this.mask.style.display !== 'none') {
          this.mask.style.opacity = 0;
          setTimeout(function () {
            _this2.mask.style.display = 'none';
          }, 550);
        }
      } else {
        this.init();
      }
    }
  }]);
  return Mask;
}();

exports.default = Mask;
;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[4]);
