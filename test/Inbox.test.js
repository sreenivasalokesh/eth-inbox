const assert = require("assert");
const ganache = require("ganache-cli");
const { Web3 } = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["who are you"] })
    .send({ from: accounts[0], gas: "1000000", gasPrice: 100000 });
});

describe("inbox test", () => {
  it("test deploy", () => {
    console.log(inbox.options.address);
    assert(true);
  });

  it("test init message", async () => {
    const message = await inbox.methods.message().call();
    console.log(message);
    assert.equal("who are you", message);
  });

  it("test set message", async () => {
    await inbox.methods
      .setMessage("bye")
      .send({ from: accounts[0], gas: "1000000", gasPrice: 100000 });
    const message = await inbox.methods.message().call();
    assert.equal("bye", message);
  });
});
