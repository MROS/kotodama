import { default as Web3} from "web3";

const CONTRACT_ADDR = "0xe91b4efbdffcc646c3b804f30b5455570bb00f95";

function initWeb3(): Web3 {
	if ("web3" in window) {
		return new Web3(window["web3"].currentProvider);
	} else {
		throw "去安裝 metamask =_=";
	}
}
function initContract(web3: Web3) {
	let artifact = require("../../build/contracts/Kotodamas.json");
	let contract = new web3.eth.Contract(artifact.abi, CONTRACT_ADDR);
	return contract;
}
async function cheatMetaMaskXD() {
	let web3 = initWeb3();
	let contract = initContract(web3);
	let accounts = await web3.eth.getAccounts();
	contract.methods.SetPrice(12312, 22342).send({ from: accounts[0], gas: 100000 });
}

export {
	initWeb3,
	initContract,
	cheatMetaMaskXD
};