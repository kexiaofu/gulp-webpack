import axios from 'axios';

const period = 60000;

let apiRequire = async (name,url) => {
  let storageTime = new Date().getTime();
  if(window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name+'-time') < period) {
    return JSON.parse(window.sessionStorage.getItem(name));
  } else {
    console.log(`require ${name} again`);
    return await axios.get(url)
      .then(res=>{
        if(res.data.code === 2000) {
          window.sessionStorage.setItem(name,JSON.stringify(res.data.result));
          window.sessionStorage.setItem(name+'-time',storageTime);
          return res.data.result;
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err=>{
        alert(err);
      })
  }
};

export const getCarousel = async ()=> await apiRequire('getCarousel','/api/Config/GetCarousel');

export const getProductionList = async ()=> await apiRequire('getProductionList','/api/Config/GetHomeProduct');
