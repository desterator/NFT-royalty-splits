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
    let weth;

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

    describe.only("_baseURI/tokenURI", async () => {
        it("should check token uri", async () => {
            assert.equal(baseURI, await nft.baseURI());

            await nft.mint([DEFAULT]);
            assert.equal(baseURI + "0", await nft.tokenURI(0));
            console.log(await nft.tokenURI(0));
        });
        it("should set new uri", async () => {
            const uri = "My new link";

            await nft.setBaseURI(uri);
            assert.equal(uri, await nft.baseURI());
        });
    });
    describe("mint", async () => {
        it("should mint token", async () => {
            await nft.mint([DEFAULT]);

            assert.equal(1, await nft.tokenCounter());
            assert.equal(1, await nft.balanceOf(DEFAULT));
            assert.equal(DEFAULT, await nft.ownerOf(0));
        });
        it("should mint tokens and check that impossible exceed limit", async () => {
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
            let timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);
            const week = "604800";
            await setCurrentTime(timestamp.plus(week));
            await nft.setWinner();
            timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);

            // 1-2 sec standart ganache miss
            assert.isTrue(timestamp.toString() === toBN(await nft.timeOfLastWinner()).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(2).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(2).toString());
        });
        it("should update timer and ditribute 100", async () => {
            await nft.mint([DEFAULT]);
            let timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);
            const amount = 100;

            await web3.eth.sendTransaction({from: DEFAULT, to: reward.address, value: amount});
            assert.equal(amount, await weth.balanceOf(reward.address));

            const week = "604800";
            await setCurrentTime(timestamp.plus(week));
            await nft.setWinner();
            timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);

            // 1-2 sec standart ganache miss
            assert.isTrue(timestamp.toString() === toBN(await nft.timeOfLastWinner()).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(2).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(2).toString());

            assert.equal(amount / 2, await weth.balanceOf(DEV));
            // because only one member
            assert.equal(amount / 2, await weth.balanceOf(DEFAULT));
        });
    });
    describe("overriding internal function", async () => {
        it("should approve token and distribute 0", async () => {
            await nft.mint([DEFAULT]);
            const timeOfLastWinner = toBN(await nft.timeOfLastWinner()).toString();
            const week = "604800";
            let timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);
            await setCurrentTime(timestamp.plus(week));
            await nft.approve(DEV, 0);
            timestamp = toBN((await web3.eth.getBlock("latest")).timestamp);

            // check that approve works by overriding and set winner fucntion also called
            assert.isTrue(timeOfLastWinner != (await nft.timeOfLastWinner()).toString());
            assert.isTrue(timestamp.toString() === toBN(await nft.timeOfLastWinner()).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(1).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).plus(2).toString() ||
                          timestamp.toString() === toBN(await nft.timeOfLastWinner()).minus(2).toString());

            assert.equal(DEV, (await nft.getApproved(0)));
        });
    });
});