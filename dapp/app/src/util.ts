import { default as Web3 } from "web3";

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

function random_integer(x) {
	return Math.floor(Math.random() * (x + 1));
}
function mating(a:string, b:string): string {
	let a_length = a.length;
	let b_length = b.length;
	let total_length = a_length + b_length;
	let c_length = Math.max(a_length, b_length) + 1;
	let c_buffer = [];
	for (let i = 0; i < a_length; i++) {
		c_buffer[i] = a[i];
	}
	for (let i = 0; i < b_length; i++) {
		c_buffer[a_length + i] = b[i];
	}
	// truncate string
	for (let i = 0; i < total_length - c_length; i++) {
		let index = random_integer(total_length - i - 1);
		c_buffer = [...c_buffer.slice(0, index), ...c_buffer.slice(index + 1)];
	}
	console.log(`after truncate: ${c_buffer}`);

	// swap character
	let max_swap = (c_length * c_length - c_length) / 2;
	const swap_numbers = Math.floor(Math.sqrt(random_integer(max_swap * max_swap)));
	for (let i = 0; i < swap_numbers; i++) {
		let s = random_integer(c_length - 2);
		let tmp = c_buffer[s];
		c_buffer[s] = c_buffer[s + 1];
		c_buffer[s + 1] = tmp;
	}
	return c_buffer.join("");
}

export {
	initWeb3,
	initContract,
	cheatMetaMaskXD,
	mating
}