let NftStaking = artifacts.require("NftStaking");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");

let accounts;
let totalReward = 30000;
let period = 3600 * 24 * 21;   // 4 hour in seconds

/**
 * For test purpose, starts a game session
 */
module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();

    console.log("Starting a script...");

    let res = await init(networkId);
    
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log("Accounts were loaded in.");

    let nftStaking = null;
    let factory = null;
    let nft     = null;

    let crowns  = null;
	
    if (networkId == 4) {
        nftStaking = await NftStaking.at("0xd14a907B3c94f54af78305Cf9f29A0bC44Aae48b");	
        factory = await Factory.at("0x2651c8E1958c18B7457aBE89c8FA8788fDdb40D6");
        nft     = await Nft.at("0x66D698881b8E650FC08f1e96EbBb9Ad2e7f8408b");

        crowns  = await Crowns.at("0x9F65b1721c18FB1591058F77508Cbe32492e4D7f");	
    } else {
        nftStaking = await NftStaking.at("0xd14a907B3c94f54af78305Cf9f29A0bC44Aae48b");
        //factory = await Factory.at("0xa304D289f6d0a30aEB33e9243f47Efa3a9ad437d");
        //nft     = await Nft.deployed();
        //crowns  = await Crowns.at("0x4Ca0ACab9f6B9C084d216F40963c070Eef95033B");
    }

    console.log("Smartcontracts were intialized");

    let gasPrice = await web3.eth.getGasPrice() * 2;
    let gasValue = 4700000;

    console.log(`Gas price: ${gasPrice/1e9}`);

    //await crowns.transfer(nftStaking.address, web3.utils.toWei(totalReward.toString()), {from: accounts[0], gas: gasValue, gasPrice: gasPrice});    
    //console.log(`Transfered ${totalReward} CWS`);
    //return;

    //should add nft rush as generator role in nft factory
    //await factory.addGenerator(nftStaking.address, {from: accounts[0], gas: gasValue, gasPrice: gasPrice});
    //console.log("Allow staking saloon to burn nfts");
    //return;

    //should start a session
    let startTime = Math.floor(Date.now()/1000) + (60 * 5);
    let result = await nftStaking.startSession(web3.utils.toWei(totalReward.toString()),
        period,
        startTime,
	    {from: accounts[0], gas: gasValue, gasPrice: gasPrice});
    console.log(result);
    
    let sessionId = await nftStaking.lastSessionId();
    console.log(`Session id: ${sessionId} started`);
}.bind(this);
