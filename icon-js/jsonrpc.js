'use strict'

const API_VERSION = 'v2';

const request = require('request');
const utils = require('./utils.js');


var msgId = 0;


function getCurrentApiPrefix() {
    return '/api/' + API_VERSION;
}

function toPayload(method, params) {
    msgId++;

    return {
        jsonrpc: '2.0',
        id: msgId,
        method: method,
        params: params || []
    };
}

function requestJsonRpc(url, payload) {
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
            resolve(body);
        });
    });
}

/**
 * Get a balance of the address
 * @param  {String} address
 * @param  {String} endpoint
 * @return {String} balance
 */
function getBalance(address, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getBalance',
        {
            address : address
        }
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const balance = body.result.response;

        //console.log(JSON.stringify(body));

        if (balance === undefined || balance === null) {
            throw new Error(JSON.stringify(body.result));
        }

        return utils.ConvertToIcxUnit(balance);
    })();
}

/**
 * Get a block information by height
 * @param  {Number|String} height
 * @param  {String} endpoint
 * @return {Object}
 */
function getBlockByHeight(height, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getBlockByHeight',
        {
            height : height
        }
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (typeof body.error === 'object') {
            throw new Error(JSON.stringify(body.error));
        }

        return body.result.block;
    })();
}


/**
 * Get a block information by hash
 * @param  {String} hash
 * @param  {String} endpoint
 * @return {Object}
 */
function getBlockByHash(hash, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getBlockByHash',
        {
            hash : hash
        }
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (typeof body.error === 'object') {
            throw new Error(JSON.stringify(body.error));
        }

        return body.result.block;
    })();
}


/**
 * Get a last block information
 * @param  {String} endpoint
 * @return {Object}
 */
function getLastBlock(endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getLastBlock',
        {}
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (typeof body.error === 'object') {
            throw new Error(JSON.stringify(body.error));
        }

        return body.result.block;
    })();
}


/**
 * Send a transaction
 * @param  {Object} rawTx    [description]
 * @param  {String} endpoint [description]
 * @return {String} transaction hash
 */
function sendTransaction(rawTx, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_sendTransaction',
        rawTx
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);

        console.log(JSON.stringify(body));

        if (typeof body.error === 'object') {
            throw new Error(JSON.stringify(body.error));
        }

        if (body.result.response_code === 0) {
            return body.result.tx_hash;
        } else {
            throw new Error(JSON.stringify(body.result));
        }

    })();
}


module.exports = {
    getBalance : getBalance,
    getBlockByHeight : getBlockByHeight,
    getBlockByHash : getBlockByHash,
    getLastBlock : getLastBlock,
    sendTransaction : sendTransaction
};