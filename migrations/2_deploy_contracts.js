const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    // Deploy Dapp Token
    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()

    // Deploy TokenFarm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Transfer all tokens to TokenFarm 1 million
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    // Transfer 100 Mock DAI tokens to an investor
    await daiToken.transfer(accounts[1], '100000000000000000000')
};

// One token in ETH looks like 1.000000000000000000, 18 decimal places
// Our app will have only integers so, 1 token is actually: 1000000000000000000 to store all decimal places