/* eslint-disable @typescript-eslint/no-var-requires */
const del = require('del');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulp = require('gulp');
const swc = require('gulp-swc');
const generateIconComponents = require('./scripts/generateIconComponents');
const STYLE_SOURCE_DIR = './src/less';
const STYLE_DIST_DIR = './dist/css';
const TS_SOURCE_DIR = ['./src/**/*.tsx', './src/**/*.ts', '!./src/**/*.d.ts'];
const ESM_DIR = './esm';
const CJS_DIR = './cjs';
const DIST_DIR = './dist';
const ICON_COMPONENT_DIR = './src/icons';

function buildLess() {
  return gulp
    .src(`${STYLE_SOURCE_DIR}/index.less`)
    .pipe(sourcemaps.init())
    .pipe(less({ javascriptEnabled: true }))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('rsuite-icon.css'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function buildCSS() {
  return gulp
    .src(`${STYLE_DIST_DIR}/rsuite-icon.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${STYLE_DIST_DIR}`));
}

function buildCjs() {
  const swcOptions = {
    module: {
      type: 'commonjs'
    },
    sourceMaps: true,
    exclude: ['stories']
  };
  return gulp.src(TS_SOURCE_DIR).pipe(swc(swcOptions)).pipe(gulp.dest(CJS_DIR));
}

function buildEsm() {
  const swcOptions = {
    module: {
      type: 'es6'
    },
    sourceMaps: true
  };
  return gulp.src(TS_SOURCE_DIR).pipe(swc(swcOptions)).pipe(gulp.dest(ESM_DIR));
}

function clean(done) {
  del.sync([CJS_DIR, ESM_DIR, DIST_DIR, ICON_COMPONENT_DIR], { force: true });
  done();
}

function buildIconComponent(done) {
  del.sync([ICON_COMPONENT_DIR], { force: true });
  generateIconComponents();
  done();
}

exports.buildIconComponent = gulp.series(buildIconComponent);
exports.build = gulp.series(
  clean,
  buildIconComponent,
  gulp.parallel(buildCjs, buildEsm, gulp.series(buildLess, buildCSS))
);
