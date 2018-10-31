"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _api = require("../common/api");

var _template = _interopRequireDefault(require("../common/template"));

(0, _api.getProductClassify)().then(function (res) {
  var html = (0, _template.default)('classify-view', {
    data: res
  });
  document.querySelector('.classify-container').innerHTML = html;
});