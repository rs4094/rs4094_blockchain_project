const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {
    const RouletteWheel = await ethers.getContractFactory("RouletteWheel")
    const roulette_wheel = await RouletteWheel.deploy()
    await roulette_wheel.deployed()
    console.log("Roulette wheel deployed to:", roulette_wheel.address)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})