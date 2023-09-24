const hre = require("hardhat");

async function main() {

	// Fetching the contract and deploying it using hardhat
	const contract = await hre.ethers.deployContract("MXSToken");

	// wait for contract to finish deploying
	await contract.waitForDeployment();

	console.log(`MXS token contract deployed to ${contract.target} on ${hre.network.name} Testnet successfully!! 😀`);
}

//Execute deployment and handle errors
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});