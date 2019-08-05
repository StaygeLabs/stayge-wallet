/**
 * Provides smart contract APIs for WOK
 * @module stayge-wallet/wok
 */

'use strict'

const utils = require('../icon-js/utils.js');

/**
 * Class representing the WOK smart contract
 */
class WOK {

    /**
     * Create a WOK
     * @param {Wallet} wallet
     * @param {String} scoreAddress contract address of WOK
     */
    constructor(wallet, scoreAddress) {
        this._wallet = wallet;
        this._scoreAddress = scoreAddress;
    }


    /**
     * Returns name
     * @return {Promise<String>}
     */
    async name() {
        const name = await this._wallet.call(
            this._scoreAddress,
            'name',
            {}
        );

        return name;
    }


    /**
     * Returns symbol
     * @return {Promise<String>}
     */
    async symbol() {
        const symbol = await this._wallet.call(
            this._scoreAddress,
            'symbol',
            {}
        );

        return symbol;
    }


    /**
     * Returns decimals
     * @return {Promise<Number>}
     */
    async decimals() {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return utils.toBigNumber(decimals).toNumber();
    }


    /**
     * Returns total supply
     * @return {Promise<Number>}
     */
    async totalSupply() {
        const [totalSupply, decimals] = await Promise.all([
            this._wallet.call(
                this._scoreAddress,
                'totalSupply',
                {}
            ),
            this._wallet.call(
                this._scoreAddress,
                'decimals',
                {}
            )
        ]);

        return utils
            .toBigNumber(totalSupply)
            .dividedBy(10 ** utils.toBigNumber(decimals))
            .toNumber();
    }


    /**
     * Returns balance of WOK for the specified owner
     * @param  {String} owner address of owner
     * @return {Promise<Number>}
     */
    async balanceOf(owner) {
        owner = owner || this._wallet.getAddressString();

        const [balance, decimals] = await Promise.all([
            this._wallet.call(
                this._scoreAddress,
                'balanceOf',
                {_owner: owner}
            ),
            this._wallet.call(
                this._scoreAddress,
                'decimals',
                {}
            )
        ]);

        return utils
            .toBigNumber(balance)
            .dividedBy(10 ** utils.toBigNumber(decimals))
            .toNumber();
    }


    /**
     * Transfer WOK to the specified recipient
     * @param  {String} to address of the recipient
     * @param  {Number} value the amount to transfer
     * @param  {String} data optional
     * @return {Promise<String>} txHash
     */
    async transfer(to, value, data='') {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'transfer',
            {
                _to: to,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
                _data: data.length > 0 ? utils.convertToHex(data) : data,
            }
        );
    }
}

/** @type {WOK} */
module.exports = WOK;

