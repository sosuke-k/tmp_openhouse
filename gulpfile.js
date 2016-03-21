var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var exec = require('child_process').exec;
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));

gulp.task('nbconvert:slides', function (cb) {
  var cmd = 'ipython nbconvert --to slides ' + argv['y'] + '.ipynb --stdout | python ipy_hide_input > ./dest/index.html';
  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task( 'copy:static', function() {
    return gulp.src(
        [ 'static/reveal.js/**', 'static/*.css' ],
        { base: 'static' }
    )
    .pipe( gulp.dest( 'dest' ) );
} );

gulp.task('deploy:gh-pages', ['nbconvert:slides', 'copy:static'], function() {
  return gulp.src('./dest/**/*')
    .pipe(ghPages());
});
