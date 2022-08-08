import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby_test: {
      url: `https://rinkeby.infura.io/v3/ab940c95e51c4eea9e3dc5d108ddfffc`,
      accounts: [`0x` + "642146f154cca0a0708ace4b7ea7b305ee11ed37a21942d975a0fbdb39ced7db"]
    }
  }
};

export default config;
