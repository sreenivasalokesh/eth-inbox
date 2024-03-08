//const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

// const provider = new HDWalletProvider(
//   "inspire donate stick verify urge pilot whip trust tell such galaxy drill",
//   "https://sepolia.infura.io/v3/42d214526d3243b1975e576f41fef3ac"
// );

// const provider1 = new HDWalletProvider({
//   mnemonic:
//     "inspire donate stick verify urge pilot whip trust tell such galaxy drill",
//   providerOrUrl:
//     "https://sepolia.infura.io/v3/42d214526d3243b1975e576f41fef3ac",
//   pollingInterval: 20000,
// });

const providerx = new Web3.providers.HttpProvider(
  "https://sepolia.infura.io/v3/42d214526d3243b1975e576f41fef3ac"
);
const web3 = new Web3(providerx);
const signer = web3.eth.accounts.privateKeyToAccount(
  "0x" + "7e94aa70fb626e0353e49886d978e4e80f62c2c223becb0902fcd4690ab21e1f"
);
web3.eth.accounts.wallet.add(signer);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const gasPrice = Math.round(Number(await web3.eth.getGasPrice()) * 1.5);
  console.log("gasPrice", gasPrice);

  const contract = new web3.eth.Contract(interface);
  console.log("1");
  const deployTx = contract.deploy({ data: bytecode, arguments: ["hello"] });
  console.log("done");
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...${txhash}`);
    });

  console.log("contract deployed to", deployedContract.options.address);
};

deploy();
