'use strict'

const endpoints = {
    mainnet : {
        url : 'https://wallet.icon.foundation',
        nid : '0x1'
    },

    /*
    testnet : {
        url : 'https://testwallet.icon.foundation',
        nid : '0x2'
    }
    */

    testnet : {
        url : 'http://52.79.233.89:9000',
        nid : '0x3'
    },
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