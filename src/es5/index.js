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