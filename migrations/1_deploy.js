const NFT = artifacts.require("NFT");
const Random = artifacts.require("Random");
const Reward = artifacts.require("Reward");

module.exports = async function (deployer) {
  const DEV = ""; // PUT DEV ADDRESS FOR GET REWARD
  const baseURI = ""; // PUT URI (LINK ON BACKEND), SHOULD BE INTEGRATED WITH TOKEN ID (e.g. https://mybackend/ + tokenID = https://mybackend/532)

  await deployer.deploy(Random, 0);
  const random = await Random.deployed();

  await deployer.deploy(Reward, DEV);
  const reward = await Reward.deployed();

  await deployer.deploy(NFT, reward.address, random.address, baseURI);
  const nft = await NFT.deployed();

  await random.transferOwnership(nft.address);
  await reward.transferOwnership(nft.address);
};
