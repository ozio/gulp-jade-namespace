var fs        = require('fs');
var gutil     = require('gulp-util');
var assert    = require('assert');
var namespace = require('../');
var should    = require('should');

var root_content  = fs.readFileSync('test/fixtures/root.js');
var inner_content = fs.readFileSync('test/fixtures/folder/inner.js');

require('mocha');

describe('gulp-jade-namespace', function() {
  it('should render js-template with default namespace', function(done) {
    var stream   = namespace();
    var fakeFile = new gutil.File({
      base:     'test/fixtures/',
      cwd:      'test/',
      path:     'test/fixtures/root.js',
      contents: root_content
    });

    stream.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/fixtures/expected/namespace_1.js', 'utf8'));
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });

  it('should render js-template with custom namespace', function(done) {
    var stream   = namespace({
      namespace: 'tpl'
    });
    var fakeFile = new gutil.File({
      base:     'test/fixtures/',
      cwd:      'test/',
      path:     'test/fixtures/root.js',
      contents: root_content
    });

    stream.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/fixtures/expected/namespace_2.js', 'utf8'));
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });

  it('should render js-template with name contains path', function(done) {
    var stream   = namespace();
    var fakeFile = new gutil.File({
      base:     'test/fixtures/',
      cwd:      'test/',
      path:     'test/fixtures/folder/inner.js',
      contents: inner_content
    });

    stream.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/fixtures/expected/inner.js', 'utf8'));
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });

  it('should render js-template without global binding', function(done) {
    var stream   = namespace({
      global:    false,
      namespace: 'templates'
    });
    var fakeFile = new gutil.File({
      base:     'test/fixtures/',
      cwd:      'test/',
      path:     'test/fixtures/root.js',
      contents: root_content
    });

    stream.once('data', function(newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      String(newFile.contents).should.equal(fs.readFileSync('test/fixtures/expected/local.js', 'utf8'));
      done();
    });
    stream.write(fakeFile);
    stream.end();
  });


});