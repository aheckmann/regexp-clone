
const assert = require('assert')
const clone = require('../');

describe('regexp-clone', function () {
  function hasEqualSource(a, b) {
    assert.ok(a !== b);
    assert.equal(a.source, b.source);
  }

  function isIgnoreCase(a) {
    assert.ok(a.ignoreCase);
  }

  function isGlobal(a) {
    assert.ok(a.global);
  }

  function isMultiline(a) {
    assert.ok(a.multiline);
  }

  function isDotAll(a) {
    assert.ok(a.dotAll);
  }

  function isUnicode(a) {
    assert.ok(a.unicode);
  }

  function isUnicodeSet(a) {
    assert.ok(a.unicodeSets);
  }

  function isSticky(a) {
    assert.ok(a.sticky);
  }

  function isIndices(a) {
    assert.ok(a.hasIndices);
  }

  function testFlag(a, method) {
    const b = clone(a);
    hasEqualSource(a, b);
    method(a);
    method(b);
  }

  function lastIndex(a) {
    a.test('this string hi there');
    assert.strictEqual(a.lastIndex, 3);
    const b = clone(a);
    assert.strictEqual(b.lastIndex, 3);
    assert.strictEqual(a.lastIndex, 3);
    b.test('this string hi there');
    assert.strictEqual(b.lastIndex, 14);
    assert.strictEqual(a.lastIndex, 3);
  }

  function allFlags(a, hasUnicodeFlag) {
    const b = clone(a);
    hasEqualSource(a, b);
    testFlag(b, isIgnoreCase);
    testFlag(b, isGlobal);
    testFlag(b, isMultiline);
    testFlag(b, isDotAll);
    testFlag(b, hasUnicodeFlag);
    testFlag(b, isSticky);
    testFlag(b, isIndices);
  }

  function noFlags(a) {
    const b = clone(a);
    hasEqualSource(a, b);
    assert.ok(!b.ignoreCase);
    assert.ok(!b.global);
    assert.ok(!b.multiline);
    assert.ok(!b.dotAll);
    assert.ok(!b.unicode);
    assert.ok(!b.sticky);
    assert.ok(!b.hasIndices);
    assert.ok(!b.unicodeSets);
  }

  describe('literals', function () {
    it('ignoreCase flag', function (done) {
      const a = /hello/i;
      testFlag(a, isIgnoreCase);
      done();
    })
    it('global flag', function (done) {
      const a = /hello/g;
      testFlag(a, isGlobal);
      done();
    })
    it('multiline flag', function (done) {
      const a = /hello/m;
      testFlag(a, isMultiline);
      done();
    })
    it('dotAll flag', function (done) {
      const a = /hello/s;
      testFlag(a, isDotAll);
      done();
    })
    it('unicode flag', function (done) {
      const a = /hello/u;
      testFlag(a, isUnicode);
      done();
    })
    it('sticky flag', function (done) {
      const a = /hello/y;
      testFlag(a, isSticky);
      done();
    })
    it('hasIndices flag', function (done) {
      const a = /hello/d;
      testFlag(a, isIndices);
      done();
    })
    it('unicodeSets flag', function (done) {
      const a = /hello/v;
      testFlag(a, isUnicodeSet);
      done();
    })
    it('no flags', function (done) {
      const a = /hello/;
      noFlags(a);
      done();
    })
    it('all flags', function (done) {
      allFlags(/hello/gimsuyd, isUnicode);
      allFlags(/hello/gimsvyd, isUnicodeSet);
      done();
    })
    it('lastIndex', function (done) {
      const a = /hi/g;
      lastIndex(a);
      done();
    })
  })

  describe('instances', function () {
    it('ignoreCase flag', function (done) {
      const a = new RegExp('hello', 'i');
      testFlag(a, isIgnoreCase);
      done();
    })
    it('global flag', function (done) {
      const a = new RegExp('hello', 'g');
      testFlag(a, isGlobal);
      done();
    })
    it('multiline flag', function (done) {
      const a = new RegExp('hello', 'm');
      testFlag(a, isMultiline);
      done();
    })
    it('dotAll flag', function (done) {
      const a = new RegExp('hello', 's');
      testFlag(a, isDotAll);
      done();
    })
    it('unicode flag', function (done) {
      const a = new RegExp('hello', 'u');
      testFlag(a, isUnicode);
      done();
    })
    it('sticky flag', function (done) {
      const a = new RegExp('hello', 'y');
      testFlag(a, isSticky);
      done();
    })
    it('hasIndices flag', function (done) {
      const a = new RegExp('hello', 'd');
      testFlag(a, isIndices);
      done();
    })
    it('unicodeSets flag', function (done) {
      const a = new RegExp('hello', 'v');
      testFlag(a, isUnicodeSet);
      done();
    })
    it('no flags', function (done) {
      const a = new RegExp('hmm');
      noFlags(a);
      done();
    })
    it('all flags', function (done) {
      const a = new RegExp('hello', 'misguyd');
      allFlags(a, isUnicode);
      const b = new RegExp('hello', 'misgvyd');
      allFlags(b, isUnicodeSet);
      done();
    })
    it('lastIndex', function (done) {
      const a = new RegExp('hi', 'g');
      lastIndex(a);
      done();
    })
  })
})

