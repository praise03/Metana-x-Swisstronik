const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data);
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function getBalance() {
  const contractAddress = "0x4bBf0B0b1CcFB184cc3Fc6FEd50c04D739275302";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("MXSToken");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "balanceOf";
  const messageToSet = [signer.address];
  const responseMessage = await sendShieldedQuery(signer.provider, contractAddress, contract.interface.encodeFunctionData(functionName, messageToSet));
  console.log(`MXS Token Balance on address --->>> ${contract.interface.decodeFunctionResult(functionName, responseMessage)[0]} = 1000 MXS. 🎉🥂`);
}

module.exports={getBalance}
