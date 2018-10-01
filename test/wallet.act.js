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
const actKardScoreAddress = 'cx3d85fc30097cb8b18eb52de927b444833c690705';
const actAceScoreAddress = 'cxdccbc7ee2d5581e62c8ba300219a5e8d05b58215';

describe('wallet/act.name()', function() {

    it('return KARD',
        function(done) {

        const act = ownerWallet.act(actKardScoreAddress);

        act.name()
        .then((name) => {
            console.log(`act name = ${name}`);
            assert.equal(name, 'KARD');
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

    it('return A.C.E',
        function(done) {

        const act = ownerWallet.act(actAceScoreAddress);

        act.name()
        .then((name) => {
            console.log(`act name = ${name}`);
            assert.equal(name, 'A.C.E');
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });
});


describe('wallet/act.symbol()', function() {

    it('return ACT',
        function(done) {

        const act = ownerWallet.act(actKardScoreAddress);

        act.symbol()
        .then((symbol) => {
            console.log(`act symbol = ${symbol}`);
            assert.equal(symbol, 'ACT');
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

    it('return ACT',
        function(done) {

        const act = ownerWallet.act(actAceScoreAddress);

        act.symbol()
        .then((symbol) => {
            console.log(`act symbol = ${symbol}`);
            assert.equal(symbol, 'ACT');
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });
});


describe('wallet/act.decimals()', function() {

    it('return decimals of 18',
        function(done) {

        const act = ownerWallet.act(actKardScoreAddress);

        act.decimals()
        .then((decimals) => {
            console.log(`act decimals = ${typeof decimals}`);
            console.log(`act decimals = ${decimals}`);
            assert.equal(decimals, 18);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

    it('return decimals of 18',
        function(done) {

        const act = ownerWallet.act(actAceScoreAddress);

        act.decimals()
        .then((decimals) => {
            console.log(`act decimals = ${decimals}`);
            assert.equal(decimals, 18);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });
});

describe('wallet/act.totalSupply()', function() {

    it('return totalSupply',
        function(done) {

        const act = ownerWallet.act(actKardScoreAddress);

        act.totalSupply()
        .then((totalSupply) => {
            console.log(`act totalSupply = ${typeof totalSupply}`);
            console.log(`act totalSupply = ${totalSupply}`);
            assert(totalSupply >= 0);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

});

describe('wallet/act.balanceOf()', function() {

    it('return owner balance',
        function(done) {

        ownerWallet
        .act(actKardScoreAddress)
        .balanceOf(ownerWallet.getAddressString())
        .then((balance) => {
            console.log(`act owner balance = ${balance}`);
            assert(balance >= 0);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

    it('return user1 balance',
        function(done) {

        user1Wallet
        .act(actKardScoreAddress)
        .balanceOf(user1Wallet.getAddressString())
        .then((balance) => {
            console.log(`act user1 balance = ${balance}`);
            assert(balance >= 0);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

    it('return user2 balance',
        function(done) {

        user2Wallet.act(actKardScoreAddress)
        .balanceOf(user2Wallet.getAddressString())
        .then((balance) => {
            console.log(`act user2 balance = ${balance}`);
            assert(balance >= 0);
        })
        .catch((err) => {
            console.log(`err = ${err}`);
            assert(false)
        })
        .finally(done);
    });

});


describe('wallet/act.transfer()', function() {

    it('token transfer',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldUser1Balance = await act.balanceOf();
            const oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());

            const txHash = await act.transfer(ownerWallet.getAddressString(), 1);

            console.log(`transfer txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newUser1Balance = await act.balanceOf();
            const newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());

            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('token transfer with data',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldUser1Balance = await act.balanceOf();
            const oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());

            const txHash = await act.transfer(ownerWallet.getAddressString(), 1, 'created a community of BTS');

            console.log(`transfer txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newUser1Balance = await act.balanceOf();
            const newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());

            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });



    it('negative value',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const txHash = await act.transfer(ownerWallet.getAddressString(), -1);

            console.log(`transfer txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by normal user when paused',
        async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            txHash = await act.setBlacklist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.transfer(ownerWallet.getAddressString(), 1);
            console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer by whitelist when paused',
        async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), true);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.transfer(ownerWallet.getAddressString(), 1);
            console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');


        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer by blacklist when paused',
        async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setBlacklist(user1Wallet.getAddressString(), true);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.transfer(ownerWallet.getAddressString(), 1);
            console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

            txHash = await act.setBlacklist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by blacklist',
        async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.setBlacklist(user1Wallet.getAddressString(), true);
            console.log(`whitelist txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.transfer(ownerWallet.getAddressString(), 1);
            console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.setBlacklist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('transfer by whitelist',
        async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.setWhitelist(user1Wallet.getAddressString(), true);
            console.log(`whitelist txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            let oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.transfer(ownerWallet.getAddressString(), 1);
            console.log(`transfer txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newOwnerBalance, oldOwnerBalance + 1);

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('out of balance', async function() {
        try {
            let act = user1Wallet.act(actKardScoreAddress);
            let oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let oldOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            let txHash = await act.transfer(ownerWallet.getAddressString(), oldUser1Balance + 1);
            console.log(`transfer txHash = ${txHash}`);
            let txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
            let newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            let newOwnerBalance = await act.balanceOf(ownerWallet.getAddressString());
            assert.equal(newUser1Balance, oldUser1Balance);
            assert.equal(newOwnerBalance, oldOwnerBalance);
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


});

describe('wallet/act.mint()', function() {

    it('token mint',
        async function() {

        try {
            const act = ownerWallet.act(actKardScoreAddress);
            const oldUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            const oldOwnerBalance = await act.balanceOf();
            const oldTotalSupply = await act.totalSupply();

            const txHash = await act.mint(user1Wallet.getAddressString(), 10);

            console.log(`mint txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1');

            const newUser1Balance = await act.balanceOf(user1Wallet.getAddressString());
            const newOwnerBalance = await act.balanceOf();
            const newTotalSupply = await act.totalSupply();

            assert.equal(newUser1Balance, oldUser1Balance + 10);
            assert.equal(newOwnerBalance, oldOwnerBalance);
            assert.equal(newTotalSupply, oldTotalSupply + 10);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/act.burn()', function() {

    it('token burn',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldUser1Balance = await act.balanceOf();
            const oldTotalSupply = await act.totalSupply();

            const txHash = await act.burn(1);

            console.log(`burn txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1');

            const newUser1Balance = await act.balanceOf();
            const newTotalSupply = await act.totalSupply();

            assert.equal(newUser1Balance, oldUser1Balance - 1);
            assert.equal(newTotalSupply, oldTotalSupply - 1);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});



describe('wallet/act.pause/unpause()', function() {

    it('pause/unpause',
        async function() {

        try {
            const act = ownerWallet.act(actKardScoreAddress);

            const txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);

            assert.equal(txResult.status, '0x1');

            const paused = await act.paused();

            assert.isTrue(paused);

            const txHash2 = await act.unpause();
            console.log(`unpause txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');

            const paused2 = await act.paused();
            assert.isFalse(paused2);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/act.setBlacklist()', function() {

    it('set/unset blacklist',
        async function() {

        try {
            const act = ownerWallet.act(actKardScoreAddress);

            const txHash = await act.setBlacklist(user1Wallet.getAddressString(), true);
            console.log(`blacklist txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const txHash2 = await act.setBlacklist(
                user1Wallet.getAddressString(),
                false
            );
            console.log(`blacklist2 txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/act.setWhitelist()', function() {

    it('set/unset whitelist',
        async function() {

        try {
            const act = ownerWallet.act(actKardScoreAddress);

            const txHash = await act.setWhitelist(user1Wallet.getAddressString(), true);
            console.log(`blacklist txHash = ${txHash}`);

            const txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const txHash2 = await act.setWhitelist(
                user1Wallet.getAddressString(),
                false
            );
            console.log(`blacklist2 txHash = ${txHash2}`);

            const txResult2 = await ownerWallet.getTransactionResult(txHash2);
            console.log(`txResult2 = ${JSON.stringify(txResult2)}`);

            assert.equal(txResult2.status, '0x1');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});


describe('wallet/act.allowance()', function() {

    it('return owner allowance for user1',
        async function() {

        try {
            const allowance = await user1Wallet
                .act(actKardScoreAddress)
                .allowance(
                    user1Wallet.getAddressString(),
                    ownerWallet.getAddressString()
                );

            console.log(`act owner allowance for user1 = ${allowance}`);
            assert(allowance >= 0);
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });
});

describe('wallet/act.approve()', function() {
    it('approve owner for user1 balance', async function() {
        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await act.approve(ownerWallet.getAddressString(), 10);

            console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance, 10);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('negative value', async function() {
        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const txHash = await act.approve(ownerWallet.getAddressString(), -1);
            console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('approve when paused', async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.approve(ownerWallet.getAddressString(), 1);
            console.log(`approve txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


});

describe('wallet/act.incAllowance()', function() {
    it('increase allowance of owner for user1 balance',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await act.incAllowance(ownerWallet.getAddressString(), 10);

            console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance - oldOwnerAllowance, 10);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('negative value', async function() {
        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const txHash = await act.incAllowance(ownerWallet.getAddressString(), -10);
            console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('increase allowance when paused', async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.incAllowance(ownerWallet.getAddressString(), 10);
            console.log(`txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/act.decAllowance()', function() {
    it('decrease allowance of owner for user1 balance',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await act.decAllowance(ownerWallet.getAddressString(), 1);

            console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(oldOwnerAllowance - newOwnerAllowance, 1);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });


    it('negative value', async function() {
        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const txHash = await act.decAllowance(ownerWallet.getAddressString(), -10);
            console.log(`transfer txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');
        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('decrease allowance when paused', async function() {

        try {

            let act = ownerWallet.act(actKardScoreAddress);
            let txHash = await act.pause();
            console.log(`pause txHash = ${txHash}`);
            let txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            let paused = await act.paused();
            assert.isTrue(paused);

            txHash = await act.setWhitelist(user1Wallet.getAddressString(), false);
            console.log(`whitelist txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            act = user1Wallet.act(actKardScoreAddress);
            txHash = await act.decAllowance(ownerWallet.getAddressString(), 10);
            console.log(`txHash = ${txHash}`);
            txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x0');

            act = ownerWallet.act(actKardScoreAddress);
            txHash = await act.unpause();
            console.log(`pause txHash = ${txHash}`);
            txResult = await ownerWallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');
            paused = await act.paused();
            assert.isFalse(paused);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

});

describe('wallet/act.transferFrom()', function() {
    it('transfer from user1 to user2 by owner',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const oldOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            const txHash = await act.approve(ownerWallet.getAddressString(), 1);

            console.log(`approve txHash = ${txHash}`);

            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());

            assert.equal(newOwnerAllowance, 1);


            const act2 = ownerWallet.act(actKardScoreAddress);
            const oldUser1Balance = await act2.balanceOf(user1Wallet.getAddressString());
            const oldUser2Balance = await act2.balanceOf(user2Wallet.getAddressString());

            const txHash2 = await act2.transferFrom(
                user1Wallet.getAddressString(),
                user2Wallet.getAddressString(),
                1
            );

            console.log(`transferFrom txHash = ${txHash2}`);
            const txResult2 = await ownerWallet.getTransactionResult(txHash2);

            console.log(`txResult2 = ${JSON.stringify(txResult2)}`);
            assert.equal(txResult2.status, '0x1');

            const newUser1Balance = await act2.balanceOf(user1Wallet.getAddressString());
            const newUser2Balance = await act2.balanceOf(user2Wallet.getAddressString());

            assert.equal(newUser1Balance - oldUser1Balance, -1);
            assert.equal(newUser2Balance - oldUser2Balance, 1);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });

    it('transfer from user1 to user2 by owner without allowance',
        async function() {

        try {
            const act = user1Wallet.act(actKardScoreAddress);
            const txHash = await act.approve(ownerWallet.getAddressString(), 0);
            console.log(`approve txHash = ${txHash}`);
            const txResult = await user1Wallet.getTransactionResult(txHash);
            console.log(`txResult = ${JSON.stringify(txResult)}`);
            assert.equal(txResult.status, '0x1');

            const newOwnerAllowance = await act.allowance(user1Wallet.getAddressString(), ownerWallet.getAddressString());
            assert.equal(newOwnerAllowance, 0);

            const act2 = ownerWallet.act(actKardScoreAddress);
            const oldUser1Balance = await act2.balanceOf(user1Wallet.getAddressString());
            const oldUser2Balance = await act2.balanceOf(user2Wallet.getAddressString());

            const txHash2 = await act2.transferFrom(
                user1Wallet.getAddressString(),
                user2Wallet.getAddressString(),
                1
            );

            console.log(`transferFrom txHash = ${txHash2}`);
            const txResult2 = await ownerWallet.getTransactionResult(txHash2);

            console.log(`txResult2 = ${JSON.stringify(txResult2)}`);
            assert.equal(txResult2.status, '0x0');

            const newUser1Balance = await act2.balanceOf(user1Wallet.getAddressString());
            const newUser2Balance = await act2.balanceOf(user2Wallet.getAddressString());

            assert.equal(newUser1Balance - oldUser1Balance, 0);
            assert.equal(newUser2Balance - oldUser2Balance, 0);

        } catch (err) {
            console.log(`err = ${err}`);
            assert(false)
        }
    });
});

