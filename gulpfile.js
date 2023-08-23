const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const cssnano = require('cssnano')

//magenes

const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
  //compilar sass
  //Pasos 1: identificar, 2:compilar 3:guardar el css
  src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));

  done();
}

function imagenes(){
   return src("src/img/**/*")
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest("build/img"))
}

function versionWebp(){
  const opciones = {
    qualit: 50
  }
  return src('src/img/**/*.{png,jpg}')
   .pipe(webp(opciones))
   .pipe(dest('build/img'))
}

function versionAvif(){
  const opciones = {
    qualit: 50
  }
  return src('src/img/**/*.{png,jpg}')
  .pipe(avif(opciones))
  .pipe(dest('build/img'))
}

function dev() {
  watch("src/scss/**/*.scss", css)
  watch("src/scss/**/*", imagenes)
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );
//seriesse inicia una trea hasta que finaliza inicia la siguiente 
//parallel: todas inician al mimso tiempo