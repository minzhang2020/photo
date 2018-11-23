const gulp = require('gulp')
const stylus = require('gulp-stylus')
const runSequence = require('run-sequence')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const del = require('del')
const plumber = require('gulp-plumber')
const cssSrc = 'src/stylus/*.styl'
const tempSrc = 'src/views/*.*'

gulp.task('stylus', function() {
  return gulp
    .src('src/stylus/main.styl')
    .pipe(plumber())
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(rev())
    .pipe(gulp.dest('./web/css'))
    .pipe(
      rev.manifest({
        merge: true // Merge with the existing manifest if one exists
      })
    )
    .pipe(gulp.dest('rev/'))
})

gulp.task('revTemp', function() {
  return gulp
    .src(['rev/*.json', tempSrc])
    .pipe(revCollector())
    .pipe(gulp.dest('./web/views'))
})
gulp.task('build-clean', function() {
  return del(['./web/css/*.*', './web/views/*.*'])
})

gulp.task('watch', function() {
  var watcher = gulp.watch([cssSrc, tempSrc])
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    runSequence('build-clean', 'stylus', 'revTemp')
  })
})

gulp.task('default', function(done) {
  runSequence('build-clean', 'stylus', 'revTemp', done)
})
