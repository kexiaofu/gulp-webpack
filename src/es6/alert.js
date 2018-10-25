import Mask from './mask';
export default class Alert {
  constructor() {
    this.alert = null;
    this.title = null;
    this.content = null;
    this.footer = null;
    this.mask = null;
  }

  init(options) {
    let alert = document.createElement('div'),
      header = document.createElement('div'),
      content = document.createElement('div'),
      footer = document.createElement('div');

    alert.className = 'my-alert';
    header.className = 'my-alert-title';
    content.className = 'my-alert-content';
    footer.className = 'my-alert-footer';

    header.innerHTML = options.title;
    content.innerHTML = options.content;
    footer.innerHTML = options.btnText;

    alert.appendChild(header);
    alert.appendChild(content);
    alert.appendChild(footer);
    document.querySelector('body').appendChild(alert);

    footer.addEventListener('click',()=>{
      this.hide();
    });

    this.alert = alert;
    this.title = header;
    this.content = content;
    this.footer = footer;

    this.mask = new Mask();

  }

  show(options) {

    let option = Object.assign({
      title:'提示',
      content:'',
      btnText:'关闭'
    }, options);

    console.log(option);

    if(this.alert === null) {
      this.init(option);

      setTimeout(()=>{
        this.mask.show();

        this.title.innerHTML = option.title;
        this.content.innerHTML = option.content;
        this.footer.innerHTML = option.btnText;

        this.alert.style.display = 'block';
        setTimeout(()=>{
          this.alert.style.transform = 'translate(-50%,-50%) scale(1,1)'
        },0);

      },100)

    } else {
      this.mask.show();

      this.title.innerHTML = option.title;
      this.content.innerHTML = option.content;
      this.footer.innerHTML = option.btnText;

      this.alert.style.display = 'block';
      setTimeout(()=>{
        this.alert.style.transform = ' translate(-50%,-50%) scale(1,1)'
      },0);
    }

  }

  hide() {

    if(this.alert) {
      this.alert.style.transform = 'translate(-50%,-50%) scale(0,0)';
      this.mask.hide();
      setTimeout(()=>{
        this.alert.style.display = 'none';
      },550);
    }
  }

};

