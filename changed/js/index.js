//import $ from './jquery-3.3.1.min';//用于提取公共模块做测试
//import test from './test1';

import template from './template';


var data = {
  title: '基本例子1',
  isAdmin: true,
  list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('index').innerHTML = html;


/*
let a = 11101;

console.log(test,132,345);

let b = ()=>{
  console.log('reload hello ');
  return ++a;
};

let c = async () =>{
  let d = await b();
  console.log(d)
};

c();*/
