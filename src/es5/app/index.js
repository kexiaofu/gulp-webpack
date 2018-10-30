"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _carousel = _interopRequireDefault(require("../common/carousel"));

var _mask = _interopRequireDefault(require("../common/mask"));

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template.js"));

var _encrypt = _interopRequireDefault(require("../common/encrypt"));

//import Toast from '../common/toast';
//import Alert from '../common/alert';
//import Confirm from '../common/confirm';
window.onload = function () {
  var mask = new _mask.default();
  window.addEventListener('show-search-box', function () {
    console.log('show-search-box');
    mask.show();
  });
  window.addEventListener('hide-search-box', function () {
    console.log('hide-search-box');
    mask.hide();
  });
  console.log((0, _encrypt.default)('1qaz2wsx'));
  (0, _api.getCarousel)().then(function (res) {
    var carousel = new _carousel.default({
      autoPlay: false,
      parent: 'carousel-container',
      images: res
    });
  });
  (0, _api.getProductionList)().then(function (res) {
    var html = (0, _template.default)('production-list', {
      data: res
    });
    document.querySelector('.production-list').innerHTML = html;
  });
};