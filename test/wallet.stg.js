'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../wallet');

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

const stgScoreAddress = 'cx8ada5f95f337ae332c97f3375e7e4f8209617143';

describe('wallet/stg.name()', function() {

    it('return STG', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const name = await stg.name();
            //console.log(`stg name = ${name}`);
            assert.equal(name, 'STG');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});


describe('wallet/stg.symbol()', function() {

    it('return STG', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const symbol = await stg.symbol();
            //console.log(`stg symbol = ${symbol}`);
            assert.equal(symbol, 'STG');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.decimals()', function() {

    it('return decimals of 18', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const decimals = await stg.decimals();
            //console.log(`stg decimals = ${decimals}`);
            assert.equal(decimals, 18);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/stg.totalSupply()', function() {

    it('return totalSupply', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const totalSupply = await stg.totalSupply();
            //console.log(`stg totalSupply = ${totalSupply}`);
            assert(totalSupply >= 0);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/stg.balanceOf()', function() {

    it('return owner balance', async function() {
        try {
            const balance = await ownerWallet
                                  .stg(stgScoreAddress)
                                  .balanceOf(ownerWallet.getAddressString());
            //console.log(`stg owner balance = ${balance}`);
            assert(balance >= 0);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('return user1 balance', async function() {
        try {
            const balance = await user1Wallet
                                  .stg(stgScoreAddress)
                                  .balanceOf(user1Wallet.getAddressString());
            //console.log(`stg user1 balance = ${balance}`);
            assert(balance >= 0);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('return user2 balance', async function() {
        try {
            const balance = await user2Wallet
                                  .stg(stgScoreAddress)
                                  .balanceOf(user2Wallet.getAddressString());
            //console.log(`stg user2 balance = ${balance}`);
            assert(balance >= 0);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.transfer()', function() {

    it('token transfer', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            const oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());

            const txHash = await stg.transfer(user1Wallet.getAddressString(), 100);

            //console.log(`transfer txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1', );

            const newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            const newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());

            assert.equal(newUser1Balance, oldUser1Balance + 100);
            assert.equal(newOwnerBalance, oldOwnerBalance - 100);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('token transfer with data', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            const oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());

            const txHash = await stg.transfer(user1Wallet.getAddressString(), 1, 'created a community of BigBang');

            //console.log(`transfer txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            const newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());

            assert.equal(newUser1Balance, oldUser1Balance + 1);
            assert.equal(newOwnerBalance, oldOwnerBalance - 1);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('negative value', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const txHash = await stg.transfer(ownerWallet.getAddressString(), -1);

            //console.log(`transfer txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by normal user when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            txHash = await stg.setBlacklist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.transfer(ownerWallet.getAddressString(), 1);
            //console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer by whitelist when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), true);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.transfer(ownerWallet.getAddressString(), 1);
            //console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');


        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer by blacklist when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setBlacklist(user1Wallet.getAddressString(), true);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.transfer(ownerWallet.getAddressString(), 1);
            //console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

            txHash = await stg.setBlacklist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by blacklist', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.setBlacklist(user1Wallet.getAddressString(), true);
            //console.log(`whitelist txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.transfer(ownerWallet.getAddressString(), 1);
            //console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.setBlacklist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by whitelist', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.setWhitelist(user1Wallet.getAddressString(), true);
            //console.log(`whitelist txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.transfer(ownerWallet.getAddressString(), 1);
            //console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('out of balance', async function() {
        try {
            let stg = user1Wallet.stg(stgScoreAddress);
            let oldUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            let txHash = await stg.transfer(ownerWallet.getAddressString(), oldUser1Balance + 1);
            //console.log(`transfer txHash = ${txHash}`);
            let txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await stg.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await stg.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


});

describe('wallet/stg.mint()', function() {

    it('token mint', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);
            const oldOwnerBalance = await stg.balanceOf();
            const oldTotalSupply = await stg.totalSupply();

            const txHash = await stg.mint(10000);

            //console.log(`mint txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1');

            const newOwnerBalance = await stg.balanceOf();
            const newTotalSupply = await stg.totalSupply();

            assert.equal(newOwnerBalance, oldOwnerBalance + 10000);
            assert.equal(newTotalSupply, oldTotalSupply + 10000);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.burn()', function() {

    it('token burn', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const oldUser1Balance = await stg.balanceOf();
            const oldTotalSupply = await stg.totalSupply();

            const txHash = await stg.burn(1);

            //console.log(`burn txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1', JSON.stringify(txResult));

            const newUser1Balance = await stg.balanceOf();
            const newTotalSupply = await stg.totalSupply();

            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newTotalSupply, oldTotalSupply - 1);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.pause/unpause()', function() {

    it('pause/unpause', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);

            const txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1');

            const paused = await stg.paused();

            assert.isTrue(paused);

            const txHash2 = await stg.unpause();
            //console.log(`unpause txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            //console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');

            const paused2 = await stg.paused();
            assert.isFalse(paused2);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.setBlacklist()', function() {

    it('set/unset blacklist', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);

            const txHash = await stg.setBlacklist(user1Wallet.getAddressString(), true);
            //console.log(`blacklist txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const txHash2 = await stg.setBlacklist(
                user1Wallet.getAddressString(),
                false
            );
            //console.log(`blacklist2 txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            //console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.setWhitelist()', function() {

    it('set/unset whitelist', async function() {
        try {
            const stg = ownerWallet.stg(stgScoreAddress);

            const txHash = await stg.setWhitelist(user1Wallet.getAddressString(), true);
            //console.log(`blacklist txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const txHash2 = await stg.setWhitelist(
                user1Wallet.getAddressString(),
                false
            );
            //console.log(`blacklist2 txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            //console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/stg.allowance()', function() {

    it('return owner allowance for user1', async function() {
        try {
            const allowance = await user1Wallet
                .stg(stgScoreAddress)
                .allowance(
                    user1Wallet.getAddressString(),
                    ownerWallet.getAddressString()
                );

            //console.log(`stg owner allowance for user1 = ${allowance}`);
            assert(allowance >= 0);
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/stg.approve()', function() {
    it('approve owner for user1 balance', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const oldOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await stg.approve(ownerWallet.getAddressString(), 10);

            //console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance, 10);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('negative value', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const txHash = await stg.approve(ownerWallet.getAddressString(), -1);
            //console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('approve when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.approve(ownerWallet.getAddressString(), 1);
            //console.log(`approve txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


});

describe('wallet/stg.incAllowance()', function() {
    it('increase allowance of owner for user1 balance', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const oldOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await stg.incAllowance(ownerWallet.getAddressString(), 10);

            //console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance - oldOwnerAllowance, 10);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('negative value', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const txHash = await stg.incAllowance(ownerWallet.getAddressString(), -10);
            //console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('increase allowance when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.incAllowance(ownerWallet.getAddressString(), 10);
            //console.log(`txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/stg.decAllowance()', function() {
    it('decrease allowance of owner for user1 balance', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const oldOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await stg.decAllowance(ownerWallet.getAddressString(), 1);

            //console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(oldOwnerAllowance - newOwnerAllowance, 1);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('negative value', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const txHash = await stg.decAllowance(ownerWallet.getAddressString(), -10);
            //console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('decrease allowance when paused', async function() {
        try {

            let stg = ownerWallet.stg(stgScoreAddress);
            let txHash = await stg.pause();
            //console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await stg.paused();
            assert.isTrue(paused);

            txHash = await stg.setWhitelist(user1Wallet.getAddressString(), false);
            //console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            stg = user1Wallet.stg(stgScoreAddress);
            txHash = await stg.decAllowance(ownerWallet.getAddressString(), 10);
            //console.log(`txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            stg = ownerWallet.stg(stgScoreAddress);
            txHash = await stg.unpause();
            //console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await stg.paused();
            assert.isFalse(paused);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/stg.transferFrom()', function() {
    it('transfer from user1 to user2 by owner', async function() {
        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const oldOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await stg.approve(ownerWallet.getAddressString(), 1);

            //console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance, 1);


            const stg2 = ownerWallet.stg(stgScoreAddress);
            const oldUser1Balance = await stg2.balanceOf(user1Wallet.getAddressString());
            const oldUser2Balance = await stg2.balanceOf(user2Wallet.getAddressString());

            const txHash2 = await stg2.transferFrom(
                user1Wallet.getAddressString(),
                user2Wallet.getAddressString(),
                1
            );

            //console.log(`transferFrom txHash = ${txHash2}`);
            const txResult2 = await ownerWallet.getTransactionResult(txHash2);

            //console.log(`txResult2 = ${JSON.stringify(txResult2)}`);
            assert.equal(txResult2.status, '0x1');

            const newUser1Balance = await stg2.balanceOf(user1Wallet.getAddressString());
            const newUser2Balance = await stg2.balanceOf(user2Wallet.getAddressString());

            assert.equal(newUser1Balance - oldUser1Balance, -1);
            assert.equal(newUser2Balance - oldUser2Balance, 1);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer from user1 to user2 by owner without allowance',
        async function() {

        try {
            const stg = user1Wallet.stg(stgScoreAddress);
            const txHash = await stg.approve(ownerWallet.getAddressString(), 0);
            //console.log(`approve txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            //console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await stg.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());
            assert.equal(newOwnerAllowance, 0);

            const stg2 = ownerWallet.stg(stgScoreAddress);
            const oldUser1Balance = await stg2.balanceOf(user1Wallet.getAddressString());
            const oldUser2Balance = await stg2.balanceOf(user2Wallet.getAddressString());

            const txHash2 = await stg2.transferFrom(
                user1Wallet.getAddressString(),
                user2Wallet.getAddressString(),
                1
            );

            //console.log(`transferFrom txHash = ${txHash2}`);
            const txResult2 = await ownerWallet.getTransactionResult(txHash2);

            //console.log(`txResult2 = ${JSON.stringify(txResult2)}`);
            assert.equal(txResult2.status, '0x0');

            const newUser1Balance = await stg2.balanceOf(user1Wallet.getAddressString());
            const newUser2Balance = await stg2.balanceOf(user2Wallet.getAddressString());

            assert.equal(newUser1Balance - oldUser1Balance, 0);
            assert.equal(newUser2Balance - oldUser2Balance, 0);

        } catch (err) {
            //console.log(`err = ${err}`);
            assert(false)
        }
    });
});

