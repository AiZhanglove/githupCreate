/**
 * Created by ZhangAi on 2017/7/17.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

gulp.task('default',function(){
    //console.log('hello world!')
});



gulp.task('minjs',function(){
    return gulp.src('client/js/**/*.js')
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        //.pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('build/js'))
        .pipe(notify({message:'js is ok'}))

})

//gulp.task('build',['minjs'],function(){
//
//})