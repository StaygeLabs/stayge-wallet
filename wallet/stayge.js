'use strict'

const fs = require('fs')
const AdmZip = require('adm-zip');
const IconWallet = require('../icon-js/wallet.js');


const StaygeWallet = function(baseWallet) {
    this._baseWallet = baseWallet;
}

/**
 * Get a private key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
StaygeWallet.prototype.getPrivateKey = function() {
    return this._baseWallet.getPrivateKey();
}

/**
 * Get a private key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
StaygeWallet.prototype.getPrivateKeyString = function() {
    return this._baseWallet.getPrivateKeyString();
}


/**
 * Get a public key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
StaygeWallet.prototype.getPublicKey = function() {
    return this._baseWallet.getPublicKey();
}


/**
 * Get a public key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
StaygeWallet.prototype.getPublicKeyString = function() {
    return this._baseWallet.getPublicKeyString();
}


/**
 * Get the wallet address
 * @memberOf Wallet
 * @return {Buffer}
 */
StaygeWallet.prototype.getAddress = function() {
    return this._baseWallet.getAddress();
}

/**
 * Get the wallet address string
 * @memberOf Wallet
 * @return {String}
 */
StaygeWallet.prototype.getAddressString = function() {
    return this._baseWallet.getAddressString();
}

/**
 * Convert a wallet to key store object
 * @param  {String} password
 * @return {Object}
 */
StaygeWallet.prototype.toKeyStoreObj = function(password) {
    return this._baseWallet.toKeyStoreObj(password);
}

/**
 * set endpoint
 * @param {String} name 'mainnet' | 'testnet'
 */
StaygeWallet.prototype.setEndPoint = function(name) {
    return this._baseWallet.setEndPoint(name);
}

/**
 * get endpoint
 * @return {String} uri of endpoint
 */
StaygeWallet.prototype.getEndPoint = function() {
    return this._baseWallet.getEndPoint();
}


/**
 * Get block information by height
 * @param  {Number|String} height
 * @return {Object}
 */
StaygeWallet.prototype.getBlockByHeight = function(height) {
    return this._baseWallet.getBlockByHeight(height);
}


/**
 * Get block information by hash
 * @param  {String} height
 * @return {Object}
 */
StaygeWallet.prototype.getBlockByHash = function(hash) {
    return this._baseWallet.getBlockByHash(hash);
}


/**
 * Get a last block information
 * @return {Object}
 */
StaygeWallet.prototype.getLastBlock = function() {
    return this._baseWallet.getLastBlock();
}


/**
 * Get balance of the wallet
 * @return {String}
 */
StaygeWallet.prototype.getBalance = function() {
    return this._baseWallet.getBalance();
}


/**
 * Get total supply of ICX
 * @return {String}
 */
StaygeWallet.prototype.getTotalSupply = function() {
    return this._baseWallet.getTotalSupply();
}

/**
 * Transfer ICX coins
 * @param {String} to
 * @param {Number} value
 * @return {String} txHash
 */
StaygeWallet.prototype.transferICX = function(to, value) {
    return this._baseWallet.transferICX(to, value);
}


/**
 * Transafer a message
 * @param  {String} to
 * @param  {String} msg
 * @return {String} txHash
 */
StaygeWallet.prototype.transferMessage = function(to, msg) {
    return this._baseWallet.transferMessage(to, msg);
}


/**
 * Send a transaction for calling a SCORE'S method
 * @param  {String} scoreAddress
 * @param  {String]} scoreMethod
 * @param  {Object} methodParams
 * @return {String} txHash
 */
StaygeWallet.prototype.callScoreTx = function(
    scoreAddress,
    scoreMethod,
    methodParams
) {
    return this._baseWallet.callScoreTx(scoreAddress, scoreMethod, methodParams);
}



/**
 * Install a SCORE on the ICON blockchain
 * @param  {String} scorePath
 * @param  {Object} installParams
 * @return {String} txHash
 */
StaygeWallet.prototype.installScore = function(scorePath, installParams) {
    const zip = new AdmZip(scorePath);
    const scoreContent = zip.toBuffer().toString('hex');
    return this._baseWallet.installScore(scoreContent, installParams);
}


/**
 * Update a SCORE on the ICON blockchain
 * @param  {[type]} scoreAddress [description]
 * @param  {[type]} scorePath [description]
 * @param  {[type]} updateParams [description]
 * @return {String} txHash
 */
StaygeWallet.prototype.updateScore = function(
    scoreAddress,
    scorePath,
    updateParams
) {
    const zip = new AdmZip(scorePath);
    const scoreContent = zip.toBuffer().toString('hex');
    return this._baseWallet.updateScore(scoreAddress, scoreContent, updateParams);
}


/**
 * Call SCORE's external function
 * @param  {String} to
 * @param  {String} method
 * @param  {Object} params
 * @return {String}
 */
StaygeWallet.prototype.call = function(to, method, params) {
    return this._baseWallet.call(to, method, params);
}


/**
 * Get SCORE's external API list
 * @param  {String} address
 * @return {Object}
 */
StaygeWallet.prototype.getScoreApi = function(address) {
    return this._baseWallet.getScoreApi(address);
}


/**
 * Get the transaction result requested by transaction hash
 * @param  {String} txHash
 * @return {Object}
 */
StaygeWallet.prototype.getTransactionResult = function(txHash) {
    return this._baseWallet.getTransactionResult(txHash);
}


/**
 * Get the transaction information by txHash
 * @param  {String} txHash
 * @return {Object}
 */
StaygeWallet.prototype.getTransactionByHash = function(txHash) {
    return this._baseWallet.getTransactionByHash(txHash);
}

/**
 * Create a new wallet with a newly generated private key
 * @return {Wallet}
 */
StaygeWallet.create = function() {
    return new StaygeWallet(IconWallet.create());
}

/**
 * @param  {String} privateKeyString
 * @return {Wallet}
 */
Wallet.fromPrivateKey = function(privateKeyString) {
    return new StaygeWallet(IconWallet.fromPrivateKey(privateKeyString));
}

/**
 * Create a wallet from a keystore object
 * @param  {Object|string} keyStoreObj [description]
 * @param  {String} password    [description]
 * @return {Wallet}             [description]
 */
Wallet.fromKeyStoreObj = function(keyStoreObj, password) {
    return new StaygeWallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
}


/**
 * [fromKeyStoreObj description]
 * @param  {[type]} keyStorePath [description]
 * @param  {[type]} password     [description]
 * @return {[type]}              [description]
 */
Wallet.fromKeyStoreFile = function(keyStorePath, password) {
    content = fs.readFileSync(keyStorePath);
    keyStoreObj = JSON.parse(content);
    return new StaygeWallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
}


/**
 * STAYGE wallet module for javascript
 * @module stayge
*/
module.exports = StaygeWallet;
