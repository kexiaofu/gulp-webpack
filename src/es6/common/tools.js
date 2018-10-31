export const imageLazyLoad = (ele) =>{
  let clientHeight = document.documentElement.clientHeight,
    scrollTop = document.documentElement.scrollTop,
    l = ele.length;
  for(let i=0;i<l;i++) {
    if(ele[i].offsetTop < clientHeight + scrollTop && ele[i].getAttribute('data-is-load') !== 'true') {
      ele[i].setAttribute('data-is-load','true');
      ele[i].src = ele[i].getAttribute('data-origin-src');
      //console.log(ele[i].getAttribute('data-origin-src'))
    }
  }
};