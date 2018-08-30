'use strict'

const API_VERSION = 'v3';

const request = require('request');
const utils = require('./utils.js');


var msgId = 0;


function getCurrentApiPrefix() {
    return '/api/' + API_VERSION;
}

function toPayload(method, params) {

    const payload = {
        jsonrpc: '2.0',
        id: ++msgId,
        method: method,
    }

    if (params) {
        payload.params = params;
    }

    return payload;
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
        const result = body.result;

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return utils.convertToIcx(result);
    })();
}


/**
 * Get total supply of ICX
 * @param  {String} endpoint
 * @return {String}
 */
function getTotalSupply(endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getTotalSupply',
        null
    );

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return utils.convertToIcx(result);
    })();
}

/**
 * Get a block information by height
 * @param  {Number} height
 * @param  {String} endpoint
 * @return {Object}
 */
function getBlockByHeight(height, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getBlockByHeight',
        {
            height : utils.toHexString(height)
        }
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
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
            hash : utils.toHashString(hash)
        }
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
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
        null
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
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
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    })();
}


/**
 * Get the transaction result requested by transaction hash
 * @param  {String} txHash
 * @param  {String} endpoint
 * @return {Object}
 */
function getTransactionResult(txHash, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getTransactionResult',
        {
            txHash : utils.toHashString(txHash)
        }
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    })();
}


/**
 * call SCORE's external function
 * @param  {Object} params
 * @param  {String} endpoint
 * @return {String}
 */
function call(params, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_call',
        params
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    })();
}


/**
 * call SCORE's external function
 * @param  {Object} params
 * @param  {String} endpoint
 * @return {String}
 */
function getScoreApi(address, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getScoreApi',
        {
            address: address
        }
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    })();
}



/**
 * Get the transaction information by txHash
 * @param  {String} txHash
 * @param  {String} endpoint
 * @return {Object}
 */
function getTransactionByHash(txHash, endpoint) {
    const url = endpoint + getCurrentApiPrefix();
    const payload = toPayload(
        'icx_getTransactionByHash',
        {
            txHash : utils.toHashString(txHash)
        }
    );

    //console.log('payload = ' + JSON.stringify(payload));

    return (async () => {
        const body = await requestJsonRpc(url, payload);
        const result = body.result;

        //console.log(JSON.stringify(body));
        //console.log('typeof body.error : ' + typeof body.error);

        if (!result) {
            throw new Error(JSON.stringify(body));
        }

        return result;
    })();
}




module.exports = {
    getBalance : getBalance,
    getBlockByHeight : getBlockByHeight,
    getBlockByHash : getBlockByHash,
    getLastBlock : getLastBlock,
    sendTransaction : sendTransaction,
    getTransactionResult : getTransactionResult,
    getTransactionByHash : getTransactionByHash,
    getTotalSupply : getTotalSupply,
    call : call,
};