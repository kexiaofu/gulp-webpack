import axios from 'axios';
/*import template from './template'
*/
axios.get('wwww.baidu.com')
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  });

let a = async () => {
  await console.log('ok!！');
};

a();