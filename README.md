STAYGE Wallet API for NodeJS
================================

This is the STAYGE Wallet API for NodeJs providing several features such as creating a wallet, retrieving block/transaction information on the blockchain, making a transaction for transfering coins and interacting with smart contracts for the STAYGE services.

Currently, the STAYGE wallet is supporting only the ICON as a underlying blockchain network. To interface with the ICON network, it implemented the NodeJs version of the ICON SDK([python](https://github.com/icon-project/icon-sdk-python), [java](https://github.com/icon-project/icon-sdk-java)) based on the [ICON JSON-RPC specification](https://github.com/icon-project/icon-rpc-server/blob/master/docs/icon-json-rpc-v3.md). In the future, STAYGE Network will be provided for the STAYGE services.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Create a wallet with newly generated keys](#)
    - [Create a wallet from the private key](#create-a-wallet-from-the-private-key)
- [License](#license)

## Installation

```bash
# npm
npm install stayge-wallet

# yarn
yarn add stayge-wallet
```

## Usage

### Create a wallet with newly generated keys

```javascript
    var Wallet = require('stayge-wallet');

    var wallet = Wallet.create();

    console.log(wallet.getPrivateKeyString());
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
```

### Create a wallet from the private key

```javascript
    var Wallet = require('stayge-wallet');

    var wallet = Wallet.fromPrivateKey('71fc378d3a3fb92b57474af156f376711a8a89d277c9b60a923a1db75575b1cc');

    console.log(wallet.getPrivateKeyString()); // 71fc378d3a3fb92b57474af156f376711a8a89d277c9b60a923a1db75575b1cc
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
```

### Create a wallet from the keystore file

```javascript
    var Wallet = require('stayge-wallet');

    var password = 'test123!';
    var wallet = Wallet.fromKeyStoreFile('test/test_user1.keystore', password);

    console.log(wallet.getPrivateKeyString()); // 71fc378d3a3fb92b57474af156f376711a8a89d277c9b60a923a1db75575b1cc
    console.log(wallet.getAddressString());
    console.log(wallet.getPublicKeyString());
```

### Get the keystore object from the wallet
```javascript
    var Wallet = require('stayge-wallet');

    var wallet = Wallet.create();
    var passworkd = 'test123';
    var keyStoreObj = wallet.toKeyStoreObj(password); // The private key is encrypted with the specified password

```

## API Reference
{{#module name="stayge-wallet/act"}}
{{>body~}}
{{>member-index~}}
{{>separator~}}
{{>members~}}
{{/module}}
* * *

## License
MIT License