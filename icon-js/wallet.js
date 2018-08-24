'use strict'

const key = require('./key.js');
const fs = require('fs');
const net = require('./net.js');
const jsonrpc = require('./jsonrpc.js');

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

    this._endpoint = net.getEndPointFromEnv();
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
    this._endpoint = net.getEndPoint(name);
}

/**
 * get endpoint
 * @return {String} uri of endpoint
 */
Wallet.prototype.getEndPoint = function() {
    return this._endpoint;
}

/**
 * Get balance of the wallet
 * @return {String}
 */
Wallet.prototype.getBalance = function() {
    return jsonrpc.getBalance(this.getAddressString(), this.getEndPoint());
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
    const json = (typeof keyStoreObj === 'object') ? keyStoreObj : JSON.parse(keyStoreObj);

    return new Wallet(key.privateKeyFromKeyStoreObj(
        json,
        password
        ));
}

/**
 * Get block information by height
 * @param  {Number|String} height
 * @return {Object}
 */
Wallet.getBlockByHeight = function(height) {
    return jsonrpc.getBlockByHeight(height, this.getEndPoint());
}


/**
 * Get block information by hash
 * @param  {String} height
 * @return {Object}
 */
Wallet.getBlockByHash = function(hash) {
    return jsonrpc.getBlockByHash(hash, this.getEndPoint());
}


/**
 * Get a last block information
 * @return {Object}
 */
Wallet.getLastBlock = function() {
    return jsonrpc.getLastBlock(this.getEndPoint());
}

/**
 * ICON wallet module for javascript
 * @module icon-js/wallet
*/
module.exports = Wallet;


