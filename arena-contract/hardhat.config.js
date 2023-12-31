require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY_POOL =
  "250acaa252c13324faaedf8cac88016950f9c139d050b1c6a86d59c8e8a9db7e"; // Testnet address...

const URL =
  "https://stylish-practical-dream.matic-testnet.discover.quiknode.pro/8924cf9d4a957d849bf85b1bdd85d78b26e9f398/";

module.exports = {
  solidity: "0.8.18",
  settings: {
    optimizer: {
      enabled: true,
      runs: 50,
    },
  },
  networks: {
    mumbai: {
      url: URL,
      gasPrice: 550_000_000_000,
      accounts: [PRIVATE_KEY_POOL],
    },
  },
};
