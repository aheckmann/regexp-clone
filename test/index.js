const { describe, it } = require('node:test')
const assert = require('node:assert')
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
    it('ignoreCase flag', function () {
      const a = /hello/i;
      testFlag(a, isIgnoreCase);
    })
    it('global flag', function () {
      const a = /hello/g;
      testFlag(a, isGlobal);
    })
    it('multiline flag', function () {
      const a = /hello/m;
      testFlag(a, isMultiline);
    })
    it('dotAll flag', function () {
      const a = /hello/s;
      testFlag(a, isDotAll);
    })
    it('unicode flag', function () {
      const a = /hello/u;
      testFlag(a, isUnicode);
    })
    it('sticky flag', function () {
      const a = /hello/y;
      testFlag(a, isSticky);
    })
    it('hasIndices flag', function () {
      const a = /hello/d;
      testFlag(a, isIndices);
    })
    it('unicodeSets flag', function () {
      const a = /hello/v;
      testFlag(a, isUnicodeSet);
    })
    it('no flags', function () {
      const a = /hello/;
      noFlags(a);
    })
    it('all flags', function () {
      allFlags(/hello/gimsuyd, isUnicode);
      allFlags(/hello/gimsvyd, isUnicodeSet);
    })
    it('lastIndex', function () {
      const a = /hi/g;
      lastIndex(a);
    })
  })

  describe('instances', function () {
    it('ignoreCase flag', function () {
      const a = new RegExp('hello', 'i');
      testFlag(a, isIgnoreCase);
    })
    it('global flag', function () {
      const a = new RegExp('hello', 'g');
      testFlag(a, isGlobal);
    })
    it('multiline flag', function () {
      const a = new RegExp('hello', 'm');
      testFlag(a, isMultiline);
    })
    it('dotAll flag', function () {
      const a = new RegExp('hello', 's');
      testFlag(a, isDotAll);
    })
    it('unicode flag', function () {
      const a = new RegExp('hello', 'u');
      testFlag(a, isUnicode);
    })
    it('sticky flag', function () {
      const a = new RegExp('hello', 'y');
      testFlag(a, isSticky);
    })
    it('hasIndices flag', function () {
      const a = new RegExp('hello', 'd');
      testFlag(a, isIndices);
    })
    it('unicodeSets flag', function () {
      const a = new RegExp('hello', 'v');
      testFlag(a, isUnicodeSet);
    })
    it('no flags', function () {
      const a = new RegExp('hmm');
      noFlags(a);
    })
    it('all flags', function () {
      const a = new RegExp('hello', 'misguyd');
      allFlags(a, isUnicode);
      const b = new RegExp('hello', 'misgvyd');
      allFlags(b, isUnicodeSet);
    })
    it('lastIndex', function () {
      const a = new RegExp('hi', 'g');
      lastIndex(a);
    })
  })

  describe('non-RegExps', () => {
    it('should throwfor strings', () => {
      assert.throws(() => clone('hello'));
    });
    it('should throw for numbers', () => {
      assert.throws(() => clone(123));
    });
    it('should throw for objects', () => {
      assert.throws(() => clone({}));
    });
    it('should throw for arrays', () => {
      assert.throws(() => clone([]));
    });
  })
})

