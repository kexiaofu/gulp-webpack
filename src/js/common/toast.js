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

var Toast =
/*#__PURE__*/
function () {
  function Toast() {
    (0, _classCallCheck2.default)(this, Toast);
    this.toast = null;
    this.icon = null;
    this.content = null;
  }

  (0, _createClass2.default)(Toast, [{
    key: "init",
    value: function init(options) {
      var toast = document.createElement('div'),
          imgContain = document.createElement('div'),
          img = document.createElement('img'),
          content = document.createElement('div');
      toast.className = 'my-toast';
      imgContain.className = 'my-toast-icon-container';
      img.className = 'my-toast-icon';
      content.className = 'my-toast-content';
      img.src = options.icon;
      content.innerHTML = options.content;
      imgContain.appendChild(img);
      toast.appendChild(imgContain);
      toast.appendChild(content);
      document.querySelector('body').appendChild(toast);
      this.toast = toast;
      this.icon = img;
      this.content = content;
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this = this;

      /*
      * type success/error/normal
      * */
      var option = Object.assign({
        type: 'success',
        icon: '../images/toast-succ.png',
        content: null,
        hideTime: 3000
      }, options);

      switch (option.type) {
        case 'success':
          option.icon = '../images/toast-succ.png';
          option.content === null && (option.content = '成功');
          break;

        case 'error':
          option.icon = '../images/toast-err.png';
          option.content === null && (option.content = '错误');
          break;

        default:
          option.icon = '../images/toast-normal.png';
          option.content === null && (option.content = '其他');
      }

      if (this.toast) {
        this.toast.style.display = 'block';
        setTimeout(function () {
          _this.toast.style.opacity = 1;
          setTimeout(function () {
            _this.hide();
          }, option.hideTime);
        }, 0);
      } else {
        this.init(option);
        setTimeout(function () {
          _this.toast.style.display = 'block';
          setTimeout(function () {
            _this.toast.style.opacity = 1;
            setTimeout(function () {
              _this.hide();
            }, option.hideTime);
          }, 0);
        }, 100);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.toast) {
        this.toast.style.opacity = 0;
        setTimeout(function () {
          _this2.toast.style.display = 'none';
        }, 500);
      }
    }
  }]);
  return Toast;
}();

exports.default = Toast;
;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[4]);
