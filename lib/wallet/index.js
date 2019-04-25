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
const Donation = require('./donation.js')
const TodaysIdol = require('./todaysidol.js')


 /**
  * Class representing a STAYGE Wallet
  */
class Wallet {

    /**
     * Factory method to create a new wallet with a newly generated private key
     * @return {Wallet}
     */
    static create() {
        return new Wallet(IconWallet.create());
    }


    /**
     * Factory method to create a wallet from the specified private key
     * @param  {String} privateKeyString
     * @return {Wallet}
     */
    static fromPrivateKey(privateKeyString) {
        return new Wallet(IconWallet.fromPrivateKey(privateKeyString));
    }


    /**
     * Factory method to create a wallet from the keystore object
     * @param  {Object|String} keyStoreObj
     * @param  {String} password
     * @return {Wallet}
     */
    static fromKeyStoreObj(keyStoreObj, password) {
        return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
    }


    /**
     * Factory method to create a wallet from the keystore file
     * @param  {String} keyStorePath
     * @param  {String} password
     * @return {Wallet}
     */
    static fromKeyStoreFile(keyStorePath, password) {
        const content = fs.readFileSync(keyStorePath);
        const keyStoreObj = JSON.parse(content);
        return new Wallet(IconWallet.fromKeyStoreObj(keyStoreObj, password));
    }

    /**
     * Create a Wallet
     * @param {Object} baseWallet underlying wallet object
     */
    constructor(baseWallet) {
        this._baseWallet = baseWallet;
    }


    /**
     * Return STG score object with the specified score address
     * @param  {String} scoreAddress address of score
     * @return {STG} score object of STG
     */
    stg(scoreAddress) {
        return new STG(this, scoreAddress)
    }


    /**
     * Return ACT score object with the specified score address
     * @param  {String} scoreAddress address of score
     * @return {ACT} score object of ACT
     */
    act(scoreAddress) {
        return new ACT(this, scoreAddress)
    }

    /**
     * Return Donation score object with the specified score address
     * @param  {String} scoreAddress address of score
     * @return {Donation} score object of Donation
     */
    donation(scoreAddress) {
        return new Donation(this, scoreAddress)
    }

    /**
     * Return TodaysIdol score object with the specified score address
     * @param  {String} scoreAddress address of score
     * @return {ACT} score object of TodaysIdol
     */
    todaysidol(scoreAddress) {
        return new TodaysIdol(this, scoreAddress)
    }

    /**
     * Get the private key of the wallet
     * @return {Buffer}
     */
    getPrivateKey() {
        return this._baseWallet.getPrivateKey();
    }


    /**
     * Get the private key string of the wallet
     * @return {String}
     */
    getPrivateKeyString() {
        return this._baseWallet.getPrivateKeyString();
    }


    /**
     * Get a public key of the wallet
     * @return {Buffer}
     */
    getPublicKey() {
        return this._baseWallet.getPublicKey();
    }


    /**
     * Get a public key string of the wallet
     * @return {String}
     */
    getPublicKeyString() {
        return this._baseWallet.getPublicKeyString();
    }

    /**
     * Get the wallet address
     * @return {Buffer}
     */
    getAddress() {
        return this._baseWallet.getAddress();
    }


    /**
     * Get the wallet address string
     * @return {String}
     */
    getAddressString() {
        return this._baseWallet.getAddressString();
    }


    /**
     * Convert a wallet to key store object
     * @param  {String} password password for the wallet
     * @return {Object}
     */
    toKeyStoreObj(password) {
        return this._baseWallet.toKeyStoreObj(password);
    }


    /**
     * set endpoint
     * @param {String} name 'mainnet' | 'testnet'
     */
    setEndPoint(name) {
        return this._baseWallet.setEndPoint(name);
    }


    /**
     * get endpoint
     * @return {String} endpoint information
     */
    getEndPoint() {
        return this._baseWallet.getEndPoint();
    }


    /**
     * Get block information by height
     * @param  {Number|String} height height of block
     * @return {Promise<Object>} block information
     */
    async getBlockByHeight(height) {
        return this._baseWallet.getBlockByHeight(height);
    }


