(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

//import Carousel from './carousel';
//import Toast from './toast';
//import Alert from './alert';
//import Confirm from './confirm';
//import axios from 'axios';
window.onload = function () {
  console.log(document.querySelector('.carousel-container'));
  axios.get('/api/Config/GetCarousel').then(function (res) {
    console.log(res);

    if (res.data.code === 2000) {
      var carousel = new Carousel({
        autoPlay: false,
        parent: 'carousel-container',
        images: res.data.result
      });
    }
  }).catch(function (err) {
    console.log(err);
  });
  var confirm = new Confirm();
  var alert = new Alert();
  var toast = new Toast();
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
},{}]},{},[1]);
