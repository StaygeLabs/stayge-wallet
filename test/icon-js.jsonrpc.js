'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../icon-js/wallet.js');
const jsonrpc = require('../icon-js/jsonrpc.js');
const utils = require('../icon-js/utils.js');

const ownerWallet = Wallet.fromKeyStoreObj({
        "address": "hxf6ccadc18a4f4902e03b8fced09dd8cfdac2e005",
        "crypto": {
            "cipher": "aes-128-ctr",
            "cipherparams": {
                "iv": "193d067eaf9e6c8927383412fca4fb76"
            },
            "ciphertext": "ed7bd8e8a8b9a8f3fdfb121053246a45b36ecf731c71e298aec8fc248e63fcce",
            "kdf": "scrypt",
            "kdfparams": {
                "dklen": 32,
                "n": 16384,
                "r": 1,
                "p": 8,
                "salt": "473084bd962359c5a48cb9ddf95be979"
            },
            "mac": "187c907a9d605d9131cf1af9a20db9cf8b5537b645799c5f8545e2063542becd"
        },
        "id": "acdecc71-eff9-43b9-869c-02e736432ec3",
        "version": 3,
        "coinType": "icx"
    },
    'test123!'
);

const user1Wallet = Wallet.fromKeyStoreObj({
        "address": "hx3938461680520062e9fe7e46288d6b74a8682ce7",
        "crypto": {
            "cipher": "aes-128-ctr",
            "cipherparams": {
                "iv": "48afa5a26ee9c394c717bc47046dfb94"
            },
            "ciphertext": "f15366eb71d1af35df34e7a028c4f4670d2eae72e1e7de2edc4768b939198da6",
            "kdf": "scrypt",
            "kdfparams": {
                "dklen": 32,
                "n": 16384,
                "r": 1,
                "p": 8,
                "salt": "8baf7e0e8db1744a95f5860a3a9b438f"
            },
            "mac": "f9de54d4ef1ba4bd88a132758e8beff2fae863f495b07cea358b2be154ee8fdd"
        },
        "id": "ceb48146-bf6b-4e22-810a-8f645aa448ad",
        "version": 3,
        "coinType": "icx"
    },
    'test123!'
);

const user2Wallet = Wallet.fromKeyStoreObj({
        "address": "hxd67aa5101f339e3afd278a9a26bf78d94f1ba802",
        "crypto": {
            "cipher": "aes-128-ctr",
            "cipherparams": {
                "iv": "fe10abcab4e7f98d57ed350fba323751"
            },
            "ciphertext": "237e448718b9ec36434a9427bb5dee4ac21d738bbc16c3f9b050a934907444f3",
            "kdf": "scrypt",
            "kdfparams": {
                "dklen": 32,
                "n": 16384,
                "r": 1,
                "p": 8,
                "salt": "919d4bb6c5fab5e1b80d1d4dca48d865"
            },
            "mac": "b6a547ff57712fca295c4abcf6e4604af5500d250d40854177e76c86250771d8"
        },
        "id": "2741c724-f16e-406a-be8f-eb1f2ef261d8",
        "version": 3,
        "coinType": "icx"
    },
    'test123!'
);

const stgScoreAddress = 'cx8ada5f95f337ae332c97f3375e7e4f8209617143';

describe('jsonrpc.getBalance()', function() {

    it('get balance', async function() {
            const balance = await jsonrpc.getBalance(
                ownerWallet.getAddressString(),
                utils.getEndPoint('testnet').url
            );

            console.log('owner balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('get balance', async function() {
            const balance = await jsonrpc.getBalance(
                user1Wallet.getAddressString(),
                utils.getEndPoint('testnet').url
            );

            console.log('user1 balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('get balance', async function() {
            const balance = await jsonrpc.getBalance(
                user2Wallet.getAddressString(),
                utils.getEndPoint('testnet').url
            );

            console.log('user2 balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('get balance of nonexisting address', async function() {
            const balance = await jsonrpc.getBalance(
                'hx36a371b0aa839f029ad997a2b64b240f49f001c1',
                utils.getEndPoint('testnet').url
            );

            //console.log('balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('invalid address', function() {
       jsonrpc.getBalance(
        'x36a371b0aa839f029ad997a2b64b240f49f001cc',
        utils.getEndPoint('testnet').url
        )
       .then(function(balance) {
            assert(false);
       })
       .catch(function(err) {
            assert(true);
       });
    });

    it('invalid endpoint', function() {
       jsonrpc.getBalance(
        'hx36a371b0aa839f029ad997a2b64b240f49f001cc',
        'https://www.naver.com'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });
});


describe('jsonrpc.getBlockByHeight()', function() {

    it('get a block by height in number', async function() {
            const block = await jsonrpc.getBlockByHeight(
                132,
                utils.getEndPoint('testnet').url
            );

            //console.log('block :' + JSON.stringify(block));
            assert.equal(block.height, 132);
    });

    it('invalid height', function() {
        jsonrpc.getBlockByHeight(
            -10,
            utils.getEndPoint('testnet').url
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

    it('invalid endpoint', function() {
        jsonrpc.getBlockByHeight(
            10,
            'http://www.google.com'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

});

describe('jsonrpc.getBlockByHash()', function() {

    it('get a block by hash', async function() {
        const block = await jsonrpc.getBlockByHash(
            '0x76792ad0da07863ce71949d0c9adf4e6a3e9cfecc5ed8a093fe448aff0529f57',
            utils.getEndPoint('testnet').url
        );

        //console.log('block :' + block);
        assert.equal(block.height, 132);
    });

    it('invalid hash', function() {
        jsonrpc.getBlockByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11',
            utils.getEndPoint('testnet').url
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

    it('invalid endpoint', function() {
        jsonrpc.getBlockByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b1a',
            'http://www.daum.net'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

});

describe('jsonrpc.getLastBlock()', function() {

    it('get a last block', async function() {
        const block = await jsonrpc.getLastBlock(
            utils.getEndPoint('testnet').url
        );

            //console.log('block :' + block);
            assert.typeOf(block.height, 'number');
    });

    it('invalid endpoint', function() {
        jsonrpc.getLastBlock(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11',
            'http://www.naver.com'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

});
