"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductDetail = exports.getProductClassify = exports.getAllProductList = exports.toLogin = exports.getProductionList = exports.getCarousel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var period = 60000;

var apiRequire =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(name, url, method, data) {
    var storage,
        storageTime,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storage = _args.length > 4 && _args[4] !== undefined ? _args[4] : true;
            storageTime = new Date().getTime();

            if (!(storage && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name + '-time') < period)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", JSON.parse(window.sessionStorage.getItem(name)));

          case 6:
            console.log("require ".concat(name, " again"));

            if (!(method === undefined || method === null)) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return _axios.default.get(url, {
              params: data
            }).then(function (res) {
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

          case 10:
            return _context.abrupt("return", _context.sent);

          case 13:
            _context.next = 15;
            return _axios.default.post(url, data).then(function (res) {
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

          case 15:
            return _context.abrupt("return", _context.sent);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function apiRequire(_x, _x2, _x3, _x4) {
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

var toLogin =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(account) {
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return apiRequire('account', '/api/account/login', null, account);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function toLogin(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.toLogin = toLogin;

var getAllProductList =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(data) {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(data);

            if (!(data && data.hasOwnProperty('name'))) {
              _context5.next = 7;
              break;
            }

            _context5.next = 4;
            return apiRequire('getAllProductList', '/api/Product/SearchProduct', null, data, false);

          case 4:
            return _context5.abrupt("return", _context5.sent);

          case 7:
            _context5.next = 9;
            return apiRequire('getAllProductList', '/api/Product/getproductList', null, data, false);

          case 9:
            return _context5.abrupt("return", _context5.sent);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getAllProductList(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllProductList = getAllProductList;

var getProductClassify =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee6() {
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return apiRequire('getProductClassify', '/api/Product/GetGroup', null);

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getProductClassify() {
    return _ref6.apply(this, arguments);
  };
}();

exports.getProductClassify = getProductClassify;

var getProductDetail =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee7(data) {
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return apiRequire('getProductDetail', '/api/Product/GetProductDetail', null, data, false);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getProductDetail(_x7) {
    return _ref7.apply(this, arguments);
  };
}(); //getProductClassify,api/Product/GetProductDetail?id=


exports.getProductDetail = getProductDetail;