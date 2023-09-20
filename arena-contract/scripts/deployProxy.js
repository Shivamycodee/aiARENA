const { ethers, upgrades } = require("hardhat");

async function main() {
  const AIArena = await ethers.getContractFactory("AIArena");
  const contract = await upgrades.deployProxy(AIArena);
  console.log("Contract deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("🔴🔴 ", error);
    process.exit(1);
  });
