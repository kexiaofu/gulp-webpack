//import Carousel from './carousel';

//import Toast from './toast';
//import Alert from './alert';
//import Confirm from './confirm';

//import axios from 'axios';

window.onload = () =>{
  console.log(document.querySelector('.carousel-container'));
  axios.get('/api/Config/GetCarousel')
    .then(res=>{
      console.log(res);
      if(res.data.code === 2000) {
        let carousel = new Carousel({
          autoPlay:false,
          parent:'carousel-container',
          images:res.data.result
        });
      }
    })
    .catch(err=>{
      console.log(err);
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
