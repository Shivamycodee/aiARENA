const hre = require("hardhat");
const { ZEB, USDT } = require("./data.js");

async function main() {
  // Get the Contract Factory
  const TokenSupply = await hre.ethers.getContractFactory("TokenSupply");

  // Deploy the contract
  const txReceipt = await TokenSupply.deploy(ZEB, USDT);
  console.log("token supply address : ", txReceipt.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
