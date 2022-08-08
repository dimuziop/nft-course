import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby_test: {
      url: `https://rinkeby.infura.io/v3/ab940c95e51c4eea9e3dc5d108ddfffc`,
      accounts: [`0x` + "your_private_key"]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/ab940c95e51c4eea9e3dc5d108ddfffc`,
      accounts: [`0x` + "your_private_key"]
    }
  }
};

export default config;
