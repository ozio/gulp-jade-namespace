# gulp-jade-namespace

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Wrap Jade client templates with custom namespace.

Replace `function template(locals) {` with

```js
window["Templates"] = window["Templates"] || {};
window["Templates"]["path_to/template_without_extention"] = function(locals) {
```

## Install

```
$ npm install gulp-jade-namespace --save-dev
```

## Usage

```js
var gulp = require('gulp');
var jade = require('jade');
var namespace = require('gulp-jade-namespace');

gulp.task('client-templates', function () {
  return gulp.src('templates/**/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(namespace())
    .pipe(gulp.dest('public/templates/'));
});
```

## Options

```json
{
  "namespace": "Templates",
  "global": true,
  "compressed": false
}
```

## License

MIT © [Nikolay Solovyov](http://ozio.io)

[downloads-image]: http://img.shields.io/npm/dm/gulp-jade-namespace.svg
[npm-url]: https://npmjs.org/package/gulp-jade-namespace
[npm-image]: http://img.shields.io/npm/v/gulp-jade-namespace.svg
[travis-url]: https://travis-ci.org/ozio/gulp-jade-namespace
[travis-image]: https://travis-ci.org/ozio/gulp-jade-namespace.svg?branch=master