'use strict'

const UNIT_ICX = '1000000000000000000';

const BigNumber = require('bignumber.js');

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

    if (isString(number) &&
        (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
        return new BigNumber(number.replace('0x',''), 16);
    }

    return new BigNumber(number.toString(10), 10);
};

/**
 * Convert a number to hexadecimal string
 * @param  {Number|String|BigNumber} value
 * @return {String}
 */
function toHexString(value) {

    if (typeof value === 'number') {
        return '0x' + value.toString(16);
    } else if (typeof value === 'string' && !value.startsWith('0x')) {
        return '0x' + value.toString(16);
    } else if (isBigNumber(value)) {
        return '0x' + value.toString(16);
    } else {
        return value;
    }
}

/**
 * Convert to hash string leading '0x'
 * @param  {String} value
 * @return {String}
 */
function toHashString(value) {
    return value.substring(0, 2) === '0x' ? value : '0x' + value;
}

/**
 * Convert to icx unit
 *
 * @method toBigNumber
 * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
 * @return {String}
*/
function convertToIcx(value) {
    return toBigNumber(value)
            .dividedBy(UNIT_ICX)
            .toString(10);
}


/**
 * Convert to loop unit
 * @param {Number|String|BigNumber} value
 * @return {BigNumber}
 */
function convertToLoop(value) {
    return toBigNumber(value).times(UNIT_ICX);
};


module.exports = {
    isString : isString,
    isBigNumber : isBigNumber,
    toBigNumber : toBigNumber,
    convertToIcx : convertToIcx,
    convertToLoop : convertToLoop,
    toHexString : toHexString,
    toHashString : toHashString,
};