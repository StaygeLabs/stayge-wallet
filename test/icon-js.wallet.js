'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../icon-js/wallet.js');
const net = require('../icon-js/net.js');
const jsonrpc = require('../icon-js/jsonrpc.js');
const utils = require('../icon-js/utils.js');
const BigNumber = require('bignumber.js');
const key = require('../icon-js/key.js');

describe('Wallet.create()', function() {

    it('create a wallet with a newly generated private key',
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
        assert.lengthOf(wallet.getPrivateKeyString(), 64);
        assert.lengthOf(wallet.getPublicKey(), 64);
        assert.lengthOf(wallet.getPublicKeyString(), 128);
        assert.lengthOf(wallet.getAddress(), 20);
        assert.equal(wallet.getAddressString().substr(0, 2), 'hx');
    });
});

describe('Wallet.fromPrivateKey()', function() {

    it('create a wallet from a given private key',
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

    it('create a wallet from a given keystore object',
        function() {

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

    it('create a wallet from a given keystore JSON string',
        function() {

        const keyStoreObj = '{' +
            '"address": "hx3672ff0ba4ff3a5f95bf2b11c742ead9eae34a64",' +
            '"crypto": {' +
            '   "cipher": "aes-128-ctr",' +
            '   "cipherparams": {' +
            '       "iv": "2b512a55a793e019e42e180b363031a7"' +
            '   },' +
            '   "ciphertext": "766a799590ff7e9cc01123e3a97da0cf67f717bbf6594cac622604ccba6f456b",' +
            '   "kdf": "pbkdf2",' +
            '   "kdfparams": {' +
            '       "c": 262144,' +
            '       "dklen": 32,' +
            '       "prf": "hmac-sha256",' +
            '       "salt": "ec60e4e5021a248908d2d0012d389620"' +
            '   },' +
            '   "mac": "b2574ea2bf069198b45d81b41acfdfce00ae1f9bf616dd197989342b6e6fd810"' +
            '},' +
            '"id": "3b7f45b7-ccd7-4604-83d7-2d4bbb8e6ef8",' +
            '"version": 3,' +
            '"coinType": "icx"' +
        '}';

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

    it('get a keystore object from the wallet', function() {

        const wallet1 = Wallet.create();
        const password = 'test123';
        const keyStoreObj = wallet1.toKeyStoreObj(password);

        //console.log('keyStoreObj = ' + JSON.stringify(keyStoreObj));

        const wallet2 = Wallet.fromKeyStoreObj(keyStoreObj, password);

        assert.deepEqual(wallet1.getPrivateKey(), wallet2.getPrivateKey());
    });
});


describe('Wallet.getEndPoint()', function() {

    it('get a default endpoint', function() {

        const wallet = Wallet.create();
        //console.log('endpoint = ' + wallet.getEndPoint());

        assert.deepEqual(
            wallet.getEndPoint(),
            net.getEndPointFromEnv()
        );
    });
});

describe('Wallet.setEndPoint()', function() {

    it('set the endpoint to mainnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('mainnet');

        assert.deepEqual(
            wallet.getEndPoint(),
            net.getEndPoint('mainnet')
        );
    });

    it('set the endpoint to testnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('testnet');

        assert.deepEqual(
            wallet.getEndPoint(),
            net.getEndPoint('testnet')
        );
    });
});


describe('Wallet.getBlockByHeight()', function() {

    it('get a block by height in number', async function() {
        const wallet = Wallet.create();
        const block = await wallet.getBlockByHeight(22163);

        assert.equal(block.height, 22163);
    });

    it('invalid height', function() {
        const wallet = Wallet.create();
        wallet.getBlockByHeight(-10)
        .then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });
});


describe('Wallet.getBlockByHash()', function() {

    it('get a block by hash', async function() {
        const wallet = Wallet.create();
        const block = await wallet.getBlockByHash(
            'b6982def81169afe6e1e9a26875cf8b2b41d6554377ae54520b860776c3186c6'
        );

        //console.log('block :' + JSON.stringify(block));
        assert.equal(block.height, 108239);
    });

    it('invalid hash', function() {
        const wallet = Wallet.create();
        wallet.getBlockByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });
});


describe('Wallet.getLastBlock()', function() {

    it('get a last block', async function() {
        const wallet = Wallet.create();
        const block = await wallet.getLastBlock(
            net.getEndPoint('testnet').url
        );

        //console.log('block :' + block);
        assert.typeOf(block.height, 'number');
    });
});


describe('Wallet.getBalance()', function() {

    it('get balance', async function() {
        const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');

        const balance = await wallet.getBalance();

        console.log('balance :' + balance);
        assert.typeOf(balance, 'string');
    });

    it('get balance', async function() {
        const wallet = Wallet.fromPrivateKey('016224835ae4d2c2826db071e21911925d811f68ba54be2f330b5ec3ecfd15dd');

        const balance = await wallet.getBalance();

        console.log('balance :' + balance);
        assert.typeOf(balance, 'string', 'balance='+balance);
    });


});


describe('Wallet.getTotalSupply()', function() {

    it('get total supply of ICX', async function() {
        const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');

        const totalSupply = await wallet.getTotalSupply();

        console.log('totalSupply :' + totalSupply);
        assert.typeOf(totalSupply, 'string');
    });
});



describe('Wallet.transferICX()', function() {

    it('transfer a transaction', async function() {
        const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
        const txHash = await wallet.transferICX(
            'hxfda7ec74dfeac5d6b22844c8cbbf63f0b81c736e',
            0.1
        );

        console.log('txHash :' + txHash);
        //console.log('typeof txHash :' + typeof txHash);
        assert.typeOf(txHash, 'String');
    });


    it('invalid address', async function() {
        try {
            const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');

            const txHash = await wallet.transferICX(
            'fda7ec74dfeac5d6b22844c8cbbf63f0b81c736e',
            0.1
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true);
        }
    });
});


describe('Wallet.call()', function() {

    it('call SCORE\'s function', async function() {
        const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
        const result = await wallet.call(
            'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
            'get_balance',
            {
                address: 'hx1f9a3310f60a03934b917509c86442db703cbd52'
            }
        );

        console.log('result :' + result);
        //console.log('typeof txHash :' + typeof txHash);
        assert.typeOf(result, 'String');
    });


    it('invalid address', async function() {
        try {
            const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
            const result = await wallet.call(
                'xb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
                'get_balance',
                {
                    address: 'hx1f9a3310f60a03934b917509c86442db703cbd52'
                }
            );

            assert(false);
        } catch (e) {
            console.log(e);
            assert(true);
        }
    });

    it('invalid address', async function() {
        try {
            const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
            const result = await wallet.icxCall(
                'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec31',
                'get_balance',
                {
                    address: 'hx1f9a3310f60a03934b917509c86442db703cbd52'
                }
            );

            assert(false);
        } catch (e) {
            console.log(e);
            assert(true);
        }
    });
});




describe('Wallet.getScoreApi()', function() {

    it('get SCORE\'s api list', async function() {
        const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
        const result = await wallet.getScoreApi(
            'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
        );

        console.log('result :' + result);
        //console.log('typeof txHash :' + typeof txHash);
        assert.typeOf(result, 'Object');
    });


    it('invalid address', async function() {
        try {
            const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
            const result = await wallet.getScoreApi(
                'xb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
            );

            assert(false);
        } catch (e) {
            console.log(e);
            assert(true);
        }
    });

    it('invalid address', async function() {
        try {
            const wallet = Wallet.fromPrivateKey('94cb440b49ff1c8f95d75e7ce0b4238781a9a601a3f7d40af1d529de16a338a3');
            const result = await wallet.getScoreApi(
                'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec31',
            );

            assert(false);
        } catch (e) {
            console.log(e);
            assert(true);
        }
    });
});





describe('Wallet.getTransactionResult()', function() {

    it('successfully completed transaction', async function() {
        const wallet = Wallet.create();
        const txResult = await wallet.getTransactionResult(
            '97f3b03eeee12c4ed62b86b5901039e8b48d031d3f595466712075200de9bdff'
        );

        console.log('txResult :' + JSON.stringify(txResult));
        assert.equal(txResult.txHash, utils.toHashString('97f3b03eeee12c4ed62b86b5901039e8b48d031d3f595466712075200de9bdff'));
    });

    it('invalid txHash', function() {
        const wallet = Wallet.create();
        wallet.getTransactionResult(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });
});


describe('Wallet.getTransactionByHash()', function() {

    it('successfully completed transaction', async function() {
        const wallet = Wallet.create();
        const txResult = await wallet.getTransactionByHash(
            '97f3b03eeee12c4ed62b86b5901039e8b48d031d3f595466712075200de9bdff'
        );

        console.log('txResult :' + JSON.stringify(txResult));
        assert.equal(txResult.txHash, utils.toHashString('97f3b03eeee12c4ed62b86b5901039e8b48d031d3f595466712075200de9bdff'));
    });

    it('invalid txHash', function() {
        const wallet = Wallet.create();
        wallet.getTransactionByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
        ).then(function(balance) {
            assert(false);
        }).catch(function(err) {
            assert(true);
        });
    });
});




describe('net.getEndPointFromEnv()', function() {

    it('get a endpoint under production', function() {

        process.env.NODE_ENV = 'production';

        assert.deepEqual(
            net.getEndPointFromEnv(),
            net.getEndPoint('mainnet')
        );
    });

    it('get a endpoint under development', function() {

        process.env.NODE_ENV = 'development';

        assert.deepEqual(
            net.getEndPointFromEnv(),
            net.getEndPoint('testnet')
        );
    });
});



/*
describe('net.getEndPoint()', function() {

    it('get a endpoint of mainnet', function() {

        assert.equal(
            net.getEndPoint('mainnet').url,
            'https://wallet.icon.foundation'
        );
    });

    it('get a endpoint of testnet', function() {

        assert.equal(
            net.getEndPoint('testnet').url,
            'https://testwallet.icon.foundation'
        );
    });
});
*/

describe('jsonrpc.getBalance()', function() {

    it('get balance', async function() {
            const balance = await jsonrpc.getBalance(
                'hx36a371b0aa839f029ad997a2b64b240f49f001cc',
                net.getEndPoint('testnet').url
            );

            //console.log('balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('get balance of nonexisting address', async function() {
            const balance = await jsonrpc.getBalance(
                'hx36a371b0aa839f029ad997a2b64b240f49f001c1',
                net.getEndPoint('testnet').url
            );

            //console.log('balance :' + balance);
            assert.typeOf(balance, 'string');
    });

    it('invalid address', function() {
       jsonrpc.getBalance(
        'x36a371b0aa839f029ad997a2b64b240f49f001cc',
        net.getEndPoint('testnet').url
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
                22163,
                net.getEndPoint('testnet').url
            );

            //console.log('block :' + JSON.stringify(block));
            assert.equal(block.height, 22163);
    });

    it('invalid height', function() {
        jsonrpc.getBlockByHeight(
            -10,
            net.getEndPoint('testnet').url
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
            'b6982def81169afe6e1e9a26875cf8b2b41d6554377ae54520b860776c3186c6',
            net.getEndPoint('testnet').url
        );

        //console.log('block :' + block);
        assert.equal(block.height, 108239);
    });

    it('invalid hash', function() {
        jsonrpc.getBlockByHash(
            '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11',
            net.getEndPoint('testnet').url
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
            net.getEndPoint('testnet').url
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

