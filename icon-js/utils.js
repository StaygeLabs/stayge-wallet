'use strict'

const UNIT_ICX = '1000000000000000000';

var BigNumber = require('bignumber.js');

/**
 * Returns true if object is string, otherwise false
 *
 * @method isString
 * @param {Object}
 * @return {Boolean}
 */
function isString(object) {
    return typeof object === 'string' ||
        (object &&
         object.constructor &&
         object.constructor.name === 'String');
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object}
 * @return {Boolean}
 */
function isBigNumber(object) {
    return (object && (object instanceof BigNumber || (object.constructor && object.constructor.name === 'BigNumber')));
};

/**
 * transforms into an bignumber
 *
 * @method toBigNumber
 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
 * @return {BigNumber} BigNumber
*/
function toBigNumber(number) {
    number = number || 0;
    if (isBigNumber(number))
        return number;

    if (isString(number) && (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
        return new BigNumber(number.replace('0x',''), 16);
    }

    return new BigNumber(number.toString(10), 10);
};

/**
 * Convert to unit in icx
 *
 * @method toBigNumber
 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
 * @return {String}
*/
function ConvertToIcxUnit(value) {
    return toBigNumber(value)
            .dividedBy(UNIT_ICX)
            .toString(10);
}

module.exports = {
    isString : isString,
    isBigNumber : isBigNumber,
    toBigNumber : toBigNumber,
    ConvertToIcxUnit : ConvertToIcxUnit
};