const gulp = require("gulp");
const stylus = require("gulp-stylus");
const runSequence = require("run-sequence");
const rev = require("gulp-rev");
const revCollector = require("gulp-rev-collector");
const del = require("del");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const cssSrc = "src/stylus/*.styl";
const tempSrc = "src/views/*.*";
const jsSrc = "src/js/*.js";
gulp.task("stylus", function() {
  return gulp
    .src("src/stylus/main.styl")
    .pipe(plumber())
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(rev())
    .pipe(gulp.dest("./web/css"))
    .pipe(
      rev.manifest({
        merge: true // Merge with the existing manifest if one exists
      })
    )
    .pipe(gulp.dest("rev/css/"));
});

gulp.task("js", function() {
  return gulp
    .src(jsSrc)
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./web/js"))
    .pipe(
      rev.manifest({
        merge: true // Merge with the existing manifest if one exists
      })
    )
    .pipe(gulp.dest("rev/js/"));
});

gulp.task("revTemp", function() {
  return gulp
    .src(["rev/**/*.json", tempSrc])
    .pipe(revCollector())
    .pipe(gulp.dest("./web/views"));
});
gulp.task("build-clean-web", function() {
  return del(["./web/css/*.*", "./web/views/*.*", "./web/js/*.*"]);
});

gulp.task("build-clean", function() {
  return del("dist/**/*");
});

gulp.task("watch", function() {
  var watcher = gulp.watch([cssSrc, tempSrc, jsSrc]);
  watcher.on("change", function(event) {
    console.log(
      "File " + event.path + " was " + event.type + ", running tasks..."
    );
    runSequence("build-clean", "stylus", "js", "revTemp");
  });
});
gulp.task("build", function() {
  gulp
    .src(["server/**/*", "package.json", "web/**/*"], { base: "." })
    .pipe(gulp.dest("dist"));
});

gulp.task("default", function(done) {
  runSequence(
    ["build-clean", "build-clean-web"],
    ["stylus", "js"],
    "revTemp",
    "build",
    done
  );
});
