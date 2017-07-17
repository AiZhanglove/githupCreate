/**
 * Created by ZhangAi on 2017/7/17.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var watch = require('gulp-watch');
var sass = require('gulp-sass');





gulp.task('sass',function(){
    return gulp.src('client/css/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('build/css'))
})

gulp.task('default',function(){
    //console.log('hello world!')
});

gulp.task('sass',function(){
    return gulp.src('client/css/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('build/css'))
        .pipe(notify({message:'sass is ok'}))
})


gulp.task('minjs',function(){
    return gulp.src('client/js/**/*.js')
        .pipe(minify({
            ext:{
                //src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
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

gulp.task('build',['minjs'],function(){

})