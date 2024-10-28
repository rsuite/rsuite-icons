/* eslint-disable @typescript-eslint/no-var-requires */
const del = require('del');
const fs = require('fs');
const util = require('util');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulp = require('gulp');
const swc = require('gulp-swc');
const svgToReact = require('./scripts/svgToReact');
const generateIconComponents = require('./scripts/generateIconComponents');
const proxyDirectories = require('./scripts/proxyDirectories');

const lessDir = './src/less';
const tsSrcFiles = ['./src/**/*.tsx', './src/**/*.ts', '!./src/**/*.d.ts'];
const libRoot = path.join(__dirname, './lib');
const pkg = require('./package.json');

const esmRoot = path.join(libRoot, 'esm');
const cjsRoot = path.join(libRoot, 'cjs');
const cssRoot = path.join(libRoot, 'dist/css');

const ICON_COMPONENT_DIR = './src/react';

const writeFile = util.promisify(fs.writeFile);

function buildLess() {
  return gulp
    .src(`${lessDir}/index.less`)
    .pipe(sourcemaps.init())
    .pipe(less({ javascriptEnabled: true }))
    .pipe(postcss([require('autoprefixer')]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('rsuite-icon.css'))
    .pipe(gulp.dest(`${cssRoot}`));
}

function buildCSS() {
  return gulp
    .src(`${cssRoot}/rsuite-icon.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(`${cssRoot}`));
}

function buildCjs() {
  const swcOptions = {
    module: {
      type: 'commonjs'
    },
    sourceMaps: true,
    exclude: ['stories']
  };
  return gulp.src(tsSrcFiles).pipe(swc(swcOptions)).pipe(gulp.dest(cjsRoot));
}

function buildEsm() {
  const swcOptions = {
    module: {
      type: 'es6'
    },
    sourceMaps: true
  };
  return gulp.src(tsSrcFiles).pipe(swc(swcOptions)).pipe(gulp.dest(esmRoot));
}

function clean(done) {
  del.sync([libRoot, ICON_COMPONENT_DIR], { force: true });
  done();
}

function buildDirectories(done) {
  proxyDirectories().then(() => {
    done();
  });
}

function buildIconComponent(done) {
  del.sync([ICON_COMPONENT_DIR], { force: true });
  generateIconComponents();
  done();
}

function copyDocs() {
  return gulp
    .src(['./README.md', './CHANGELOG.md', './LICENSE', './src/meta.json'])
    .pipe(gulp.dest(libRoot));
}

function createPkgFile(done) {
  delete pkg.devDependencies;
  delete pkg.files;

  pkg.main = 'cjs/index.js';
  pkg.module = 'esm/index.js';
  pkg.typings = 'esm/index.d.ts';
  pkg.scripts = {};

  writeFile(`${libRoot}/package.json`, JSON.stringify(pkg, null, 2) + '\n')
    .then(() => {
      done();
    })
    .catch(err => {
      if (err) console.error(err.toString());
    });
}

exports.svgToReact = cb => {
  svgToReact();
  cb();
};

exports.buildIconComponent = gulp.series(buildIconComponent);
exports.build = gulp.series(
  clean,
  buildIconComponent,
  gulp.parallel(buildCjs, buildEsm, gulp.series(buildLess, buildCSS)),
  gulp.parallel(copyDocs, createPkgFile),
  buildDirectories
);
