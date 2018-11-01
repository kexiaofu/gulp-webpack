import { getAllProductList } from '../common/api';

import { imageLazyLoad, getParameter } from '../common/tools';

import template from '../common/template.js';

let getData = (obj) =>{
  getAllProductList(obj).then(res=>{
    console.log(res);
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

window.onload = () => {
  let search = getParameter('search');

  if(search !== null) {
    getData({name:decodeURIComponent(search)})
  } else {
    let hash  = document.location.hash,
      groupId = '';
    hash !== ''&& (groupId = hash.substring(1));
    if(groupId !== '') {
      getData({groupId:groupId})
    } else {
      getData()
    }
  }
};

window.addEventListener("hashchange",()=>{
  getData({groupId:document.location.hash.substring(1)})
});