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