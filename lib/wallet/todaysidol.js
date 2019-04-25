/**
 * Provides smart contract APIs for TodaysIdol
 * @module stayge-wallet/todaysidol
 */

'use strict'

const utils = require('../icon-js/utils.js');

/**
 * Class representing the Today's Idol smart contract
 */
class TodaysIdol {

    /**
     * Create a TodaysIdol
     * @param {Wallet} wallet
     * @param {String} scoreAddress contract address of TodaysIdol
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
     * Returns total count of the comments
     * @return {Promise<Number>}
     */
    async totalComments() {
        const amt = await this._wallet.call(
            this._scoreAddress,
            'total_comments',
            {}
        );

        return utils.toBigNumber(amt).toNumber();
    }

    /**
     * Returns comments
     * @return {Promise<Object>}
     */
    async comments(page) {
        const comments = await this._wallet.call(
            this._scoreAddress,
            'comments',
            {_page: utils.toHexString(page)}
        );

        return comments;
    }

    /**
     * Write a comment
     * @param  {String} user
     * @param  {String} artist
     * @param  {String} comment
     * @return {Promise<String>} txHash
     */
    async writeComment(user, artist, comment) {
        return this._wallet.callContractTx(
            this._scoreAddress,
            'write_comment',
            {
                _user: user,
                _artist: artist,
                _comment: comment
            }
        );
    }
}

/** @type {Donation} */
module.exports = TodaysIdol;

