'use strict'

const utils = require('../icon-js/utils.js');


const ACT = function(wallet, scoreAddress) {
    this._wallet = wallet;
    this._scoreAddress = scoreAddress;
}

ACT.prototype.name = async function() {
    const name = await this._wallet.call(
        this._scoreAddress,
        'name',
        {}
    );

    return name;
}


ACT.prototype.symbol = async function() {
    const symbol = await this._wallet.call(
        this._scoreAddress,
        'symbol',
        {}
    );

    return symbol;
}


ACT.prototype.decimals = async function() {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return utils.toBigNumber(decimals).toNumber();
}


ACT.prototype.totalSupply = async function() {
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


ACT.prototype.balanceOf = async function(owner) {
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

ACT.prototype.transfer = async function(to, value, data='') {
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


ACT.prototype.allowance = async function(owner, spender) {
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


ACT.prototype.approve = async function(spender, value) {
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


ACT.prototype.incAllowance = async function(spender, value) {
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


ACT.prototype.decAllowance = async function(spender, value) {
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


ACT.prototype.transferFrom = async function(from, to, value) {
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

ACT.prototype.mint = async function(to, amount) {
    const decimals = await this._wallet.call(
        this._scoreAddress,
        'decimals',
        {}
    );

    return this._wallet.callScoreTx(
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


ACT.prototype.burn = async function(amount) {
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


ACT.prototype.pause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'pause',
    );
}


ACT.prototype.unpause = async function() {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'unpause',
    );
}


ACT.prototype.paused = async function() {
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


ACT.prototype.setBlacklist = async function(account, flag) {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'set_blacklist',
        {
            _account: account,
            _value:utils.toHexString(flag ? 1 : 0)
        }
    );
}


ACT.prototype.setWhitelist = async function(account, flag) {
    return this._wallet.callScoreTx(
        this._scoreAddress,
        'set_whitelist',
        {
            _account: account,
            _value:utils.toHexString(flag ? 1 : 0)
        }
    );
}

module.exports = ACT;

