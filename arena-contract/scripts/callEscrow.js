const hre = require("hardhat");
const { ContractAddress } = require("./data.js");

async function main() {
  const [deployer] = await hre.ethers.getSigners();


  // Fetch the deployed contract PoolAddress
  const TokenSwapContract = await hre.ethers.getContractAt(
    "TokenSwap",
    ContractAddress
  );
  const amt = hre.ethers.parseUnits("2", 4);

  const tx = await TokenSwapContract.connect(deployer).changeHandler();
  await tx.wait();
  console.log(`tx: ${tx}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
