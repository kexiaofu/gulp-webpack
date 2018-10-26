let gulp = require('gulp'),
  autofix = require('gulp-autoprefixer'),
  changed = require('gulp-changed'),
  less = require('gulp-less'),
  cleanCss = require('gulp-clean-css'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  fileInclude = require('gulp-file-include'),
  proxy = require('http-proxy-middleware'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify');

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
              console.log(filedir,jsPath,destPath,'first');
              browserify(filedir)
                .bundle()
                .pipe(source(jsPath))
                .pipe(buffer())
                .pipe(gulp.dest(destPath));
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
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    }))
    .pipe(gulp.dest('src/es5/'))
});

//less -> css
gulp.task('less',()=>{
  return gulp.src('./src/less/**/*.less')
    .pipe(changed('./src/css',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(plumber())
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

let proxyApi = proxy('/api',{
  target:'http://192.169.2.157:56790',
  changeOrigin:true
});

//开启服务
gulp.task('server',()=>{
  browserSync.init({
    server: {
      baseDir:'./',
      //index:'src/html/index.html',
      middleware:[proxyApi]
    },
    port:8086,
    open: false,
    injectChanges: true // 注入CSS改变,
    //files:['**/*.js','**/*.html','**/*.css']
  })
});

gulp.task('dealwithhtml',()=>{
  return gulp.src(['src/tempHtml/**/*.html','!src/tempHtml/head.html'])
    .pipe(fileInclude())
    .pipe(gulp.dest('src/html/'))
});

gulp.task('dealwithes6',()=>{
   return gulp.src('src/es6/**/*.js')
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/transform-runtime']
      }))
      .pipe(gulp.dest('src/es5/'))
});

gulp.task('buildAllJs',['dealwithes6'],()=>{
  return fileDisplay('src/es5/');
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
gulp.task('dev', ['buildAllJs','dealwithhtml','dealwithless','server'], ()=>{

  gulp.watch('src/es6/**/*.js', ['babel']);

  gulp.watch('src/es5/**/*.js',(e)=>{
    let realPath = e.path.split(path.delimiter)[0],
      jsPath = path.win32.basename(realPath) ,
      destPath = path.parse(realPath).dir.replace('es5','js');
    console.log(realPath,jsPath,destPath,'watch');
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
  gulp.watch(['src/tempHtml/**/*.html','!src/tempHtml/head.html']).on('change',(e)=>{
    console.log(e.path,path.parse(e.path).dir.replace('tempHtml','html'));
    gulp.src(e.path)
      .pipe(fileInclude())
      .pipe(gulp.dest(path.parse(e.path).dir.replace('tempHtml','html')))
      .pipe(reload({stream: true}));
  });
  gulp.watch(['src/tempHtml/head.html'],()=>{
    gulp.src(['src/tempHtml/**/*.html','!src/tempHtml/head.html'])
      .pipe(fileInclude())
      .pipe(gulp.dest('src/html'))
      .pipe(reload({stream: true}));
  });
  gulp.watch('src/images/**/*.*').on('change',browserSync.reload);

});


//生产
gulp.task('miniCss',()=>{
  return gulp.src('./src/css/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('miniHtml',()=>{
  return gulp.src('./src/html/**/*.html')
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
    }))
    .pipe(gulp.dest('./dist/html'))

});

gulp.task('copyJs',()=>{
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('minImages',()=>{
  return gulp.src('./src/images/**/*.{png,jpg,jpeg,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
});

gulp.task('moveFont',()=>{
  return gulp.src('./src/fonts')
    .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('build',['miniCss','miniHtml','copyJs','minImages','moveFont'],()=>{
  console.log('build ok!')
});