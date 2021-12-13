import chai from "chai";
import { strict as assert } from "assert";
import { solidity } from "ethereum-waffle";
chai.use(solidity);
const { expect } = chai;
import { ethers } from "hardhat";
import type { Hello } from "../artifacts/types/Hello";

let hello: Hello;
let deployer: string; // address

describe("Hello", () => {
  beforeEach(async () => {
    const signers = await ethers.getSigners();
    assert(signers[0], "no signers");
    deployer = signers[0].address;
    const Token = await ethers.getContractFactory("Hello");
    hello = await Token.deploy("Hello");
  });

  describe("setMessage", () => {
    it("Happy", async () => {
      const testMessage = "testMessage";
      const tx = await hello.setMessage(testMessage);
      const receipt = await tx.wait();
      expect(receipt.from).to.eq(deployer);
    });
  });
});
