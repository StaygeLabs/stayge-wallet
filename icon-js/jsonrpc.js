/**
 * Provides APIs for jsonrpc of ICON
 * @module stayge-wallet/icon-js/jsonrpc
 */

'use strict'

const API_VERSION = require('./config.js').apiVersion;
const request = require('request');
const utils = require('./utils.js');
const crypto = require('crypto');


/**
 * Return prefix string of current api version
 * @return {String}
 */
function getCurrentApiPrefix() {
    return '/api/v' + API_VERSION;
}

/**
 * Return payload for json rpc 2.0
 * @param  {String} method
 * @param  {Object} params
 * @return {Object}
 */
function toPayload(method, params) {

    const payload = {
        jsonrpc: '2.0',
        id: crypto.randomBytes(4).readUInt32BE(0, true),
        method: method,
    }

    if (params) {
        payload.params = params;
    }

    return payload;
}

/**
 * Make a request via json rpc
 * @param  {String} url
 * @param  {Object} payload
 * @return {Promise<Object>}
 */
async function requestJsonRpc(url, payload) {
    const opts = {
        url: url,
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: payload,
        json: true
    };

    return new Promise(function(resolve, reject) {
        request(opts, function(err, res, body) {
            if (err) reject(err);

            //console.log(`opts=${JSON.stringify(opts)}`)
            //console.log(`body=${body}`)
            //console.log(`payload.id=${payload.id} body.id=${body.id}`)

            //console.log(`err=${err} opts.body=${opts.body} body=${body}`)
            if (!body || opts.body.id !== body.id) {
                reject(new Error('The response id is not equal to the request id'))
            }

            resolve(body);
        });
    });
}

module.exports = {
    /**
     * Get a balance of the address
     * @param  {String} address
     * @param  {String} endpoint
     * @return {Promise<String>} balance
     */
    getBalance : async function(address, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getBalance',
            {
                address : address
            }
        );

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return utils.convertToIcx(result);
    },

    /**
     * Get a block information by height
     * @param  {Number} height
     * @param  {String} endpoint
     * @return {Promise<Object>}
     */
    getBlockByHeight : async function(height, endpoint) {
        const url = endpoint + getCurrentApiPrefix();

        const payload = toPayload(
            'icx_getBlockByHeight',
            {
                height : utils.toHexString(height)
            }
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Get a block information by hash
     * @param  {String} hash
     * @param  {String} endpoint
     * @return {Promise<Object>}
     */
    getBlockByHash : async function(hash, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getBlockByHash',
            {
                hash : utils.toHashString(hash)
            }
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Get a last block information
     * @param  {String} endpoint
     * @return {Promise<Object>}
     */
    getLastBlock : async function(endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getLastBlock',
            null
        );

        //console.log(`getLastBlock : url=${url} payload = ${JSON.stringify(payload)}`);

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Send a transaction
     * @param  {Object} rawTx    [description]
     * @param  {String} endpoint [description]
     * @return {Promise<String>} transaction hash
     */
    sendTransaction : async function(rawTx, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_sendTransaction',
            rawTx
        );

        //console.log(JSON.stringify(payload))

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Get the transaction result requested by transaction hash
     * @param  {String} txHash
     * @param  {String} endpoint
     * @return {Promise<Object>}
     */
    getTransactionResult : async function(txHash, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getTransactionResult',
            {
                txHash : utils.toHashString(txHash)
            }
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Get the transaction information by txHash
     * @param  {String} txHash
     * @param  {String} endpoint
     * @return {Promise<Object>} transaction information
     */
    getTransactionByHash : async function (txHash, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getTransactionByHash',
            {
                txHash : utils.toHashString(txHash)
            }
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;
        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * Get total supply of ICX
     * @param  {String} endpoint
     * @return {Promise<String>} total supply
     */
    getTotalSupply : async function(endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getTotalSupply',
            null
        );

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return utils.convertToIcx(result);
    },

    /**
     * Return score api
     * @param  {String} address
     * @param  {String} endpoint
     * @return {Promise<Object>}
     */
    getScoreApi : async function (address, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_getScoreApi',
            {
                address: address
            }
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

    /**
     * call SCORE's external function
     * @param  {Object} params
     * @param  {String} endpoint
     * @return {Promise<String>}
     */
    call : async function(params, endpoint) {
        const url = endpoint + getCurrentApiPrefix();
        const payload = toPayload(
            'icx_call',
            params
        );

        //console.log('payload = ' + JSON.stringify(payload));

        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    },

};
