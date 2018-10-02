/**
 * Provides utility functions
 * @module  stayge-wallet/icon-js/utils
 */

'use strict'

const BigNumber = require('bignumber.js');
const config = require('./config.js');


module.exports = {
    /**
     * Returns true if object is string, otherwise false
     * @param {Object} object
     * @return {Boolean}
     */
    isString : function(object) {
        return typeof object === 'string' ||
            (object &&
             object.constructor &&
             object.constructor.name === 'String');
    },

    /**
     * Returns true if object is BigNumber, otherwise false
     * @param {Object}
     * @return {Boolean}
     */
    isBigNumber : function(object) {
        return (object && (object instanceof BigNumber || (object.constructor && object.constructor.name === 'BigNumber')));
    },

    /**
     * Transforms into an bignumber
     * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
     * @return {BigNumber} BigNumber
    */
    toBigNumber : function(number) {
        number = number || 0;
        if (this.isBigNumber(number))
            return number;

        if (this.isString(number) &&
            (number.indexOf('0x') === 0 || number.indexOf('-0x') === 0)) {
            return new BigNumber(number.replace('0x',''), 16);
        }

        return new BigNumber(number.toString(10), 10);
    },
    /**
     * Convert to icx unit
     * @param {Number|String|BigNumber} a number, string, HEX string or BigNumber
     * @return {String}
    */
    convertToIcx : function(value) {
        return this.toBigNumber(value)
                   .dividedBy(config.unitIcx)
                   .toString(10);
    },

    /**
     * Convert to loop unit
     * @param {Number|String|BigNumber} value
     * @return {BigNumber}
     */
    convertToLoop : function(value) {
        return this.toBigNumber(value).times(config.unitIcx);
    },

    /**
     * Convert a number to hexadecimal string
     * @param  {Number|String|BigNumber} value
     * @return {String}
     */
    toHexString : function(value) {
        if (typeof value === 'number') {
            return value < 0 ? '-0x' + value.toString(16).substr(1) : '0x' + value.toString(16);
        } else if (typeof value === 'string' && !value.startsWith('0x')) {
            return '0x' + value.toString(16);
        } else if (this.isBigNumber(value)) {
            return value < 0 ? '-0x' + value.toString(16).substr(1) : '0x' + value.toString(16);
        } else {
            return value;
        }
    },

    /**
     * Convert to hash string leading '0x'
     * @param  {String} value
     * @return {String}
     */
    toHashString : function(value) {
        return value.substring(0, 2) === '0x' ? value : '0x' + value;
    },

    /**
     * Returns endpoint of the specified name
     * @param  {String} name mainnet | testnet
     * @return {Object}
     */
    getEndPoint : function(name) {
        return config.endpoints[name];
    },

    /**
     * Get a endpoint for current environment
     * @return {String}
     */
    getEndPointFromEnv : function() {
        //console.log('NODE_ENV : ' + process.env.NODE_ENV);

        if (process.env.NODE_ENV === 'production') {
            return this.getEndPoint('mainnet');
        } else {
            return this.getEndPoint('testnet');
        }
    },

    /**
     * Sleep for the specified time
     * @param  {Number} ms milliseconds
     * @return {Promise}
     */
    sleep : function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Convert string to hexastring
     * @param  {String} str
     * @return {String}
     */
    convertToHex : function(str) {
        let hex = '';
        for(let i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    },

};