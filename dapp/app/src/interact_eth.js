import { default as Web3 } from "web3";
import { default as contract } from "truffle-contract";

function initWeb3() {
	if ("web3" in window) {
		console.log("web3 已由外部注入。OK!")
		return new Web3(window["web3"].currentProvider);
	} else {
		console.log("provider 使用測試用的本地端節點");
		window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
		return web3;
	}
}

function initContract(web3) {
	let artifact = require("../../build/contracts/Kotodamas.json");
	let kotodamaContract = contract(artifact);
	// console.log(web3.currentProvider);
	kotodamaContract.setProvider(web3.currentProvider);
	return kotodamaContract;
}

async function getInstance() {
	try {
		const web3 = initWeb3();
		const kotodamas = initContract(web3);
		const instance = await kotodamas.deployed();
		return instance;
	} catch (err) {
		console.log(err);
		throw "無法取得 Kotodamas 合約實例，請檢查 Kotodamas 是否佈署。";
	}
}

async function main() {
	let instance;
	try {
		instance = await getInstance();
	} catch (err) {
		console.log(err);
		return;
	}
	console.log("成功取得合約實例");
	console.log(web3.eth.accounts[0]);

	// await instance.add_test.call([0, 0, 0], web3.eth.accounts[0]);
	// const balance = await instance.balanceOf.call(web3.eth.accounts[0]);
	// console.log(balance);
}

main();

export {
};