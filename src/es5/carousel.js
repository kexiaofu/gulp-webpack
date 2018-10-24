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
      playTime: 3000
    }, options)));
    this.data = {
      parentWidth: 0,
      container: null,
      activeIndex: 1
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
        console.log(document.querySelector(".".concat(options.parent)).offsetWidth, options);
        var parent = document.querySelector(".".concat(options.parent)),
            images = options.images;
        var container = document.createElement('div'),
            pointContainer = document.createElement('ul');
        container.className = 'carousel';
        pointContainer.className = 'point-container';
        container.style.width = parent.offsetWidth + 'px';
        this.data.container = container;
        parent.appendChild(container);
        parent.appendChild(pointContainer);

        for (var i = 0, l = images.length; i < l; i++) {
          this.createImageItem(images[i], container, parent.offsetWidth, i);
        }

        this.createPoint(images.length, pointContainer);
        pointContainer.addEventListener('click', function (e) {
          _this.getPoint(e);
        }); //this.carouselPlay();
        //options.container.style.width = options.images.length * options.width + 'px'
      }
    }
  }, {
    key: "carouselPlay",
    value: function carouselPlay(index) {
      var options = this.options,
          playTime = options.playTime,
          activeIndex = index ? index : this.data.activeIndex,
          len = options.images.length,
          eles = document.querySelectorAll('.carousel-item');
      console.log(options.images, options.images.length);
      var prevIndex = 0;
      this.data.playStop = setInterval(function () {
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
      }, playTime);
    }
  }, {
    key: "getPoint",
    value: function getPoint(e) {
      console.log(e.target, 'index');

      if (e.target.className === 'point') {
        var index = e.target.getAttribute('data-point'),
            eles = document.querySelectorAll('.carousel-item'),
            prevIndex = 0;

        if (index > 0) {
          prevIndex = index - 1;
        } else {
          prevIndex = eles.length - 1;
        }

        this.toThisCarousel(eles, index, prevIndex);
      }
    }
  }, {
    key: "toThisCarousel",
    value: function toThisCarousel(eles, index, prevIndex) {
      eles[index].style.visibility = 'visible';
      eles[prevIndex].style.visibility = 'visible';
      eles[index].style.transition = 'none';
      eles[index].style.transform = 'translateX(100%)';
      setTimeout(function () {
        eles[index].style.transition = 'transform 1s linear';
        eles[index].style.transform = 'translateX(0%)';
        eles[prevIndex].style.transform = 'translateX(-100%)';
      }, 0);
    }
  }, {
    key: "createPoint",
    value: function createPoint(count, parent) {
      for (var i = 0; i < count; i++) {
        var point = document.createElement('li');
        point.className = 'point';
        i === 0 && (point.className = 'point active');
        point.setAttribute('data-point', i);
        parent.appendChild(point);
      }
    }
  }, {
    key: "createImageItem",
    value: function createImageItem(src, parent, w, index) {
      var carousel = document.createElement('div'),
          image = document.createElement('img');
      image.src = src;
      carousel.className = 'carousel-item';
      carousel.style.width = w + 'px';
      carousel.style.visibility = index !== 0 ? 'hidden' : 'visible';
      carousel.appendChild(image);
      parent.appendChild(carousel);
    }
  }]);
  return Carousel;
}();

var _default = Carousel;
exports.default = _default;