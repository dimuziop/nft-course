import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import web3 from "web3";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Foundy } from "../typechain-types";

describe("Foundy", async () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  const MY_NFT_NAME = "Foundy";
  const SYMBOL = "FND";
  let owner: SignerWithAddress, addr1: SignerWithAddress, addr2: SignerWithAddress, addr3: SignerWithAddress;
  let subjectContract;
  let foundy: Foundy;
  before(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    subjectContract = await ethers.getContractFactory("Foundy")
    foundy = await subjectContract.connect(owner).deploy()
    await foundy.deployed();
  })


  describe("Contract basic interactions", function () {
    it("Should not mint a token", async () => {
      await expect(foundy.connect(owner).mint(51)).to.be.revertedWith("Error token limit has been reached");
    });

    it("Should mint a token", async () => {
      await foundy.connect(owner).mint(1);
      expect(await foundy.connect(owner).balanceOf(owner.address)).equal(1)
    });

    it("Should mint 50 tokens", async () => {
      await foundy.connect(owner).mint(50);
      expect(await foundy.connect(owner).balanceOf(owner.address)).equal(50)
      expect(await foundy.connect(owner).totalSupply()).equal(50)
    });

    it("Should mint 50 tokens", async () => {
      await foundy.connect(owner).mint(25);
      expect(await foundy.connect(owner).balanceOf(owner.address)).equal(25)
      expect(await foundy.connect(owner).totalSupply()).equal(25)
      await foundy.connect(owner).mint(25);
      expect(await foundy.connect(owner).balanceOf(owner.address)).equal(50)
      expect(await foundy.connect(owner).totalSupply()).equal(50)
    });

    it("Should not mint more than 50 tokens", async () => {
      await foundy.connect(owner).mint(25);
      expect(await foundy.connect(owner).balanceOf(owner.address)).equal(25)
      expect(await foundy.connect(owner).totalSupply()).equal(25)
      await expect(foundy.connect(owner).mint(26)).to.be.revertedWith("Error token limit has been reached");
    });
  });
});
