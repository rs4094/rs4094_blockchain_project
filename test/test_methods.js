const Mcp = require('mcp.js')
const { ethers, waffle} = require("hardhat");
const contract = require('../artifacts/contracts/RouletteWheel.sol/RouletteWheel.json')
const player_address = "0x7b0DEbAa7EefF2c321809aD702452a5eC6D97b8A"
const contract_address = "0xaC18eeB391770cFC087e69CD46ae24e68b52e66d"

const options = {
    host: "18.182.45.18",
    port: 8765
}
let mcp = new Mcp(options)

mcp.request.status().then(function (res) {
    console.log(`status`,res);
}).catch(function(error){
    console.log("accountList catch",error)
})

mcp.Contract.setProvider('http://18.182.45.18:8765/')
let myContract = new mcp.Contract(contract.abi, contract_address)
myContract.methods.Dealer().call().then((receipt) => {console.log("Dealer address updated! ", receipt) })

myContract.methods.place_bet(1)
    .sendBlock({
        from: player_address,
        password: '12345678',
        amount: '2000000000',
        gas_price: '20000000000',
        gas:'2000000',
    })

//Demonstrate that current bet has increased and that the right color was chosen
myContract.methods.current_bet().call().then((receipt) => { 
                                        console.log("Current bet placed: ", receipt) })
waffle.provider.getBalance(contract_address).then((receipt) => {console.log("Dealer's balance: ", receipt)})

//Demonstrate that the wheel can be spun
myContract.methods.spin_wheel().call().then((receipt) => { console.log(receipt) })

