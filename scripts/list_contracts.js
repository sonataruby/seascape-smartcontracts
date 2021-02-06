let NftRush = artifacts.require("NftRush");
let LpToken = artifacts.require("LpToken");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");
let Staking = artifacts.require("LpMining");
let NftStaking = artifacts.require("NftStaking");

module.exports = async function(callback) {
    //let res = await init();

    //let accounts = await web3.eth.getAccounts();
    //console.log(accounts);
    //return;

    // cancel pending transactions
    console.log("canceling transactions...");
    let res = await web3.eth.sendTransaction({from: accounts[0], to: accounts[0], value: 0, nonce: 3})
    
    console.log(res);
};

let init = async function() {
    //let nftRush = await NftRush.deployed();
    let crowns = await Crowns.deployed();
    let nft = await Nft.deployed();
    let factory = await Factory.deployed();
    let staking = await Staking.deployed();
    //let nftStaking = await NftStaking.deployed();

    //console.log("Nft Rush:    "+nftRush.address);
    console.log("Crowns:      "+crowns.address);
    console.log("Nft:         "+nft.address);
    console.log("Factory:     "+factory.address);
    console.log("Lp Mining:   "+staking.address);
    //console.log("Nft Staking: "+nftStaking.address);
    
    return true;
}.bind(this);
