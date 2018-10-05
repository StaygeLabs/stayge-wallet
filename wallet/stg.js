/**
 * Provides smart contract APIs for STG
 * @module  stayge-wallet/stg
 */

'use strict'

const utils = require('../icon-js/utils.js');


/**
 * Smart contract APIs for STG
 * @class
 * @constructor
 * @param {Wallet} wallet
 * @param {String} scoreAddress contract address of STG
 */
const STG = function(wallet, scoreAddress) {
    this._wallet = wallet;
    this._scoreAddress = scoreAddress;
}

/**
 * Returns name
 * @return {Promise<String>}
 */
STG.prototype.name = async function() {
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
STG.prototype.symbol = async function() {
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
STG.prototype.decimals = async function() {
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
STG.prototype.totalSupply = async function() {
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
 * Returns balance of STG for the specified owner
 * @param  {String} owner address of owner
 * @return {Promise<Number>}
 */
STG.prototype.balanceOf = async function(owner) {
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
 * Transfer STG to the specified recipient
 * @param  {String} to address of the recipient
 * @param  {Number} value the amount to transfer
 * @param  {String} data optional
 * @return {Promise<String>} txHash
 */
STG.prototype.transfer = async function(to, value, data='') {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
STG.prototype.allowance = async function(owner, spender) {
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
 * Approve spender to transfer the specified STG from the owner's balance
 * @param  {String} spender address of the spender
 * @param  {Number} value   STG amount to approve
 * @return {Promise<String>} txHash
 */
STG.prototype.approve = async function(spender, value) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
 * @param  {Number} value   STG amount to increase
 * @return {Promise<String>} txHash
 */
STG.prototype.incAllowance = async function(spender, value) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
 * @param  {Number} value   STG amount to decrease
 * @return {Promise<String>} txHash
 */
STG.prototype.decAllowance = async function(spender, value) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
 * Tranfer STG from sender to recipient
 * Only the amount of allowance from sender can be tranferred
 * @param  {String} from  address of the sender
 * @param  {String} to    address of the recipient
 * @param  {Number} value STG amount to transfer
 * @return {Promise<String>} txHash
 */
STG.prototype.transferFrom = async function(from, to, value) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
 * Mint tokens and allocate to the contract owner
 * @param  {Number} amount amount to mint
 * @return {Promise<String>} txHash
 */
STG.prototype.mint = async function(amount) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
        this._scoreAddress,
        'mint',
        {
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
STG.prototype.burn = async function(amount) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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
STG.prototype.pause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'pause',
    );
}

/**
 * Unpause contract to enable it's functionalities
 * @return {Promise<String>} txHash
 */
STG.prototype.unpause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'unpause',
    );
}

/**
 * Returns whether the contract is paused or not
 * @return {Promise<Bool>} true: paused, false: unpaused
 */
STG.prototype.paused = async function() {
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
STG.prototype.setBlacklist = async function(account, flag) {
    return this._wallet.callScoreTx(
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
STG.prototype.setWhitelist = async function(account, flag) {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'set_whitelist',
        {
            _account: account,
            _value:utils.toHexString(flag ? 1 : 0)
        }
    );
}

/** @type {STG} */
module.exports = STG;
