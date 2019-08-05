'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../lib/wallet');

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

console.log(`endPoint = ${ownerWallet.getEndPoint().url}`)

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

const wokScoreAddress = 'cx8ada5f95f337ae332c97f3375e7e4f8209617143';

describe('wallet/wok.name()', function() {

    it('return weBlock', async function() {
        try {
            const wok = ownerWallet.wok(wokScoreAddress);
            const name = await wok.name();
            console.log(`wok name = ${name}`);
            assert.equal(name, 'weBlock');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});


describe('wallet/wok.symbol()', function() {

    it('return WOK', async function() {
        try {
            const wok = ownerWallet.wok(wokScoreAddress);
            const symbol = await wok.symbol();
            console.log(`wok symbol = ${symbol}`);
            assert.equal(symbol, 'WOK');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/wok.decimals()', function() {

    it('return decimals of 18', async function() {
        try {
            const wok = ownerWallet.wok(wokScoreAddress);
            const decimals = await wok.decimals();
            console.log(`wok decimals = ${decimals}`);
            assert.equal(decimals, 18);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/wok.totalSupply()', function() {

    it('return totalSupply', async function() {
        try {
            const wok = ownerWallet.wok(wokScoreAddress);
            const totalSupply = await wok.totalSupply();
            console.log(`wok totalSupply = ${totalSupply}`);
            assert(totalSupply >= 0);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/wok.balanceOf()', function() {

    it('return owner balance', async function() {
        try {
            const balance = await ownerWallet
                                  .wok(wokScoreAddress)
                                  .balanceOf(ownerWallet.getAddressString());
            //console.log(`wok owner balance = ${balance}`);
            assert(balance >= 0);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});
