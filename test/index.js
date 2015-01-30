
var assert = require('assert')
var cloneRegex = require('../');

describe('regexp-clone', function(){
  function hasEqualSource (a, b) {
    assert.ok(a !== b);
    assert.equal(a.source, b.source);
  }

  function isInsensitive (a) {
    assert.ok(a.ignoreCase);
  }

  function isGlobal (a) {
    assert.ok(a.global);
  }

  function isMultiline (a) {
    assert.ok(a.multiline);
  }

  function insensitiveFlag (a) {
    var b = cloneRegex(a);
    hasEqualSource(a, b);
    isInsensitive(a);
    isInsensitive(b);
  }

  function globalFlag (a) {
    var b = cloneRegex(a);
    hasEqualSource(a, b);
    isGlobal(a);
    isGlobal(b);
  }

  function multilineFlag (a) {
    var b = cloneRegex(a);
    hasEqualSource(a, b);
    isMultiline(a);
    isMultiline(b);
  }

  describe('literals', function(){
    it('insensitive flag', function(done){
      var a = /hello/i;
      insensitiveFlag(a);
      done();
    })
    it('global flag', function(done){
      var a = /hello/g;
      globalFlag(a);
      done();
    })
    it('multiline flag', function(done){
      var a = /hello/m;
      multilineFlag(a);
      done();
    })
    it('no flags', function(done){
      var a = /hello/;
      var b = cloneRegex(a);
      hasEqualSource(a, b);
      assert.ok(!a.insensitive);
      assert.ok(!a.global);
      assert.ok(!a.global);
      done();
    })
    it('all flags', function(done){
      var a = /hello/gim;
      insensitiveFlag(a);
      globalFlag(a);
      multilineFlag(a);
      done();
    })
    it('should add flags provided as a string', function(done) {
      var a = /hello/g;
      var b = cloneRegex(a, 'mi');
      assert.ok(b.global);
      assert.ok(b.multiline);
      assert.ok(b.ignoreCase);
      done();
    })
    it('should add flags from an object', function(done) {
      var a = /hello/g;
      var b = cloneRegex(a, {
        multiline: true,
        ignoreCase: true
      });
      assert.ok(b.global);
      assert.ok(b.multiline);
      assert.ok(b.ignoreCase);
      done();
    })
    it('should preserve flags that are missing in a given override object', function(done) {
      var a = /hello/g;
      var b = cloneRegex(a, {});
      assert.ok(b.global);
      assert.ok(!b.multiline);
      assert.ok(!b.ignoreCase);
      done();
    })
    it('should override true flags', function(done) {
      var a = /hello/g;
      var b = cloneRegex(a, {
        'global': false,
        multiline: true,
        ignoreCase: true
      });
      assert.ok(!b.global);
      assert.ok(b.multiline);
      assert.ok(b.ignoreCase);
      done();
    })
  })

  describe('instances', function(){
    it('insensitive flag', function(done){
      var a = new RegExp('hello', 'i');
      insensitiveFlag(a);
      done();
    })
    it('global flag', function(done){
      var a = new RegExp('hello', 'g');
      globalFlag(a);
      done();
    })
    it('multiline flag', function(done){
      var a = new RegExp('hello', 'm');
      multilineFlag(a);
      done();
    })
    it('no flags', function(done){
      var a = new RegExp('hmm');
      var b = cloneRegex(a);
      hasEqualSource(a, b);
      assert.ok(!a.insensitive);
      assert.ok(!a.global);
      assert.ok(!a.global);
      done();
    })
    it('all flags', function(done){
      var a = new RegExp('hello', 'gim');
      insensitiveFlag(a);
      globalFlag(a);
      multilineFlag(a);
      done();
    })
  })

  describe('toFlagString', function() {
    it('should convert a flag object to a string of flag characters', function(done) {
      assert.deepEqual(cloneRegex.toFlagString({
        'global': true,
        'ignoreCase': false
      }), 'g')
      done();
    })
  })

  describe('parseFlagString', function() {
    it('should convert a string of flag characters to a flag object', function(done) {
      assert.deepEqual(cloneRegex.parseFlagString('gmi'), {
        'global': true,
        'multiline': true,
        'ignoreCase': true
      })
      done();
    })
  })
})

