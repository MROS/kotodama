const Kotodamas = artifacts.require("./Kotodamas");

module.exports = function(deployer) {
  deployer.deploy(Kotodamas);
};
