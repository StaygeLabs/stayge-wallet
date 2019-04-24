/**
 * ICON wallet module for javascript
 * @module stayge-wallet/icon-js/wallet
*/

'use strict'

const key = require('./key.js');
const utils = require('./utils.js');
const jsonrpc = require('./jsonrpc.js');
const tx = require('./tx.js');

const DEFAULT_DEPLOY_STEP_LIMIT = 2000000000; // 20 ICX, step price : 0.00000001 ICX(10 Gloop)
const DEFAULT_UPDATE_STEP_LIMIT = 3000000000; // 30 ICX, step price : 0.00000001 ICX(10 Gloop)
const DEFAULT_TX_STEP_LIMIT = 500000; // 0.005 ICX, step price : 0.00000001 ICX(10 Gloop)

/**
 * Class representing a ICON Wallet
 */
class Wallet {


    /**
     * Factory method to create a new wallet with a newly generated private key
     * @return {Wallet}
     */
    static create() {
        return new Wallet(key.generatePrivateKey());
    }

    /**
     * Factory method to create a wallet from the private key
     * @param  {String} privateKeyString
     * @return {Wallet}
     */
    static fromPrivateKey(privateKeyString) {
        return new Wallet(Buffer.from(privateKeyString, 'hex'));
    }

    /**
     * Factory method to create a wallet from the keystore object
     * @param  {Object|string} keyStoreObj [description]
     * @param  {String} password    [description]
     * @return {Wallet}             [description]
     */
    static fromKeyStoreObj(keyStoreObj, password) {
        //console.log('typeof keyStoreObj:'+typeof keyStoreObj);
        const json = (typeof keyStoreObj === 'object') ? keyStoreObj : JSON.parse(keyStoreObj);

        return new Wallet(key.privateKeyFromKeyStoreObj(
            json,
            password
            ));
    }

    /**
     * Create a ICON Wallet
     * @param {Buffer} privateKey - private key for wallet
     */
    constructor(privateKey) {
        this._privateKey = privateKey;
        this._publicKey = key.privateToPublic(privateKey);
        this._address = key.publicToAddress(this._publicKey);
        this._endpoint = utils.getEndPointFromEnv();
    }


    /**
     * Get the private key of the wallet
     * @return {Buffer}
     */
    getPrivateKey() {
        return this._privateKey;
    }

    /**
     * Get the private key string of the wallet
     * @return {String}
     */
    getPrivateKeyString() {
        return this._privateKey.toString('hex');
    }


    /**
     * Get the public key of the wallet
     * @return {Buffer}
     */
    getPublicKey() {
        return this._publicKey;
    }


    /**
     * Get the public key string of the wallet
     * @return {String}
     */
    getPublicKeyString() {
        return this._publicKey.toString('hex');
    }

    /**
     * Get the address of the wallet
     * @return {Buffer}
     */
    getAddress() {
        return this._address;
    }

    /**
     * Get the address string of the wallet
     * @return {String}
     */
    getAddressString() {
        return 'hx' + this._address.toString('hex');
    }

    /**
     * Convert the wallet to the keystore object
     * @param  {String} password
     * @return {Object}
     */
    toKeyStoreObj(password) {
        return key.toKeyStoreObj(
            this.getPrivateKey(),
            this.getAddressString(),
            password
        );
    }

    /**
     * set the endpoint
     * @param {String} name 'mainnet' | 'testnet'
     */
    setEndPoint(name) {
        this._endpoint = utils.getEndPoint(name);
    }

    /**
     * get the endpoint
     * @return {String} uri of endpoint
     */
    getEndPoint() {
        return this._endpoint;
    }

    /**
     * Get the block information by height
     * @param  {Number|String} height
     * @return {Promise<Object>}
     */
    async getBlockByHeight(height) {
        return jsonrpc.getBlockByHeight(height, this.getEndPoint().url);
    }


    /**
     * Get the block information by hash
     * @param  {String} height
     * @return {Promise<Object>}
     */
    async getBlockByHash(hash) {
        return jsonrpc.getBlockByHash(hash, this.getEndPoint().url);
    }

    /**
     * Get the last block information
     * @return {Promise<Object>}
     */
    async getLastBlock() {
        return jsonrpc.getLastBlock(this.getEndPoint().url);
    }


    /**
     * Get balance of the wallet
     * @return {Promise<String>}
     */
    async getBalance() {
        return jsonrpc.getBalance(this.getAddressString(), this.getEndPoint().url);
    }

    /**
     * Get total supply of ICX
     * @return {Promise<String>}
     */
    async getTotalSupply() {
        return jsonrpc.getTotalSupply(this.getEndPoint().url);
    }


    /**
     * Transfer ICX coins
     * @param {String} to
     * @param {Number} value
     * @return {Promise<String>} txHash
     */
    async transferICX(to, value) {
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
    }


    /**
     * Transafer a message
     * @param  {String} to
     * @param  {String} msg
     * @return {Promise<String>} txHash
     */
    async transferMessage(to, msg) {
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
    }


    /**
     * Send a transaction for calling a SCORE'S method
     * @param  {String} scoreAddress
     * @param  {String} scoreMethod
     * @param  {Object} methodParams
     * @return {Promise<String>} txHash
     */
    async callScoreTx(scoreAddress, scoreMethod, methodParams) {
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
    }

    /**
     * Install a SCORE on the ICON blockchain
     * @param  {String} scoreContent
     * @param  {Object} installParams
     * @return {Promise<String>} txHash
     */
    async installScore(scoreContent, installParams) {
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
    }


    /**
     * Update the SCORE on the ICON blockchain
     * @param  {String} scoreAddress address of score
     * @param  {String} scoreContent score contents of hexstring format
     * @param  {Object} updateParams parameter for update
     * @return {Promise<String>}
     */
    async updateScore(scoreAddress, scoreContent, updateParams) {
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
    }

    /**
     * Call SCORE's external function
     * @param  {String} to
     * @param  {String} method
     * @param  {Object} params
     * @return {Promise<String>}
     */
    async call(to, method, params) {
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
    }

    /**
     * Get the SCORE's external API list
     * @param  {String} address
     * @return {Promise<Object>}
     */
    async getScoreApi(address) {
        return jsonrpc.getScoreApi(address, this.getEndPoint().url);
    }

    /**
     * Get the transaction result with the specified txHash
     * @param  {String} txHash
     * @return {Promise<Object>}
     */
    async getTransactionResult(txHash) {
        return jsonrpc.getTransactionResult(txHash, this.getEndPoint().url);
    }

    /**
     * Get the transaction information by txHash
     * @param  {String} txHash
     * @return {Promise<Object>}
     */
    async getTransactionByHash(txHash) {
        return jsonrpc.getTransactionByHash(txHash, this.getEndPoint().url);
    }

}



/** @type {Wallet} */
module.exports = Wallet;


