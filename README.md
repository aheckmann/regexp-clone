#regexp-clone
==============

Clones RegExps with flag preservation:

```js
var regexpClone = require('regexp-clone');

var a = /somethin/gmi;

var b = regexpClone(a);
console.log(b.global); // true
console.log(b.multiline); // true
console.log(b.ignoreCase); // true
```

Override flags:

```js
var a = /somethin/g;
var b = regexpClone(a, 'm');
console.log(b.global); // true
console.log(b.multiline); // true
console.log(b.ignoreCase); // false
```

```js
var a = /somethin/g;
var b = regexpClone(a, {
	'global': false,
	multiline: true
});
console.log(b.global); // false
console.log(b.multiline); // true
console.log(b.ignoreCase); // false
```
## License

[MIT](https://github.com/aheckmann/regexp-clone/blob/master/LICENSE)
