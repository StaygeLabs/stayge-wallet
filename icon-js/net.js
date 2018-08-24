'use strict'

const endpoints = {
    mainnet : 'https://wallet.icon.foundation',
    testnet : 'https://testwallet.icon.foundation'
};

function getEndPoint(name) {
    return endpoints[name];
}

/**
 * get a endpoint for current environment
 * @return {String}
 */
function getEndPointFromEnv() {
    //console.log('NODE_ENV : ' + process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'production') {
        return getEndPoint('mainnet');
    } else {
        return getEndPoint('testnet');
    }
}

module.exports = {
    getEndPoint : getEndPoint,
    getEndPointFromEnv : getEndPointFromEnv
};