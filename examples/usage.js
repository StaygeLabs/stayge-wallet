'use strict';

(() => {
    console.log('\n# Create a wallet with newly generated keys');
    const Wallet = require('../../stayge-wallet');
    const wallet = Wallet.create();

    console.log(wallet.getPrivateKeyString());
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
})();

(() => {
    console.log('\n# Create a wallet from the private key');
    const Wallet = require('../../stayge-wallet');
    const wallet = Wallet.fromPrivateKey('7d716d0ddd7b5d567aa7296f8a9f5e11be0127c1da726047d1f6f48380ca0778');

    console.log(wallet.getPrivateKeyString());
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
})();

(() => {
    console.log('\n# Create a wallet from the keystore file');
    const Wallet = require('../../stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    console.log(wallet.getPrivateKeyString());
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
})();

(() => {
    console.log('\n# Convert a wallet to the keystore json object');
    const Wallet = require('../../stayge-wallet');
    const wallet = Wallet.create();
    const password = 'test123';
    const keyStoreObj = wallet.toKeyStoreObj(password); // The private key is encrypted with the specified password

    console.log(keyStoreObj);

})();

(() => {
    console.log('\n# Retrieve the block/transaction information on the underlying blockchain');
    const Wallet = require('../../stayge-wallet');
    const wallet = Wallet.create();

    // get the block information by the block height
    wallet.getBlockByHeight(1).then((block) => {
        console.log('getBlockByHeight');
        console.log(block);
    });

    // get the block information by the block hash
    wallet.getBlockByHash(
            '0x76792ad0da07863ce71949d0c9adf4e6a3e9cfecc5ed8a093fe448aff0529f57'
    ).then((block) => {
        console.log('getBlockByHash:')
        console.log(block);
    });

    // get the last block information
    wallet.getLastBlock().then((block) => {
        console.log('getLastBlock:')
        console.log(block);
    });

    wallet.getTransactionByHash(
        '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea'
    ).then((tx) => {
        console.log('getTransactionByHash:')
        console.log(tx);
    });

    wallet.getTransactionResult(
        '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea',
    ).then((txResult) => {
        console.log('getTransactionResult:')
        console.log(txResult);
    });


})();

(() => {
    console.log('\n# Make transactions for the coin transfer and sending a message');
    const Wallet = require('../../stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    // send 1 icx to the address of 'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802'
    wallet.transferCoin(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        1
    ).then((txHash) => {
        console.log('tranferCoin:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log('tranferCoin:');
        console.log(txResult);
    });

    wallet.transferMessage(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        'hello!'
    ).then((txHash) => {
        console.log('tranferMessage:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log('tranferMessage:');
        console.log(txResult);
    });
})();

(() => {
    console.log('\n# Deploy and update a smart contract on the blockchain');
    const Wallet = require('../../stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    // install a smart contract with the specified zip file
    wallet.installContract(
        '../test/act.zip',
        {
            name: 'EXO',
            symbol: 'ACT',
            initialSupply: '0x0',
            decimals: '0x12'
        }
    ).then((txHash) => {
        console.log('installContract:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log('installContract:');
        console.log(txResult);
    });

    // update a smart contract of the specified contract address with the zip file
    wallet.updateContract(
        'cx2f7bf7cebd92f15ff9c4aba2a1fd79b6a0529f93',     // contract address
        '../test/act.zip', // The contract sources will be updated to the specified zip files
    ).then((txHash) => {
        console.log('updateContract:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log('updateContract:');
        console.log(txResult);
    });

})();

(() => {
    console.log('\n# Interface with the smart contract of the ACT token');
    const Wallet = require('../../stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    const actKardScoreAddress = 'cx3d85fc30097cb8b18eb52de927b444833c690705';
    const act = wallet.act(actKardScoreAddress);

    act.name().then((name) => {
        console.log('ACT name:');
        console.log(name); // KARD
    });

    act.symbol().then((symbol) => {
        console.log('ACT symbol:');
        console.log(symbol); // ACT
    });

    act.decimals().then((decimals) => {
        console.log('ACT decimals:');
        console.log(decimals); // 18
    });

    act.totalSupply().then((totalSupply) => {
        console.log('ACT totalSupply:');
        console.log(totalSupply); // 1186.2
    });

    act.balanceOf().then((balance) => {
        console.log('ACT balance:');
        console.log(balance); // 546.4
    });

    act.transfer(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        10
    ).then((txHash) => {
        console.log('ACT transfer:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5);
    }).then((txResult) => {
        console.log('ACT transfer:');
        console.log(JSON.stringify(txResult));
    });

})();

(() => {
    console.log('\n# Interface with the smart contract of the STG token');
    const Wallet = require('../../stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    const stgScoreAddress = 'cx8ada5f95f337ae332c97f3375e7e4f8209617143';
    const stg = wallet.stg(stgScoreAddress);

    // get the name of the STG
    stg.name().then((name) => {
        console.log('STG name:');
        console.log(name); // STG
    });

    // get the symbol of the STG
    stg.symbol().then((symbol) => {
        console.log('STG symbol:');
        console.log(symbol); // STG
    });

    // get the decimals of the STG
    stg.decimals().then((decimals) => {
        console.log('STG decimals:');
        console.log(decimals); // 18
    });

    // get the total supply of the STG
    stg.totalSupply().then((totalSupply) => {
        console.log('STG totalSupply:');
        console.log(totalSupply); //
    });

    // get the own balance of the STG
    stg.balanceOf().then((balance) => {
        console.log('STG balance:');
        console.log(balance); //
    });

    // transfer STG to the specific account
    stg.transfer(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        10
    ).then((txHash) => {
        console.log('STG transfer:');
        console.log(txHash);
        return wallet.getTransactionResult(txHash, 5);
    }).then((txResult) => {
        console.log('STG transfer:');
        console.log(JSON.stringify(txResult));
    });

})();

