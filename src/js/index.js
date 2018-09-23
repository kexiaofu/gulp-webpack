
//import $ from './jquery-3.3.1.min';//用于提取公共模块做测试
import test from './test1';

let a = 11101;

console.log(test,132,345);

let b = ()=>{
  alert($('#index').html());
  console.log('reload hello ',$('#index'));
  return ++a;
};

let c = async () =>{
  let d = await b();
  console.log(d,$)
};

c();