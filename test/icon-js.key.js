'use strict'

const chai = require('chai');
const assert = chai.assert;
const key = require('../icon-js/key.js');

describe('key.privateKeyFromKeyStoreObj()', function() {

    it('keyStoreObj is not a Object', async function() {
        try {
            const privKey = key.privateKeyFromKeyStoreObj('test', 'test');
            assert(false);
        } catch(e) {
            assert(true);
        }
    });

    it('password is not a String', async function() {
        try {
            const keyStoreObj = {
                address: 'hx3672ff0ba4ff3a5f95bf2b11c742ead9eae34a64',
                crypto: {
                    cipher: 'aes-128-ctr',
                    cipherparams: {
                        iv: '2b512a55a793e019e42e180b363031a7'
                    },
                    ciphertext: '766a799590ff7e9cc01123e3a97da0cf67f717bbf6594cac622604ccba6f456b',
                    kdf: 'pbkdf2',
                    kdfparams: {
                        c: 262144,
                        dklen: 32,
                        prf: 'hmac-sha256',
                        salt: 'ec60e4e5021a248908d2d0012d389620'
                    },
                    mac: 'b2574ea2bf069198b45d81b41acfdfce00ae1f9bf616dd197989342b6e6fd810'
                },
                id: '3b7f45b7-ccd7-4604-83d7-2d4bbb8e6ef8',
                version: 3,
                coinType: 'icx'
            };
            const privKey = key.privateKeyFromKeyStoreObj(keyStoreObj, 1);
            assert(false);
        } catch(e) {
            assert(true);
        }
    });

    it('version is not 3', async function() {
        try {
            const keyStoreObj = {
                address: 'hx3672ff0ba4ff3a5f95bf2b11c742ead9eae34a64',
                crypto: {
                    cipher: 'aes-128-ctr',
                    cipherparams: {
                        iv: '2b512a55a793e019e42e180b363031a7'
                    },
                    ciphertext: '766a799590ff7e9cc01123e3a97da0cf67f717bbf6594cac622604ccba6f456b',
                    kdf: 'pbkdf2',
                    kdfparams: {
                        c: 262144,
                        dklen: 32,
                        prf: 'hmac-sha256',
                        salt: 'ec60e4e5021a248908d2d0012d389620'
                    },
                    mac: 'b2574ea2bf069198b45d81b41acfdfce00ae1f9bf616dd197989342b6e6fd810'
                },
                id: '3b7f45b7-ccd7-4604-83d7-2d4bbb8e6ef8',
                version: 2,
                coinType: 'icx'
            };
            const privKey = key.privateKeyFromKeyStoreObj(keyStoreObj, 'test123');
            assert(false);
        } catch(e) {
            assert(true);
        }
    });

});

