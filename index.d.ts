export = regexpClone;
/**
 * Clone a RegExp with flag and lastIndex preservation
 * @param {RegExp} regexp - The RegExp to clone
 * @returns {RegExp} A new RegExp instance with the same source, flags, and lastIndex
 * @throws {TypeError} When the input is not a RegExp
 */
declare function regexpClone(regexp: RegExp): RegExp;
declare namespace regexpClone {
    export { regexpClone, isRegExp };
}
/**
 * Check if the given object is a RegExp
 * @param {unknown} o - The object to check
 * @returns {o is RegExp} True if the object is a RegExp, false otherwise
 */
declare function isRegExp(o: unknown): o is RegExp;
