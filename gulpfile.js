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
var file = require('gulp-file');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var faker = require('faker');

var baseDir = './prototype';
var nodeModulesDir = baseDir + '/../node_modules';
var uiDir = baseDir + '/ui';
var publicDir = baseDir + '/public';
var publicStylesDir = publicDir + '/styles';
var publicScriptsDir = publicDir + '/scripts';
var publicFontsDir = publicDir + '/fonts';
var stylesDir = uiDir + '/styles';
var scriptsDir = uiDir + '/scripts';
var vendorJS = 'vendor.min.js';
var appJS = 'app.min.js';
var appCSS = 'app.min.css';
var vendorCSS = 'vendor.min.css';
var frontendDependencies = [
  'bootstrap',
  'jQuery'
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

function distMockData() {
  var generators = {
    condition: function (count) {
      var items = [];
      for (var i = 1; i <= count; i++) {
        items.push({
          id: i,
          technicalName: faker.lorem.sentence(2),
          commonName: faker.commerce.productName()
        });
      }
      return items;
    },
    drug: function (count) {
      var items = [];
      for (var i = 1; i <= count; i++) {
        items.push({
          id: i,
          technicalName: faker.lorem.sentence(2),
          commonName: faker.commerce.productName()
        });
      }
      return items;
    },
    participant: function (count) {
        var items = [];
        for (var i = 1; i <= count; i++) {
          items.push({
            id: i,
            age: faker.random.number({min: 3, max: 60})
          });
        }
        return items;
      },
    review: function (count) {
      var items = [];
      for (var i = 1; i <= count; i++) {
        items.push({
          id: i
        });
      }
      return items;
    },
    trial: function (count) {
      var items = [];
      for (var i = 1; i <= count; i++) {
        items.push({
          id: i,
          publicTitle: faker.commerce.productName(),
          scientificTitle: faker.lorem.sentence(2),
          condition: faker.random.number({min: 1, max: 20}), // One of 20 samples
          drug: faker.random.number({min: 1, max: 20}), // One of 20 samples
          year: faker.random.number({min: 1990, max: 2015}),
          country: faker.random.arrayElement(['USA', 'China', 'Russian Federation']),
          intervention: faker.lorem.paragraph(5),
          fundingSource: faker.company.companyName(),
          criteria: faker.lorem.paragraph(5),
          ageRange: [
            faker.random.number({min: 3, max: 18}),
            faker.random.number({min: 20, max: 60})
          ],
          sex: faker.random.arrayElement(['Male', 'Female', 'Both']),
          targetSampleSize: faker.random.number({min: 1000, max: 9999}),
          actualSampleSize: faker.random.number({min: 1000, max: 9999})
        });
      }
      return items;
    }
  };

  var data = {};
  for (var alias in generators) {
    if (generators.hasOwnProperty(alias)) {
      data[alias] = generators[alias](200);
    }
  }

  var str = 'module.exports = ' + JSON.stringify(data, null, 2) + ';\n';
  return file('mocks.js', str, { src: true })
    .pipe(gulp.dest(baseDir + '/models'));
}

gulp.task('app.scripts', distAppScripts);
gulp.task('app.styles', distAppStyles);
gulp.task('vendor.scripts', distVendorScripts);
gulp.task('vendor.styles', distVendorStyles);
gulp.task('vendor.fonts', distVendorFonts);
gulp.task('app.models.mockData', distMockData);
gulp.task('default', [
  'app.scripts',
  'app.styles',
  'vendor.scripts',
  'vendor.styles',
  'vendor.fonts'
]);
