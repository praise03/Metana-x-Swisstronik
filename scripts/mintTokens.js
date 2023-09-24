// Script to mint 1000 Token to my account

const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");
const {getBalance} = require("./getBalance.js")

/**
 * Send a shielded transaction to the Swisstronik blockchain.
 *
 * @param {object} signer - The signer object for sending the transaction.
 * @param {string} destination - The address of the contract to interact with.
 * @param {string} data - Encoded data for the transaction.
 * @param {number} value - Amount of value to send with the transaction.
 *
 * @returns {Promise} - The transaction object.
 */
const sendShieldedTransaction = async (signer, destination, data, value) => {
    // Get the RPC link from the network configuration
    const rpclink = hre.network.config.url;
  
    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpclink, data);
  
    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
      from: signer.address,
      to: destination,
      data: encryptedData,
      value,
    });
  };


  async function main() {
    // Address of the deployed contract
    const contractAddress = "0x4bBf0B0b1CcFB184cc3Fc6FEd50c04D739275302";
  
    
    // Get the signer (your account)
    const [signer] = await hre.ethers.getSigners();
  
    console.log(`Minting 1000 MXS tokens on address ${contractAddress} to address -> ${signer.address}... 😬`)

    console.log("............................")

    // Construct a contract instance
    const contractFactory = await hre.ethers.getContractFactory("MXSToken");
    const contract = contractFactory.attach(contractAddress);

    const functionName = "mint";
    // const messageToSet = [signer.address, hre.ethers.parseEther("1000")];
    // console.log(messageToSet[1])

    const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [signer.address, hre.ethers.parseEther("1000")]), 0);
    await setMessageTx.wait();

    console.log("1000 Tokens minted successfully 😁")

    console.log("...........")
    // It should return a TransactionResponse object
    console.log("Transaction Receipt: ", setMessageTx);

    console.log(`Get MXS Balance on address ${signer.address} ....`)

    await getBalance()



  }


  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });