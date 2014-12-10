var cint = require('cint');
var _ = require('lodash');

var toString = Object.prototype.toString;

var flagNames = {
  g: 'global',
  m: 'multiline',
  i: 'ignoreCase'
};

function isRegExp (o) {
  return 'object' == typeof o
      && '[object RegExp]' == toString.call(o);
}

function contains(str, substring) {
  return str.indexOf(substring) >= 0;
}

function secondArg(x,y) { return y; }

var firstChar = cint.partialAt(cint.index, 1, 0);

/** Creates a flag object from a string of flags. Unspecified flags are omitted (not set to false).
  @example
    parseFlagString('gm') ->
    {
      global: true,
      multiline: true
    }
*/
function parseFlagString (s) {
  return cint.toObject(s, function(flag) {
    return cint.keyValue(flagNames[flag], true);
  });
}

/** Converts a flag object to a string of flags characters. */
function toFlagString (flagObject) {
  return cint.toArray(
    cint.filterObject(flagObject, secondArg),
    firstChar
  ).join('');
}

function clone (regexp, newFlags) {

  if (!isRegExp(regexp)) {
    throw new TypeError('Not a RegExp');
  }

  newFlags = newFlags || {};
  if(typeof newFlags === 'string') {
    newFlags = parseFlagString(newFlags);
  }

  var originalFlags = _.pick(regexp, _.values(flagNames));
  var mergedFlagString = toFlagString(_.defaults(newFlags, originalFlags));

  return new RegExp(regexp.source, mergedFlagString);
}

module.exports = exports = clone;
exports.parseFlagString = parseFlagString;
exports.toFlagString = toFlagString;
