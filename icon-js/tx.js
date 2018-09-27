'use strict'

const secp256k1 = require('secp256k1');
const sha3_256 = require('js-sha3').sha3_256;
const BigNumber = require('bignumber.js');
const utils = require('./utils.js');
const config = require('./config.js');

var nonce = 1;

/**
 * Make a raw transaction for ICX
 * @param  {Object}  data
 * @return {Object}
 */
function makeIcxRawTx(data, nid) {
    const rawTx = {
        from: data.from,
        to: data.to,
        version: utils.toHexString(config.apiVersion),
        nid: nid,
        stepLimit: utils.toHexString(
            new BigNumber(data.stepLimit).toString(16)
        ),
        timestamp: utils.toHexString(
            ((new Date()).getTime() * 1000).toString(16)
        ),
        nonce: utils.toHexString(nonce++)
    };

    if (data.value) {
        const sendAmount = utils.convertToLoop(data.value);
        rawTx.value = utils.toHexString(sendAmount);
    }

    if (data.dataType) {
        rawTx.dataType = data.dataType;
        rawTx.data = data.data;
    }

    return rawTx;
}


/**
 * Sign a raw transaction
 * @param  {Buffer} privateKey
 * @param  {Object} rawTx
 * @return {Object}
 */
function signRawTx(privateKey, rawTx) {
    const phraseToSign = generateHashKey(rawTx);
    const hashcode = sha3_256.update(phraseToSign).hex();
    const message = Buffer.from(hashcode, 'hex');
    const sign = secp256k1.sign(message, privateKey);
    const recovery = new Uint8Array(1);
    recovery[0] = sign.recovery;
    const signature = concatTypedArrays(sign.signature, recovery);
    const b64encoded = signature.toString('base64');

    /*
    const b64encoded = Buffer.from(
      String.fromCharCode.apply(null, signature)
    ).toString('base64');
    */

    const newRawTx = {
        ...rawTx,
        signature: b64encoded
    };

    //console.log('newRawTx: ' + JSON.stringify(newRawTx));

    return newRawTx
}


/**
 * Generate a hash key for transaction
 * @param  {Object} obj
 * @return {String}
 */
function generateHashKey(obj){
    let resultStrReplaced = ''
    let resultStr = serializeObj(obj);
    resultStrReplaced = resultStr
                        .substring(1)
                        .slice(0, -1);
    //console.log('resultStr        :' + resultStr);
    //console.log('resultStrReplaced:' + resultStrReplaced);
    const result = 'icx_sendTransaction.' + resultStrReplaced;
    return result;
}

/**
 * Serialize a object for transaction
 * @param  {Object} obj
 * @return {String}
 */
function serializeObj(obj) {
    //console.log(obj)
    let result = '';
    result += '{';
    let keys;
    keys = Object.keys(obj);
    keys.sort();
    for(let i=0;i<keys.length;i++){
        const key = keys[i]
        const value = obj[key];
        switch(true) {
            case (value === null) : {
                result +=`${key}.`;
                result += String.raw`\0`;
                break;
            }
            case (typeof value === 'string') : {
                result += `${key}.`
                result += escapeString(value)
                break;
            }
            case (Array.isArray(value)) : {
                result+= `${key}.`
                result += serializeArray(value)
                break;
            }
            case (typeof value === 'object') : {
                result+= `${key}.`
                result += serializeObj(value);
                break;
            }
            default:
                break;
        }

        result += '.'
    }

    result = result.slice(0, -1);
    result += '}';
    return result;
}


/**
 * Serialize a array for transaction
 * @param  {Array} arr
 * @return {String}
 */
function serializeArray(arr) {
    let result = '';
    result += '[';
    for(let j=0;j<arr.length;j++) {
        const value = arr[j];
        switch(true) {
            case (value === null) : {
                result += String.raw`\0`;
                break;
            }
            case (typeof value === 'string') : {
                result += escapeString(value)
                break;
            }
            case (Array.isArray(value)) : {
                result += serializeArray(value)
                break;
            }
            case (typeof value === 'object') : {
                result += serializieObj(value);
                break;
            }
            default:
                break;
        }

        result += '.'
    }

    result = result.slice(0, -1);
    result += ']';
    return result;
}

/**
 * Escape a string for transaction
 * @param  {String} value
 * @return {String}
 */
function escapeString(value) {
    let newString = String.raw`${value}`;
    newString = newString.replace('\\', '\\\\');
    newString = newString.replace('.', '\\.');
    newString = newString.replace('{', '\\{');
    newString = newString.replace('}', '\\}');
    newString = newString.replace('[', '\\[');
    newString = newString.replace(']', '\\]');
    return newString
}

/**
 * Concatenate two typed arrays
 * @param  {TypedArray} a [description]
 * @param  {TypedArray} b [description]
 * @return {Buffer}   [description]
 */
function concatTypedArrays(a, b) { // a, b TypedArray of same type
    const c = Buffer.alloc(a.length + b.length);
    //var c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}


module.exports = {
    makeIcxRawTx : makeIcxRawTx,
    signRawTx : signRawTx,
};