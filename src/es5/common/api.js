"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductionList = exports.getCarousel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var period = 60000;

var apiRequire =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(name, url) {
    var storageTime;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storageTime = new Date().getTime();

            if (!(window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name + '-time') < period)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", JSON.parse(window.sessionStorage.getItem(name)));

          case 5:
            console.log("require ".concat(name, " again"));
            _context.next = 8;
            return _axios.default.get(url).then(function (res) {
              if (res.data.code === 2000) {
                window.sessionStorage.setItem(name, JSON.stringify(res.data.result));
                window.sessionStorage.setItem(name + '-time', storageTime);
                return res.data.result;
              } else {
                alert(res.data.msg);
              }
            }).catch(function (err) {
              alert(err);
            });

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function apiRequire(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCarousel =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiRequire('getCarousel', '/api/Config/GetCarousel');

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getCarousel() {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCarousel = getCarousel;

var getProductionList =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return apiRequire('getProductionList', '/api/Config/GetHomeProduct');

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getProductionList() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getProductionList = getProductionList;