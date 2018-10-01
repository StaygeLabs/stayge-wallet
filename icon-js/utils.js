'use strict'

const BigNumber = require('bignumber.js');
const config = require('./config.js');

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
        return value < 0 ? '-0x' + value.toString(16).substr(1) : '0x' + value.toString(16);
    } else if (typeof value === 'string' && !value.startsWith('0x')) {
        return '0x' + value.toString(16);
    } else if (isBigNumber(value)) {
        return value < 0 ? '-0x' + value.toString(16).substr(1) : '0x' + value.toString(16);
    } else {
        return value;
    }
}

function convertToHex(str) {
    let hex = '';
    for(let i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
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
            .dividedBy(config.unitIcx)
            .toString(10);
}


/**
 * Convert to loop unit
 * @param {Number|String|BigNumber} value
 * @return {BigNumber}
 */
function convertToLoop(value) {
    return toBigNumber(value).times(config.unitIcx);
};


function getEndPoint(name) {
    return config.endpoints[name];
}

/**
 * get a endpoint for current environment
 * @return {String}
 */
function getEndPointFromEnv() {
    //console.log('NODE_ENV : ' + process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') {
        return getEndPoint('mainnet');
    } else {
        return getEndPoint('testnet');
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    isString : isString,
    isBigNumber : isBigNumber,
    toBigNumber : toBigNumber,
    convertToIcx : convertToIcx,
    convertToLoop : convertToLoop,
    toHexString : toHexString,
    toHashString : toHashString,
    getEndPoint : getEndPoint,
    getEndPointFromEnv : getEndPointFromEnv,
    sleep : sleep,
    convertToHex : convertToHex,
};