export default class Toast {
  constructor() {
    this.toast = null;
    this.icon = null;
    this.content = null;
  }

  init(options) {
    let toast = document.createElement('div'),
      imgContain = document.createElement('div'),
      img = document.createElement('img'),
      content = document.createElement('div');

    toast.className = 'my-toast';
    imgContain.className = 'my-toast-icon-container';
    img.className = 'my-toast-icon';
    content.className = 'my-toast-content';

    img.src = options.icon;
    content.innerHTML = options.content;

    imgContain.appendChild(img);
    toast.appendChild(imgContain);
    toast.appendChild(content);

    document.querySelector('body').appendChild(toast);

    this.toast = toast;
    this.icon = img;
    this.content = content;

  }

  show(options) {
    /*
    * type success/error/normal
    * */
    let option = Object.assign({
      type:'success',
      icon:'../images/toast-succ.png',
      content:null,
      hideTime:3000
    },options);

    switch(option.type) {
      case 'success':
        option.icon = '../images/toast-succ.png';
        option.content === null && (option.content = '成功');
        break;
      case 'error':
        option.icon = '../images/toast-err.png';
        option.content === null && (option.content = '错误');
        break;
      default:
        option.icon = '../images/toast-normal.png';
        option.content === null && (option.content = '其他');
    }

    if(this.toast) {
      this.toast.style.display = 'block';
      setTimeout(()=>{
        this.toast.style.opacity = 1;
        setTimeout(()=>{
          this.hide();
        },option.hideTime);
      },0)
    } else {
      this.init(option);
      setTimeout(()=>{
        this.toast.style.display = 'block';
        setTimeout(()=>{
          this.toast.style.opacity = 1;
          setTimeout(()=>{
            this.hide();
          },option.hideTime);

        },0)
      },100)
    }
  }

  hide() {
    if(this.toast) {
      this.toast.style.opacity = 0;
      setTimeout(()=>{
        this.toast.style.display = 'none';
      },500)
    }
  }

};