    /**
     * Get block information by hash
     * @param  {String} height hash of block
     * @return {Promise<Object>} block information
     */
    async getBlockByHash(hash) {
        return this._baseWallet.getBlockByHash(hash);
    }


    /**
     * Get a last block information
     * @return {Promise<Object>} block information
     */
    async getLastBlock() {
        return this._baseWallet.getLastBlock();
    }


    /**
     * Get balance of the wallet
     * @return {Promise<String>} balance of the wallet owner
     */
    async getBalance() {
        return this._baseWallet.getBalance();
    }


    /**
     * Get total supply of ICX
     * @return {Promise<String>} total supply of underlying network
     */
    async getTotalSupply() {
        return this._baseWallet.getTotalSupply();
    }


    /**
     * Transfer coins
     * @param {String} to address of recipient
     * @param {Number} value value to transfer
     * @return {Promise<String>} hash of transaction
     */
    async transferCoin(to, value) {
        return this._baseWallet.transferICX(to, value);
    }


    /**
     * Transafer a message
     * @param  {String} to address of recipent
     * @param  {String} msg message to transfer
     * @return {Promise<String>} hash of transaction
     */
    async transferMessage(to, msg) {
        return this._baseWallet.transferMessage(
            to,
            msg.length > 0 ? utils.convertToHex(msg) : msg
        );
    }


    /**
     * Send a transaction for calling a smart contract's method
     * @param  {String} contractAddress
     * @param  {String} contractMethod
     * @param  {Object} methodParams
     * @return {Promise<String>} hash of transacgtion
     */
    async callContractTx(
        contractAddress,
        contractMethod,
        methodParams
    ) {
        return this._baseWallet.callScoreTx(contractAddress, contractMethod, methodParams);
    }


    /**
     * Install a smart contract on the underlying blockchain
     * @param  {String} contractPath
     * @param  {Object} installParams
     * @return {Promise<String>} txHash
     */
    async installContract(contractPath, installParams) {
        const zip = new AdmZip(contractPath);
        const contractContent = '0x' + zip.toBuffer().toString('hex');
        return this._baseWallet.installScore(contractContent, installParams);
    }


    /**
     * Update the smart contract on the underlying blockchain
     * @param  {type} contractAddress
     * @param  {type} contractPath
     * @param  {type} updateParams
     * @return {Promise<String>} txHash
     */
    async updateContract(
        contractAddress,
        contractPath,
        updateParams
    ) {
        const zip = new AdmZip(contractPath);
        const contractContent = '0x' + zip.toBuffer().toString('hex');
        return this._baseWallet.updateScore(contractAddress, contractContent, updateParams);
    }


    /**
     * Call a smart contract's external function for querying
     * @param  {String} to
     * @param  {String} method
     * @param  {Object} params
     * @return {Promise<String>}
     */
    async call(to, method, params) {
        return this._baseWallet.call(to, method, params);
    }

    /**
     * Get the smart contract's external API list
     * @param  {String} address
     * @return {Promise<Object>}
     */
    async getContractApi(address) {
        return this._baseWallet.getScoreApi(address);
    }


    /**
     * Get the transaction result requested by transaction hash
     * @param  {String} txHash
     * @param  {Number} timeout seconds to timeout. if not specified, it will be set to the default value of 0
     * @return {Promise<Object>}
     */
    async getTransactionResult(txHash, timeout=0) {
        const SLEEP_UNIT = 500;
        let loopcnt = 0;
        let i = 0;

        timeout = timeout || 0;
        loopcnt = (timeout === 0) ? 1 : (timeout * 1000 / SLEEP_UNIT);

        for (i = 0; i < loopcnt; i++) {
            try {
                const txResult = await this._baseWallet.getTransactionResult(txHash)
                return txResult;
            } catch (err) {
                //console.log(`getTransactionResult = ${err.message}`);

                if (err.message.indexOf('Pending') !== -1 ||
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
    async getTransactionByHash(txHash) {
        return this._baseWallet.getTransactionByHash(txHash);
    }

}


/** @type {Wallet} */
module.exports = Wallet;
