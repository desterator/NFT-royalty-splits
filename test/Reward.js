const Reward = artifacts.require("Reward");
const IERC20 = artifacts.require("IERC20T");

const Reverter = require("./helpers/reverter");

contract("Reward", async (accounts) => {
    const reverter = new Reverter(web3);

    const DEFAULT = accounts[0];
    const DEV = accounts[1];
    const WINNER = accounts[2];

    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    let weth;
    let reward;

    before("setup", async () => {
        reward = await Reward.new(DEV);
        weth = await IERC20.at(wethAddress);

        await reverter.snapshot(); 
    });

    afterEach(reverter.revert);

    describe("receive", async () => {
        it("should work with wETH and get erc20 token instead eth with value 1", async () => {
            const amount = "1"
            assert.equal(0, await weth.balanceOf(reward.address));

            await web3.eth.sendTransaction({from: DEFAULT, to: reward.address, value: amount});
            assert.equal(amount, await weth.balanceOf(reward.address));
        });
        it("should work with wETH and get erc20 token instead eth with value 100", async () => {
            const amount = "100"
            assert.equal(0, await weth.balanceOf(reward.address));

            await web3.eth.sendTransaction({from: DEFAULT, to: reward.address, value: amount});
            assert.equal(amount, await weth.balanceOf(reward.address));
        });
        it("should work with wETH and get erc20 token instead eth with value 10000000000000000000", async () => {
            const amount = "10000000000000000000"
            assert.equal(0, await weth.balanceOf(reward.address));

            await web3.eth.sendTransaction({from: DEFAULT, to: reward.address, value: amount});
            assert.equal(amount, await weth.balanceOf(reward.address));
        });
    });
    describe("distribute", async () => {
        it("should distribute value between dev and winner in propose 50 to 50", async () => {
            const amount = 100;
            await web3.eth.sendTransaction({from: DEFAULT, to: reward.address, value: amount});

            assert.equal(amount, await weth.balanceOf(reward.address));

            await reward.distribute(WINNER);
            assert.equal(amount / 2, await weth.balanceOf(DEV));
            assert.equal(amount / 2, await weth.balanceOf(WINNER));
        });
    });
});