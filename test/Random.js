const Random = artifacts.require("Random");

const Reverter = require("./helpers/reverter");

contract("Random", async (accounts) => {
    const reverter = new Reverter(web3);

    let random;

    before("setup", async () => {
        random = await Random.new(0);

        await reverter.snapshot(); 
    });

    afterEach(reverter.revert);

    describe("range", async () => {
        it("should work with put 3 in ragne 0, 1, 2", async () => {
            let result;
            for (let i = 0; i < 50; ++i) {
                result = (await random.rand.call(3)).toString();
                assert.isTrue(0 == result || 1 == result || 2 == result);
                await random.rand(3);
            }
        });
    });
});