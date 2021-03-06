STAYGE Wallet API for Node.js
================================

This is the [STAYGE](http://stayge.io/) Wallet API for Node.js providing several features such as creating a wallet, retrieving block/transaction information on the blockchain, making a transaction for transferring coins and interacting with smart contracts for the [STAYGE](http://stayge.io/) services.

Currently, the [STAYGE](http://stayge.io/) wallet is supporting only the [ICON](https://m.icon.foundation/?lang=en) as an underlying blockchain network. To interface with the ICON network, it implemented the Node.js version of the ICON SDK([Python](https://github.com/icon-project/icon-sdk-python), [Java](https://github.com/icon-project/icon-sdk-java)) based on the [ICON JSON-RPC specification](https://github.com/icon-project/icon-rpc-server/blob/master/docs/icon-json-rpc-v3.md). In the future, the [STAYGE](http://stayge.io/) Network will be provided for the [STAYGE](http://stayge.io/) services.

-

이것은 Node.js용 [STAYGE](http://stayge.io/) 지갑 API로서, 지갑생성, 블록체인 내에서의 블록/거래 정보검색, STAYGE 서비스를 위한 코인 거래 및 스마트 컨트랙트 생성/조회/거래 등의 기능을 제공합니다.

현재, STAYGE 지갑은 기반 블록체인 네트워크로 [ICON](https://m.icon.foundation/?lang=en)만을 지원하고 있습니다.
ICON 네트워크와 통신하기 위해 ICON JSON-RPC 사양에 기반한 ICON SDK ([Python](https://github.com/icon-project/icon-sdk-python), [Java](https://github.com/icon-project/icon-sdk-java))의 Node.js 버전을 구현했습니다. 추후 STAYGE Network가 기반 블록체인 네트워크로 지원될 예정입니다.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Create a wallet with newly generated keys](#create-a-wallet-with-newly-generated-keys)
    - [Create a wallet from the private key](#create-a-wallet-from-the-private-key)
    - [Create a wallet from the keystore file](#create-a-wallet-from-the-keystore-file)
    - [Convert a wallet to the keystore json object](#convert-a-wallet-to-the-keystore-json-object)
    - [Retrieve the block/transaction information on the blockchain](#retrieve-the-block-transaction-information-on-the-blockchain)
    - [Make transactions for the coin transfer and sending a message](#make-transactions-for-the-coin-transfer-and-sending-a-message)
    - [Deploy and update a smart contract on the blockchain](#deploy-and-update-a-smart-contract-on-the-blockchain)
    - [Interface with the smart contract of the ACT token](#interface-with-the-smart-contract-of-the-act-token)
    - [Interface with the smart contract of the STG token](#interface-with-the-smart-contract-of-the-stg-token)
- [API Reference](#api-reference)
- [License](#license)

## Installation

```bash
# npm
npm install stayge-wallet

# yarn
yarn add stayge-wallet
```

## Usage
When the STAYGE wallet is created, the endpoint of the JSON RPC server for the blockchain is set automatically according to the environment where it is executed. If `process.env.NODE_ENV` variable is set to 'production', it will connect to the [mainnet of the ICON](https://tracker.icon.foundation/), otherwise [testnet](https://bicon.tracker.solidwallet.io/) will be chosen. If you want to choose the endpoint explicitly, you can call the method of `setEndPoint(name)`, the argument of which can be 'mainnet' or 'testnet', after creating a wallet.

### Create a wallet with newly generated keys

```javascript
    const Wallet = require('stayge-wallet');
    const wallet = Wallet.create();

    console.log(wallet.getPrivateKeyString()); // 7d716d0ddd7b5d567aa7296f8a9f5e11be0127c1da726047d1f6f48380ca0778
    console.log(wallet.getAddressString()); // hx22e9d89e560f225271d2fb912774e364f8c25a6c
    console.log(wallet.getPublicKeyString()); // 482dffbef9c029df3162580407cf3f355f1937f6a31e61744afe61f8eb11a274615d5c305478b35a325e38806e7ce6d2cd936a0f39676b3725727ea01ed5e091
```

### Create a wallet from the private key

```javascript
    const Wallet = require('stayge-wallet');
    const wallet = Wallet.fromPrivateKey('7d716d0ddd7b5d567aa7296f8a9f5e11be0127c1da726047d1f6f48380ca0778');

    console.log(wallet.getPrivateKeyString()); // 7d716d0ddd7b5d567aa7296f8a9f5e11be0127c1da726047d1f6f48380ca0778
    console.log(wallet.getAddressString()); // hx22e9d89e560f225271d2fb912774e364f8c25a6c
    console.log(wallet.getPublicKeyString()); // 482dffbef9c029df3162580407cf3f355f1937f6a31e61744afe61f8eb11a274615d5c305478b35a325e38806e7ce6d2cd936a0f39676b3725727ea01ed5e091
```

### Create a wallet from the keystore file

```javascript
    const Wallet = require('stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    console.log(wallet.getPrivateKeyString()); // 3f3a98221b8113c12651542cc3d4103b683bf57472dc1eb3d0e8cf41a0ec97f3
    console.log(wallet.getAddressString()); // hx3938461680520062e9fe7e46288d6b74a8682ce7
    console.log(wallet.getPublicKeyString()); // 30009a315e8b83acb6a0925e085dd9545ca10e67c846a3c23c8831b429b4be157759a701e2fe848e6d636a787f8ecc942e9bb0d687dcbc3c57d59d47814c5a52
```

### Convert a wallet to the keystore json object
```javascript
    const Wallet = require('stayge-wallet');
    const wallet = Wallet.create();
    const password = 'test123';
    const keyStoreObj = wallet.toKeyStoreObj(password); // The private key is encrypted with the specified password

    console.log(keyStoreObj);
    /*
        { version: 3,
          id: '5d76efd9-969e-40fa-bb57-e5c8a9c23000',
          address: 'hxfa35198e5c39da40f93456de22ac3f71e0dcacae',
          crypto:
           { ciphertext:
              'fb4f14f295341d3946a25bf65dee510932a2854b11d4a7549f7f315b6fc2f9cb',
             cipherparams: { iv: '658189e8f4cf9253a203ea504f634c0b' },
             cipher: 'aes-128-ctr',
             kdf: 'scrypt',
             kdfparams:
              { dklen: 32,
                salt:
                 '91c311f31db28459201327c0aee810f1ebcb1c5fac674e056d3610ffc56b18ac',
                n: 262144,
                r: 8,
                p: 1 },
             mac:
              '57520547e0be0c7f8b9ebc5f945c95871f311f13a6ed04c717a62e115b8a115f' },
          coinType: 'icx'
        }
     */

```

### Retrieve the block/transaction information on the blockchain
```javascript
    const Wallet = require('stayge-wallet');
    const wallet = Wallet.create();

    // get the block information by the block height
    wallet.getBlockByHeight(1).then((block) => {
        console.log(block);
    });
    /*
    { version: '0.1a',
      prev_block_hash:
       '974e2a8fbefad82b30af0ebfd9939314a53cd7ce3c54b19079b59501122987fe',
      merkle_tree_root_hash:
       '54d0c9ca9120014a14c1c5cc533c6ec069ceba5910d42ab378758c61a683da12',
      time_stamp: 1536931246002403,
      confirmed_transaction_list:
       [ { version: '0x3',
           from: 'hx5a05b58a25a1e5ea0f1d5715e1f655dffc1fb30a',
           to: 'hx670e692ffd3d5587c36c3a9d8442f6d2a8fcc795',
           value: '0xde0b6b3a7640000',
           stepLimit: '0x300000',
           timestamp: '0x575d4aa49cfde',
           nonce: '0x0',
           nid: '0x3',
           signature:
            'wwyio63MFxavfSTzsjaxGnhtHKb0hyUYesWYayVZx0cvUXeo7PfMVwTCGmTL2eR+9d+kcTApCv34A4BylbvIHwA=',
           txHash:
            '0xfe6a93cc3478570a2e26b7644a893fbfb71c7ca89d0a26bc52e5152ae8a9993a' },
         { version: '0x3',
           from: 'hx5a05b58a25a1e5ea0f1d5715e1f655dffc1fb30a',
           to: 'hx670e692ffd3d5587c36c3a9d8442f6d2a8fcc795',
           value: '0xde0b6b3a7640000',
           stepLimit: '0x300000',
           timestamp: '0x575d4aa796592',
           nonce: '0x0',
           nid: '0x3',
           signature:
            '7BopGhKwNqaoMXS0kzwTtaz69LKBlrPhJag4+iuA/PAKq6dGRL8GccR7bIw1NeobM06AHrytNqEu4xBaBcJWewA=',
           txHash:
            '0x9eb5dc96873286df12d5b51a7623fa7af73c25bf4ee750a215afaa655eac4c5d' } ],
      block_hash:
       '4877db402d4a704bb0152a1e065e5e5feae58a1cb1907ad1505d0a5b819d76dd',
      height: 1,
      peer_id: 'hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00',
      signature:
       'UJ7DfgiZhtkTyKJ3hPITqKFK1mXGNIrHDEAatXVV/ewZpD6mjpGHiva9CB872quJ1ibr7sh8xeuoWYe9e5vvKgE=' }
    */

    // get the block information by the block hash
    wallet.getBlockByHash(
            '0x76792ad0da07863ce71949d0c9adf4e6a3e9cfecc5ed8a093fe448aff0529f57'
    ).then((block) => {
        console.log(block);
    });
    /*
    { version: '0.1a',
      prev_block_hash:
       'a448c6d2b9e2746fc485f7897323bb787fb093d4338f3a12b0d57b375642c407',
      merkle_tree_root_hash:
       'c8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263',
      time_stamp: 1537248493777467,
      confirmed_transaction_list:
       [ { data: [Object],
           stepLimit: '0x57878820',
           signature:
            'Yvsx3oiqE63hl+zqg7HzWMq1TWQebI3bdKAXDOozxh81n0mUw6Oq5+iRzfgBjhttrASAZlQluNlduwgreUxRfQE=',
           dataType: 'deploy',
           nid: '0x3',
           from: 'hx54063e2493ba696d9b7fc4d725a93fbf62a26d7e',
           to: 'cx0000000000000000000000000000000000000000',
           version: '0x3',
           nonce: '0x1',
           timestamp: '0x5761e8e596140',
           txHash:
            '0xc8ac902521dc3485e9977f2b7764185e3ed7900a1528a226775a89c543a97263' } ],
      block_hash:
       '76792ad0da07863ce71949d0c9adf4e6a3e9cfecc5ed8a093fe448aff0529f57',
      height: 132,
      peer_id: 'hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00',
      signature:
       'lk0LSaOubE7Ks3OpJ/CRpQFup2Hmh2OgK6H30k3ctlZjMSKutP0X1oiusVzgQtd30S6QaI2i7nBo3XrzBSEXXwE=' }
    */

    // get the last block information
    wallet.getLastBlock().then((block) => {
        console.log(block);
    });
    /*
        { version: '0.1a',
          prev_block_hash:
           'cd3833c26f43bf0cf497696402c2978222fb6a566d0dbca1aea681596e8705f0',
          merkle_tree_root_hash:
           'f84c0b720a0210b0a94ae4a0e30c4428ae331cc8661f23e20e58a1d888b2a207',
          time_stamp: 1538719697153219,
          confirmed_transaction_list:
           [ { from: 'hxca1b18d749e4339e9661061af7e1e6cabcef8a19',
               to: 'cxe19a9fa4ae93763a1e407c3beef0cd71b63426b9',
               value: '0xde0b6b3a7640000',
               version: '0x3',
               nid: '0x3',
               stepLimit: '0xf4240',
               timestamp: '0x5777518eccf48',
               signature:
                'diqziCGY8H/xXZXDWMBzP2JZxNlE1uwZN3ynfaaFMSF8Exvsddqr8QKC3CTf7/2HBdDAuSXVikgQX5Sn/IqW1wA=',
               txHash:
                '0xf84c0b720a0210b0a94ae4a0e30c4428ae331cc8661f23e20e58a1d888b2a207' } ],
          block_hash:
           '59fb75edd05f0cc2124549358afad25ded6ca7ea6d0ce54bb17083685c8a092d',
          height: 8337,
          peer_id: 'hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00',
          signature:
           'oUlhzp6ocW8KCVbhAxJM/O3d58TNMU3kzWlz7M1umexbV/eirgy4dZyTW8uG2c6T9dxnCXeUpxnp1b1Rn26KqQE=' }
     */

     // get the transaction information by the transaction hash
    wallet.getTransactionByHash(
        '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea'
    ).then((tx) => {
        console.log(tx);
    });
    /*
        { from: 'hxca1b18d749e4339e9661061af7e1e6cabcef8a19',
          to: 'cx60e000ed29b9bb258789f64137f17e95aa09b341',
          value: '0x6124fee993bc0000',
          version: '0x3',
          nid: '0x3',
          stepLimit: '0xf4240',
          timestamp: '0x577892b675738',
          signature:
           'AXcYaw31ePNgqIuzR7hK8/Mnw19eYB5ss6Fzj4pKb50C4lqCksSvHX8FHAIguN4mG+9H8eaS1FZq+uvD5oDoUQE=',
          txHash:
           '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea',
          txIndex: '0x0',
          blockHeight: '0x212f',
          blockHash:
           '0x4cd39ac97b042593844ccb5730026f8a7d64e1b3f820b03951a170765f61865a' }
   */

    // get the result of the transaction by the transaction hash
    wallet.getTransactionResult(
        '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea',
    ).then((txResult) => {
        console.log(txResult);
    });
    /*
        { txHash:
           '0x42fd4496a5346c3d47d7c40a0676be36b3ba6c1616d9f5ef8dac3517f153f2ea',
          blockHeight: '0x212f',
          blockHash:
           '0x4cd39ac97b042593844ccb5730026f8a7d64e1b3f820b03951a170765f61865a',
          txIndex: '0x0',
          to: 'cx60e000ed29b9bb258789f64137f17e95aa09b341',
          stepUsed: '0x38630',
          stepPrice: '0x2540be400',
          cumulativeStepUsed: '0x38630',
          eventLogs:
           [ { scoreAddress: 'cx60e000ed29b9bb258789f64137f17e95aa09b341',
               indexed: [Array],
               data: [] },
             { scoreAddress: 'cx60e000ed29b9bb258789f64137f17e95aa09b341',
               indexed: [Array],
               data: [] } ],
          logsBloom:
           '0x00000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000050000000000010000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000400000000001040000000000000000000000000000000000000000000000000004000000000044000000000000000000000000000000000000000000000000004000000000002600000000000000000000000000000000000000000000000000340000000000800000000000000000000000000000000000000000000000000000000000000005000000000000',
          status: '0x1' }
     */

```

### Make transactions for the coin transfer and sending a message

```javascript
    const Wallet = require('stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    // send 1 icx to the address of 'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802'
    wallet.transferCoin(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        1
    ).then((txHash) => {
        console.log(txHash); // 0xb916be616c2e085bd539a85704f4f61c7902104353dd11c058d87003d87cb5c7
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log(txResult);
    });
    /*
        { txHash:
           '0xb916be616c2e085bd539a85704f4f61c7902104353dd11c058d87003d87cb5c7',
          blockHeight: '0x2411',
          blockHash:
           '0x4e64ea8aba8b7141e1a9f608b402f0c2bab96bc202b15eea73bff668ff21c935',
          txIndex: '0x1',
          to: 'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
          stepUsed: '0x186a0',
          stepPrice: '0x2540be400',
          cumulativeStepUsed: '0x311f0',
          eventLogs: [],
          logsBloom:
           '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          status: '0x1' }
    */

    // send a message to the address of 'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802'
    wallet.transferMessage(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        'hello!'
    ).then((txHash) => {
        console.log(txHash); // 0x92346d66f69226ecd866666744702c2ad4a1c3fc629de20f62382e0e3f7a3af1
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log(txResult);
    });
    /*
        { txHash:
           '0x92346d66f69226ecd866666744702c2ad4a1c3fc629de20f62382e0e3f7a3af1',
          blockHeight: '0x2411',
          blockHash:
           '0x4e64ea8aba8b7141e1a9f608b402f0c2bab96bc202b15eea73bff668ff21c935',
          txIndex: '0x0',
          to: 'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
          stepUsed: '0x18b50',
          stepPrice: '0x2540be400',
          cumulativeStepUsed: '0x18b50',
          eventLogs: [],
          logsBloom:
           '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          status: '0x1' }
     */
```

### Deploy and update a smart contract on the blockchain

```javascript
    const Wallet = require('stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('../test/test_owner.keystore', password);

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
        console.log(txHash); // 0xd817735ae69918b4591eb6d07d2e056a1df8c39e789b77ecc9e1d74330a6dfb9
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log(txResult);
    });
    /*
        { txHash:
           '0xd817735ae69918b4591eb6d07d2e056a1df8c39e789b77ecc9e1d74330a6dfb9',
          blockHeight: '0x243a',
          blockHash:
           '0x7799b3d25c34e34bf1295cd4f7792ec84b6c3cced7f4e04fb530b637adf814e8',
          txIndex: '0x2',
          to: 'cx0000000000000000000000000000000000000000',
          scoreAddress: 'cx21d32491358eca916f7cbbbff8ba33b720cf0985',
          stepUsed: '0x403222c0',
          stepPrice: '0x2540be400',
          cumulativeStepUsed: '0x403534b0',
          eventLogs: [],
          logsBloom:
           '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          status: '0x1' }
     */

    // update a smart contract of the specified contract address with the zip file
    wallet.updateContract(
        'cx2f7bf7cebd92f15ff9c4aba2a1fd79b6a0529f93',     // contract address
        '../test/act.zip', // The contract sources will be updated to the specified zip files
    ).then((txHash) => {
        console.log(txHash); // 0xb74c0ac85898c22f8f70cef89f78e3cf16878fa086826821d88d29095a5993c9
        return wallet.getTransactionResult(txHash, 5); // set timeout of 5 sec for the confirmation of the transaction
    }).then((txResult) => {
        console.log(txResult);
    });
    /*
        { txHash:
           '0xb74c0ac85898c22f8f70cef89f78e3cf16878fa086826821d88d29095a5993c9',
          blockHeight: '0x243a',
          blockHash:
           '0x7799b3d25c34e34bf1295cd4f7792ec84b6c3cced7f4e04fb530b637adf814e8',
          txIndex: '0x3',
          to: 'cx2f7bf7cebd92f15ff9c4aba2a1fd79b6a0529f93',
          stepUsed: '0x63f554c0',
          stepPrice: '0x2540be400',
          cumulativeStepUsed: '0xa42a8970',
          eventLogs: [],
          logsBloom:
           '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          status: '0x1' }
     */
```

### Interface with the smart contract of the ACT token

```javascript
    const Wallet = require('stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    const actKardScoreAddress = 'cx3d85fc30097cb8b18eb52de927b444833c690705';
    const act = wallet.act(actKardScoreAddress);

    // get the name of the ACT
    act.name().then((name) => {
        console.log(name); // KARD
    });

    // get the symbol of the ACT
    act.symbol().then((symbol) => {
        console.log(symbol); // ACT
    });

    // get the decimals of the ACT
    act.decimals().then((decimals) => {
        console.log(decimals); // 18
    });

    // get the total supply of the ACT
    act.totalSupply().then((totalSupply) => {
        console.log(totalSupply); // 1186.2
    });

    // get the own balance of the ACT
    act.balanceOf().then((balance) => {
        console.log(balance); // 546.4
    });

    // transfer ACT to the specific account
    act.transfer(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        10
    ).then((txHash) => {
        console.log(txHash); // 0x953892f757824559d647c894af7fa170c5b9a04892288b7557a3b70e9017c201
        return wallet.getTransactionResult(txHash, 5);
    }).then((txResult) => {
        console.log(JSON.stringify(txResult));
    });
    /*
        {"txHash":"0x953892f757824559d647c894af7fa170c5b9a04892288b7557a3b70e9017c201","blockHeight":"0x242a","blockHash":"0xa2863755a5fcce196542507ac37240847cd506f0f9d408bcb2c09f4bcecd2bd0","txIndex":"0x2","to":"cx3d85fc30097cb8b18eb52de927b444833c690705","stepUsed":"0x23c08","stepPrice":"0x2540be400","cumulativeStepUsed":"0x54df8","eventLogs":[{"scoreAddress":"cx3d85fc30097cb8b18eb52de927b444833c690705","indexed":["Transfer(Address,Address,int,bytes)","hx3938461680520062e9fe7e46288d6b74a8682ce7","hxd67aa5101f339e3afd278a9a26bf78d94f1ba802","0x8ac7230489e80000"],"data":["0x"]}],"logsBloom":"0x000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000","status":"0x1"}
     */

```

### Interface with the smart contract of the STG token

```javascript
    const Wallet = require('stayge-wallet');
    const password = 'test123!';
    const wallet = Wallet.fromKeyStoreFile('./test_user1.keystore', password);

    const stgScoreAddress = 'cx8ada5f95f337ae332c97f3375e7e4f8209617143';
    const stg = wallet.stg(stgScoreAddress);

    // get the name of the STG
    stg.name().then((name) => {
        console.log(name); // STG
    });

    // get the symbol of the STG
    stg.symbol().then((symbol) => {
        console.log(symbol); // STG
    });

    // get the decimals of the STG
    stg.decimals().then((decimals) => {
        console.log(decimals); // 18
    });

    // get the total supply of the STG
    stg.totalSupply().then((totalSupply) => {
        console.log(totalSupply); // 10000000000
    });

    // get the own balance of the STG
    stg.balanceOf().then((balance) => {
        console.log(balance); // 1639
    });

    // transfer STG to the specific account
    stg.transfer(
        'hxd67aa5101f339e3afd278a9a26bf78d94f1ba802',
        10
    ).then((txHash) => {
        console.log(txHash); // 0x446f3e335e1b851cea5bcbe9700a602c936b2bb7ea21bd6e396cfd420fba9a5a
        return wallet.getTransactionResult(txHash, 5);
    }).then((txResult) => {
        console.log(JSON.stringify(txResult));
    });
    /*
        {"txHash":"0x446f3e335e1b851cea5bcbe9700a602c936b2bb7ea21bd6e396cfd420fba9a5a","blockHeight":"0x2437","blockHash":"0x6b606460a1392d0899ba768af7660a5beb3561ae2f6ce1bc619ad38651382f52","txIndex":"0x3","to":"cx8ada5f95f337ae332c97f3375e7e4f8209617143","stepUsed":"0x23c08","stepPrice":"0x2540be400","cumulativeStepUsed":"0x78a00","eventLogs":[{"scoreAddress":"cx8ada5f95f337ae332c97f3375e7e4f8209617143","indexed":["Transfer(Address,Address,int,bytes)","hx3938461680520062e9fe7e46288d6b74a8682ce7","hxd67aa5101f339e3afd278a9a26bf78d94f1ba802","0x8ac7230489e80000"],"data":["0x"]}],"logsBloom":"0x000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000","status":"0x1"}

     */

```


## API Reference
For the complete API Reference, [click here](http://docs.stayge.net/stayge-wallet/)

## License
MIT License
