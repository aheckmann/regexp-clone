# regexp-clone <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Zero dependency JavaScript/TypeScript `RegExp` cloner with flag and `lastIndex` preservation.

## Usage

```js
const clone = require('regexp-clone');

const a = /somethin/dgimsuy;
console.log(a.global); // true
console.log(a.ignoreCase); // true
console.log(a.multiline); // true
console.log(a.dotAll); // true
console.log(a.unicode); // true
console.log(a.sticky); // true
console.log(a.hasIndices); // true

const b = clone(a);
console.log(b.global); // true
console.log(b.ignoreCase); // true
console.log(b.multiline); // true
console.log(b.dotAll); // true
console.log(b.unicode); // true
console.log(b.sticky); // true
console.log(b.hasIndices); // true

const c = /hi/g;
c.test('this string hi there');
assert.strictEqual(c.lastIndex, 3);

const d = clone(c);
assert.strictEqual(d.lastIndex, 3);
d.test('this string hi there');
assert.strictEqual(d.lastIndex, 14);
assert.strictEqual(c.lastIndex, 3);
```

## Installation

```bash
pnpm add regexp-clone
```

## Testing

```bash
pnpm test
```

## License

[MIT][license-url]

[package-url]: https://npmjs.org/package/regexp-clone
[npm-version-svg]: https://versionbadg.es/aheckmann/regexp-clone.svg
[npm-badge-png]: https://nodei.co/npm/regexp-clone.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/regexp-clone.svg
[license-url]: https://github.com/aheckmann/regexp-clone/blob/main/LICENSE
[downloads-image]: https://img.shields.io/npm/dm/regexp-clone.svg
[downloads-url]: https://npm-stat.com/charts.html?package=regexp-clone
