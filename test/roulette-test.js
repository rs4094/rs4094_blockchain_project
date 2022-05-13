const { expect, assert } = require("chai");
const { ripemd160 } = require("ethers/lib/utils");
const { ethers, upgrades } = require("hardhat")

beforeEach(async function () {
    RouletteWheel = await ethers.getContractFactory("RouletteWheel");
    roulette_wheel = await RouletteWheel.deploy();
    await roulette_wheel.deployTransaction.wait()
});

describe("Roulette Wheel", function () {
    it("Should have an address when deployed", async function () {
        const [owner] = await ethers.getSigners()
        assert.ok(roulette_wheel.address)
    });

    it("Should have a min bet of 1 and a max bet of 10", async function () {
        assert.equal(10, await roulette_wheel.max_bet())
        assert.equal(1, await roulette_wheel.min_bet())
    });

    it("Should have a min bet of 1 and a max bet of 10", async function () {
        assert.equal(10, await roulette_wheel.max_bet())
        assert.equal(1, await roulette_wheel.min_bet())
    });

    it("Should only allow user to choose between green (0), red (1), and black (2) colors", async function () {
        try {
            await roulette_wheel.place_bet(3)
        }
        catch (err) {
            assert(err)
        }
    });

    it("Should return random integer from roulette values", async function () {
        assert.ok(await roulette_wheel.random())
    });

    it("Should check if the wheel has spun", async function () {
        assert.ok(await roulette_wheel.spin_wheel())
    });
});