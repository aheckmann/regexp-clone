'use strict';

const toString = Object.prototype.toString;

/**
 * Check if the given object is a RegExp
 * @param {unknown} o - The object to check
 * @returns {o is RegExp} True if the object is a RegExp, false otherwise
 */
function isRegExp(o) {
  return 'object' == typeof o && '[object RegExp]' == toString.call(o);
}

/**
 * Clone a RegExp with flag and lastIndex preservation
 * @param {RegExp} regexp - The RegExp to clone
 * @returns {RegExp} A new RegExp instance with the same source, flags, and lastIndex
 * @throws {TypeError} When the input is not a RegExp
 */
function regexpClone(regexp) {
  if (!isRegExp(regexp)) {
    throw new TypeError('Not a RegExp');
  }

  const flags = [];
  if (regexp.global) flags.push('g');
  if (regexp.multiline) flags.push('m');
  if (regexp.ignoreCase) flags.push('i');
  if (regexp.dotAll) flags.push('s');
  if (regexp.sticky) flags.push('y');
  if (regexp.unicode) flags.push('u');
  if (regexp.unicodeSets) flags.push('v');
  if (regexp.hasIndices) flags.push('d');

  const result = new RegExp(regexp.source, flags.join(''));
  if (typeof regexp.lastIndex === 'number') {
    result.lastIndex = regexp.lastIndex;
  }
  return result;
}

/**
 * @type {((regexp: RegExp) => RegExp) & { regexpClone: (regexp: RegExp) => RegExp, isRegExp: (o: any) => o is RegExp }}
 */
module.exports = regexpClone;
module.exports.regexpClone = regexpClone;
module.exports.isRegExp = isRegExp;
