var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var watchify = require('watchify');
var resolve = require('resolve');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var baseDir = './prototype';
var nodeModulesDir = baseDir + '/../node_modules';
var srcDir = baseDir + '/ui';
var publicDir = baseDir + '/public';
var publicStylesDir = publicDir + '/styles';
var publicScriptsDir = publicDir + '/scripts';
var publicFontsDir = publicDir + '/fonts';
var stylesDir = srcDir + '/styles';
var scriptsDir = srcDir + '/scripts';
var vendorJS = 'vendor.min.js';
var appJS = 'app.min.js';
var appCSS = 'app.min.css';
var vendorCSS = 'vendor.min.css';
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
    .pipe(gulp.dest(publicScriptsDir));

}

/**
 * Provide frontend dependencies as a single bundle.
 */
function distVendorScripts() {

  return gulp
    .src([
      nodeModulesDir + '/jquery/dist/jquery.min.js',
      nodeModulesDir + '/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat(vendorJS))
    .pipe(gulp.dest(publicScriptsDir));

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
  return scriptPipeline(bundler.bundle(), appJS)
           .pipe(reload({stream: true}));

}

/**
 * Provide frontend styles as a single bundle.
 */
function distAppStyles() {

  return gulp
    .src(stylesDir + '/app.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer({browsers: ['last 4 versions']}))
    .pipe(sourcemaps.write(publicDir))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(appCSS))
    .pipe(gulp.dest(publicStylesDir));

}

function distVendorStyles() {

  return gulp
    .src([
      nodeModulesDir + '/bootstrap/dist/css/bootstrap.min.css'
    ])
    .pipe(concat(vendorCSS))
    .pipe(gulp.dest(publicStylesDir));

}

function distVendorFonts() {

  return gulp
    .src([
      nodeModulesDir + '/bootstrap/dist/fonts/*'
    ])
    .pipe(gulp.dest(publicFontsDir));

}

gulp.task('app.scripts', distAppScripts);
gulp.task('app.styles', distAppStyles);
gulp.task('vendor.scripts', distVendorScripts);
gulp.task('vendor.styles', distVendorStyles);
gulp.task('vendor.fonts', distVendorFonts);
gulp.task('default', [
  'app.scripts',
  'app.styles',
  'vendor.scripts',
  'vendor.styles',
  'vendor.fonts'
]);
