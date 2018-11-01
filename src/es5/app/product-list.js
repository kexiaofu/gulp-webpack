"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _tools = require("../common/tools");

var _template = _interopRequireDefault(require("../common/template.js"));

var getData = function getData(obj) {
  (0, _api.getAllProductList)(obj).then(function (res) {
    console.log(res);
    var html = (0, _template.default)('production-list', {
      data: res
    });
    document.querySelector('.production-list').innerHTML = html;
    var images = document.querySelectorAll('.lazy-load-img'),
        len = images.length;
    (0, _tools.imageLazyLoad)(images);

    window.onscroll = function () {
      if (images[len - 1].getAttribute('data-is-load') === 'false') {
        (0, _tools.imageLazyLoad)(images);
      }
    };
  });
};

window.onload = function () {
  var search = (0, _tools.getParameter)('search');

  if (search !== null) {
    getData({
      name: decodeURIComponent(search)
    });
  } else {
    var hash = document.location.hash,
        groupId = '';
    hash !== '' && (groupId = hash.substring(1));

    if (groupId !== '') {
      getData({
        groupId: groupId
      });
    } else {
      getData();
    }
  }
};

window.addEventListener("hashchange", function () {
  getData({
    groupId: document.location.hash.substring(1)
  });
});