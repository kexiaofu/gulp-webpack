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

var _mask = _interopRequireDefault(require("./mask"));

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    (0, _classCallCheck2.default)(this, Alert);
    this.alert = null;
    this.title = null;
    this.content = null;
    this.footer = null;
    this.mask = null;
  }

  (0, _createClass2.default)(Alert, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      var alert = document.createElement('div'),
          header = document.createElement('div'),
          content = document.createElement('div'),
          footer = document.createElement('div');
      alert.className = 'my-alert';
      header.className = 'my-alert-title';
      content.className = 'my-alert-content';
      footer.className = 'my-alert-footer';
      header.innerHTML = options.title;
      content.innerHTML = options.content;
      footer.innerHTML = options.btnText;
      options.hasOwnProperty('title') && alert.appendChild(header);
      alert.appendChild(content);
      alert.appendChild(footer);
      alert.style.minHeight = options.hasOwnProperty('title') ? '160px' : '120px';
      document.querySelector('body').appendChild(alert);
      footer.addEventListener('click', function () {
        _this.hide();
      });
      this.alert = alert;
      this.title = header;
      this.content = content;
      this.footer = footer;
      this.mask = new _mask.default();
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this2 = this;

      var option = Object.assign({
        content: '',
        btnText: '关闭'
      }, options);
      console.log(option);

      if (this.alert === null) {
        this.init(option);
        setTimeout(function () {
          _this2.mask.show();

          _this2.title.innerHTML = option.title;
          _this2.content.innerHTML = option.content;
          _this2.footer.innerHTML = option.btnText;
          _this2.alert.style.display = 'block';
          setTimeout(function () {
            _this2.alert.style.opacity = 1;
            _this2.alert.style.transform = 'translate(-50%,-50%) scale(1,1)';
          }, 0);
        }, 100);
      } else {
        this.mask.show();
        this.title.innerHTML = option.title;
        this.content.innerHTML = option.content;
        this.footer.innerHTML = option.btnText;
        this.alert.style.display = 'block';
        setTimeout(function () {
          _this2.alert.style.opacity = 1;
          _this2.alert.style.transform = ' translate(-50%,-50%) scale(1,1)';
        }, 0);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      if (this.alert && this.alert.style.display === 'block') {
        this.alert.style.transform = 'translate(-50%,-50%) scale(.7,.7)';
        this.alert.style.opacity = 0;
        this.mask.hide();
        setTimeout(function () {
          _this3.alert.style.display = 'none';
        }, 550);
      }
    }
  }]);
  return Alert;
}();

exports.default = Alert;
;
},{"./mask":8,"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}],5:[function(require,module,exports){
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
    value: function createImageItem(src, parent, w, h, index) {
      var carousel = document.createElement('div'),
          image = document.createElement('img');
      image.src = src;
      carousel.className = 'carousel-item';
      carousel.style.width = w + 'px';
      carousel.style.height = h + 'px';
      carousel.style.visibility = index !== 0 ? 'hidden' : 'visible';
      carousel.appendChild(image);
      parent.appendChild(carousel);
    }
  }]);
  return Carousel;
}();

var _default = Carousel;
exports.default = _default;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}],6:[function(require,module,exports){
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
},{"./mask":8,"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}],7:[function(require,module,exports){
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
},{"./alert":4,"./carousel":5,"./confirm":6,"./toast":9,"@babel/runtime/helpers/interopRequireDefault":3}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Mask =
/*#__PURE__*/
function () {
  function Mask() {
    (0, _classCallCheck2.default)(this, Mask);
    this.mask = null;
  }

  (0, _createClass2.default)(Mask, [{
    key: "init",
    value: function init() {
      var mask = document.createElement('div');
      mask.className = 'mask';
      document.querySelector('body').appendChild(mask);
      this.mask = mask;
    }
  }, {
    key: "show",
    value: function show() {
      var _this = this;

      if (this.mask !== null) {
        if (this.mask.style.display !== 'block') {
          this.mask.style.display = 'block';
          setTimeout(function () {
            _this.mask.style.opacity = 1;
          }, 0);
        }
      } else {
        this.init();
        setTimeout(function () {
          _this.mask.style.display = 'block';
          setTimeout(function () {
            _this.mask.style.opacity = 1;
          }, 0);
        }, 0);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.mask !== null) {
        if (this.mask.style.display !== 'none') {
          this.mask.style.opacity = 0;
          setTimeout(function () {
            _this2.mask.style.display = 'none';
          }, 550);
        }
      } else {
        this.init();
      }
    }
  }]);
  return Mask;
}();

exports.default = Mask;
;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Toast =
/*#__PURE__*/
function () {
  function Toast() {
    (0, _classCallCheck2.default)(this, Toast);
    this.toast = null;
    this.icon = null;
    this.content = null;
  }

  (0, _createClass2.default)(Toast, [{
    key: "init",
    value: function init(options) {
      var toast = document.createElement('div'),
          imgContain = document.createElement('div'),
          img = document.createElement('img'),
          content = document.createElement('div');
      toast.className = 'my-toast';
      imgContain.className = 'my-toast-icon-container';
      img.className = 'my-toast-icon';
      content.className = 'my-toast-content';
      img.src = options.icon;
      content.innerHTML = options.content;
      imgContain.appendChild(img);
      toast.appendChild(imgContain);
      toast.appendChild(content);
      document.querySelector('body').appendChild(toast);
      this.toast = toast;
      this.icon = img;
      this.content = content;
    }
  }, {
    key: "show",
    value: function show(options) {
      var _this = this;

      /*
      * type success/error/normal
      * */
      var option = Object.assign({
        type: 'success',
        icon: '../images/toast-succ.png',
        content: null,
        hideTime: 3000
      }, options);

      switch (option.type) {
        case 'success':
          option.icon = '../images/toast-succ.png';
          option.content === null && (option.content = '成功');
          break;

        case 'error':
          option.icon = '../images/toast-err.png';
          option.content === null && (option.content = '错误');
          break;

        default:
          option.icon = '../images/toast-normal.png';
          option.content === null && (option.content = '其他');
      }

      if (this.toast) {
        this.toast.style.display = 'block';
        setTimeout(function () {
          _this.toast.style.opacity = 1;
          setTimeout(function () {
            _this.hide();
          }, option.hideTime);
        }, 0);
      } else {
        this.init(option);
        setTimeout(function () {
          _this.toast.style.display = 'block';
          setTimeout(function () {
            _this.toast.style.opacity = 1;
            setTimeout(function () {
              _this.hide();
            }, option.hideTime);
          }, 0);
        }, 100);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      if (this.toast) {
        this.toast.style.opacity = 0;
        setTimeout(function () {
          _this2.toast.style.display = 'none';
        }, 500);
      }
    }
  }]);
  return Toast;
}();

exports.default = Toast;
;
},{"@babel/runtime/helpers/classCallCheck":1,"@babel/runtime/helpers/createClass":2,"@babel/runtime/helpers/interopRequireDefault":3}]},{},[7]);
