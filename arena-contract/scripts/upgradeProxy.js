const { ethers, upgrades } = require("hardhat");
const { ContractAddress } = require("./data.js");

async function main() {
  const AIArena = await ethers.getContractFactory("AIArena");

  const existingContractAddress = ContractAddress;
  const upgradedContract = await upgrades.upgradeProxy(
    existingContractAddress,
    AIArena
  );
  console.log("Contract upgraded to:", upgradedContract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
