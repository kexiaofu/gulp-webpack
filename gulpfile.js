//开发，编译，生产

let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autofix = require('gulp-autoprefixer'),
    changed = require('gulp-changed'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css'),
    config = require('./config'),
    webpack = require('webpack-stream'),
    imagemin = require('gulp-imagemin'),
    named = require('vinyl-named'),
    htmlmin = require('gulp-htmlmin');

//dev
gulp.task('dev',['html','less','es6','imgs','server'],()=>{
  gulp.watch('./src/html/**/*.html',['html']);
  gulp.watch('./src/css/**/*.less',['less']);
  gulp.watch('./src/js/**/*.js',['es6']);
  gulp.watch('./src/images/**/*.{png,jpg,ico}',['imgs']);
});

gulp.task('server',()=>{
  browserSync.init({
    server: {
      baseDir:'dev',
      index:'./html/index.html',
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

gulp.task('es6',()=>{
  return gulp.src('./src/js/**/*.js')
    .pipe(changed('./dev/js',{hasChanged: changed.compareLastModifiedTime}))
    .pipe(named())//对应的文件名
    .pipe(webpack(
      //webpack也是异步的，导致会刷新2次才正确显示
      config.webpackConfig
    ))
    .pipe(gulp.dest('./dev/js'))
    //.pipe(reload({stream: true}))

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

