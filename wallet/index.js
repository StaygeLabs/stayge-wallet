'use strict'

const fs = require('fs')
const AdmZip = require('adm-zip');
const IconWallet = require('../icon-js/wallet.js');
const utils = require('../icon-js/utils.js');
const STG = require('./stg.js')
const ACT = require('./act.js')


const Wallet = function(baseWallet) {
    this._baseWallet = baseWallet;
}

Wallet.prototype.stg = function(scoreAddress) {
    return new STG(this, scoreAddress)
}

Wallet.prototype.act = function(scoreAddress) {
    return new ACT(this, scoreAddress)
}

/**
 * Get a private key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getPrivateKey = function() {
    return this._baseWallet.getPrivateKey();
}

/**
 * Get a private key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getPrivateKeyString = function() {
    return this._baseWallet.getPrivateKeyString();
}


/**
 * Get a public key of the wallet
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getPublicKey = function() {
    return this._baseWallet.getPublicKey();
}


/**
 * Get a public key string of the wallet
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getPublicKeyString = function() {
    return this._baseWallet.getPublicKeyString();
}


/**
 * Get the wallet address
 * @memberOf Wallet
 * @return {Buffer}
 */
Wallet.prototype.getAddress = function() {
    return this._baseWallet.getAddress();
}

/**
 * Get the wallet address string
 * @memberOf Wallet
 * @return {String}
 */
Wallet.prototype.getAddressString = function() {
    return this._baseWallet.getAddressString();
}

/**
 * Convert a wallet to key store object
 * @param  {String} password
 * @return {Object}
 */
Wallet.prototype.toKeyStoreObj = function(password) {
    return this._baseWallet.toKeyStoreObj(password);
}

/**
 * set endpoint
 * @param {String} name 'mainnet' | 'testnet'
 */
Wallet.prototype.setEndPoint = function(name) {
    return this._baseWallet.setEndPoint(name);
}

/**
 * get endpoint
 * @return {String} uri of endpoint
 */
Wallet.prototype.getEndPoint = function() {
    return this._baseWallet.getEndPoint();
}


/**
 * Get block information by height
 * @param  {Number|String} height
 * @return {Object}
 */
Wallet.prototype.getBlockByHeight = function(height) {
    return this._baseWallet.getBlockByHeight(height);
}


/**
 * Get block information by hash
 * @param  {String} height
 * @return {Object}
 */
Wallet.prototype.getBlockByHash = function(hash) {
    return this._baseWallet.getBlockByHash(hash);
}


/**
 * Get a last block information
 * @return {Object}
 */
Wallet.prototype.getLastBlock = function() {
    return this._baseWallet.getLastBlock();
}


/**
 * Get balance of the wallet
 * @return {String}
 */
Wallet.prototype.getBalance = function() {
    return this._baseWallet.getBalance();
}


/**
 * Get total supply of ICX
 * @return {String}
 */
Wallet.prototype.getTotalSupply = function() {
    return this._baseWallet.getTotalSupply();
}

/**
 * Transfer ICX coins
 * @param {String} to
 * @param {Number} value
 * @return {String} txHash
 */
Wallet.prototype.transferICX = function(to, value) {
    return this._baseWallet.transferICX(to, value);
}


/**
 * Transafer a message
 * @param  {String} to
 * @param  {String} msg
 * @return {String} txHash
 */
Wallet.prototype.transferMessage = function(to, msg) {
    return this._baseWallet.transferMessage(to, msg);
}


/**
 * Send a transaction for calling a SCORE'S method
 * @param  {String} scoreAddress
 * @param  {String]} scoreMethod
 * @param  {Object} methodParams
 * @return {String} txHash
 */
Wallet.prototype.callScoreTx = function(
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
Wallet.prototype.installScore = function(scorePath, installParams) {
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
Wallet.prototype.updateScore = function(
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
Wallet.prototype.call = function(to, method, params) {
    return this._baseWallet.call(to, method, params);
}


/**
 * Get SCORE's external API list
 * @param  {String} address
 * @return {Object}
 */
Wallet.prototype.getScoreApi = function(address) {
    return this._baseWallet.getScoreApi(address);
}


/**
 * Get the transaction result requested by transaction hash
 * @param  {String} txHash
 * @return {Object}
 */
Wallet.prototype.getTransactionResult = async function(txHash) {
    let i = 0

    for (i = 0; i < 20; i++) {
        try {
            const txResult = await this._baseWallet.getTransactionResult(txHash)
            return txResult;
        } catch (err) {
            //console.log(`getTransactionResult = ${err.message}`);

            if (err.message.indexOf('Pending') != -1 ||
                err.message.indexOf('Invalid params txHash') != -1) {
                await utils.sleep(500);
            } else {
                throw err;
            }
        }
    }

    throw new Error(`The transaction of ${txHash} is pending`);
}


/**
 * Get the transaction information by txHash
 * @param  {String} txHash
 * @return {Object}
 */
Wallet.prototype.getTransactionByHash = function(txHash) {
    return this._baseWallet.getTransactionByHash(txHash);
}

/**
 * Create a new wallet with a newly generated private key
 * @return {Wallet}
 */
Wallet.create = function() {
    return new Wallet(IconWallet.create());
}

/**
 * @param  {String} privateKeyString
 * @return {Wallet}
 */
Wallet.fromPrivateKey = function(privateKeyString) {
    return new Wallet(IconWallet.fromPrivateKey(privateKeyString));
}

/**
 * Create a wallet from a keystore object
 * @param  {Object|string} keyStoreObj [description]
 * @param  {String} password    [description]
 * @return {Wallet}             [description]
 */
Wallet.fromKeyStoreObj = function(keyStoreObj, password) {
    return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
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
    return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
}


/**
 * STAYGE wallet module for javascript
 * @module stayge
*/
module.exports = Wallet;
