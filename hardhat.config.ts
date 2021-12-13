require("dotenv").config();
import "tsconfig-paths/register";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/ethers-v5";
import "@typechain/hardhat";
import "hardhat-spdx-license-identifier";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
import "_/tasks/account-balances";
import "_/tasks/named-accounts";
import "hardhat-storage-layout";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import envAccounts from "_services/env-accounts/env-accounts.service";
const { COINMARKETCAP_API_KEY, INFURA_API_KEY, ETHERSCAN_API_KEY } =
  process.env;

const config = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
    deployments: "./artifacts/deployments",
    deploy: "./src/deploy",
    newStorageLayoutPath: "./artifacts/storage-layout",
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },

  networks: {
    hardhat: {
      saveDeployments: true,
      accounts: envAccounts
        .groupArray("local")
        .map(({ privateKey, balance }) => ({ privateKey, balance })),
      tags: ["local"],
    },
    geth: {
      url: process.env.LOCAL_GETH_INSTANCE_URL,
      chainId: 1131745,
      accounts: envAccounts
        .groupArray("local")
        .map(({ privateKey }) => privateKey),
      tags: ["local"],
    },
    ...(envAccounts.hasGroup("goerli") && {
      goerli: {
        url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
        accounts: envAccounts
          .groupArray("goerli")
          .map(({ privateKey }) => `0x${privateKey}`),
      },
    }),
  },

  namedAccounts: envAccounts.getUserNetworkProps(({ address }) => address),

  typechain: {
    outDir: "artifacts/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  gasReporter: {
    enabled: !!COINMARKETCAP_API_KEY,
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
