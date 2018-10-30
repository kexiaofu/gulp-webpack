import Carousel from '../common/carousel';

import Mask from '../common/mask';
//import Toast from '../common/toast';
//import Alert from '../common/alert';
//import Confirm from '../common/confirm';
import { getCarousel, getProductionList } from '../common/api';

import template from '../common/template.js';

import SHA256 from '../common/encrypt';

window.onload = () =>{

  let mask = new Mask();

  window.addEventListener('show-search-box',()=>{
    console.log('show-search-box')
    mask.show()
  });

  window.addEventListener('hide-search-box',()=>{
    console.log('hide-search-box')
    mask.hide()
  });

  console.log(SHA256('1qaz2wsx'));
  getCarousel().then(res=>{
    let carousel = new Carousel({
      autoPlay:false,
      parent:'carousel-container',
      images:res
    });
  });

  getProductionList().then(res=>{
    let html = template('production-list', {data:res});
    document.querySelector('.production-list').innerHTML = html;
  })

};
