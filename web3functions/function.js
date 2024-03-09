import Web3 from "web3";
import Payment from "../contracts/Payment.json";

let web3;
//connection established to metamask
export async function connectWeb3Metamask() {
   web3 = new Web3(Web3.givenProvider);
   await window.ethereum.enable();
   const accounts = await web3.eth.getAccounts();
   const networkId = await web3.eth.net.getId();
   // console.log("Injected web3 detected.", accounts, networkId);
   const deployedNetwork = await Payment.networks[networkId];
   const instance = new web3.eth.Contract(Payment.abi, deployedNetwork.address);
   return { web3, accounts, instance };
}

//this function converts eth to wei
function ethToWei(eth) {
   const wei = web3.utils.toWei("" + eth.toFixed(5), "ether");
   return wei;
}

//payment function
export async function pay(contractInstance, account, amount) {
   //here amount is in ethereum

   const result = await contractInstance.methods
      .pay()
      .send({ from: account, value: ethToWei(amount) });

   return result;
}

async function getOwner(contractInstance, account) {
   const result = await contractInstance.methods.owner().call();
   return result;
}

async function getValue(contractInstance, account) {
   const result = await contractInstance.methods.val().call();
   return result;
}

async function getSender(contractInstance, account) {
   const result = await contractInstance.methods.sen().call();
   return result;
}
