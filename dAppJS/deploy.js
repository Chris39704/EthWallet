const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.RINK_SECRET,
  process.env.RINK_ENDPOINT
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Contract is deployed by Manager with Address ', accounts[0]);
  console.log('Waiting for Deployed Address...');
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to address', result.options.address);
};

deploy();
