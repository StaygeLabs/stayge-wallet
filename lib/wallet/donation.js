/**
 * Provides smart contract APIs for Donation
 * @module stayge-wallet/donation
 */

'use strict'

const utils = require('../icon-js/utils.js');

/**
 * Class representing the Donation smart contract
 */
class Donation {

    /**
     * Create a Donation
     * @param {Wallet} wallet
     * @param {String} scoreAddress contract address of Donation
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
     * Returns total doantion amount
     * @return {Promise<Number>}
     */
    async totalDonationAmt() {
        const amt = await this._wallet.call(
            this._scoreAddress,
            'total_donation_amt',
            {}
        );

        return utils.toBigNumber(amt).toNumber();
    }

    /**
     * Returns total number of users
     * @return {Promise<Number>}
     */
    async totalUsers() {
        const users = await this._wallet.call(
            this._scoreAddress,
            'total_users',
            {}
        );

        return utils.toBigNumber(users).toNumber();
    }

    /**
     * Returns total number of artists
     * @return {Promise<Number>}
     */
    async totalArtists() {
        const artists = await this._wallet.call(
            this._scoreAddress,
            'total_artists',
            {}
        );

        return utils.toBigNumber(artists).toNumber();
    }

    /**
     * Refund donation amount
     * @param  {String} ACT contract address for community
     * @param  {String} to address of the recipient
     * @param  {Number} value the amount to refund
     * @param  {String} data optional
     * @return {Promise<String>} txHash
     */
    async refund(community, to, value, data='') {
        const decimals = await this._wallet.call(
            community,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'refund',
            {
                _community: community,
                _to: to,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
                _data: data.length > 0 ? utils.convertToHex(data) : data,
            }
        );
    }
}

/** @type {Donation} */
module.exports = Donation;

