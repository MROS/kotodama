const Kotodama = artifacts.require("./Kotodama.sol");

module.exports = function(deployer) {
  deployer.deploy(Kotodama);
};
