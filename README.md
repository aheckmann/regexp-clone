# regexp-clone

## Installation

Node:

```
npm install regexp-clone
```

```js
var cloneRegex = require('regexp-clone');
```

Browser:

```js
<script src="regexp-clone/index.js"></script>
```

## Usage

Clones RegExps with flag preservation:

```js


var a = /somethin/gmi;

var b = cloneRegex(a);
console.log(b.global); // true
console.log(b.multiline); // true
console.log(b.ignoreCase); // true
```

Override flags:

```js
var a = /somethin/g;
var b = cloneRegex(a, 'm');
console.log(b.global); // true
console.log(b.multiline); // true
console.log(b.ignoreCase); // false
```

```js
var a = /somethin/g;
var b = cloneRegex(a, {
	'global': false,
	multiline: true
});
console.log(b.global); // false
console.log(b.multiline); // true
console.log(b.ignoreCase); // false
```
## License

[MIT](https://github.com/aheckmann/regexp-clone/blob/master/LICENSE)
