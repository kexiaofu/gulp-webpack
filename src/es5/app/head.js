"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mask = _interopRequireDefault(require("../common/mask"));

var _encrypt = _interopRequireDefault(require("../common/encrypt"));

var _api = require("../common/api");

console.log(document.querySelector('.to-search'));
var mask = new _mask.default();

var dispatchSomrthing = function dispatchSomrthing(bool) {
  if (bool) {
    mask.show();
  } else {
    mask.hide();
  }
};

var toSearch = function toSearch() {
  var searchInput = document.querySelector('.search-input'),
      toSearch = document.querySelector('.to-search'),
      close = document.querySelector('.icon-close');
  toSearch.style.display = 'none';
  searchInput.style.display = 'block';
  close.style.display = 'block';
  searchInput.focus();
  dispatchSomrthing(true);
};

var toClose = function toClose() {
  var searchInput = document.querySelector('.search-input'),
      toSearch = document.querySelector('.to-search'),
      close = document.querySelector('.icon-close');
  toSearch.style.display = 'block';
  searchInput.style.display = 'none';
  close.style.display = 'none';
  dispatchSomrthing(false);
};

var toShowLoginBox = function toShowLoginBox() {
  var login = document.querySelector('.login');
  login.style.transform = 'translate(-50%,-50%) scale(1)';
  login.style.opacity = 1;
  dispatchSomrthing(true);
};

var toCloseLoginBox = function toCloseLoginBox() {
  var login = document.querySelector('.login');
  login.style.transform = 'translate(-50%,-50%) scale(.5)';
  login.style.opacity = 0;
  dispatchSomrthing(false);
};

var toSumbitLoginData = function toSumbitLoginData() {
  var name = document.querySelector('#account'),
      psw = document.querySelector('#password');

  if (name.value !== '' && psw.value !== '') {
    (0, _api.toLogin)({
      account: name.value,
      password: (0, _encrypt.default)(psw.value)
    }).then(function (res) {
      console.log(res);
    });
  }

  console.log(name.value);
};

document.querySelector('.to-search').addEventListener('click', toSearch);
document.querySelector('.icon-close').addEventListener('click', toClose);
document.querySelector('.to-login').addEventListener('click', toShowLoginBox);
document.querySelector('.close-login-box').addEventListener('click', toCloseLoginBox);
document.querySelector('.submit').addEventListener('click', toSumbitLoginData);