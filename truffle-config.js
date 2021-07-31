const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = "";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 6721975,
      gasLimit: 6721975,
      gasPrice: 1
    },
    eth: {
      network_id: "1",
      provider: () =>
          new HDWalletProvider(
               mnemonic,
              "https://mainnet.infura.io/v3/"
          ),
      gasPrice: 10000000000, // 10 gwei
      gas: 8000000,
    },
    ropsten: {
      network_id: "3",
      provider: () =>
          new HDWalletProvider(
              mnemonic,
              "https://ropsten.infura.io/v3/"
          ),
      gasPrice: 10000000000, // 10 gwei
      gas: 8000000,
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: "",
  },
  compilers: {
    solc: {
      version: '0.8.6',
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 1,
        },
      },
    },
  },
};