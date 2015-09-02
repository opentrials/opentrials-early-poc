var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var watchify = require('watchify');
var resolve = require('resolve');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var baseDir = './prototype';
var srcDir = baseDir + '/src';
var distDir = baseDir + '/dist';
var stylesDir = srcDir + '/styles';
var scriptsDir = srcDir + '/scripts';

var frontendDependencies = [
  'bootstrap'
];


/**
 * Run and return the scripts pipeline on bundle
 */
function scriptPipeline(bundle, outfile) {

  return bundle
           .pipe(source(outfile))
           .pipe(buffer())
           .pipe(uglify())
           .pipe(gulp.dest(distDir));
}

/**
 * Provide frontend dependencies as a single bundle.
 */
function distVendorScripts() {

  var bundler = browserify({});

  frontendDependencies.forEach(function (id) {
    bundler.require(resolve.sync(id), {expose: id});
  });

  return scriptPipeline(bundler.bundle(), 'vendor.min.js');

}

/**
 * Provide frontend app as a single bundle.
 */
function distAppScripts() {

  var bundler = browserify({
    entries: [scriptsDir + '/app.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
    // transform: [],
  });

  // Don't include vendor dependencies in this bundle
  bundler.external(frontendDependencies);


  if (process.env.WATCH === 'true') {
    bundler = watchify(bundler);
    bundler
      .on('update', function() {
        scriptPipeline(bundler.bundle(), 'app.min.js');
      });
  }

  return scriptPipeline(bundler.bundle(), 'app.min.js')
           .pipe(reload({stream: true}));

}


/**
 * Provide frontend styles as a single bundle.
 */
function distStyles() {

  return gulp
    .src(stylesDir + '/app.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(distDir));


}


gulp.task('app-scripts', distAppScripts);
gulp.task('vendor-scripts', distVendorScripts);
gulp.task('styles', distStyles);
gulp.task('default', ['vendor-scripts', 'app-scripts', 'styles']);
