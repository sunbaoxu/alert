 var gulp  = require ('gulp'),
			$=require("gulp-load-plugins")(),
			 browserify = require('browserify'),
			 source = require('vinyl-source-stream');

/*活动模板*/
/*gulp.task('convertJS', function(){
  return gulp.src(['./hd/template/assets/javascripts/index-m.js','./hd/template/assets/javascripts/index.js'])
    .pipe($.babel({
      presets: ['es2015']
    }))
   .pipe($.uglify())
   .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(gulp.dest('./hd/template/assets/javascripts/'))
});

gulp.task('scripts5', () => {
  return gulp.src('./hd/template/assets/javascripts/*.min.js')
    .pipe($.rev())//- 文件名加MD5后缀
     .pipe(gulp.dest('./hd/template/dist/javascripts/'))
    .pipe($.rev.manifest()) //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./hd/template/assets/json/')) //- 将 rev-manifest.json 保存到 rev 目录内
});
　　
gulp.task('html5', ['scripts5'], () => {
  return gulp.src(['./hd/template/assets/json/*.json', './hd/template/*.html'])//获取rev-manifest.json和要替换的html文件
    .pipe($.revCollector({replaceReved: true}))//根据rev-manifest.json的规则替换html里的路径，由于替换是根据rev-manifest.json规则来的，所以一定要先生成这个文件再进行替换
    .pipe(gulp.dest('./hd/template/dist/'));
});*/

gulp.task("js",function(){
  gulp.src('./js/index.js')  
      .pipe($.babel({
          presets: ['es2015']
        }))
      .pipe($.uglify())
      .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
      .pipe(gulp.dest('./js/'));  
});
gulp.task("browserify", function() {
    var b = browserify({
        entries: "./js/index.min.js"
    });
    return b.bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./js/"));
});

// 解析css
gulp.task("css",function () {
  gulp.src("./css/*.scss")
  .pipe($.sass())
  .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: true, //是否美化属性值 默认：true
      remove:true //是否去掉不必要的前缀 默认：true
  }))
 // .pipe(gulp.dest('./hd/template/assets/stylesheets/'))
  .pipe( $.minifyCss() )
  .pipe($.rename({suffix: '.min'}))   //rename压缩后的文件名
  .pipe( gulp.dest("./css/"))
})
gulp.task("reload",function () {
  gulp.src([
    "./css/*.css",
    "./*.html"
    ])
  .pipe($.connect.reload())
})
//开启服务器
gulp.task("webserver",function () {
  $.connect.server({
    port : "2222",
    livereload : true,
    root: "./"
  })
})

gulp.watch([
"./css/*.scss"
],["css","reload"])//关联文件

gulp.watch([
"./js/*.js"
],['js',"browserify","reload"])//关联文件
gulp.watch([
"./*.html",
],["reload"])//关联文件

gulp.task("default",["css","js","browserify","webserver"])

