const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: { main: { content: source } },
  settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
};

const output = solc.compile(JSON.stringify(input));
//console.log(output);
//console.log("hello");
const artifact = JSON.parse(output).contracts.main["Inbox"];

//console.log(artifact);
module.exports = {
  interface: artifact.abi,
  bytecode: artifact.evm.bytecode.object,
};
