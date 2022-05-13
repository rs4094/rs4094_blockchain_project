require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "Huygens_dev",
  networks: {
    Huygens_dev: {
      url: "http://18.182.45.18:8765",
      accounts: [
        "A853FBFC46657F2BC96C314F8F093E078DD8C4E2E42A8757EE606319FBBB0D92",
        "0BE79E0537F3834E3DE55191143774DF7CDB3D4317CB1A2624D93AD1A4577971"
      ]
    },
    Huygens: {
      url: "http://13.212.177.203:8765",
      accounts: [
        "A853FBFC46657F2BC96C314F8F093E078DD8C4E2E42A8757EE606319FBBB0D92",
        "0BE79E0537F3834E3DE55191143774DF7CDB3D4317CB1A2624D93AD1A4577971"
      ]
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

