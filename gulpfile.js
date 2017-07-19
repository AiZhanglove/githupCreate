/**
 * Created by ZhangAi on 2017/7/17.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');//提示
var minify = require('gulp-minify');//压缩
var rename = require('gulp-rename');//重命名
var exec = require('child_process').exec;
var watch = require('gulp-watch');//检测
var sass = require('gulp-sass');//sass编译
var uglify = require('gulp-uglify');//丑化、压缩
var pump = require('pump');
var connect = require('gulp-connect');//起服务
var livereload = require('gulp-livereload');//热更新


gulp.task('hot',function(){
    livereload.listen();
    gulp.watch('./client/**/*.*',function(event){
        livereload.changed(event.path);
    })
})

gulp.task('watch',function(){
    gulp.watch(['./client/css/**/*.scss','./client/*.html','./client/js/**/*.js'],['sass','html','minjs'])
})

gulp.task('server',function(){
    connect.server({
        port:'9000',
        root:'./client',
        ip:'0.0.0.0',
        livereload:true,
    })
})
gulp.task('html',function(){
    return gulp.src('client/**/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(notify({message:'html is ok'}))
})


gulp.task('sass',function(){
    return gulp.src('client/css/**/*.scss')
        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
        .pipe(gulp.dest('client/css'))
        .pipe(notify({message:'sass is ok'}))
})

gulp.task('default',function(){
    //console.log('hello world!')
});

gulp.task('pubsass',function(){
    return gulp.src('client/css/**/*.scss')
        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
        .pipe(gulp.dest('build/css'))
        .pipe(notify({message:'pubsass is ok'}))
})

gulp.task('minjs',function(){
    return gulp.src('client/js/**/*.js')
        .pipe(uglify())
        //.pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('build/js'))
        .pipe(notify({message:'minjs is ok'}))

})

gulp.task('jekyll',function(cb){
    exec('jekyll build',function(err){
        if(err) return cb(err);
        cb();
    })
})

gulp.task('build',['html','pubsass','minjs'])
gulp.task('dev',['hot','server','sass','watch'])