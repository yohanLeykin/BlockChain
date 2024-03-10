
import fs from 'fs-extra'
import ethers, { providers, Wallet } from 'ethers'

const tokenABI = JSON.parse(fs.readFileSync('./build/lucky_sol_Lucky.abi'))
const tokenAddress = "0x7E5484f91D0BcFB5Ae8B6aEf370a156dAA9B9bE7"


const privateKey = 'd533aaa98c21142551674bf8c18df81f59a943d92939b9d6c51d9d29791fd876' // Your private key
const provider = new providers.JsonRpcProvider('https://goerli.infura.io/v3/8007f7c1245745ebb2e0d7ee1282ce6b') // Connect to the Ganache blockchain
const wallet = new Wallet(privateKey, provider)

const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet)
const tokenAmount = '100' // the amount of tokens you want to send
const recipient = '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0' // the address of the recipient

tokenContract.transfer("0xB92e42ddD4e65C4a2A5e06f3e69547e19F17be9a", 20).then(console.log)
//tokenContract.mint(100)
//tokenContract.burn(20)
