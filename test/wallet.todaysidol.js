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

const scoreAddress = 'cxbce448ea1897ea8a803a887630ad795e8398f9d4';

describe('wallet/todaysidol.name()', function() {

    it('return name', async function() {
        try {
            const contract = ownerWallet.todaysidol(scoreAddress);
            const name = await contract.name();
            console.log(`contract name = ${name}`);
            //assert.equal(name, 'STG');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/todaysidol.total_comments()', function() {

    it('return total_comments', async function() {
        try {
            const contract = ownerWallet.todaysidol(scoreAddress);
            const totalComments = await contract.totalComments();
            console.log(`total comments = ${totalComments}`);
            //assert.equal(name, 'STG');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/todaysidol.comments()', function() {

    it('return comments', async function() {
        try {
            const contract = ownerWallet.todaysidol(scoreAddress);
            const comments = await contract.comments(0);
            console.log(`comments = ${JSON.stringify(comments)}`);
            //assert.equal(name, 'STG');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });
});


describe('wallet/todaysidol.write_comment()', function() {

    it('write a comment', async function() {
        try {
            const contract = ownerWallet.todaysidol(scoreAddress);
            const txHash = await contract.writeComment('햄찌', '엑소', '세훈아, 항상 너를 응원할게!');

            //console.log(`transfer txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash, 5);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            //assert.equal(txResult.status, '0x1', );


        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('write a comment', async function() {
        try {
            const contract = ownerWallet.todaysidol(scoreAddress);
            const txHash = await contract.writeComment('왕팬', 'BTS', 'BTS 짱조아!!!');

            //console.log(`transfer txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash, 5);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            //assert.equal(txResult.status, '0x1', );


        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});
