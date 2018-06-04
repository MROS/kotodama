import { default as Web3} from "web3";
import { default as contract } from "truffle-contract";
type KotodamaContractInstance = {
	// TODO:
	kotos: Array<string>
};
type KotodamaContract = {
	deployed: () => Promise<KotodamaContractInstance>,
};

function initWeb3(): Web3 {
	if ("web3" in window) {
		return new Web3(window["web3"].currentProvider);
	} else {
		throw "去安裝 metamask";
	}
}
function initContract(web3: Web3): KotodamaContract {
	let artifact = require("../../build/contracts/Kotodamas.json");
	let kotodamaContract = contract(artifact);
	kotodamaContract.setProvider(web3.currentProvider);
	return kotodamaContract;
}
async function getKotodamaList(kotodamaContract: KotodamaContract): Promise<Array<string>> {
	let instance = await kotodamaContract.deployed();
	let list = await instance.kotos;
	return list;
}

export {
	KotodamaContract,
	initWeb3,
	initContract,
	getKotodamaList
};