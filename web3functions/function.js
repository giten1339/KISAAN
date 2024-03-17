import Web3 from "web3";
import Payment from "../contracts/Payment.json";

let web3;

/**
 * Connects to MetaMask and initializes web3 instance.
 * @returns {Promise<{web3: Web3, accounts: string[], instance: Contract}>} Web3 instance, accounts, and contract instance.
 */
export async function connectWeb3Metamask() {
   web3 = new Web3(Web3.givenProvider);
   await window.ethereum.enable();
   const accounts = await web3.eth.getAccounts();
   const networkId = await web3.eth.net.getId();
   const deployedNetwork = await Payment.networks[networkId];
   const instance = new web3.eth.Contract(Payment.abi, deployedNetwork.address);
   return { web3, accounts, instance };
}

/**
 * Converts Ethereum to Wei.
 * @param {number} eth - Ethereum amount to convert.
 * @returns {string} Amount in Wei.
 */
function ethToWei(eth) {
   const wei = web3.utils.toWei("" + eth.toFixed(5), "ether");
   return wei;
}

/**
 * Sends payment to the contract.
 * @param {Contract} contractInstance - Instance of the contract.
 * @param {string} account - User's Ethereum account.
 * @param {number} amount - Amount to pay in Ethereum.
 * @returns {Promise<Object>} Transaction result.
 */
export async function pay(contractInstance, account, amount) {
   const result = await contractInstance.methods
      .pay()
      .send({ from: account, value: ethToWei(amount) });
   return result;
}

/**
 * Retrieves the owner of the contract.
 * @param {Contract} contractInstance - Instance of the contract.
 * @param {string} account - User's Ethereum account.
 * @returns {Promise<string>} Owner's Ethereum address.
 */
async function getOwner(contractInstance, account) {
   const result = await contractInstance.methods.owner().call();
   return result;
}

/**
 * Retrieves the value stored in the contract.
 * @param {Contract} contractInstance - Instance of the contract.
 * @param {string} account - User's Ethereum account.
 * @returns {Promise<number>} Value stored in the contract.
 */
async function getValue(contractInstance, account) {
   const result = await contractInstance.methods.val().call();
   return result;
}

/**
 * Retrieves the sender address stored in the contract.
 * @param {Contract} contractInstance - Instance of the contract.
 * @param {string} account - User's Ethereum account.
 * @returns {Promise<string>} Sender's Ethereum address.
 */
async function getSender(contractInstance, account) {
   const result = await contractInstance.methods.sen().call();
   return result;
}


/*
connectWeb3Metamask: Connects to MetaMask and initializes a Web3 instance, retrieves user accounts, gets the network ID, and deploys the contract instance.

ethToWei: Converts an amount in Ethereum to Wei.

pay: Sends a payment to the contract by calling the pay method of the contract instance.

getOwner: Retrieves the owner of the contract.

getValue: Retrieves the value stored in the contract.

getSender: Retrieves the sender address stored in the contract.

Each function is documented with JSDoc comments indicating its purpose, parameters, and return type for better readability and understanding.
*/