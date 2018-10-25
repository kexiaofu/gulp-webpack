class Carousel {
  constructor(options) {
    //super(props);
    this.options = JSON.parse(JSON.stringify(Object.assign({},{
      playTime:3000,
      direction:true,
      navigation:true
    },options)));

    this.data = {
      parentWidth:0,
      container:null,
      activeIndex:0,
      playStop:null
    };

    this.init();

  }

  init() {
    let options = this.options;
    if(options.images.length < 0) {
      alert('轮播图图片没有上传');
    } else {
      //console.log(document.querySelector(`.${options.parent}`).offsetWidth,options);
      let parent = document.querySelector(`.${options.parent}`),
          images = options.images;

      let container = document.createElement('div');

      container.className = 'carousel';


      container.style.width = parent.offsetWidth + 'px';
      container.style.height = parent.offsetHeight + 'px';

      this.data.container = container;

      parent.appendChild(container);


      for(let i=0,l=images.length;i<l;i++) {
        this.createImageItem(images[i],container,parent.offsetWidth,parent.offsetHeight,i)
      }

      if(options.navigation) {
        let pointContainer = document.createElement('ul');
        pointContainer.className = 'point-container';
        parent.appendChild(pointContainer);
        this.createPoint(images.length,pointContainer);
        pointContainer.addEventListener('click',(e)=>{this.getPoint(e)});
      }

      if(options.direction) {
        this.createDirectionIcon(parent);
      }

      if(options.autoPlay) {
        this.carouselPlay();
      }

      window.addEventListener('resize',()=>{
        let carousel = document.querySelectorAll('.carousel-item'),
            parentW = document.querySelector(`.${options.parent}`).offsetWidth;

        for(let i = carousel.length-1;i>=0;i--) {
          carousel[i].style.width = parentW + 'px';
        }

      })

      //options.container.style.width = options.images.length * options.width + 'px'
    }
  }

  carouselPlay() {
    let options = this.options,
        playTime = options.playTime,
        activeIndex = this.data.activeIndex,
        len = options.images.length,
        eles = document.querySelectorAll('.carousel-item');

    //console.log(options.images,options.images.length);
    let prevIndex = 0;
    //activeIndex++;
    clearInterval(this.data.playStop);
    this.data.playStop = setInterval(()=>{

      if(activeIndex++ >= len-1) {
        activeIndex = 0
      }

      if(activeIndex > 0) {
        prevIndex = activeIndex - 1;
      } else {
        prevIndex = len-1
      }

      this.toThisCarousel(eles,activeIndex,prevIndex,1,false);

    },playTime);
  }

  getPoint(e) {
    if(e.target.className.indexOf('point') > -1) {

      let index = e.target.getAttribute('data-point'),
          eles = document.querySelectorAll('.carousel-item');
      //console.log(index,this.data.activeIndex);
      clearInterval(this.data.playStop);
      this.toThisCarousel(eles,index-0,this.data.activeIndex,null,true);
    }
  }

  toThisCarousel(eles,index,prevIndex,hadDirection,start) {

    //console.log(index , prevIndex,index === prevIndex);

    if(index === prevIndex) {
      return
    }

    eles[index].style.visibility = 'visible';
    eles[prevIndex].style.visibility = 'visible';

    let direction = hadDirection!==null?hadDirection:(index > prevIndex?1:-1);

    eles[index].style.transition = 'none';
    eles[index].style.transform = `translateX(${direction * 100}%)`;
    setTimeout(()=>{
      eles[index].style.transition = 'transform .3s linear';
      eles[index].style.transform = 'translateX(0%)';
      eles[prevIndex].style.transform = `translateX(${-direction * 100}%)`;
      this.data.activeIndex = index;
      if(this.options.navigation) {
        let prevPoint = document.querySelector(`.active-point`);
        prevPoint.className = prevPoint.className.replace('active-point','');
        document.querySelector(`.point${index}`).className = `point point${index} active-point`;
      }

      if(this.options.autoPlay && start) {
        this.carouselPlay();
      }
    },0);

  }

  createDirectionIcon(parent) {
    let leftIcon = document.createElement('div'),
        limg = document.createElement('img'),
        rightIcon = document.createElement('div'),
        rimg = document.createElement('img');

    limg.src = '../images/left-icon.png';
    rimg.src = '../images/left-icon.png';

    leftIcon.className='left-icon';
    rightIcon.className='right-icon';

    leftIcon.appendChild(limg);
    rightIcon.appendChild(rimg);

    parent.appendChild(leftIcon);
    parent.appendChild(rightIcon);

    leftIcon.addEventListener('click',(e)=>{
      let eles = document.querySelectorAll('.carousel-item'),
          activeIndex = this.data.activeIndex,
          prevIndex = activeIndex;
      if(activeIndex -1 >= 0) {
        activeIndex = activeIndex - 1;
      } else {
        activeIndex = eles.length - 1;
      }
      clearInterval(this.data.playStop);
      this.toThisCarousel(eles,activeIndex,prevIndex,-1,true)
    });

    rightIcon.addEventListener('click',(e)=>{
      let eles = document.querySelectorAll('.carousel-item'),
        activeIndex = this.data.activeIndex,
        prevIndex = activeIndex;
      if(activeIndex+1 < eles.length) {
        activeIndex = activeIndex + 1;
      } else {
        activeIndex = 0;
      }
      clearInterval(this.data.playStop);
      this.toThisCarousel(eles,activeIndex,prevIndex,1,true)
    })

  };

  createPoint(count,parent) {
     for(let i=0;i<count;i++) {
       let point = document.createElement('li');

       point.className = `point point${i}`;

       (i===0)&&(point.className = 'point point0 active-point');

       point.setAttribute('data-point',i);

       parent.appendChild(point);

     }
  };

  createImageItem(src,parent,w,h,index) {

    let carousel = document.createElement('div'),
        image = document.createElement('img');

    image.src = src;

    carousel.className = 'carousel-item';

    carousel.style.width = w + 'px';
    carousel.style.height = h + 'px';
    carousel.style.visibility = index !== 0?'hidden':'visible';

    carousel.appendChild(image);

    parent.appendChild(carousel);

  }

}

export default Carousel;