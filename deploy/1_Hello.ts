import { strict as assert } from "assert";
import type { DeployFunction } from "hardhat-deploy/types";

const deployment: DeployFunction = async ({
  deployments: { deploy },
  getNamedAccounts,
  storageLayout,
}) => {
  const { deployer } = await getNamedAccounts();
  assert(!!deployer, "Deployer not available");
  const hello = await deploy("Hello", {
    from: deployer,
    args: ["Hello world"],
  });
  await storageLayout.export();
  console.log(`Hello deployed @ ${hello.address}`);
};

export default deployment;
