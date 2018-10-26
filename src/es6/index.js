import Carousel from './carousel';

import Toast from './toast';
import Alert from './alert';
import Confirm from './confirm';

window.onload = () =>{
  console.log(document.querySelector('.carousel-container'))
  let carousel = new Carousel({
    autoPlay:true,
    parent:'carousel-container',
    images:['../images/1.jpg','../images/2.jpeg','../images/3.jpeg']
  });

  let confirm = new Confirm();
  let alert = new Alert();
  let toast = new Toast();

  setTimeout(()=>{
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
  },1000);
};
