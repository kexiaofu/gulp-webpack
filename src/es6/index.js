import Carousel from './carousel';

import Alert from './alert';
import Confirm from './confirm';

window.onload = () =>{
  console.log(document.querySelector('.carousel-container'))
  let carousel = new Carousel({
    navigation:false,
    direction:false,
    autoPlay:true,
    parent:'carousel-container',
    images:['../images/1.jpg','../images/2.jpeg','../images/3.jpeg']
  });

  let confirm = new Confirm();


  setTimeout(()=>{
    confirm.show({
      title:'he',
      content:'DDDD123',
      ok:()=>{
        console.log('ok')
      }
    });
  },1000);
};
