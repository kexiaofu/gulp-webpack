import { getProductClassify } from '../common/api';

import template from '../common/template';


getProductClassify()
  .then(res=>{
    let html = template('classify-view',{data:res});
    document.querySelector('.classify-container').innerHTML = html;
  });