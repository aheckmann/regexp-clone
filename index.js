
const toString = Object.prototype.toString;

function isRegExp (o) {
  return 'object' == typeof o
      && '[object RegExp]' == toString.call(o);
}

module.exports = exports = function (regexp) {
  if (!isRegExp(regexp)) {
    throw new TypeError('Not a RegExp');
  }

  const result = new RegExp(regexp.source, regexp.flags);
  if (typeof regexp.lastIndex === 'number') {
    result.lastIndex = regexp.lastIndex;
  }
  return result;
}

