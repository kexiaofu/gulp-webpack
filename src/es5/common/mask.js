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