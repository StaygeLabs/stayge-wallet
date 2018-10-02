/**
 * STAYGE wallet module for javascript
 * @module stayge-wallet
*/

'use strict'

const fs = require('fs')
const AdmZip = require('adm-zip');
const IconWallet = require('../icon-js/wallet.js');
const utils = require('../icon-js/utils.js');
const STG = require('./stg.js')
const ACT = require('./act.js')

/**
 * Provides wallet API for STAYGE Network
 * @class
 * @constructor
 * @param {Object} baseWallet underlying wallet object
 */
const Wallet = function(baseWallet) {
    this._baseWallet = baseWallet;
}

/**
 * Return STG score object with the specified score address
 * @param  {String} scoreAddress address of score
 * @return {STG} score object of STG
 */
Wallet.prototype.stg = function(scoreAddress) {
    return new STG(this, scoreAddress)
}

/**
 * Return ACT socre object with the specified score address
 * @param  {String} scoreAddress address of score
 * @return {ACT} score object of ACT
 */
Wallet.prototype.act = function(scoreAddress) {
    return new ACT(this, scoreAddress)
}

/**
 * Get the private key of the wallet
 * @return {Buffer}
 */
Wallet.prototype.getPrivateKey = function() {
    return this._baseWallet.getPrivateKey();
}

/**
 * Get the private key string of the wallet
 * @return {String}
 */
Wallet.prototype.getPrivateKeyString = function() {
    return this._baseWallet.getPrivateKeyString();
}


/**
 * Get a public key of the wallet
 * @return {Buffer}
 */
Wallet.prototype.getPublicKey = function() {
    return this._baseWallet.getPublicKey();
}


/**
 * Get a public key string of the wallet
 * @return {String}
 */
Wallet.prototype.getPublicKeyString = function() {
    return this._baseWallet.getPublicKeyString();
}


/**
 * Get the wallet address
 * @return {Buffer}
 */
Wallet.prototype.getAddress = function() {
    return this._baseWallet.getAddress();
}

/**
 * Get the wallet address string
 * @return {String}
 */
Wallet.prototype.getAddressString = function() {
    return this._baseWallet.getAddressString();
}

/**
 * Convert a wallet to key store object
 * @param  {String} password password for the wallet
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
 * @return {String} endpoint information
 */
Wallet.prototype.getEndPoint = function() {
    return this._baseWallet.getEndPoint();
}


/**
 * Get block information by height
 * @param  {Number|String} height height of block
 * @return {Promise<Object>} block information
 */
Wallet.prototype.getBlockByHeight = async function(height) {
    return this._baseWallet.getBlockByHeight(height);
}


/**
 * Get block information by hash
 * @param  {String} height hash of block
 * @return {Promise<Object>} block information
 */
Wallet.prototype.getBlockByHash = async function(hash) {
    return this._baseWallet.getBlockByHash(hash);
}


/**
 * Get a last block information
 * @return {Promise<Object>} block information
 */
Wallet.prototype.getLastBlock = async function() {
    return this._baseWallet.getLastBlock();
}


/**
 * Get balance of the wallet
 * @return {Promise<String>} balance of the wallet owner
 */
Wallet.prototype.getBalance = async function() {
    return this._baseWallet.getBalance();
}


/**
 * Get total supply of ICX
 * @return {Promise<String>} total supply of underlying network
 */
Wallet.prototype.getTotalSupply = async function() {
    return this._baseWallet.getTotalSupply();
}

/**
 * Transfer ICX coins
 * @param {String} to address of recipient
 * @param {Number} value value to transfer
 * @return {Promise<String>} hash of transaction
 */
Wallet.prototype.transferICX = async function(to, value) {
    return this._baseWallet.transferICX(to, value);
}


/**
 * Transafer a message
 * @param  {String} to address of recipent
 * @param  {String} msg message to transfer
 * @return {Promise<String>} hash of transaction
 */
Wallet.prototype.transferMessage = async function(to, msg) {
    return this._baseWallet.transferMessage(
        to,
        msg.length > 0 ? utils.convertToHex(msg) : msg
    );
}


/**
 * Send a transaction for calling a SCORE'S method
 * @param  {String} scoreAddress
 * @param  {String} scoreMethod
 * @param  {Object} methodParams
 * @return {Promise<String>} hash of transacgtion
 */
Wallet.prototype.callScoreTx = async function(
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
 * @return {Promise<String>} txHash
 */
Wallet.prototype.installScore = async function(scorePath, installParams) {
    const zip = new AdmZip(scorePath);
    const scoreContent = '0x' + zip.toBuffer().toString('hex');
    return this._baseWallet.installScore(scoreContent, installParams);
}


/**
 * Update a SCORE on the ICON blockchain
 * @param  {type} scoreAddress
 * @param  {type} scorePath
 * @param  {type} updateParams
 * @return {Promise<String>} txHash
 */
Wallet.prototype.updateScore = async function(
    scoreAddress,
    scorePath,
    updateParams
) {
    const zip = new AdmZip(scorePath);
    const scoreContent = '0x' + zip.toBuffer().toString('hex');
    return this._baseWallet.updateScore(scoreAddress, scoreContent, updateParams);
}


/**
 * Call SCORE's external function
 * @param  {String} to
 * @param  {String} method
 * @param  {Object} params
 * @return {Promise<String>}
 */
Wallet.prototype.call = async function(to, method, params) {
    return this._baseWallet.call(to, method, params);
}


/**
 * Get SCORE's external API list
 * @param  {String} address
 * @return {Promise<Object>}
 */
Wallet.prototype.getScoreApi = async function(address) {
    return this._baseWallet.getScoreApi(address);
}


/**
 * Get the transaction result requested by transaction hash
 * @param  {String} txHash
 * @return {Promise<Object>}
 */
Wallet.prototype.getTransactionResult = async function(txHash, ignorePending=true) {
    let i = 0

    for (i = 0; i < 20; i++) {
        try {
            const txResult = await this._baseWallet.getTransactionResult(txHash)
            return txResult;
        } catch (err) {
            //console.log(`getTransactionResult = ${err.message}`);

            if ((ignorePending && err.message.indexOf('Pending') !== -1) ||
                err.message.indexOf('Invalid params txHash') !== -1) {
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
 * @return {Promise<Object>}
 */
Wallet.prototype.getTransactionByHash = async function(txHash) {
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
 * @param  {Object|String} keyStoreObj
 * @param  {String} password
 * @return {Wallet}
 */
Wallet.fromKeyStoreObj = function(keyStoreObj, password) {
    return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
}


/**
 * Create a wallet from a keystore file
 * @param  {String} keyStorePath
 * @param  {String} password
 * @return {Wallet}
 */
Wallet.fromKeyStoreFile = function(keyStorePath, password) {
    const content = fs.readFileSync(keyStorePath);
    const keyStoreObj = JSON.parse(content);
    return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
}


/** @type {Wallet} */
module.exports = Wallet;
