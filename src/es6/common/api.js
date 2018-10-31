import axios from 'axios';

const period = 60000;

let apiRequire = async (name,url,method,data,storage=true) => {
  let storageTime = new Date().getTime();
  if(storage && window.sessionStorage.getItem(name) !== null && storageTime - window.sessionStorage.getItem(name+'-time') < period) {
    return JSON.parse(window.sessionStorage.getItem(name));
  } else {
    console.log(`require ${name} again`);
    if(method === undefined || method === null) {
      return await axios.get(url,{
        params:data
      })
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
    } else {
      return await axios.post(url,data)
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

  }
};

export const getCarousel = async ()=> await apiRequire('getCarousel','/api/Config/GetCarousel');

export const getProductionList = async ()=> await apiRequire('getProductionList','/api/Config/GetHomeProduct');

export const toLogin = async (account) => await apiRequire('account','/api/account/login',null,account);

export const getAllProductList = async (data) => await apiRequire('getAllProductList','/api/Product/getproductList',null,data,false);

export const getProductClassify = async () => await apiRequire('getProductClassify','/api/Product/GetGroup',null);

//getProductClassify,/api/Product/GetGroup