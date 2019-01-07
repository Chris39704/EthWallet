const path = require('path');
const fs = require('fs');
const solc = require('solc');

const EthWalletPath = path.resolve(__dirname, 'contracts', 'EthWallet.sol');
const source = fs.readFileSync(EthWalletPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':EthWallet'];
