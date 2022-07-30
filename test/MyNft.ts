import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import web3 from "web3";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MyNft } from "../typechain-types";

describe("MyNft", async () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  const MY_NFT_NAME = "MyNft";
  const SYMBOL = "MFT";
  let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress, addr3: SignerWithAddress;
  let subjectContract;
  let myNft: MyNft;
  before(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    subjectContract = await ethers.getContractFactory("MyNft")
    myNft = await subjectContract.deploy(MY_NFT_NAME, SYMBOL)
    await myNft.deployed();
  })


  describe("Contract basic interactions", function () {
    it("Should not mint a token", async () => {
      await expect(myNft.connect(addr1).mint()).to.be.revertedWith("No enough to mint");
    });

    it("Should mint a token", async () => {
      await myNft.connect(addr1).mint({ value: ethers.utils.parseEther("0.1") });
    });

    it("Should not allow withdraw a non contrat owner", async () => {
      await expect(myNft.connect(addr1).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow withdraw an owner", async () => {
      await myNft.connect(owner).withdraw();
    });

    it("Should withdraw any value", async () => {

      const previousBalance = await owner.getBalance();
      console.log(previousBalance);

      await myNft.connect(addr1).mint({ value: ethers.utils.parseEther("1.001") });
      await myNft.connect(addr1).mint({ value: ethers.utils.parseEther("1.001") });
      await myNft.connect(owner).withdraw();

      console.log((await owner.getBalance()).sub(previousBalance));
      console.log(await myNft.balanceOf(addr1.address));
    })

  });
});
