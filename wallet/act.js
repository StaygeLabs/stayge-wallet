/**
 * Provides smart contract APIs for ACT
 * @module stayge-wallet/act
 */

'use strict'

const utils = require('../icon-js/utils.js');

/**
 * Class representing the ACT smart contract
 */
class ACT {

    /**
     * Create a ACT
     * @param {Wallet} wallet
     * @param {String} scoreAddress contract address of ACT
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
        const totalSupply = await this._wallet.call(
            this._scoreAddress,
            'totalSupply',
            {}
        );

        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return utils
            .toBigNumber(totalSupply)
            .dividedBy(10 ** utils.toBigNumber(decimals))
            .toNumber();
    }


    /**
     * Returns balance of ACT for the specified owner
     * @param  {String} owner address of owner
     * @return {Promise<Number>}
     */
    async balanceOf(owner) {
        owner = owner || this._wallet.getAddressString();

        const balance = await this._wallet.call(
            this._scoreAddress,
            'balanceOf',
            {_owner: owner}
        );

        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return utils
            .toBigNumber(balance)
            .dividedBy(10 ** utils.toBigNumber(decimals))
            .toNumber();
    }


    /**
     * Transfer ACT to the specified recipient
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


    /**
     * Returns allowance of the spender for the owner balance
     * @param  {String} owner   address of the owner
     * @param  {String} spender address of the spender
     * @return {Promise<Number>}
     */
    async allowance(owner, spender) {
        const allowance = await this._wallet.call(
            this._scoreAddress,
            'allowance',
            {_owner: owner, _spender: spender}
        );

        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return utils
            .toBigNumber(allowance)
            .dividedBy(10 ** utils.toBigNumber(decimals))
            .toNumber();
    }


    /**
     * Approve spender to transfer the specified ACT from the owner's balance
     * @param  {String} spender address of the spender
     * @param  {Number} value   ACT amount to approve
     * @return {Promise<String>} txHash
     */
    async approve(spender, value) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'approve',
            {
                _spender: spender,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }


    /**
     * Increase allowance of the spender for the owner's balance
     * @param  {String} spender address of the spender
     * @param  {Number} value   ACT amount to increase
     * @return {Promise<String>} txHash
     */
    async incAllowance(spender, value) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'inc_allowance',
            {
                _spender: spender,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }

    /**
     * Decrease allowance of the spender for the owner's balance
     * @param  {String} spender address of the spender
     * @param  {Number} value   ACT amount to decrease
     * @return {Promise<String>} txHash
     */
    async decAllowance(spender, value) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'dec_allowance',
            {
                _spender: spender,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }


    /**
     * Tranfer ACT from sender to recipient
     * Only the amount of allowance from sender can be tranferred
     * @param  {String} from  address of the sender
     * @param  {String} to    address of the recipient
     * @param  {Number} value ACT amount to transfer
     * @return {Promise<String>} txHash
     */
    async transferFrom(from, to, value) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'transfer_from',
            {
                _from: from,
                _to: to,
                _value: utils.toHexString(
                    utils.toBigNumber(value).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }


    /**
     * Mint tokens and allocate to the specified recipient
     * @param  {String} to     address of the recipient
     * @param  {Number} amount amount to mint
     * @return {Promise<String>} txHash
     */
    async mint(to, amount) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'mint',
            {
                _to: to,
                _amount: utils.toHexString(
                    utils.toBigNumber(amount).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }


    /**
     * Burn tokens
     * @param  {Number} amount amount to burn
     * @return {Promise<String>} txHash
     */
    async burn(amount) {
        const decimals = await this._wallet.call(
            this._scoreAddress,
            'decimals',
            {}
        );

        return this._wallet.callContractTx(
            this._scoreAddress,
            'burn',
            {
                _amount: utils.toHexString(
                    utils.toBigNumber(amount).times(10 ** utils.toBigNumber(decimals))
                ),
            }
        );
    }


    /**
     * Pause contract to disable it's functionalities
     * @return {Promise<String>} txHash
     */
    async pause() {
        return this._wallet.callContractTx(
            this._scoreAddress,
            'pause',
        );
    }


    /**
     * Unpause contract to enable it's functionalities
     * @return {Promise<String>} txHash
     */
    async unpause() {
        return this._wallet.callContractTx(
            this._scoreAddress,
            'unpause',
        );
    }

    /**
     * Returns whether the contract is paused or not
     * @return {Promise<Bool>} true: paused, false: unpaused
     */
    async paused() {
        const paused = await this._wallet.call(
            this._scoreAddress,
            'paused',
            {}
        );

        if (paused === '0x1') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * set/unset blacklist
     * @param  {String} account address to be set/unset as blacklist
     * @param  {Bool} flag true:set, false:unset
     * @return {Promise<String>} txHash
     */
    async setBlacklist(account, flag) {
        return this._wallet.callContractTx(
            this._scoreAddress,
            'set_blacklist',
            {
                _account: account,
                _value:utils.toHexString(flag ? 1 : 0)
            }
        );
    }

    /**
     * set/unset whitelist
     * @param  {String} account address to be set/unset as whitelist
     * @param  {Bool} flag true:set, false:unset
     * @return {Promise<String>} txHash
     */
    async setWhitelist(account, flag) {
        return this._wallet.callContractTx(
            this._scoreAddress,
            'set_whitelist',
            {
                _account: account,
                _value:utils.toHexString(flag ? 1 : 0)
            }
        );
    }

}

/** @type {ACT} */
module.exports = ACT;

