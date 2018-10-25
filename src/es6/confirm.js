import Mask from './mask';
export default class Confirm {
  constructor() {
    this.confirm = null;
    this.title = null;
    this.content = null;
    this.ok = null;
    this.cancel = null;
    this.mask = null;
  }

  init(options) {

    let confirm = document.createElement('div'),
      header = document.createElement('div'),
      content = document.createElement('div'),
      footer = document.createElement('div'),
      ok = document.createElement('div'),
      cancel = document.createElement('div');

    confirm.className = 'my-confirm';
    header.className = 'my-confirm-title';
    content.className = 'my-confirm-content';
    footer.className = 'my-confirm-footer';
    ok.className = 'my-confirm-ok';
    cancel.className = 'my-confirm-cancel';

    header.innerHTML = options.title;
    content.innerHTML = options.content;
    ok.innerHTML = options.okText;
    cancel.innerHTML = options.cancelText;

    options.hasOwnProperty('title') && confirm.appendChild(header);
    confirm.appendChild(content);
    footer.appendChild(ok);
    footer.appendChild(cancel);
    confirm.appendChild(footer);

    confirm.style.minHeight = options.hasOwnProperty('title')?'160px':'120px';

    document.querySelector('body').appendChild(confirm);

    this.confirm = confirm;
    this.title = header;
    this.content = content;
    this.ok = ok;
    this.cancel = cancel;

    this.mask = new Mask();


    ok.addEventListener('click',()=>{
      typeof options.ok === 'function' ? options.ok():this.hide();
    });

    cancel.addEventListener('click',()=>{
      this.hide();
    });

  }

  show(options) {
    let option = Object.assign({
      content:'请选择',
      okText:'好的',
      cancelText:'取消'
    }, options);

    if(this.confirm === null) {
      this.init(option);

      setTimeout(()=>{
        this.mask.show();

        this.title.innerHTML = option.title;
        this.content.innerHTML = option.content;
        this.ok.innerHTML = option.okText;
        this.cancel.innerHTML = option.cancelText;

        this.confirm.style.display = 'block';
        setTimeout(()=>{
          this.confirm.style.transform = 'translate(-50%,-50%) scale(1,1)'
        },0);

      },100)

    } else {
      this.mask.show();

      this.title.innerHTML = option.title;
      this.content.innerHTML = option.content;
      this.ok.innerHTML = option.okText;
      this.cancel.innerHTML = option.cancelText;

      this.confirm.style.display = 'block';
      setTimeout(()=>{
        this.confirm.style.transform = ' translate(-50%,-50%) scale(1,1)'
      },0);
    }

  }

  hide() {
    if(this.confirm) {
      this.confirm.style.transform = 'translate(-50%,-50%) scale(0,0)';
      this.mask.hide();
      setTimeout(()=>{
        this.confirm.style.display = 'none';
      },550);
    }
  }
}