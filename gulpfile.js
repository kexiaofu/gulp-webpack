//开发，编译，生产

const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload,
      autofix = require('gulp-autoprefixer'),
      changed = require('gulp-changed'),
      less = require('gulp-less'),
      cleanCss = require('gulp-clean-css'),
      config = require('./config'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      browserify = require('browserify'),
      named = require('vinyl-named'),
      htmlmin = require('gulp-htmlmin'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      glob = require('glob'),
      clean = require('gulp-clean');

const path = require('path'),
      fs = require('fs');


//dev
gulp.task('dev',['html','less','es6','imgs','server'],()=>{
  gulp.watch('./src/html/**/*.html',['html']);
  gulp.watch('./src/css/**/*.less',['less']);
  //gulp.watch('./src/js/**/*.js',['es6']);
  gulp.watch('./src/js/**/*.js',['test1']);
  gulp.watch('./src/images/**/*.{png,jpg,ico}',['imgs']);
});

gulp.task('server',()=>{
  browserSync.init({
    server: {
      baseDir:'dev',
      //index:'/',
      open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
      injectChanges: true // 注入CSS改变,
    },
    port:8005,
    files:['**/*.js','**/*.html','**/*.css']
  })
});

gulp.task('html',()=>{
  return gulp.src('./src/html/**/*.html')
    .pipe(changed('./dev/html',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(gulp.dest('./dev/html'))
    .pipe(reload({stream: true}))
});

gulp.task('less',()=>{
  return gulp.src('./src/css/**/*.less')
    .pipe(less())
    .pipe(autofix(config.autofix))
    .pipe(gulp.dest('./dev/css'))
    .pipe(reload({stream: true}))
});

gulp.task('clean-changed',()=>{
  gulp.src('./changed')
    .pipe(clean())
});

gulp.task('test',['clean-changed'],()=>{
  gulp.src('./src/js/**/*.js')
    .pipe(changed('./dev/js',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(gulp.dest('./changed/js'))
});

gulp.task('es6',['test'],()=>{

  setTimeout(()=>{
    fs.readdir('./changed',(err,files)=>{
      if(err) {
        return console.log(err);
      }

      if(files.length > 0) {
        return gulp.src('./changed/js/**/*.js')
          .pipe(named())//对应的文件名
          .pipe(babel({
            presets: ['@babel/env'],
            plugins: ['@babel/transform-runtime']
          }))
          .pipe(gulp.dest(path.join(__dirname,'./changed/js')))
      }
    });
  },0);




});

gulp.task('browserify',['es6'], function() {
  glob('./changed/js/**/*.js',{},(err,files)=>{
    console.log(files);
    files.map(file=>{
      let b = browserify(file)
            .bundle()
            .pipe(source(file+'-bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest(path.join(__dirname,'./dev/js')));
    });
  });
  //gulp.run('clean-changed')
  /*return browserify('./dev/js/index.js')
    .bundle()
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer())
    .pipe(gulp.dest('./dev/js'));*/
});

gulp.task('imgs',()=>{
  gulp.src('./src/images/**/*.{png,jpg,ico}')
    .pipe(gulp.dest('./dev/images'))
});

//build
gulp.task('build',['copyjs','minicss','minihtml','minimages'],()=>{
  console.log('build');
});

gulp.task('minicss',()=>{
  return gulp.src('./dev/css/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('./build/css'))

});

gulp.task('minihtml',()=>{
  return gulp.src('./dev/html/**/*.html')
    .pipe(htmlmin(config.minihtmlConfig))
    .pipe(gulp.dest('./build/html'))

});

gulp.task('copyjs',()=>{
  return gulp.src('./dev/js/**/*.js')
    .pipe(htmlmin(config.minihtmlConfig))
    .pipe(gulp.dest('./build/js'))
});

gulp.task('minimages',()=>{
  return gulp.src('./dev/images/**/*.{png,jpg,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
});

