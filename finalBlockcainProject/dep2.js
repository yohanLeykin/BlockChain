// This is for infura and using my personal account as the admin
import Web3 from 'web3'
import fs from 'fs-extra'
import * as dotenv from 'dotenv'
dotenv.config()

const web3 = new Web3('https://goerli.infura.io/v3/8007f7c1245745ebb2e0d7ee1282ce6b') // Connect to the infura blockchain

const privateKey = 'd533aaa98c21142551674bf8c18df81f59a943d92939b9d6c51d9d29791fd876' // Your private key
const account = '0x1795761fe36fA4976D8cbe5c320e827d2FE61AaA' // Your account address


/*
const web3 = new Web3('http://127.0.0.1:8545') // Connect to the Ganache blockchain

const address = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
const private_key = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'
*/
const bytecode = fs.readFileSync('./build/lucky_sol_Lucky.bin')
const abi = JSON.parse(fs.readFileSync('./build/lucky_sol_Lucky.abi')) // ABI of your contract

const contract = new web3.eth.Contract(abi)
const deploy = contract.deploy({
    data: '0x' + bytecode,
    arguments: [account, 100
    ]
})

deploy.estimateGas().then((res) => console.log(res))
const deployTransaction = deploy.encodeABI()

web3.eth.getTransactionCount(account, async (err, nonce) => {
    // Prepare the contract deployment transaction
    //const data = '0x' + bytecode
    const txParams = {
        nonce: web3.utils.toHex(nonce),
        gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
        gasLimit: web3.utils.toHex(6000000),
        from: account,
        data: deployTransaction
    }
    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey)
    const rawTx = signedTx.rawTransaction
    // Send the transaction
    web3.eth.sendSignedTransaction(rawTx)
        .on('receipt', receipt => {
            console.log(receipt)
            fs.writeFile("contractaddressInfura.txt", receipt.contractAddress)
        }).catch(err => {
            console.log(err)
        })
})