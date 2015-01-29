/*jslint node:true, vars:true*/

var exports;
(function (undef) {'use strict';


var flagPropertyMap = {
  g: 'global',
  m: 'multiline',
  i: 'ignoreCase'
};

var flags = Object.keys(flagPropertyMap);
var propNames = flags.map(function (flag) {return flagPropertyMap[flag];});
var propertyFlagMap = flags.reduce(function (o, f) {
  o[flagPropertyMap[f]] = f;
  return o;
}, {});


/**
* Creates a flag object from a string of flags. Unspecified flags are omitted (not set to false).
* @example
    parseFlagString('gm') ->
    {
      global: true,
      multiline: true
    }
*/
function parseFlagString (s) {
  return s.split('').reduce(function(obj, flag) {
    obj[flagPropertyMap[flag]] = true;
    return obj;
  }, {});
}

/**
* Merges two flag objects (or RegExp's), with the first object having priority if defined
* @param {RegExp|object|string} regex An object of flags to copy
* @param {RegExp|object|string} newFlags An object of flags to copy if the "regex" object does not possess them
*/
function mergeFlagObjects (regex, newFlags) {
  if (typeof regex === 'string') {
    regex = parseFlagString(regex);
  }
  if (typeof newFlags === 'string') {
    newFlags = parseFlagString(newFlags);
  }
  return propNames.reduce(function (obj, propName) {
    obj[propName] = newFlags[propName] === undef ? regex[propName] : newFlags[propName];
    return obj;
  }, {});
}


/**
* Converts a flag object to a string of corresponding flag characters for each valid true property.
* @param {RegExp|object} flagObject Object with RegExp boolean properties
* @returns {string} String containing the regular expression flags
*/
function toFlagString (flagObject) {
  return Object.keys(flagObject).reduce(function (s, f) {
    return s + (flagObject[f] ? propertyFlagMap[f] : '');
  }, '');
}

/**
* Clones a regular expression, optionally overriding specified properties
* @param {RegExp|object} regex Regular expression
* @param {RegExp|object|string} newFlags Values for overriding the regex
* @returns {RegExp} The cloned (and optionally altered) RegExp
*/
function clone (regex, newFlags) {

  newFlags = newFlags || {};

  var mergedFlagObject = mergeFlagObjects(regex, newFlags);
  var mergedFlagString = toFlagString(mergedFlagObject);

  return new RegExp(regex.source, mergedFlagString);
}

module.exports = exports = clone;
exports.parseFlagString = parseFlagString;
exports.mergeFlagObjects = mergeFlagObjects;
exports.toFlagString = toFlagString;

}());
