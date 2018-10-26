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
      rename = require('gulp-rename'),
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
gulp.task('dev',['html','less','test','imgs','server'],()=>{
  gulp.watch('./src/html/**/*.html',['html']);
  gulp.watch('./src/css/**/*.less',['less']);
  gulp.watch('./src/js/**/*.js',['test']);
  //gulp.watch('./changed/es6/**/*.js',['browserify']);
  //gulp.watch('./changed/js/**/*.js',['es6']);
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
  gulp.src('./changed/es6')
    .pipe(clean())
});

gulp.task('test',()=>{
  cleanChanged()
    .then(res=>{
      es6()
        .then(res=>{

          es52es6Over();

        })
        .catch(err=>{
          console.log(err)
        })
    })
    .catch(err=>{
      console.log(err)
    });

});

let es52es6Over = () =>{

  let stop = null,filesCount = 0;
  clearInterval(stop);

  stop = setInterval(()=>{
    fs.readdir('./changed/es6',(err,files)=>{
      if(err) {
        console.log(err);
      }
      if(files!==undefined) {
        clearInterval(stop);
        filesCount = files.length;
        setTimeout(()=>{
          fs.readdir('./changed/es6',(err,files)=> {
            if (err) {
              console.log(err);
            }

            if(files.length === filesCount) {
              browserifyFunc();
            } else {
              es52es6Over();
            }

          })
        },500);
        console.log(files)
        //
      }

    });

  },100);
};

let cleanChanged = async () =>{
  return await gulp.src('./changed/es6')
    .pipe(clean())
};

let es6 = async () =>{
    return await gulp.src('./src/js/**/*.js')
      .pipe(changed('./dev/js',{hasChanged: changed.compareLastModifiedTime}))
      //.pipe(named())//对应的文件名
      /*.pipe(rename((path)=>{
        path.basename += '-' + changedId;
      }))*/
      .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/transform-runtime']
      }))
      .pipe(gulp.dest('./changed/es6'));
};

let browserifyFunc = () =>{
    glob('./changed/es6/**/*.js',{},(err,files)=>{
      console.log(files);
      let filename = '';
      files.map((file,index)=>{
        filename = file.replace('./changed/es6','.').replace('.js','');
        console.log(filename);
        let b = browserify(file)
          .bundle()
          .pipe(source(filename+'-bundle.js'))
          .pipe(buffer())
          .pipe(gulp.dest('./dev/js'));
      });
      console.log('---over---')
    });
};

/*gulp.task('es6',['test'],()=>{

  let stop = setInterval(()=>{
    fs.readdir('./changed/js/',(err,files)=>{
      err && console.log(err);
      console.log(files)
      if(files !== undefined && files.length > 0) {
        clearInterval(stop);
        gulp.src('./changed/js/!**!/!*.js')

      }
    });
  },100);
});*/


gulp.task('browserify', function() {

  glob('./changed/es6/**/*.js',{},(err,files)=>{
    console.log(files);
    let filename = '';
    files.map((file,index)=>{
      filename = file.replace('./changed/es6','.').replace('.js','');
      console.log(filename);
      let b = browserify(file)
        .bundle()
        .pipe(source(filename+'-bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dev/js'));
    });
    console.log('---over---')
  });

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

