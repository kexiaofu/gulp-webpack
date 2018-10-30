(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],2:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],3:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Carousel =
/*#__PURE__*/
function () {
  function Carousel(options) {
    (0, _classCallCheck2.default)(this, Carousel);
    //super(props);
    this.options = JSON.parse(JSON.stringify(Object.assign({}, {
      playTime: 3000,
      direction: true,
      navigation: true
    }, options)));
    this.data = {
      parentWidth: 0,
      container: null,
      activeIndex: 0,
      playStop: null
    };
    this.init();
  }

  (0, _createClass2.default)(Carousel, [{
    key: "init",
    value: function init() {
      var _this = this;

      var options = this.options;

      if (options.images.length < 0) {
        alert('轮播图图片没有上传');
      } else {
        //console.log(document.querySelector(`.${options.parent}`).offsetWidth,options);
        var parent = document.querySelector(".".concat(options.parent)),
            images = options.images;
        var container = document.createElement('div');
        container.className = 'carousel';
        container.style.width = parent.offsetWidth + 'px';
        container.style.height = parent.offsetHeight + 'px';
        this.data.container = container;
        parent.appendChild(container);

        for (var i = 0, l = images.length; i < l; i++) {
          this.createImageItem(images[i], container, parent.offsetWidth, parent.offsetHeight, i);
        }

        if (options.navigation) {
          var pointContainer = document.createElement('ul');
          pointContainer.className = 'point-container';
          parent.appendChild(pointContainer);
          this.createPoint(images.length, pointContainer);
          pointContainer.addEventListener('click', function (e) {
            _this.getPoint(e);
          });
        }

        if (options.direction) {
          this.createDirectionIcon(parent);
        }

        if (options.autoPlay) {
          this.carouselPlay();
        }

        window.addEventListener('resize', function () {
          var carousel = document.querySelectorAll('.carousel-item'),
              parentW = document.querySelector(".".concat(options.parent)).offsetWidth;

          for (var _i = carousel.length - 1; _i >= 0; _i--) {
            carousel[_i].style.width = parentW + 'px';
          }
        }); //options.container.style.width = options.images.length * options.width + 'px'
      }
    }
  }, {
    key: "carouselPlay",
    value: function carouselPlay() {
      var _this2 = this;

      var options = this.options,
          playTime = options.playTime,
          activeIndex = this.data.activeIndex,
          len = options.images.length,
          eles = document.querySelectorAll('.carousel-item'); //console.log(options.images,options.images.length);

      var prevIndex = 0; //activeIndex++;

      clearInterval(this.data.playStop);
      this.data.playStop = setInterval(function () {
        if (activeIndex++ >= len - 1) {
          activeIndex = 0;
        }

        if (activeIndex > 0) {
          prevIndex = activeIndex - 1;
        } else {
          prevIndex = len - 1;
        }

        _this2.toThisCarousel(eles, activeIndex, prevIndex, 1, false);
      }, playTime);
    }
  }, {
    key: "getPoint",
    value: function getPoint(e) {
      if (e.target.className.indexOf('point') > -1) {
        var index = e.target.getAttribute('data-point'),
            eles = document.querySelectorAll('.carousel-item'); //console.log(index,this.data.activeIndex);

        clearInterval(this.data.playStop);
        this.toThisCarousel(eles, index - 0, this.data.activeIndex, null, true);
      }
    }
  }, {
    key: "toThisCarousel",
    value: function toThisCarousel(eles, index, prevIndex, hadDirection, start) {
      var _this3 = this;

      //console.log(index , prevIndex,index === prevIndex);
      if (index === prevIndex) {
        return;
      }

      eles[index].style.visibility = 'visible';
      eles[prevIndex].style.visibility = 'visible';
      var direction = hadDirection !== null ? hadDirection : index > prevIndex ? 1 : -1;
      eles[index].style.transition = 'none';
      eles[index].style.transform = "translateX(".concat(direction * 100, "%)");
      setTimeout(function () {
        eles[index].style.transition = 'transform .3s linear';
        eles[index].style.transform = 'translateX(0%)';
        eles[prevIndex].style.transform = "translateX(".concat(-direction * 100, "%)");
        _this3.data.activeIndex = index;

        if (_this3.options.navigation) {
          var prevPoint = document.querySelector(".active-point");
          prevPoint.className = prevPoint.className.replace('active-point', '');
          document.querySelector(".point".concat(index)).className = "point point".concat(index, " active-point");
        }

        if (_this3.options.autoPlay && start) {
          _this3.carouselPlay();
        }
      }, 0);
    }
  }, {
    key: "createDirectionIcon",
    value: function createDirectionIcon(parent) {
      var _this4 = this;

      var leftIcon = document.createElement('div'),
          limg = document.createElement('img'),
          rightIcon = document.createElement('div'),
          rimg = document.createElement('img');
      limg.src = '../images/left-icon.png';
      rimg.src = '../images/left-icon.png';
      leftIcon.className = 'left-icon';
      rightIcon.className = 'right-icon';
      leftIcon.appendChild(limg);
      rightIcon.appendChild(rimg);
      parent.appendChild(leftIcon);
      parent.appendChild(rightIcon);
      leftIcon.addEventListener('click', function (e) {
        var eles = document.querySelectorAll('.carousel-item'),
            activeIndex = _this4.data.activeIndex,
            prevIndex = activeIndex;

        if (activeIndex - 1 >= 0) {
          activeIndex = activeIndex - 1;
        } else {
          activeIndex = eles.length - 1;
        }

        clearInterval(_this4.data.playStop);

        _this4.toThisCarousel(eles, activeIndex, prevIndex, -1, true);
      });
      rightIcon.addEventListener('click', function (e) {
        var eles = document.querySelectorAll('.carousel-item'),
            activeIndex = _this4.data.activeIndex,
            prevIndex = activeIndex;

        if (activeIndex + 1 < eles.length) {
          activeIndex = activeIndex + 1;
        } else {
          activeIndex = 0;
        }

        clearInterval(_this4.data.playStop);

        _this4.toThisCarousel(eles, activeIndex, prevIndex, 1, true);
      });
    }
  }, {
    key: "createPoint",
    value: function createPoint(count, parent) {
      for (var i = 0; i < count; i++) {
        var point = document.createElement('li');
        point.className = "point point".concat(i);
        i === 0 && (point.className = 'point point0 active-point');
        point.setAttribute('data-point', i);
        parent.appendChild(point);
      }
    }
  }, {
    key: "createImageItem",
    value: function createImageItem(img, parent, w, h, index) {
      var carousel = document.createElement('div'),
          a = document.createElement('a'),
          image = document.createElement('img');
      image.src = img.imageUrl;
      a.href = img.linkUrl;
      carousel.className = 'carousel-item';
      carousel.style.width = w + 'px';
      carousel.style.height = h + 'px';
      carousel.style.visibility = index !== 0 ? 'hidden' : 'visible';
      a.appendChild(image);
      carousel.appendChild(a);
      parent.appendChild(carousel);
    }
  }]);
  return Carousel;
}();

var _default = Carousel;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[4]);
