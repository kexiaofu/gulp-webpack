class Carousel {
  constructor(options) {
    //super(props);
    this.options = JSON.parse(JSON.stringify(Object.assign({},{
      playTime:3000
    },options)));

    this.data = {
      parentWidth:0,
      container:null,
      activeIndex:1
    };

    this.init();

  }

  init() {
    let options = this.options;
    if(options.images.length < 0) {
      alert('轮播图图片没有上传');
    } else {
      console.log(document.querySelector(`.${options.parent}`).offsetWidth,options);
      let parent = document.querySelector(`.${options.parent}`),
          images = options.images;

      let container = document.createElement('div'),
          pointContainer = document.createElement('ul');

      container.className = 'carousel';
      pointContainer.className = 'point-container';

      container.style.width = parent.offsetWidth + 'px';

      this.data.container = container;

      parent.appendChild(container);
      parent.appendChild(pointContainer);

      for(let i=0,l=images.length;i<l;i++) {
        this.createImageItem(images[i],container,parent.offsetWidth,i)
      }

      this.createPoint(images.length,pointContainer);


      pointContainer.addEventListener('click',(e)=>{this.getPoint(e)})

      //this.carouselPlay();

      //options.container.style.width = options.images.length * options.width + 'px'
    }
  }

  carouselPlay(index) {
    let options = this.options,
        playTime = options.playTime,
        activeIndex = index?index:this.data.activeIndex,
        len = options.images.length,
        eles = document.querySelectorAll('.carousel-item');

    console.log(options.images,options.images.length);
    let prevIndex = 0;
    this.data.playStop =  setInterval(()=>{

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


    },playTime);
  }

  getPoint(e) {
    console.log(e.target,'index');
    if(e.target.className === 'point') {

      let index = e.target.getAttribute('data-point'),
          eles = document.querySelectorAll('.carousel-item'),
          prevIndex = 0;
        if(index > 0) {
          prevIndex = index - 1;
        } else {
          prevIndex = eles.length-1
        }
      this.toThisCarousel(eles,index,prevIndex);
    }
  }



  toThisCarousel(eles,index,prevIndex) {

    eles[index].style.visibility = 'visible';
    eles[prevIndex].style.visibility = 'visible';

    eles[index].style.transition = 'none';
    eles[index].style.transform = 'translateX(100%)';
    setTimeout(()=>{
      eles[index].style.transition = 'transform 1s linear';
      eles[index].style.transform = 'translateX(0%)';
      eles[prevIndex].style.transform = 'translateX(-100%)';
    },0);

  }

  createPoint(count,parent) {
     for(let i=0;i<count;i++) {
       let point = document.createElement('li');

       point.className = 'point';

       (i===0)&&(point.className = 'point active');

       point.setAttribute('data-point',i);

       parent.appendChild(point);

     }
  };

  createImageItem(src,parent,w,index) {

    let carousel = document.createElement('div'),
        image = document.createElement('img');

    image.src = src;

    carousel.className = 'carousel-item';

    carousel.style.width = w + 'px';
    carousel.style.visibility = index !== 0?'hidden':'visible';

    carousel.appendChild(image);

    parent.appendChild(carousel);

  }

}

export default Carousel;