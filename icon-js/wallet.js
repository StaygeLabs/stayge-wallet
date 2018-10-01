'use strict'

const fs = require('fs');
const key = require('./key.js');
const utils = require('./utils.js');
const jsonrpc = require('./jsonrpc.js');
const tx = require('./tx.js');

const DEFAULT_DEPLOY_STEP_LIMIT = 2000000000; // 20 ICX, step price : 0.00000001 ICX(10 Gloop)
const DEFAULT_UPDATE_STEP_LIMIT = 3000000000; // 30 ICX, step price : 0.00000001 ICX(10 Gloop)
const DEFAULT_TX_STEP_LIMIT = 100000000; // 1 ICX, step price : 0.00000001 ICX(10 Gloop)

/**
 * A class for ICON Wallet
 * @namespace
 * @class
 * @constructor
 * @param {Buffer} privateKey - private key for wallet
 */
const Wallet = function(privateKey) {
    /**
     * [_privKey description]
     * @private
     * @type {Buffer}
     */
    this._privateKey = privateKey;

    /**
     * [_publicKey description]
     * @private
     * @type {Buffer}
     */
    this._publicKey = key.privateToPublic(privateKey);

    /**
     * [_address description]
     * @private
     * @type {Buffer}
     */
    this._address = key.publicToAddress(this._publicKey);

    this._endpoint = utils.getEndPointFromEnv();
}


/**
 * Get a private key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getPrivateKey = function() {
    return this._privateKey;
}

/**
 * Get a private key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getPrivateKeyString = function() {
    return this._privateKey.toString('hex');
}


/**
 * Get a public key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getPublicKey = function() {
    return this._publicKey;
}


/**
 * Get a public key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getPublicKeyString = function() {
    return this._publicKey.toString('hex');
}


/**
 * Get the wallet address
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getAddress = function() {
    return this._address;
}

/**
 * Get the wallet address string
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getAddressString = function() {
    return 'hx' + this._address.toString('hex');
}

/**
 * Convert a wallet to key store object
 * @param  {String} password
 * @return {Object}
 */
Wallet.prototype.toKeyStoreObj = function(password) {
    return key.toKeyStoreObj(
        this.getPrivateKey(),
        this.getAddressString(),
        password
    );
}

/**
 * set endpoint
 * @param {String} name 'mainnet' | 'testnet'
 */
Wallet.prototype.setEndPoint = function(name) {
    this._endpoint = utils.getEndPoint(name);
}

/**
 * get endpoint
 * @return {String} uri of endpoint
 */
Wallet.prototype.getEndPoint = function() {
    return this._endpoint;
}


/**
 * Get block information by height
 * @param  {Number|String} height
 * @return {Object}
 */
Wallet.prototype.getBlockByHeight = function(height) {
    return jsonrpc.getBlockByHeight(height, this.getEndPoint().url);
}


/**
 * Get block information by hash
 * @param  {String} height
 * @return {Object}
 */
Wallet.prototype.getBlockByHash = function(hash) {
    return jsonrpc.getBlockByHash(hash, this.getEndPoint().url);
}


/**
 * Get a last block information
 * @return {Object}
 */
Wallet.prototype.getLastBlock = function() {
    return jsonrpc.getLastBlock(this.getEndPoint().url);
}


/**
 * Get balance of the wallet
 * @return {String}
 */
Wallet.prototype.getBalance = function() {
    return jsonrpc.getBalance(this.getAddressString(), this.getEndPoint().url);
}


/**
 * Get total supply of ICX
 * @return {String}
 */
Wallet.prototype.getTotalSupply = function() {
    return jsonrpc.getTotalSupply(this.getEndPoint().url);
}

/**
 * Transfer ICX coins
 * @param {String} to
 * @param {Number} value
 * @return {String} txHash
 */
Wallet.prototype.transferICX = function(to, value) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: to,
            stepLimit: DEFAULT_TX_STEP_LIMIT,
            value: value,
        };

        const rawTx = tx.makeIcxRawTx(data, this.getEndPoint().nid);
        const rawTxSigned = tx.signRawTx(this.getPrivateKey(), rawTx)
        const result = await jsonrpc.sendTransaction(
            rawTxSigned,
            this.getEndPoint().url
        );

        return result
    })();
}


/**
 * Transafer a message
 * @param  {String} to
 * @param  {String} msg
 * @return {String} txHash
 */
Wallet.prototype.transferMessage = function(to, msg) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: to,
            stepLimit: DEFAULT_TX_STEP_LIMIT,
            dataType: 'message',
            data: msg,
        };

        const rawTx = tx.makeIcxRawTx(data, this.getEndPoint().nid);
        const rawTxSigned = tx.signRawTx(this.getPrivateKey(), rawTx)
        const result = await jsonrpc.sendTransaction(
            rawTxSigned,
            this.getEndPoint().url
        );

        return result
    })();
}


