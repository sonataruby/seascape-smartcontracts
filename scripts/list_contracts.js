let NftRush = artifacts.require("NftRush");
let LpToken = artifacts.require("LpToken");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");
let Staking = artifacts.require("LpMining");
let NftStaking = artifacts.require("NftStaking");
let NftMarket = artifacts.require("NftMarket");

module.exports = async function(callback) {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);

    await init();
    return;

    // cancel pending transactions
    console.log("canceling transactions...");
    res = await web3.eth.sendTransaction({from: accounts[0], to: accounts[0], value: 0, nonce: 19, gasPrice: 136000000000})
    
    console.log(res);
};

let init = async function() {
    let crowns = await Crowns.deployed();
    let nft = await Nft.deployed();
    let factory = await Factory.deployed();

    console.log("Crowns:      "+crowns.address);
    console.log("Nft:         "+nft.address);
    console.log("Factory:     "+factory.address);

    // only in dev environment
    let lpToken = await LpToken.deployed();
    console.log("Lp Test:     "+lpToken.address);

    /// Games
    let staking = await Staking.deployed();
    console.log("Lp Mining:   "+staking.address);

    let nftRush = await NftRush.deployed();
    console.log("Nft Rush:    "+nftRush.address);
    
    let nftStaking = await NftStaking.deployed();
    console.log("Nft Staking: "+nftStaking.address);
    
    let nftMarket = await NftMarket.deployed();
    console.log("Nft Market: "+NftMarket.address);

    

    return true;
}.bind(this);
