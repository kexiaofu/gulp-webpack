import { getProductDetail } from '../common/api';

import { getParameter } from '../common/tools';

import template from '../common/template';


let scrollX = (direct,w,parent) =>{
  console.log(direct,w,parent);
    parent.style.left = parent.offsetLeft +  direct * (w + 5) + 'px';
};

window.onload = () =>{

  let id = getParameter('productId');

  if(id === null) {
    return alert('没有该产品');
  }
  //取得產品信息
  getProductDetail({id:id})
    .then(res=>{
      console.log(res);

      let html = template('product-info',{data:res}),
          detail = template('product-detail',{data:res});

      document.querySelector('.product-container').innerHTML = html;
      document.querySelector('.product-detail').innerHTML = detail;

      if(res.productImages.length > 6) {
        document.querySelector('.left-btn').addEventListener('click',()=>{
          let ele = document.querySelectorAll('.pic-item'),
            l = ele.length,
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul'),
            container = document.querySelector('.pic-container');
          if((l * w - container.offsetWidth) > -parent.offsetLeft ) {
            scrollX(-1,w,parent)
          }
        });

        document.querySelector('.right-btn').addEventListener('click',()=>{
          let ele = document.querySelectorAll('.pic-item'),
            w = ele[0].offsetWidth,
            parent = document.querySelector('.pic-ul');
          if(parent.offsetLeft < 0 ) {
            scrollX(1,w,parent)
          }
        });
      } else {
        document.querySelector('.pic-container').style.width = '500px';
      }

      let productionPrice = document.querySelector('.product-price');

      if(res.productOptions.length > 0) {
        let productOptions = res.productOptions,
            price = 0;

        for(let i=productOptions.length-1;i>=0;i--) {
          console.log(-productOptions[i].optionValue[0].price);
          price -= (-productOptions[i].optionValue[0].price)
        }

        productionPrice.innerHTML = price;

      }

      let targetPic = document.querySelector('.show-pic');

      document.querySelector('.pic-container').addEventListener('mousemove',(e)=>{
        if(e.target.tagName.toLowerCase() === 'img' && targetPic.getAttribute('src') !== e.target.getAttribute('src')) {
          targetPic.setAttribute('src',e.target.getAttribute('src'));
        }

      },false);

      let quantity = document.querySelector('.product-quantity');

      document.querySelector('.add').addEventListener('click',()=>{
        quantity.value -= -1
      });

      document.querySelector('.reduce').addEventListener('click',()=>{
        if(quantity.value > 1) {
          quantity.value -= 1
        }
      });

      let select = document.querySelectorAll('.props-item>select');

      console.log(select);

      for(let i=select.length-1;i>=0;i--) {
        console.log(select[i].value);
        ((_i)=>{
          select[_i].addEventListener('change',(e)=>{
            console.log(select[_i].value);
            let price = 0;
            for(let j=select.length-1;j>=0;j--) {
              price -= -select[j].value;
            }
            productionPrice.innerHTML = price;
          })
        })(i)
      }



    });

};