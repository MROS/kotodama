import { default as Web3} from "web3";

function initWeb3(): Web3 {
	if ("web3" in window) {
		return new Web3(window["web3"].currentProvider);
	} else {
		throw "去安裝 metamask =_=";
	}
}
function initContract(web3: Web3) {
	let artifact = require("../../build/contracts/Kotodamas.json");
	let contract = web3.eth.Contract(artifact.abi, web3.currentProvider);
	return contract;
}
function cheatMetaMaskXD() {
	let web3 = initWeb3();
	let contract = initContract(web3);
	console.log(contract.methods);
}

export {
	initWeb3,
	initContract,
	cheatMetaMaskXD
};