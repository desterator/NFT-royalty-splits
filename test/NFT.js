const NFT = artifacts.require("NFT");
const Random = artifacts.require("Random");
const Reward = artifacts.require("Reward");
const IERC20 = artifacts.require("IERC20T");

const Reverter = require("./helpers/reverter");
const setCurrentTime = require('./helpers/ganacheTimeTraveler');
const BigNumber = require('bignumber.js');
const truffleAssert = require('truffle-assertions');

const toBN = (num) => {
    return new BigNumber(num);
};

contract("NFT", async (accounts) => {
    const reverter = new Reverter(web3);

    const DEFAULT = accounts[0];
    const DEV = accounts[1];
    const WINNER = accounts[2];

    // using for test to get all tokens on defaults, size must be 50
    const array = [DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,
        DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,
        DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT];

    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const baseURI = "baseURI/";

    let nft;
    let random;
    let reward;

    before("setup", async () => {
        random = await Random.new(0);
        reward = await Reward.new(DEV);
        nft = await NFT.new(reward.address, random.address, baseURI);
        weth = await IERC20.at(wethAddress);

        await random.transferOwnership(nft.address);
        await reward.transferOwnership(nft.address);

        await reverter.snapshot(); 
    });

    afterEach(reverter.revert);

    describe("_baseURI/tokenURI", async () => {
        it("should check token uri", async () => {
            assert.equal(baseURI, await nft.baseURI());

            await nft.mint([DEFAULT]);
            assert.equal(baseURI + "0", await nft.tokenURI(0));
            console.log(await nft.tokenURI(0));
        });
    });
    describe("mint", async () => {
        it("should mint token", async () => {
            await nft.mint([DEFAULT]);

            assert.equal(1, await nft.tokenCounter());
            assert.equal(1, await nft.balanceOf(DEFAULT));
            assert.equal(DEFAULT, await nft.ownerOf(0));
        });
        it.only("should mint tokens and check that impossible exceed limit", async () => {
            assert.equal(50, array.length);

            for(let i = 0; i < 50; ++i) {
                await nft.mint(array);
                assert.equal((i + 1) * 50, await nft.tokenCounter());
                assert.equal((i + 1) * 50, (await nft.balanceOf(DEFAULT)).toString());

                // checking loop
                for(let j = i * 50; j < (i + 1) * 50; ++j) {
                    assert.equal(DEFAULT, await nft.ownerOf(j));
                }
            }

            await truffleAssert.reverts(nft.mint([DEFAULT]), "LimitExceeded");
        }).timeout(1000000);
    });
    describe("setWinner", async () => {
        it("should update timer and ditribute 0", async () => {
            await nft.mint([DEFAULT]);
            const timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);
            await nft.setWinner();

            // 1-2 sec standart ganache miss
            assert.isTrue(timestamp.toString() === toBN(await nft.timeOfLastWinner()).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(2).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(2).toString());
        });
    });
});