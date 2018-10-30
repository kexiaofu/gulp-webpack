export default class Mask {
  constructor() {
    this.mask = null;
  }

  init() {
    let mask = document.createElement('div');

    mask.className = 'mask';

    document.querySelector('body').appendChild(mask);

    this.mask = mask;

  }

  show() {

    if(this.mask !== null) {
      if(this.mask.style.display !== 'block') {
        this.mask.style.display = 'block';
        setTimeout(()=>{
          this.mask.style.opacity = 1;
        },0)
      }
    } else {
      this.init();
      setTimeout(()=>{
        this.mask.style.display = 'block';
        setTimeout(()=>{
          this.mask.style.opacity = 1;
        },0)
      },0)
    }


  }

  hide() {
    if(this.mask !== null) {
      if(this.mask.style.display !== 'none') {
        this.mask.style.opacity = 0;
        setTimeout(()=>{
          this.mask.style.display = 'none';
        },550)
      }
    } else {
      this.init();
    }

  }

};