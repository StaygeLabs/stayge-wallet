'use strict'

const chai = require('chai');
const assert = chai.assert;
const Wallet = require('../icon-js/wallet.js');
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

describe('icon-js/Wallet.create()', function() {

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

describe('icon-js/Wallet.fromPrivateKey()', function() {

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

describe('icon-js/Wallet.fromKeyStoreObj()', function() {

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

describe('icon-js/Wallet.toKeyStoreObj()', function() {

    it('get a keystore object from the wallet', function() {

        const wallet1 = Wallet.create();
        const password = 'test123';
        const keyStoreObj = wallet1.toKeyStoreObj(password);

        //console.log('keyStoreObj = ' + JSON.stringify(keyStoreObj));

        const wallet2 = Wallet.fromKeyStoreObj(keyStoreObj, password);

        assert.deepEqual(wallet1.getPrivateKey(), wallet2.getPrivateKey());
    });
});


describe('icon-js/Wallet.getEndPoint()', function() {

    it('get a default endpoint', function() {

        const wallet = Wallet.create();
        //console.log('endpoint = ' + wallet.getEndPoint());

        assert.deepEqual(
            wallet.getEndPoint(),
            utils.getEndPointFromEnv()
        );
    });
});

describe('icon-js/Wallet.setEndPoint()', function() {

    it('set the endpoint to mainnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('mainnet');

        assert.deepEqual(
            wallet.getEndPoint(),
            utils.getEndPoint('mainnet')
        );
    });

    it('set the endpoint to testnet ', function() {

        const wallet = Wallet.create();
        wallet.setEndPoint('testnet');

        assert.deepEqual(
            wallet.getEndPoint(),
            utils.getEndPoint('testnet')
        );
    });
});


describe('icon-js/Wallet.getBlockByHeight()', function() {

    it('get a block by height in number', async function() {
        const block = await ownerWallet.getBlockByHeight(132);

        assert.equal(block.height, 132);
    });

    it('invalid height', async function() {
        try {
            const wallet = Wallet.create();
            await wallet.getBlockByHeight(-10);

            assert(false);
        } catch (err) {
            assert(true);
        }
    });
});


describe('icon-js/Wallet.getBlockByHash()', function() {

    it('get a block by hash', async function() {
        const block = await ownerWallet.getBlockByHash(
            '0x76792ad0da07863ce71949d0c9adf4e6a3e9cfecc5ed8a093fe448aff0529f57'
        );

        //console.log('block :' + JSON.stringify(block));
        assert.equal(block.height, 132);
    });

    it('invalid hash', async function() {
        try {
            const wallet = Wallet.create();
            await wallet.getBlockByHash(
                '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
            );

            assert(false);
        } catch (err) {
            assert(true);
        }
    });
});


describe('icon-js/Wallet.getLastBlock()', function() {

    it('get a last block', async function() {
        const block = await ownerWallet.getLastBlock(
            utils.getEndPoint('testnet').url
        );

        //console.log('block :' + JSON.stringify(block));
        assert.typeOf(block.height, 'number');
    });
});


describe('icon-js/Wallet.getBalance()', function() {

    it('get balance', async function() {
        const balance = await ownerWallet.getBalance();

        //console.log('balance :' + balance);
        assert.typeOf(balance, 'string');
    });

    it('get balance', async function() {
        const wallet = Wallet.fromPrivateKey('016224835ae4d2c2826db071e21911925d811f68ba54be2f330b5ec3ecfd15dd');

        const balance = await wallet.getBalance();

        //console.log('balance :' + balance);
        assert.typeOf(balance, 'string', 'balance='+balance);
    });


});


describe('icon-js/Wallet.getTotalSupply()', function() {

    it('get total supply of ICX', async function() {
        const totalSupply = await ownerWallet.getTotalSupply();

        //console.log('totalSupply :' + totalSupply);
        assert.typeOf(totalSupply, 'string');
    });
});



describe('icon-js/Wallet.transferICX()', function() {

    it('transfer a transaction', async function() {
        const txHash = await ownerWallet.transferICX(
            user1Wallet.getAddressString(),
            1
        );

        //console.log('txHash :' + txHash);
        //console.log('typeof txHash :' + typeof txHash);
        assert.typeOf(txHash, 'String', `txHash=${txHash}`);
    });


    it('invalid address', async function() {
        try {
            const txHash = await ownerWallet.transferICX(
            'fda7ec74dfeac5d6b22844c8cbbf63f0b81c736e',
            0.1
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true, e);
        }
    });
});


describe('icon-js/Wallet.call()', function() {

    it('call SCORE\'s function', async function() {
        const result = await ownerWallet.call(
            stgScoreAddress,
            'balanceOf',
            {
                _owner: ownerWallet.getAddressString()
            }
        );

        //console.log('result :' + result);
        //console.log('typeof txHash :' + typeof txHash);
        assert.typeOf(result, 'String', `result=${result}`);
    });


    it('invalid address', async function() {
        try {
            const result = await ownerWallet.call(
                'xb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
                'get_balance',
                {
                    address: ownerWallet.getAddressString()
                }
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true, e);
        }
    });

    it('invalid address', async function() {
        try {
            const result = await ownerWallet.call(
                'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec31',
                'get_balance',
                {
                    address: 'hx1f9a3310f60a03934b917509c86442db703cbd52'
                }
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true, e);
        }
    });
});




describe('icon-js/Wallet.getScoreApi()', function() {

    it('get SCORE\'s api list', async function() {
        const result = await ownerWallet.getScoreApi(
            stgScoreAddress,
        );

        //console.log(`result = {${typeof result}} ${JSON.stringify(result}`);
        assert(result.length > 0, `result=${result}`)
    });


    it('invalid address', async function() {
        try {
            const result = await ownerWallet.getScoreApi(
                'xb0776ee37f5b45bfaea8cff1d8232fbb6122ec32',
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true, e);
        }
    });

    it('invalid address', async function() {
        try {
            const result = await ownerWallet.getScoreApi(
                'cxb0776ee37f5b45bfaea8cff1d8232fbb6122ec31',
            );

            assert(false);
        } catch (e) {
            //console.log(e);
            assert(true, e);
        }
    });
});





describe('icon-js/Wallet.getTransactionResult()', function() {

    it('successfully completed transaction', async function() {
        const txResult = await ownerWallet.getTransactionResult(
            '0xc8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263'
        );

        //console.log('txResult :' + JSON.stringify(txResult));
        assert.equal(txResult.txHash, utils.toHashString(
            '0xc8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263'
        ));
    });

    it('invalid txHash', async function() {
        try {
            await ownerWallet.getTransactionResult(
                '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
            );
            assert(false);
        } catch(err) {
            assert(true);
        }
    });
});


describe('icon-js/Wallet.getTransactionByHash()', function() {

    it('successfully completed transaction', async function() {
        const txResult = await ownerWallet.getTransactionByHash(
            '0xc8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263'
        );

        //console.log('txResult :' + JSON.stringify(txResult));
        assert.equal(txResult.txHash, utils.toHashString('0xc8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263'));
    });

    it('invalid txHash', async function() {
        try {
            await ownerWallet.getTransactionByHash(
                '6ffe8816153c3fbdae5612d1b2d73db1fd270e6c4a0b539355f7167426ff6b11'
            );

            assert(false);
        } catch(err) {
            assert(true);
        }
    });
});
