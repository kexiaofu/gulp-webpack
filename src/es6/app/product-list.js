import { getAllProductList } from '../common/api';

import { imageLazyLoad } from '../common/tools';

import template from '../common/template.js';

let getData = (obj) =>{
  getAllProductList(obj).then(res=>{
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

  let hash  = document.location.hash,
      groupId = '';
  hash !== ''&& (groupId = hash.substring(1));
  if(groupId !== '') {
    getData({groupId:groupId})
  } else {
    getData()
  }


};

window.addEventListener("hashchange",()=>{
  console.log(document.location.hash.substring(1))
  getData({groupId:document.location.hash.substring(1)})
});