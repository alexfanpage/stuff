gulp = require('gulp')
gutil = require('gulp-util')
concat = require('gulp-concat')
coffee = require('gulp-coffee')
defineModule = require('gulp-define-module')
nib = require('nib')

handleErrors = (stream) ->
  stream.on 'error', ->
    gutil.log.apply(this, arguments)
    stream.end()

gulp.task 'coffee', ->
  gulp.src('./app/views/**/*.coffee')
      .pipe(handleErrors(coffee({bare: true})))
      .pipe(gulp.dest('./public/javascripts/'))

gulp.task 'watch', ->
  gulp.watch('./app/views/**/*.coffee', ['coffee'])

gulp.task('default', ['watch', 'coffee'])
