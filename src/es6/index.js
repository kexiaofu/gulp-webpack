import Carousel from './carousel';

window.onload = () =>{
  console.log(document.querySelector('.carousel-container'))
  let carousel = new Carousel({
    parent:'carousel-container',
    images:['../images/1.jpg','../images/2.jpeg','../images/3.jpeg']
  });

  //carouselPlay();

};

let carouselPlay =()=>{
  let eles = document.querySelectorAll('.carousel-item'),
      len = eles.length;

  let activeIndex = 1,prevIndex = 0;

  setInterval(()=>{

    console.log(activeIndex,prevIndex);

    eles[activeIndex].style.visibility = 'visible';
    eles[prevIndex].style.visibility = 'visible';

    eles[activeIndex].style.transition = 'none';
    eles[activeIndex].style.transform = 'translateX(100%)';
    setTimeout(()=>{
      eles[activeIndex].style.transition = 'transform 1s linear';
      eles[activeIndex].style.transform = 'translateX(0%)';
      eles[prevIndex].style.transform = 'translateX(-100%)';
      if(activeIndex++ >= len-1) {
        activeIndex = 0
      }

      if(activeIndex > 0) {
        prevIndex = activeIndex - 1;
      } else {
        prevIndex = len-1
      }

    },0);


  },2000);


};
