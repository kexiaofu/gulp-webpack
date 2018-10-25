"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _carousel = _interopRequireDefault(require("./carousel"));

var _alert = _interopRequireDefault(require("./alert"));

var _confirm = _interopRequireDefault(require("./confirm"));

window.onload = function () {
  console.log(document.querySelector('.carousel-container'));
  var carousel = new _carousel.default({
    navigation: false,
    direction: false,
    autoPlay: true,
    parent: 'carousel-container',
    images: ['../images/1.jpg', '../images/2.jpeg', '../images/3.jpeg']
  });
  var confirm = new _confirm.default();
  setTimeout(function () {
    confirm.show({
      title: 'he',
      content: 'DDDD123',
      ok: function ok() {
        console.log('ok');
      }
    });
  }, 1000);
};