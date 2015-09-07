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
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var baseDir = './prototype';
var srcDir = baseDir + '/ui';
var publicDir = baseDir + '/public';
var stylesDir = srcDir + '/styles';
var scriptsDir = srcDir + '/scripts';
var vendorJS = 'vendor.min.js';
var appJS = 'app.min.js';
var appCSS = 'app.min.css';
var frontendDependencies = [
  'bootstrap'
];

/**
 * Run and return the scripts pipeline on bundle
 */
function scriptPipeline(bundle, outfile) {

  return bundle
    //.pipe(sourcemaps.init())
    .pipe(source(outfile))
    .pipe(buffer())
    .pipe(uglify())
    //.pipe(sourcemaps.write(publicDir))
    .pipe(gulp.dest(publicDir));

}

/**
 * Provide frontend dependencies as a single bundle.
 */
function distVendorScripts() {

  var bundler = browserify({});

  frontendDependencies.forEach(function(id) {
    bundler.require(resolve.sync(id), {expose: id});
  });

  return scriptPipeline(bundler.bundle(), vendorJS);

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
        scriptPipeline(bundler.bundle(), appJS);
      });
  }
  console.log(scriptsDir + '/app.js');
  console.log(appJS);
  return scriptPipeline(bundler.bundle(), appJS)
           .pipe(reload({stream: true}));

}

/**
 * Provide frontend styles as a single bundle.
 */
function distStyles() {

  return gulp
    .src(stylesDir + '/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer({browsers: ['last 4 versions']}))
    .pipe(sourcemaps.write(publicDir))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(appCSS))
    .pipe(gulp.dest(publicDir));

}

gulp.task('scripts', distAppScripts);
gulp.task('styles', distStyles);
gulp.task('vendor', distVendorScripts);
gulp.task('default', ['scripts', 'styles', 'vendor']);
