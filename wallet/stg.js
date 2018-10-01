'use strict'

const utils = require('../icon-js/utils.js');


const STG = function(wallet, scoreAddress) {
    this._wallet = wallet;
    this._scoreAddress = scoreAddress;
}

STG.prototype.name = async function() {
    const name = await this._wallet.call(
        this._scoreAddress,
        'name',
        {}
    );

    return name;
}


STG.prototype.symbol = async function() {
    const symbol = await this._wallet.call(
        this._scoreAddress,
        'symbol',
        {}
    );

    return symbol;
}


STG.prototype.decimals = async function() {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return utils.toBigNumber(decimals).toNumber();
}


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


STG.prototype.pause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'pause',
    );
}


STG.prototype.unpause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'unpause',
    );
}


STG.prototype.paused = async function() {
    const paused = await this._wallet.call(
        this._scoreAddress,
        'paused',
        {}
    );

    if (paused == '0x1') {
        return true;
    } else {
        return false;
    }
}


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

module.exports = STG;

