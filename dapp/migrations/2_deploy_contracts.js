const Kotodamas = artifacts.require("./Kotodamas");
const Mating = artifacts.require("./Mating");

module.exports = function(deployer) {
  deployer.deploy(Mating);
  deployer.link(Mating, Kotodamas);
  deployer.deploy(Kotodamas);
};
