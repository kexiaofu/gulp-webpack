"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _template = _interopRequireDefault(require("./template"));

var data = {
  title: '基本例子12345',
  isAdmin: true,
  list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = (0, _template.default)('test', data);
document.getElementById('home').innerHTML = html;