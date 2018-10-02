"use strict";

//import template from './template';

/*import axios from 'axios';
axios.get('wwww.baidu.com')
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })*/
var template = require('./template');

var data = {
  title: '基本例子',
  isAdmin: true,
  list: ['文艺1212', '博客1212', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('index').innerHTML = html;