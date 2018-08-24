'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../icon-js/wallet.js');
const net = require('../icon-js/net.js');
const jsonrpc = require('../icon-js/jsonrpc.js');

describe('Wallet.create()', function() {

    it('case 1 : create a wallet with a newly generated private key',
        function() {

        const wallet = Wallet.create();

        /*
        console.log('address(string) = ' + wallet.getAddressString());
        console.log('length of private key = ' + wallet.getPrivateKey().length);
        console.log('private key string = ' + wallet.getPrivateKeyString());
        console.log('length of public key = ' + wallet.getPublicKey().length);
        console.log('public key string = ' + wallet.getPublicKeyString());
        console.log('length of address = ' + wallet.getAddress().length);
        console.log('address string = ' + wallet.getAddressString());
        */

        assert.lengthOf(wallet.getPrivateKey(), 32);
        assert.lengthOf(wallet.getPublicKey(), 64);
        assert.lengthOf(wallet.getAddress(), 20);
        assert.equal(wallet.getAddressString().substr(0, 2), 'hx');
    });
});

describe('Wallet.fromPrivateKey()', function() {

    it('case 1 : create a wallet from a given private key',
        function() {

        const wallet = Wallet.fromPrivateKey('71fc378d3a3fb92b57474af156f376711a8a89d277c9b60a923a1db75575b1cc');

        /*
        console.log('address(string) = ' + wallet.getAddressString());
        console.log('length of private key = ' + wallet.getPrivateKey().length);
        console.log('private key string = ' + wallet.getPrivateKeyString());
        console.log('length of public key = ' + wallet.getPublicKey().length);
        console.log('public key strin = ' + wallet.getPublicKeyString());
        console.log('length of address = ' + wallet.getAddress().length);
        console.log('address string = ' + wallet.getAddressString());
        */

        assert.lengthOf(wallet.getPrivateKey(), 32);
        assert.lengthOf(wallet.getPublicKey(), 64);
        assert.lengthOf(wallet.getAddress(), 20);
        assert.equal(wallet.getAddressString().substr(0, 2), 'hx');
        assert.equal(wallet.getAddressString(), 'hxcc7b1f5fb98ca1eeaf9586bc08048814cb0d4d3d');
    });
});

describe('Wallet.fromKeyStoreObj()', function() {

    it('case 1 : create a wallet from a given keystore object',
        function() {


        const keyStoreObj = {
            address: "hx3672ff0ba4ff3a5f95bf2b11c742ead9eae34a64",
            crypto: {
                cipher: "aes-128-ctr",
                cipherparams: {
                    iv: "2b512a55a793e019e42e180b363031a7"
                },
                ciphertext: "766a799590ff7e9cc01123e3a97da0cf67f717bbf6594cac622604ccba6f456b",
                kdf: "pbkdf2",
                kdfparams: {
                    c: 262144,
                    dklen: 32,
                    prf: "hmac-sha256",
                    salt: "ec60e4e5021a248908d2d0012d389620"
                },
                mac: "b2574ea2bf069198b45d81b41acfdfce00ae1f9bf616dd197989342b6e6fd810"
            },
            id: "3b7f45b7-ccd7-4604-83d7-2d4bbb8e6ef8",
            version: 3,
            coinType: "icx"
        };

        const password = 'test1234*';

        const wallet = Wallet.fromKeyStoreObj(keyStoreObj, password);

        /*
        console.log('address(string) = ' + wallet.getAddressString());
        console.log('length of private key = ' + wallet.getPrivateKey().length);
        console.log('private key string = ' + wallet.getPrivateKeyString());
        console.log('length of public key = ' + wallet.getPublicKey().length);
        console.log('public key strin = ' + wallet.getPublicKeyString());
        console.log('length of address = ' + wallet.getAddress().length);
        console.log('address string = ' + wallet.getAddressString());
        */


        assert.lengthOf(wallet.getPrivateKey(), 32);
        assert.lengthOf(wallet.getPublicKey(), 64);
        assert.lengthOf(wallet.getAddress(), 20);
        assert.equal(wallet.getAddressString().substr(0, 2), 'hx');
        assert.equal(
            wallet.getAddressString(),
            'hx3672ff0ba4ff3a5f95bf2b11c742ead9eae34a64'
        );
    });
});

describe('Wallet.toKeyStoreObj()', function() {

    it('case 1 :  get a keystore object from the wallet', function() {

        const wallet1 = Wallet.create();
        const password = 'test123';
        const keyStoreObj = wallet1.toKeyStoreObj(password);

        //console.log('keyStoreObj = ' + JSON.stringify(keyStoreObj));

        const wallet2 = Wallet.fromKeyStoreObj(keyStoreObj, password);

        assert.deepEqual(wallet1.getPrivateKey(), wallet2.getPrivateKey());
    });
});


describe('Wallet.getEndPoint()', function() {

    it('case 1 :  get a default endpoint', function() {

        const wallet = Wallet.create();
        //console.log('endpoint = ' + wallet.getEndPoint());

        assert.equal(
            wallet.getEndPoint(),
            net.getEndPointFromEnv()
        );
    });
});

