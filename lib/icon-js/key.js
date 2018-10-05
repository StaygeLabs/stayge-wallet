/**
 * Provides key related functions for ICON
 * @module stayge-wallet/icon-js/key
*/

'use strict'

const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const sha3_256 = require('js-sha3').sha3_256;
const keccak256 = require('js-sha3').keccak256;
const scrypt = require('scrypt.js');
const uuidv4 = require('uuid/v4');


module.exports = {

    /**
     * Generate a new private key
     * @return {Buffer}
     */
    generatePrivateKey : function() {
        return crypto.randomBytes(32);
    },

    /**
     * @param  {Buffer} privateKey
     * @return {Buffer}
     */
    privateToPublic : function(privateKey) {
        return secp256k1.publicKeyCreate(privateKey, false).slice(1);
    },

    /**
     * @param  {Buffer} publicKey
     * @return {Buffer}
     */
    publicToAddress : function(publicKey) {
        return Buffer.from(sha3_256(publicKey), 'hex').slice(-20);
    },


    /**
     * Get a private key from the key store object
     * @param  {Object} keyStoreObj
     * @param  {string} password
     * @return {Buffer} private key
     */
    privateKeyFromKeyStoreObj : function(keyStoreObj, password) {
        let derivedKey;

        if (typeof keyStoreObj !== 'object') {
            throw new Error('keyStoreObj type should be Object.');
        }

        if (typeof password !== 'string') {
            throw new Error('password type should be string.');
        }

        if (keyStoreObj.version !== 3) {
            throw new Error('keySotreObj is not a V3 wallet');
        }

        if (keyStoreObj.crypto.kdf === 'scrypt') {
            const kdfparams = keyStoreObj.crypto.kdfparams;

            derivedKey = scrypt(
                Buffer.from(password),
                Buffer.from(kdfparams.salt, 'hex'),
                kdfparams.n,
                kdfparams.r,
                kdfparams.p,
                kdfparams.dklen
            )

        } else if (keyStoreObj.crypto.kdf === 'pbkdf2') {
            const kdfparams = keyStoreObj.crypto.kdfparams;

            if (kdfparams.prf !== 'hmac-sha256') {
                throw new Error('Unsupported parameters to PBKDF2');
            }

            derivedKey = crypto.pbkdf2Sync(
                Buffer.from(password),
                Buffer.from(kdfparams.salt, 'hex'),
                kdfparams.c,
                kdfparams.dklen,
                'sha256'
            );
        } else {
            throw new Error('Unsupported key derivation function.');
        }

        const ciphertext = Buffer.from(
            keyStoreObj.crypto.ciphertext,
            'hex'
        );

        const mac = keccak256(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));

        /*
        console.log('mac = ' + mac);
        console.log('crypto.mac = ' + keyStoreObj.crypto.mac);
        */

        if (mac !== keyStoreObj.crypto.mac) {
            throw new Error('Failed to derive a key');
        }

        const decipher = crypto.createDecipheriv(
            keyStoreObj.crypto.cipher,
            derivedKey.slice(0, 16),
            Buffer.from(
                keyStoreObj.crypto.cipherparams.iv, 'hex'
            )
        );

        return Buffer.concat([
            decipher.update(ciphertext),
            decipher.final()
        ]);
    },

    /**
     * Return a keystore object from the wallet information
     * @param  {Buffer} privateKey
     * @param  {String} address
     * @param  {String} password
     * @param  {Object} options
     * @return {Object} keystore object
     */
    toKeyStoreObj : function(privateKey, address, password, options) {

        options = options || {};

        const opts = {
            salt: options.salt || crypto.randomBytes(32),
            iv: options.iv || crypto.randomBytes(16),
            kdf: options.kdf || 'scrypt',
            dklen: options.dklen || 32,
            c: options.c || 262144,
            prf: 'hmac-sha256',
            n: options.n || 262144,
            r: options.r || 8,
            p: options.p || 1,
            cipher: options.cipher || 'aes-128-ctr',
            uuid: options.uuid || crypto.randomBytes(16)
        };

        const kdfparams = {
            dklen: opts.dklen,
            salt: opts.salt.toString('hex')
        };

        let derivedKey;

        if (opts.kdf === 'pbkdf2') {
            kdfparams.c = opts.c;
            kdfparams.prf = opts.prf;
            derivedKey = crypto.pbkdf2Sync(
                Buffer.from(password),
                opts.salt,
                opts.c,
                opts.dklen,
                'sha256'
            );
        } else if (opts.kdf === 'scrypt') {
            kdfparams.n = opts.n;
            kdfparams.r = opts.r;
            kdfparams.p = opts.p;
            derivedKey = scrypt(
                Buffer.from(password),
                opts.salt,
                kdfparams.n,
                kdfparams.r,
                kdfparams.p,
                kdfparams.dklen
            );
        } else {
            throw new Error('Unsupported kdf.');
        }

        const cipher = crypto.createCipheriv(
            opts.cipher,
            derivedKey.slice(0, 16),
            opts.iv
        );

        if (!cipher) {
            throw new Error('Unsupported cipher');
        }

        const ciphertext = Buffer.concat(
            [cipher.update(privateKey), cipher.final()]
        );

        const mac = keccak256(
            Buffer.concat(
                [derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')]
            )
        );

        return {
            version: 3,
            id: uuidv4({ random: opts.uuid }),
            address: address,
            crypto: {
                ciphertext: ciphertext.toString('hex'),
                cipherparams: {
                    iv: opts.iv.toString('hex')
                },
                cipher: opts.cipher,
                kdf: opts.kdf,
                kdfparams: kdfparams,
                mac: mac
            },
            coinType: 'icx'
        }
    },

};
