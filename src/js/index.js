let a = 11101;

let b = ()=>{
  console.log('reload hello ')
  return ++a;
};

let c = async () =>{
  let d = await b();
  console.log(d)
};

c();