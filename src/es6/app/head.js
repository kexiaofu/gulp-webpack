import Mask from '../common/mask';
import SHA256 from '../common/encrypt';
import { toLogin } from '../common/api';

console.log(document.querySelector('.to-search'));

let mask = new Mask();

let dispatchSomrthing =  (bool) => {
  if (bool) {
    mask.show();
  } else {
    mask.hide();
  }
};

let keyUpEvent = (e) =>{
  console.log(e);
  if(e.keyCode === 13) {
    window.location = './product-list.html?search='+document.querySelector('.search-input').value;
  }
};

let toSearch =  () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'none';
  searchInput.style.display = 'block';
  close.style.display = 'block';
  searchInput.focus();
  dispatchSomrthing(true);
  searchInput.addEventListener('keyup',keyUpEvent)
};

let toClose =  () => {
  let searchInput = document.querySelector('.search-input'),
    toSearch = document.querySelector('.to-search'),
    close = document.querySelector('.icon-close');
  toSearch.style.display = 'block';
  searchInput.style.display = 'none';
  close.style.display = 'none';
  dispatchSomrthing(false);
  searchInput.removeEventListener('keyup',keyUpEvent)

};

let toShowLoginBox = () =>{
 let login =  document.querySelector('.login');
  login.style.display = 'block';
  setTimeout(()=>{
    login.style.transform = 'translate(-50%,-50%) scale(1)';
    login.style.opacity = 1;
  },0);

  dispatchSomrthing(true);
};

let toCloseLoginBox = () =>{
  let login =  document.querySelector('.login');

  login.style.transform = 'translate(-50%,-50%) scale(.5)';
  login.style.opacity = 0;
  setTimeout(()=>{
    login.style.display = 'none';
  },500);
  dispatchSomrthing(false);

};

let toSumbitLoginData = () =>{
  let name = document.querySelector('#account'),
      psw = document.querySelector('#password');

  if(name.value !== '' && psw.value !== '') {
    toLogin({account:name.value,password:SHA256(psw.value)})
      .then(res=>{
        console.log(res);
      })
  }

  console.log(name.value )
};

document.querySelector('.to-search').addEventListener('click',toSearch);
document.querySelector('.icon-close').addEventListener('click',toClose);
document.querySelector('.to-login').addEventListener('click',toShowLoginBox);
document.querySelector('.close-login-box').addEventListener('click',toCloseLoginBox);
document.querySelector('.submit').addEventListener('click',toSumbitLoginData);

