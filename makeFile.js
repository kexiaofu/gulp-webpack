console.log(process.argv);

let fs = require('fs'),
  name = process.argv.indexOf('name'),
  js = process.argv.indexOf('js');

fs.readFile('./temp/temp.html',(err,data)=>{
  if(err) {
    return console.log(err)
  }

  //console.log(data.toString())

  let odata = data.toString();

  odata = odata.replace('{{ name }}',process.argv[name+1]).replace(/{{ js }}/g,process.argv[js+1]);

  console.log(odata);

  let fileName = process.argv[name+1];

  fs.stat(`./src/html/${fileName}.html`,(err,stat)=>{
    if(err) {
      fs.writeFile(`./src/html/${fileName}.html`,odata,(err)=>{
        if(err) {
          return console.log('写入出错')

        }
        console.log('创建HTML成功')
      })

      fs.writeFile(`./src/js/${fileName}.js`,'',(err)=>{
        if(err) {
          return console.log('写入出错')

        }
        console.log('创建JS成功')
      })

      fs.writeFile(`./src/css/${fileName}.less`,'',(err)=>{
        if(err) {
          return console.log('写入出错')

        }
        console.log('创建CSS成功')
      })


    }
    return console.log('文件已经存在')
  });

});

console.log(name,process.argv[name+1]);