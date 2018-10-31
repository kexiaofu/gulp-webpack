import Carousel from '../common/carousel';

import Mask from '../common/mask';
import { getCarousel, getProductionList } from '../common/api';

import { imageLazyLoad } from '../common/tools';

import template from '../common/template.js';

window.onload = () =>{

  let mask = new Mask();

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

    let images = document.querySelectorAll('.lazy-load-img'),
        len = images.length;

    imageLazyLoad(images);

    window.onscroll = () =>{
      if(images[len-1].getAttribute('data-is-load') === 'false') {
        imageLazyLoad(images);
      }
    }

  })

};
