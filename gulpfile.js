let gulp = require('gulp'),
  autofix = require('gulp-autoprefixer'),
  changed = require('gulp-changed'),
  less = require('gulp-less'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  babel = require('gulp-babel');

let fs = require('fs'),path = require('path');

let mkdirFunc =  (path,cb) =>{
  fs.readdir(path,(err,files)=>{
    if(err) {
      fs.mkdir(path,(merr)=>{
        if( merr ) return console.log(merr);
        console.log('create dir success --',path);
        typeof cb === 'function' && cb();
      })
    }
    typeof cb === 'function' && cb();
  })
};

let fileDisplay = (filePath) => {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath,function(err,files){
    if(err){
      console.warn(err)
    }else{
      //遍历读取到的文件列表
      files.forEach(function(filename){
        //获取当前文件的绝对路径
        let filedir = path.join(filePath,filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,function(eror,stats){
          if(eror){
            console.warn('获取文件stats失败');
          }else{
            let isFile = stats.isFile();//是文件
            let isDir = stats.isDirectory();//是文件夹
            if(isFile){
              let jsPath = path.win32.basename(filedir) ,
                destPath = path.parse(filedir).dir.replace('es5','js');
              console.log(filedir,jsPath,destPath);
              browserify(filedir)
                .bundle()
                .pipe(source(jsPath))
                .pipe(buffer())
                .pipe(gulp.dest(destPath))
                .pipe(reload({stream: true}));
            }
            if(isDir){
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
};

//es6 -> es5
gulp.task('babel',()=>{
  return gulp.src('src/es6/**/*.js')
    .pipe(changed('./src/es5',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    }))
    .pipe(gulp.dest('src/es5/'))
});

//开发时复制HTML到dev目录
gulp.task('dev-copyHtml',()=>{
  return gulp.src('src/html/**/*.html')
    .pipe(reload({stream: true}))
});

//开发时复制images到dev目录
gulp.task('dev-copyImages',()=>{
  return gulp.src('src/images/**/*.*')
    .pipe(reload({stream: true}))
});

//less -> css
gulp.task('less',()=>{
  return gulp.src('./src/less/**/*.less')
    .pipe(changed('./src/css',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(less())
    .pipe(autofix({
      browsers: [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ],
      cascade: true,
      remove: true
    }))
    .pipe(gulp.dest('./src/css'))
    .pipe(reload({stream: true}))
});

//开启服务
gulp.task('server',()=>{
  browserSync.init({
    server: {
      baseDir:'src',
      index:'html/index.html',
      open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
      injectChanges: true // 注入CSS改变,
    },
    port:8086,
    files:['**/*.js','**/*.html','**/*.css']
  })
});

gulp.task('dealwithes6',async ()=>{
  await gulp.src('src/es6/**/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    }))
    .pipe(gulp.dest('src/es5/'))

  await fileDisplay('src/es5/');
});

gulp.task('buildAllJs',()=>{

});

gulp.task('dealwithless',()=>{
  return gulp.src('./src/less/**/*.less')
    .pipe(less())
    .pipe(autofix({
      browsers: [
        'ie >= 9',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ],
      cascade: true,
      remove: true
    }))
    .pipe(gulp.dest('./src/css'));
});

//开发
gulp.task('dev', ['dealwithes6','dealwithless','server'], ()=>{

  gulp.watch('src/es6/**/*.js', ['babel']);

  gulp.watch('src/es5/**/*.js',(e)=>{
    let realPath = e.path.split(path.delimiter)[0],
      jsPath = path.win32.basename(realPath) ,
      destPath = path.parse(realPath).dir.replace('es5','js');
    console.log(realPath,jsPath,destPath);
    if(e.type === 'changed' || e.type === 'added') {
      browserify(e.path)
        .bundle()
        .pipe(source(jsPath))
        .pipe(buffer())
        .pipe(gulp.dest(destPath))
        .pipe(reload({stream: true}));
    }
  });

  gulp.watch('src/less/**/*.less',['less']);
  gulp.watch('src/html/**/*.html',['dev-copyHtml']);
  gulp.watch('src/images/**/*.*',['dev-copyImages']);



});