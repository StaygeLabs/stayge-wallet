'use strict'

const chai = require('chai');
const assert = chai.assert;
const BigNumber = require('bignumber.js');
const utils = require('../lib/icon-js/utils.js');

describe('utils.toBigNumber()', function() {

    it('input parameter is BigNumber', async function() {
        const someVal = new BigNumber(12341234123412341234);

        assert.deepEqual(utils.toBigNumber(someVal), someVal);
    });

    it('input parameter is null', async function() {
        assert.deepEqual(utils.toBigNumber(null), BigNumber(0));
    });

    it('input parameter is hexadecimal string without 0x prefix', async function() {
        assert.deepEqual(utils.toBigNumber('100'), BigNumber(100));
    });

    it('input parameter is hexadecimal string with 0x prefix', async function() {
        assert.deepEqual(utils.toBigNumber('0x100'), BigNumber(256));
    });
});

describe('utils.toHexString()', function() {

    it('input parameter is Object', async function() {
        const someVal = {a:1, b:2};

        assert.deepEqual(utils.toHexString(someVal), someVal);
    });
});

describe('utils.toHashString()', function() {

    it('input parameter is a string without 0x prefix', async function() {
        assert.equal(utils.toHashString('1212'), '0x1212');
    });

    it('input parameter is a string with 0x prefix', async function() {
        assert.equal(utils.toHashString('0x1212'), '0x1212');
    });
});