describe('Wallet.setEndPoint()', function() {

    it('case 1 :  set the endpoint to mainnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('mainnet');

        assert.equal(
            wallet.getEndPoint(),
            net.getEndPoint('mainnet')
        );
    });

    it('case 2 :  set the endpoint to testnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('testnet');

        assert.equal(
            wallet.getEndPoint(),
            net.getEndPoint('testnet')
        );
    });
});



describe('net.getEndPointFromEnv()', function() {

    it('case 1 :  get a endpoint under development', function() {

        process.env.NODE_ENV = 'development';

        assert.equal(
            net.getEndPointFromEnv(),
            'https://testwallet.icon.foundation'
        );
    });

    it('case 2 :  get a endpoint under production', function() {

        process.env.NODE_ENV = 'production';

        assert.equal(
            net.getEndPointFromEnv(),
            'https://wallet.icon.foundation'
        );
    });
});


describe('net.getEndPoint()', function() {

    it('case 1 :  get a endpoint of mainnet', function() {

        assert.equal(
            net.getEndPoint('mainnet'),
            'https://wallet.icon.foundation'
        );
    });

    it('case 2 :  get a endpoint of testnet', function() {

        assert.equal(
            net.getEndPoint('testnet'),
            'https://testwallet.icon.foundation'
        );
    });
});

describe('jsonrpc.getBalance()', function() {

    it('case 1 : get balance', async function() {
            const balance = await jsonrpc.getBalance(
                'hx36a371b0aa839f029ad997a2b64b240f49f001cc',
                net.getEndPoint('testnet')
            );

            //console.log('balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('case 2 : get balance of nonexisting address', async function() {
            const balance = await jsonrpc.getBalance(
                'hx36a371b0aa839f029ad997a2b64b240f49f001c1',
                net.getEndPoint('testnet')
            );

            //console.log('balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('case 3 : invalid address', function() {
       jsonrpc.getBalance(
        'x36a371b0aa839f029ad997a2b64b240f49f001cc',
        net.getEndPoint('testnet')
        )
       .then(function(balance) {
            assert(false);
       })
       .catch(function(err) {
            assert(true);
       });
    });

    it('case 4 : invalid endpoint', function() {
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

    it('case 1 : get a block by height in number', async function() {
            const block = await jsonrpc.getBlockByHeight(
                22135,
                net.getEndPoint('testnet')
            );

            //console.log('block :' + block);
            assert.equal(block.height, 22135);
    });

    it('case 2 : get a block by height in string', async function() {
            const block = await jsonrpc.getBlockByHeight(
                '22135',
                net.getEndPoint('testnet')
            );

            //console.log('block :' + block);
            assert.equal(block.height, 22135);
    });

    it('case 3 : get a top block by height', async function() {
            const block = await jsonrpc.getBlockByHeight(
                -1,
                net.getEndPoint('testnet')
            );

            //console.log('block :' + block);
            //console.log('typeof height:' + typeof block.height)
            assert.typeOf(block.height, 'number');
    });

    it('case 4 : invalid height', function() {
        jsonrpc.getBlockByHeight(
            -10,
            net.getEndPoint('testnet')
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

    it('case 5 : invalid endpoint', function() {
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

    it('case 1 : get a block by hash', async function() {
            const block = await jsonrpc.getBlockByHash(
                '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b1a',
                net.getEndPoint('testnet')
            );

            //console.log('block :' + block);
            assert.equal(block.height, 22135);
    });

    it('case 2 : invalid hash', function() {
        jsonrpc.getBlockByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11',
            net.getEndPoint('testnet')
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });

    it('case 3 : invalid endpoint', function() {
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

    it('case 1 : get a last block', async function() {
            const block = await jsonrpc.getLastBlock(
                net.getEndPoint('testnet')
            );

            //console.log('block :' + block);
            assert.typeOf(block.height, 'number');
    });

    it('case 2 : invalid endpoint', function() {
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

describe('jsonrpc.sendTransaction()', function() {

    it('case 1 : send a transaction', async function() {
            const txHash = await jsonrpc.sendTransaction(
                {
                    "from": "hxbe258ceb872e08851f1f59694dac2558708ece11",
                    "to": "hxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32",
                    "value": "0xde0b6b3a7640000",
                    "fee": "0x2386f26fc10000",
                    "timestamp": "1516942975500598",
                    "nonce": "8367273",
                    "tx_hash": "4bf74e6aeeb43bde5dc8d5b62537a33ac8eb7605ebbdb51b015c1881b45b3aed",
                    "signature": "VAia7YZ2Ji6igKWzjR2YsGa2m53nKPrfK7uXYW78QLE+ATehAVZPC40szvAiA6NEU5gCYB4c4qaQzqDh2ugcHgA="
                },
                net.getEndPoint('testnet')
            );

            console.log('txHash :' + txHash);
            console.log('typeof txHash :' + typeof txHash);
            assert.typeOf(block.height, 'String');
    });
});
