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

let copyHtml = () =>{
  return gulp.src('src/html/**/*.html')
    .pipe(changed('./dev/html',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(gulp.dest('./dev/html'));
};

let copyImages = () =>{
  return gulp.src('src/images/**/*.*')
    .pipe(changed('./dev/images',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(gulp.dest('./dev/images'))
};

let less2css = () =>{
  return gulp.src('./src/css/**/*.less')
    .pipe(changed('./dev/css',{hasChanged: changed.compareLastModifiedTime}))
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
    .pipe(gulp.dest('./dev/css'))
    .pipe(reload({stream: true}))
};

let es62es5 = () =>{
  return gulp.src('src/js/**/*.js')
    .pipe(changed('./changed/js',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    }))
    .pipe(gulp.dest('changed/js/'))
};

let buildJs = () =>{
  gulp.watch('changed/js/**/*.js',(e)=>{
    let realPath = e.path.split(path.delimiter)[0],
      jsPath = path.win32.basename(realPath) ,
      destPath = path.parse(realPath).dir.replace('changed','dev');
    if(e.type === 'changed' || e.type === 'added') {
      browserify(e.path)
        .bundle()
        .pipe(source(jsPath))
        .pipe(buffer())
        .pipe(gulp.dest(destPath));
    }
  });
};

//检查目录
gulp.task('checkDir',()=>{
  let changedOk = false,
      devOk = false;
  mkdirFunc('./changed',()=>{
    console.log('succ changed');
    mkdirFunc('./changed/js',()=>{
      es62es5();
      changedOk = true;
    });
  });
  mkdirFunc('./dev',()=>{
    console.log('succ dev');
    mkdirFunc('./dev/js',()=>{

      if(changedOk) {
        buildJs();
      } else {
        let stop = setInterval(()=>{
          if(changedOk) {
            clearInterval(stop);
            buildJs();
          }
        },500);
      }

      mkdirFunc('./dev/css',()=>{

        less2css();

        mkdirFunc('./dev/html',()=>{

          copyHtml();

          mkdirFunc('./dev/images',()=>{

            copyImages();

          });
        });

      });

    });

  })
});

//es6 -> es5
gulp.task('babel',()=>{
  es62es5();
});

//开发时复制HTML到dev目录
gulp.task('dev-copyHtml',()=>{
  copyHtml();
});

//开发时复制images到dev目录
gulp.task('dev-copyImages',()=>{
  copyImages();
});

//less -> css
gulp.task('less',()=>{
  less2css();
});

//开启服务
gulp.task('server',()=>{
  browserSync.init({
    server: {
      baseDir:'dev',
      index:'html/index.html',
      open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
      injectChanges: true // 注入CSS改变,
    },
    port:8086,
    files:['**/*.js','**/*.html','**/*.css']
  })
});

//开发
gulp.task('dev', ['checkDir','server'], ()=>{

  gulp.watch('src/js/**/*.js', ['babel']);

  gulp.watch('src/css/**/*.less',['less']);
  gulp.watch('src/html/**/*.html',['dev-copyHtml']);
  gulp.watch('src/images/**/*.*',['dev-copyImages']);

});