/**
 * Send a transaction for calling a SCORE'S method
 * @param  {String} scoreAddress
 * @param  {String]} scoreMethod
 * @param  {Object} methodParams
 * @return {String} txHash
 */
Wallet.prototype.callScoreTx = function(scoreAddress, scoreMethod, methodParams) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: scoreAddress,
            stepLimit: DEFAULT_TX_STEP_LIMIT,
            dataType: 'call',
            data: {
                method: scoreMethod
            },
        };

        if (methodParams) {
            data.data.params = methodParams;
        }

        const rawTx = tx.makeIcxRawTx(data, this.getEndPoint().nid);
        const rawTxSigned = tx.signRawTx(this.getPrivateKey(), rawTx)
        const result = await jsonrpc.sendTransaction(
            rawTxSigned,
            this.getEndPoint().url
        );

        return result
    })();
}



/**
 * Install a SCORE on the ICON blockchain
 * @param  {String} to
 * @param  {String} scoreContent
 * @param  {Object} installParams
 * @return {String} txHash
 */
Wallet.prototype.installScore = function(scoreContent, installParams) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: 'cx0000000000000000000000000000000000000000',   // address 0 means SCORE install
            stepLimit: DEFAULT_DEPLOY_STEP_LIMIT,
            dataType: 'deploy',
            data: {
                contentType: 'application/zip',
                content: scoreContent,
            },
        };

        if (installParams) {
            data.data.params = installParams;
        }

        const rawTx = tx.makeIcxRawTx(data, this.getEndPoint().nid);
        const rawTxSigned = tx.signRawTx(this.getPrivateKey(), rawTx)
        const result = await jsonrpc.sendTransaction(
            rawTxSigned,
            this.getEndPoint().url
        );

        return result
    })();
}


/**
 * Update a SCORE on the ICON blockchain
 * @param  {[type]} scoreAddress [description]
 * @param  {[type]} scoreContent [description]
 * @param  {[type]} updateParams [description]
 * @return {[type]}              [description]
 */
Wallet.prototype.updateScore = function(scoreAddress, scoreContent, updateParams) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: scoreAddress,
            stepLimit: DEFAULT_UPDATE_STEP_LIMIT,
            dataType: 'deploy',
            data: {
                contentType: 'application/zip',
                content: scoreContent,
            },
        };

        if (updateParams) {
            data.data.params = updateParams;
        }

        const rawTx = tx.makeIcxRawTx(data, this.getEndPoint().nid);
        const rawTxSigned = tx.signRawTx(this.getPrivateKey(), rawTx)
        const result = await jsonrpc.sendTransaction(
            rawTxSigned,
            this.getEndPoint().url
        );

        return result
    })();
}


/**
 * Call SCORE's external function
 * @param  {String} to
 * @param  {String} method
 * @param  {Object} params
 * @return {String}
 */
Wallet.prototype.call = function(to, method, params) {
    return (async () => {
        const data = {
            from: this.getAddressString(),
            to: to,
            dataType: 'call',
            data: {
                method: method,
                params: params
            }
        };

        const result = await jsonrpc.call(
            data,
            this.getEndPoint().url
        );

        return result
    })();
}


/**
 * Get SCORE's external API list
 * @param  {String} address
 * @return {Object}
 */
Wallet.prototype.getScoreApi = function(address) {
    return jsonrpc.getScoreApi(address, this.getEndPoint().url);
}


/**
 * Get the transaction result requested by transaction hash
 * @param  {String} txHash
 * @return {Object}
 */
Wallet.prototype.getTransactionResult = function(txHash) {
    return jsonrpc.getTransactionResult(txHash, this.getEndPoint().url);
}


/**
 * Get the transaction information by txHash
 * @param  {String} txHash
 * @return {Object}
 */
Wallet.prototype.getTransactionByHash = function(txHash) {
    return jsonrpc.getTransactionByHash(txHash, this.getEndPoint().url);
}

/**
 * Create a new wallet with a newly generated private key
 * @return {Wallet}
 */
Wallet.create = function() {
    return new Wallet(key.generatePrivateKey());
}

/**
 * @param  {String} privateKeyString
 * @return {Wallet}
 */
Wallet.fromPrivateKey = function(privateKeyString) {
    return new Wallet(Buffer.from(privateKeyString, 'hex'));
}

/**
 * Create a wallet from a keystore object
 * @param  {Object|string} keyStoreObj [description]
 * @param  {String} password    [description]
 * @return {Wallet}             [description]
 */
Wallet.fromKeyStoreObj = function(keyStoreObj, password) {
    //console.log('typeof keyStoreObj:'+typeof keyStoreObj);
    const json = (typeof keyStoreObj === 'object') ? keyStoreObj : JSON.parse(keyStoreObj);

    return new Wallet(key.privateKeyFromKeyStoreObj(
        json,
        password
        ));
}


/**
 * ICON wallet module for javascript
 * @module icon-js/wallet
*/
module.exports = Wallet;


