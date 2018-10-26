"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _carousel = _interopRequireDefault(require("./carousel"));

var _toast = _interopRequireDefault(require("./toast"));

var _alert = _interopRequireDefault(require("./alert"));

var _confirm = _interopRequireDefault(require("./confirm"));

window.onload = function () {
  console.log(document.querySelector('.carousel-container'));
  var carousel = new _carousel.default({
    autoPlay: true,
    parent: 'carousel-container',
    images: ['../images/1.jpg', '../images/2.jpeg', '../images/3.jpeg']
  });
  var confirm = new _confirm.default();
  var alert = new _alert.default();
  var toast = new _toast.default();
  setTimeout(function () {
    /*alert.show({
      content:'hello'
    });*/
    //toast.show();

    /*confirm.show({
      title:'he',
      content:'DDDD123',
      ok:()=>{
        console.log('ok')
      }
    });*/
  }, 1000);
};