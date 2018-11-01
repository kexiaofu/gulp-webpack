"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template"));

var scrollX = function scrollX(direct, w, parent) {
  console.log(direct, w, parent);
  parent.style.left = parent.offsetLeft + direct * (w + 5) + 'px';
};

window.onload = function () {
  var id = (0, _tools.getParameter)('productId');

  if (id === null) {
    return alert('没有该产品');
  } //取得產品信息


  (0, _api.getProductDetail)({
    id: id
  }).then(function (res) {
    console.log(res);
    var html = (0, _template.default)('product-info', {
      data: res
    }),
        detail = (0, _template.default)('product-detail', {
      data: res
    });
    document.querySelector('.product-container').innerHTML = html;
    document.querySelector('.product-detail').innerHTML = detail;

    if (res.productImages.length > 6) {
      document.querySelector('.left-btn').addEventListener('click', function () {
        var ele = document.querySelectorAll('.pic-item'),
            l = ele.length,
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul'),
            container = document.querySelector('.pic-container');

        if (l * w - container.offsetWidth > -parent.offsetLeft) {
          scrollX(-1, w, parent);
        }
      });
      document.querySelector('.right-btn').addEventListener('click', function () {
        var ele = document.querySelectorAll('.pic-item'),
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul');

        if (parent.offsetLeft < 0) {
          scrollX(1, w, parent);
        }
      });
    } else {
      document.querySelector('.pic-container').style.width = '500px';
    }

    var productionPrice = document.querySelector('.product-price');

    if (res.productOptions.length > 0) {
      var productOptions = res.productOptions,
          price = 0;

      for (var i = productOptions.length - 1; i >= 0; i--) {
        console.log(-productOptions[i].optionValue[0].price);
        price -= -productOptions[i].optionValue[0].price;
      }

      productionPrice.innerHTML = price;
    }

    var targetPic = document.querySelector('.show-pic');
    document.querySelector('.pic-container').addEventListener('mousemove', function (e) {
      if (e.target.tagName.toLowerCase() === 'img' && targetPic.getAttribute('src') !== e.target.getAttribute('src')) {
        targetPic.setAttribute('src', e.target.getAttribute('src'));
      }
    }, false);
    var quantity = document.querySelector('.product-quantity');
    document.querySelector('.add').addEventListener('click', function () {
      quantity.value -= -1;
    });
    document.querySelector('.reduce').addEventListener('click', function () {
      if (quantity.value > 1) {
        quantity.value -= 1;
      }
    });
    var select = document.querySelectorAll('.props-item>select');
    console.log(select);

    for (var _i2 = select.length - 1; _i2 >= 0; _i2--) {
      console.log(select[_i2].value);

      (function (_i) {
        select[_i].addEventListener('change', function (e) {
          console.log(select[_i].value);
          var price = 0;

          for (var j = select.length - 1; j >= 0; j--) {
            price -= -select[j].value;
          }

          productionPrice.innerHTML = price;
        });
      })(_i2);
    }
  });
};