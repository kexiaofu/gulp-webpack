"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _carousel = _interopRequireDefault(require("./carousel"));

window.onload = function () {
  console.log(document.querySelector('.carousel-container'));
  var carousel = new _carousel.default({
    parent: 'carousel-container',
    images: ['../images/1.jpg', '../images/2.jpeg', '../images/3.jpeg']
  }); //carouselPlay();
};

var carouselPlay = function carouselPlay() {
  var eles = document.querySelectorAll('.carousel-item'),
      len = eles.length;
  var activeIndex = 1,
      prevIndex = 0;
  setInterval(function () {
    console.log(activeIndex, prevIndex);
    eles[activeIndex].style.visibility = 'visible';
    eles[prevIndex].style.visibility = 'visible';
    eles[activeIndex].style.transition = 'none';
    eles[activeIndex].style.transform = 'translateX(100%)';
    setTimeout(function () {
      eles[activeIndex].style.transition = 'transform 1s linear';
      eles[activeIndex].style.transform = 'translateX(0%)';
      eles[prevIndex].style.transform = 'translateX(-100%)';

      if (activeIndex++ >= len - 1) {
        activeIndex = 0;
      }

      if (activeIndex > 0) {
        prevIndex = activeIndex - 1;
      } else {
        prevIndex = len - 1;
      }
    }, 0);
  }, 2000);
};