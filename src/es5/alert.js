"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mask = _interopRequireDefault(require("./mask"));

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    (0, _classCallCheck2.default)(this, Alert);
    this.alert = null;
    this.title = null;
    this.content = null;
    this.footer = null;
    this.mask = null;
  }

  (0, _createClass2.default)(Alert, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      var alert = document.createElement('div'),
          header = document.createElement('div'),
          content = document.createElement('div'),
          footer = document.createElement('div');
      alert.className = 'my-alert';
      header.className = 'my-alert-title';
      content.className = 'my-alert-content';
      footer.className = 'my-alert-footer';
      header.innerHTML = options.title;
      content.innerHTML = options.content;
      footer.innerHTML = options.btnText;
      alert.appendChild(header);
      alert.appendChild(content);
      alert.appendChild(footer);
      document.querySelector('body').appendChild(alert);
      footer.addEventListener('click', function () {
        _this.hide();
      });
      this.alert = alert;
      this.title = header;
      this.content = content;
      this.footer = footer;
      this.mask = new _mask.default();
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this2 = this;

      var option = Object.assign({
        title: '提示',
        content: '',
        btnText: '关闭'
      }, options);
      console.log(option);

      if (this.alert === null) {
        this.init(option);
        setTimeout(function () {
          _this2.mask.show();

          _this2.title.innerHTML = option.title;
          _this2.content.innerHTML = option.content;
          _this2.footer.innerHTML = option.btnText;
          _this2.alert.style.display = 'block';
          setTimeout(function () {
            _this2.alert.style.transform = 'translate(-50%,-50%) scale(1,1)';
          }, 0);
        }, 100);
      } else {
        this.mask.show();
        this.title.innerHTML = option.title;
        this.content.innerHTML = option.content;
        this.footer.innerHTML = option.btnText;
        this.alert.style.display = 'block';
        setTimeout(function () {
          _this2.alert.style.transform = ' translate(-50%,-50%) scale(1,1)';
        }, 0);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (this.alert) {
        this.alert.style.transform = 'translate(-50%,-50%) scale(0,0)';
        this.mask.hide();
        setTimeout(function () {
          _this3.alert.style.display = 'none';
        }, 550);
      }
    }
  }]);
  return Alert;
}();

exports.default = Alert;
;