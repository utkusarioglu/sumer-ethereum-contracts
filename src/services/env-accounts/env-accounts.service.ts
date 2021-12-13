import { EnvAccounts } from "env-accounts";

const envAccounts = new EnvAccounts()
  .setEnvPrefix("ACCOUNT_")
  .setRequiredAccounts("local_deployer", "local_user1")
  .setNetworkAlias("local", ["hardhat", "geth"])
  .parse();

export default envAccounts;
