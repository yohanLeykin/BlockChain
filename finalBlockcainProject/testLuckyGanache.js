
import Web3 from 'web3'
import fs from 'fs-extra'
import * as dotenv from 'dotenv'
dotenv.config()

const web3 = new Web3('http://127.0.0.1:8545') // Connect to the Ganache blockchain

const address = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
const private_key = '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'

web3.eth.accounts.wallet.add(private_key)
web3.eth.getBalance(address).then(res => console.log(web3.utils.fromWei(res, 'Gwei')))

const bytecode = fs.readFileSync('./build/lucky_sol_Lucky.bin')
const abi = JSON.parse(fs.readFileSync('./build/lucky_sol_Lucky.abi')) // ABI of your contract


const contract_addr = fs.readFileSync("contractaddress.txt")
const contract = new web3.eth.Contract(abi, contract_addr.toString())

// Get initial supply
contract.methods.getSupply().call().then(result => console.log(result))


